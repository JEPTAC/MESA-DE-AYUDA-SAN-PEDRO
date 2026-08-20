-- Mesa de Ayuda TIC · 16_functions_triggers.sql

create or replace function public.next_ticket_number(prefix text default 'MA')
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  current_year integer := extract(year from now())::integer;
  next_value integer;
begin
  insert into public.ticket_counters(year, last_value)
  values (current_year, 1)
  on conflict (year)
  do update set last_value = public.ticket_counters.last_value + 1, updated_at = now()
  returning last_value into next_value;

  return upper(prefix) || '-' || current_year::text || '-' || lpad(next_value::text, 5, '0');
end;
$$;

create or replace function public.before_insert_ticket()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.ticket_number is null or btrim(new.ticket_number) = '' then
    new.ticket_number := public.next_ticket_number('MA');
  end if;
  if new.requester_department_id is null then
    select department_id into new.requester_department_id from public.profiles where id = new.requester_id;
  end if;
  new.last_activity_at := now();
  return new;
end;
$$;

drop trigger if exists tickets_before_insert on public.tickets;
create trigger tickets_before_insert before insert on public.tickets for each row execute function public.before_insert_ticket();

create or replace function public.on_ticket_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status is distinct from new.status then
    insert into public.ticket_status_history(ticket_id, from_status, to_status, changed_by)
    values (new.id, old.status, new.status, auth.uid());

    new.last_activity_at := now();

    if new.status = 'resolved' and new.resolved_at is null then new.resolved_at := now(); end if;
    if new.status = 'closed' and new.closed_at is null then new.closed_at := now(); end if;
    if new.status = 'cancelled' and new.cancelled_at is null then new.cancelled_at := now(); end if;
    if new.status = 'reopened' then new.reopened_at := now(); end if;
  end if;
  return new;
end;
$$;

drop trigger if exists tickets_status_change on public.tickets;
create trigger tickets_status_change before update on public.tickets for each row execute function public.on_ticket_status_change();

create or replace function public.touch_ticket_activity_from_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.tickets
  set last_activity_at = new.created_at,
      first_response_at = case
        when first_response_at is null and new.author_id is distinct from requester_id and new.visibility = 'public' and new.message_type = 'comment'
          then new.created_at
        else first_response_at
      end
  where id = new.ticket_id;
  return new;
end;
$$;

drop trigger if exists ticket_message_touch_activity on public.ticket_messages;
create trigger ticket_message_touch_activity after insert on public.ticket_messages for each row execute function public.touch_ticket_activity_from_message();

create or replace function public.audit_generic_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  entity_id text;
begin
  entity_id := coalesce((case when tg_op = 'DELETE' then to_jsonb(old) else to_jsonb(new) end)->>'id', 'unknown');
  insert into public.audit_events(actor_id, entity_type, entity_id, action, old_data, new_data)
  values (
    auth.uid(),
    tg_table_name,
    entity_id,
    lower(tg_op),
    case when tg_op in ('UPDATE','DELETE') then to_jsonb(old) else null end,
    case when tg_op in ('INSERT','UPDATE') then to_jsonb(new) else null end
  );
  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

-- High-value configuration audit.
drop trigger if exists audit_services on public.services;
create trigger audit_services after insert or update or delete on public.services for each row execute function public.audit_generic_change();
drop trigger if exists audit_workflows on public.workflows;
create trigger audit_workflows after insert or update or delete on public.workflows for each row execute function public.audit_generic_change();
drop trigger if exists audit_roles on public.roles;
create trigger audit_roles after insert or update or delete on public.roles for each row execute function public.audit_generic_change();

-- Add working minutes respecting schedule windows, weekends and configured holidays.
create or replace function public.add_business_minutes(
  p_start timestamptz,
  p_minutes integer,
  p_schedule_id uuid
)
returns timestamptz
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  tz text;
  remaining integer := greatest(coalesce(p_minutes,0),0);
  cursor_local timestamp;
  day_row record;
  interval_start timestamp;
  interval_end timestamp;
  available integer;
  safety integer := 0;
  holiday_nonworking boolean;
begin
  if remaining = 0 or p_schedule_id is null then
    return p_start + make_interval(mins => remaining);
  end if;

  select timezone into tz from public.work_schedules where id=p_schedule_id and is_active;
  if tz is null then
    return p_start + make_interval(mins => remaining);
  end if;

  cursor_local := p_start at time zone tz;

  while remaining > 0 loop
    safety := safety + 1;
    if safety > 400 then
      raise exception 'Could not calculate business due date within 400 days';
    end if;

    select exists(
      select 1 from public.holidays h
      where h.holiday_date=cursor_local::date and h.is_working_day_override=false
    ) into holiday_nonworking;

    select * into day_row
    from public.work_schedule_days d
    where d.schedule_id=p_schedule_id
      and d.weekday=extract(dow from cursor_local)::smallint;

    if holiday_nonworking or day_row.id is null or not day_row.is_working_day then
      cursor_local := (cursor_local::date + 1)::timestamp;
      continue;
    end if;

    interval_start := cursor_local::date + day_row.start_time;
    interval_end := cursor_local::date + day_row.end_time;

    if cursor_local < interval_start then cursor_local := interval_start; end if;
    if cursor_local < interval_end then
      available := floor(extract(epoch from (interval_end-cursor_local))/60)::integer;
      if remaining <= available then
        return (cursor_local + make_interval(mins=>remaining)) at time zone tz;
      end if;
      remaining := remaining - greatest(available,0);
      cursor_local := interval_end;
    end if;

    if day_row.second_start_time is not null and day_row.second_end_time is not null then
      interval_start := cursor_local::date + day_row.second_start_time;
      interval_end := cursor_local::date + day_row.second_end_time;
      if cursor_local < interval_start then cursor_local := interval_start; end if;
      if cursor_local < interval_end then
        available := floor(extract(epoch from (interval_end-cursor_local))/60)::integer;
        if remaining <= available then
          return (cursor_local + make_interval(mins=>remaining)) at time zone tz;
        end if;
        remaining := remaining - greatest(available,0);
        cursor_local := interval_end;
      end if;
    end if;

    cursor_local := (cursor_local::date + 1)::timestamp;
  end loop;

  return cursor_local at time zone tz;
end;
$$;

create or replace function public.start_ticket_slas(p_ticket_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  t record;
  target record;
  v_due timestamptz;
begin
  select tk.*,s.default_sla_policy_id,sp.work_schedule_id
  into t
  from public.tickets tk
  join public.services s on s.id=tk.service_id
  left join public.sla_policies sp on sp.id=s.default_sla_policy_id
  where tk.id=p_ticket_id;

  if t.id is null or t.default_sla_policy_id is null then return; end if;

  for target in
    select st.*
    from public.sla_targets st
    where st.policy_id=t.default_sla_policy_id
      and st.is_active
      and st.priority in ('any',t.priority)
      and not exists (
        select 1 from public.sla_targets more_specific
        where more_specific.policy_id=st.policy_id
          and more_specific.metric=st.metric
          and more_specific.priority=t.priority
          and st.priority='any'
          and more_specific.is_active
      )
  loop
    v_due := public.add_business_minutes(t.created_at,target.target_minutes,t.work_schedule_id);
    insert into public.ticket_sla_instances(ticket_id,target_id,started_at,due_at,state)
    values(t.id,target.id,t.created_at,v_due,'running')
    on conflict(ticket_id,target_id) do nothing;
  end loop;

  update public.tickets tk
  set due_at=(
    select min(i.due_at)
    from public.ticket_sla_instances i
    join public.sla_targets st on st.id=i.target_id
    where i.ticket_id=tk.id and st.metric='resolution'
  )
  where tk.id=t.id and tk.due_at is null;
end;
$$;

create or replace function public.after_insert_ticket_start_sla()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.start_ticket_slas(new.id);
  return new;
end;
$$;

drop trigger if exists tickets_start_sla on public.tickets;
create trigger tickets_start_sla after insert on public.tickets for each row execute function public.after_insert_ticket_start_sla();

create or replace function public.sync_sla_on_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  inst record;
  pause_allowed boolean;
  now_ts timestamptz := now();
begin
  if old.status is not distinct from new.status then return new; end if;

  for inst in
    select i.id,i.state,i.paused_at,i.paused_seconds,st.metric,sp.pause_on_waiting_requester,sp.pause_on_pending_approval
    from public.ticket_sla_instances i
    join public.sla_targets st on st.id=i.target_id
    join public.sla_policies sp on sp.id=st.policy_id
    where i.ticket_id=new.id and i.state in ('running','paused')
  loop
    pause_allowed := (new.status='waiting_requester' and inst.pause_on_waiting_requester)
      or (new.status='pending_approval' and inst.pause_on_pending_approval);

    if pause_allowed and inst.state='running' then
      update public.ticket_sla_instances set state='paused',paused_at=now_ts where id=inst.id;
      insert into public.sla_events(ticket_sla_instance_id,event_type,event_at,actor_id) values(inst.id,'paused',now_ts,auth.uid());
    elsif not pause_allowed and inst.state='paused' then
      update public.ticket_sla_instances
      set state='running',
          paused_seconds=paused_seconds + greatest(0,extract(epoch from (now_ts-paused_at))::bigint),
          due_at=due_at + (now_ts-paused_at),
          paused_at=null
      where id=inst.id;
      insert into public.sla_events(ticket_sla_instance_id,event_type,event_at,actor_id) values(inst.id,'resumed',now_ts,auth.uid());
    end if;
  end loop;

  if new.status in ('resolved','closed') then
    update public.ticket_sla_instances i
    set state=case when now_ts > i.due_at then 'breached' else 'completed' end,
        completed_at=now_ts,
        breached_at=case when now_ts > i.due_at then coalesce(i.breached_at,now_ts) else i.breached_at end
    from public.sla_targets st
    where i.ticket_id=new.id and i.target_id=st.id and st.metric='resolution' and i.state in ('running','paused');
  end if;

  return new;
end;
$$;

drop trigger if exists tickets_sync_sla_status on public.tickets;
create trigger tickets_sync_sla_status after update of status on public.tickets for each row execute function public.sync_sla_on_status_change();

create or replace function public.complete_first_response_sla()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requester uuid;
begin
  if new.visibility<>'public' or new.message_type<>'comment' or new.author_id is null then return new; end if;
  select requester_id into requester from public.tickets where id=new.ticket_id;
  if requester is null or new.author_id=requester then return new; end if;

  update public.ticket_sla_instances i
  set state=case when new.created_at > i.due_at then 'breached' else 'completed' end,
      completed_at=new.created_at,
      breached_at=case when new.created_at > i.due_at then coalesce(i.breached_at,new.created_at) else i.breached_at end
  from public.sla_targets st
  where i.ticket_id=new.ticket_id and i.target_id=st.id and st.metric='first_response' and i.state in ('running','paused');
  return new;
end;
$$;

drop trigger if exists messages_complete_first_response_sla on public.ticket_messages;
create trigger messages_complete_first_response_sla after insert on public.ticket_messages for each row execute function public.complete_first_response_sla();

-- Atomic ticket creation RPC used by the guided popup wizard.
create or replace function public.create_ticket(
  p_service_code text,
  p_subject text,
  p_description text default null,
  p_priority text default 'medium',
  p_field_values jsonb default '{}'::jsonb,
  p_department_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  service_row record;
  ticket_id uuid;
  kv record;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if p_priority not in ('low','medium','high','critical') then raise exception 'Invalid priority'; end if;

  select * into service_row from public.services where code=p_service_code and is_active and is_published;
  if service_row.id is null then raise exception 'Service not available'; end if;

  insert into public.tickets(
    ticket_number,requester_id,requester_department_id,service_id,current_team_id,
    subject,description,priority,impact,urgency,status,approval_status
  ) values (
    public.next_ticket_number('MA'),uid,coalesce(p_department_id,(select department_id from public.profiles where id=uid)),service_row.id,service_row.owner_team_id,
    p_subject,p_description,p_priority,p_priority,p_priority,
    case when service_row.requires_approval then 'pending_approval' else 'new' end,
    case when service_row.requires_approval then 'pending' else 'not_required' end
  ) returning id into ticket_id;

  for kv in select key,value from jsonb_each(coalesce(p_field_values,'{}'::jsonb)) loop
    insert into public.ticket_field_values(ticket_id,field_id,field_key,field_label,value)
    select ticket_id,sf.id,kv.key,sf.label,kv.value
    from public.service_forms f
    join public.service_fields sf on sf.form_id=f.id and sf.field_key=kv.key
    where f.service_id=service_row.id and f.is_published
    order by f.version desc limit 1
    on conflict(ticket_id,field_key) do update set value=excluded.value,field_label=excluded.field_label,field_id=excluded.field_id;

    if not found then
      insert into public.ticket_field_values(ticket_id,field_key,value)
      values(ticket_id,kv.key,kv.value)
      on conflict(ticket_id,field_key) do update set value=excluded.value;
    end if;
  end loop;

  insert into public.ticket_messages(ticket_id,author_id,message_type,visibility,body)
  values(ticket_id,uid,'system','public','Solicitud radicada desde el portal guiado.');

  return ticket_id;
end;
$$;

create or replace function public.add_ticket_message(
  p_ticket_id uuid,
  p_body text,
  p_visibility text default 'public'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  message_id uuid;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if not public.can_access_ticket(p_ticket_id) then raise exception 'Ticket access denied'; end if;
  if p_visibility not in ('public','internal') then raise exception 'Invalid visibility'; end if;
  if p_visibility='internal' and not public.can_view_internal_ticket_content(p_ticket_id) then raise exception 'Internal note access denied'; end if;
  if nullif(btrim(p_body),'') is null then raise exception 'Message body required'; end if;

  insert into public.ticket_messages(ticket_id,author_id,message_type,visibility,body)
  values(p_ticket_id,uid,'comment',p_visibility,p_body)
  returning id into message_id;
  return message_id;
end;
$$;

create or replace function public.assign_ticket(
  p_ticket_id uuid,
  p_assignee_id uuid,
  p_team_id uuid default null,
  p_method text default 'manual',
  p_reason jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare uid uuid := auth.uid(); resolved_team uuid;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if not (public.can_manage_ticket(p_ticket_id) or public.has_permission('tickets.assign')) then raise exception 'Assignment denied'; end if;
  if not exists(select 1 from public.profiles where id=p_assignee_id and is_active) then raise exception 'Assignee is not active'; end if;

  resolved_team := coalesce(p_team_id,(select current_team_id from public.tickets where id=p_ticket_id));
  update public.ticket_assignments set ended_at=now() where ticket_id=p_ticket_id and ended_at is null;
  insert into public.ticket_assignments(ticket_id,team_id,assignee_id,assigned_by,assignment_method,reason)
  values(p_ticket_id,resolved_team,p_assignee_id,uid,p_method,p_reason);
  update public.tickets set current_team_id=resolved_team,current_assignee_id=p_assignee_id,status=case when status in ('new','triage') then 'assigned' else status end,last_activity_at=now() where id=p_ticket_id;
end;
$$;

create or replace function public.transition_ticket(
  p_ticket_id uuid,
  p_new_status text,
  p_reason text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare uid uuid:=auth.uid(); current_ticket record;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if p_new_status not in ('new','triage','assigned','in_progress','waiting_requester','scheduled','pending_approval','resolved','closed','cancelled','reopened') then raise exception 'Invalid status'; end if;
  select * into current_ticket from public.tickets where id=p_ticket_id;
  if current_ticket.id is null then raise exception 'Ticket not found'; end if;

  if not public.can_manage_ticket(p_ticket_id) then
    if not (current_ticket.requester_id=uid and ((p_new_status='cancelled' and current_ticket.status in ('new','triage')) or (p_new_status='reopened' and current_ticket.status in ('resolved','closed')))) then
      raise exception 'Transition denied';
    end if;
  end if;

  update public.tickets set status=p_new_status,last_activity_at=now() where id=p_ticket_id;
  if p_reason is not null then
    insert into public.ticket_messages(ticket_id,author_id,message_type,visibility,body)
    values(p_ticket_id,uid,'status',case when public.can_view_internal_ticket_content(p_ticket_id) then 'internal' else 'public' end,p_reason);
  end if;
end;
$$;

create or replace function public.reserve_ticket_slot(
  p_ticket_id uuid,
  p_profile_id uuid,
  p_start_at timestamptz,
  p_end_at timestamptz,
  p_title text default null,
  p_location text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid:=auth.uid();
  t record;
  reservation_id uuid;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if p_end_at<=p_start_at then raise exception 'Invalid time range'; end if;
  select tk.*,s.owner_team_id,s.allows_requester_assignee_choice into t from public.tickets tk join public.services s on s.id=tk.service_id where tk.id=p_ticket_id;
  if t.id is null then raise exception 'Ticket not found'; end if;
  if not public.can_manage_ticket(p_ticket_id) and not (t.requester_id=uid and t.allows_requester_assignee_choice) then raise exception 'Reservation denied'; end if;
  if t.owner_team_id is not null and not exists(select 1 from public.team_members tm where tm.team_id=t.owner_team_id and tm.profile_id=p_profile_id and tm.is_active) then raise exception 'Profile is not part of the responsible team'; end if;
  if exists(select 1 from public.reservations r where r.profile_id=p_profile_id and r.status in ('tentative','confirmed') and tstzrange(r.start_at,r.end_at,'[)') && tstzrange(p_start_at,p_end_at,'[)')) then raise exception 'Schedule conflict'; end if;
  if exists(select 1 from public.absences a where a.profile_id=p_profile_id and a.status='approved' and tstzrange(a.start_at,a.end_at,'[)') && tstzrange(p_start_at,p_end_at,'[)')) then raise exception 'Assignee is absent'; end if;

  insert into public.reservations(ticket_id,profile_id,team_id,title,reservation_type,start_at,end_at,status,location,created_by)
  values(p_ticket_id,p_profile_id,t.owner_team_id,coalesce(p_title,t.subject),'ticket',p_start_at,p_end_at,'confirmed',p_location,uid)
  returning id into reservation_id;
  update public.tickets set scheduled_start_at=p_start_at,scheduled_end_at=p_end_at,current_assignee_id=p_profile_id,current_team_id=t.owner_team_id,status='scheduled' where id=p_ticket_id;
  return reservation_id;
end;
$$;

create or replace function public.mark_notification_read(p_notification_id uuid)
returns void
language sql
security definer
set search_path=public
as $$
  update public.notifications set read_at=coalesce(read_at,now()) where id=p_notification_id and profile_id=auth.uid();
$$;

create or replace function public.get_profile_directory()
returns table(
  id uuid,
  display_name text,
  full_name text,
  avatar_url text,
  department_id uuid,
  position_id uuid,
  is_available boolean
)
language sql
stable
security definer
set search_path=public
as $$
  select p.id,p.display_name,p.full_name,p.avatar_url,p.department_id,p.position_id,p.is_available
  from public.profiles p where p.is_active order by coalesce(p.display_name,p.full_name);
$$;

grant execute on function public.create_ticket(text,text,text,text,jsonb,uuid) to authenticated;
grant execute on function public.add_ticket_message(uuid,text,text) to authenticated;
grant execute on function public.assign_ticket(uuid,uuid,uuid,text,jsonb) to authenticated;
grant execute on function public.transition_ticket(uuid,text,text) to authenticated;
grant execute on function public.reserve_ticket_slot(uuid,uuid,timestamptz,timestamptz,text,text) to authenticated;
grant execute on function public.mark_notification_read(uuid) to authenticated;
grant execute on function public.get_profile_directory() to authenticated;

-- Independent yearly counters for ITSM records.
create table if not exists public.record_counters (
  prefix text not null,
  year integer not null,
  last_value integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key(prefix,year)
);

alter table public.record_counters enable row level security;

create or replace function public.next_record_number(p_prefix text)
returns text
language plpgsql
security definer
set search_path=public
as $$
declare y integer:=extract(year from now())::integer; n integer;
begin
  if upper(p_prefix) not in ('INC','PRB','CHG') then raise exception 'Invalid record prefix'; end if;
  insert into public.record_counters(prefix,year,last_value)
  values(upper(p_prefix),y,1)
  on conflict(prefix,year) do update set last_value=public.record_counters.last_value+1,updated_at=now()
  returning last_value into n;
  return upper(p_prefix)||'-'||y::text||'-'||lpad(n::text,5,'0');
end;
$$;

create or replace function public.before_insert_incident_number() returns trigger language plpgsql security definer set search_path=public as $$
begin if new.incident_number is null or btrim(new.incident_number)='' then new.incident_number:=public.next_record_number('INC'); end if; return new; end; $$;
create or replace function public.before_insert_problem_number() returns trigger language plpgsql security definer set search_path=public as $$
begin if new.problem_number is null or btrim(new.problem_number)='' then new.problem_number:=public.next_record_number('PRB'); end if; return new; end; $$;
create or replace function public.before_insert_change_number() returns trigger language plpgsql security definer set search_path=public as $$
begin if new.change_number is null or btrim(new.change_number)='' then new.change_number:=public.next_record_number('CHG'); end if; return new; end; $$;

drop trigger if exists incidents_number on public.incidents;
create trigger incidents_number before insert on public.incidents for each row execute function public.before_insert_incident_number();
drop trigger if exists problems_number on public.problems;
create trigger problems_number before insert on public.problems for each row execute function public.before_insert_problem_number();
drop trigger if exists changes_number on public.changes;
create trigger changes_number before insert on public.changes for each row execute function public.before_insert_change_number();

-- Approval decision RPC.
create or replace function public.decide_approval(
  p_approval_request_id uuid,
  p_decision text,
  p_comment text default null
)
returns void
language plpgsql
security definer
set search_path=public
as $$
declare uid uuid:=auth.uid(); ar record; pending_count integer; rejected_count integer;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if p_decision not in ('approved','rejected') then raise exception 'Invalid decision'; end if;
  select * into ar from public.approval_requests where id=p_approval_request_id;
  if ar.id is null then raise exception 'Approval not found'; end if;
  if ar.status<>'pending' then raise exception 'Approval already decided'; end if;
  if not (ar.requested_from=uid or public.is_team_member(ar.requested_team_id) or public.has_permission('approvals.manage')) then raise exception 'Approval denied'; end if;

  update public.approval_requests set status=p_decision,decision_comment=p_comment,decided_at=now() where id=ar.id;
  insert into public.approval_actions(approval_request_id,actor_id,action,comment) values(ar.id,uid,p_decision,p_comment);

  select count(*) filter(where status='pending'),count(*) filter(where status='rejected')
  into pending_count,rejected_count from public.approval_requests where ticket_id=ar.ticket_id;

  if rejected_count>0 then
    update public.tickets set approval_status='rejected',status='cancelled' where id=ar.ticket_id;
  elsif pending_count=0 then
    update public.tickets set approval_status='approved',status='new' where id=ar.ticket_id;
  end if;
end;
$$;

grant execute on function public.decide_approval(uuid,text,text) to authenticated;

-- In-app notifications for key ticket lifecycle events.
create or replace function public.notify_ticket_created()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  insert into public.notifications(profile_id,ticket_id,event_type,title,body,severity)
  values(new.requester_id,new.id,'ticket.created','Solicitud '||new.ticket_number||' radicada','Tu solicitud fue recibida y ya inició su trazabilidad.','success');
  return new;
end;
$$;

drop trigger if exists ticket_notify_created on public.tickets;
create trigger ticket_notify_created after insert on public.tickets for each row execute function public.notify_ticket_created();

create or replace function public.notify_ticket_update()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  if old.current_assignee_id is distinct from new.current_assignee_id and new.current_assignee_id is not null then
    insert into public.notifications(profile_id,ticket_id,event_type,title,body,severity)
    values(new.current_assignee_id,new.id,'ticket.assigned','Nueva asignación · '||new.ticket_number,new.subject,'info');
  end if;

  if old.status is distinct from new.status and new.status='waiting_requester' then
    insert into public.notifications(profile_id,ticket_id,event_type,title,body,severity)
    values(new.requester_id,new.id,'ticket.waiting_requester','Necesitamos información · '||new.ticket_number,'El equipo requiere información adicional para continuar.','warning');
  end if;

  if old.status is distinct from new.status and new.status='resolved' then
    insert into public.notifications(profile_id,ticket_id,event_type,title,body,severity)
    values(new.requester_id,new.id,'ticket.resolved','Solicitud resuelta · '||new.ticket_number,'Revisa la solución y confirma si quedó resuelta.','success');
    insert into public.ticket_surveys(ticket_id,requester_id,sent_at)
    values(new.id,new.requester_id,now()) on conflict(ticket_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists ticket_notify_update on public.tickets;
create trigger ticket_notify_update after update on public.tickets for each row execute function public.notify_ticket_update();

create or replace function public.create_ticket_for_requester(
  p_requester_id uuid,
  p_service_code text,
  p_subject text,
  p_description text default null,
  p_priority text default 'medium',
  p_field_values jsonb default '{}'::jsonb,
  p_department_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid:=auth.uid();
  service_row record;
  ticket_id uuid;
  kv record;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if not public.has_permission('tickets.create.for_others') then raise exception 'Permission denied'; end if;
  if not exists(select 1 from public.profiles where id=p_requester_id and is_active) then raise exception 'Requester is not active'; end if;
  if p_priority not in ('low','medium','high','critical') then raise exception 'Invalid priority'; end if;

  select * into service_row from public.services where code=p_service_code and is_active and is_published;
  if service_row.id is null then raise exception 'Service not available'; end if;

  insert into public.tickets(
    ticket_number,requester_id,requester_department_id,service_id,current_team_id,
    subject,description,priority,impact,urgency,status,approval_status
  ) values (
    public.next_ticket_number('MA'),p_requester_id,coalesce(p_department_id,(select department_id from public.profiles where id=p_requester_id)),service_row.id,service_row.owner_team_id,
    p_subject,p_description,p_priority,p_priority,p_priority,
    case when service_row.requires_approval then 'pending_approval' else 'new' end,
    case when service_row.requires_approval then 'pending' else 'not_required' end
  ) returning id into ticket_id;

  for kv in select key,value from jsonb_each(coalesce(p_field_values,'{}'::jsonb)) loop
    insert into public.ticket_field_values(ticket_id,field_id,field_key,field_label,value)
    select ticket_id,sf.id,kv.key,sf.label,kv.value
    from public.service_forms f
    join public.service_fields sf on sf.form_id=f.id and sf.field_key=kv.key
    where f.service_id=service_row.id and f.is_published
    order by f.version desc limit 1
    on conflict(ticket_id,field_key) do update set value=excluded.value,field_label=excluded.field_label,field_id=excluded.field_id;
    if not found then
      insert into public.ticket_field_values(ticket_id,field_key,value) values(ticket_id,kv.key,kv.value)
      on conflict(ticket_id,field_key) do update set value=excluded.value;
    end if;
  end loop;

  insert into public.ticket_messages(ticket_id,author_id,message_type,visibility,body)
  values(ticket_id,uid,'system','public','Solicitud radicada por un funcionario autorizado en nombre del solicitante.');
  return ticket_id;
end;
$$;

grant execute on function public.create_ticket_for_requester(uuid,text,text,text,text,jsonb,uuid) to authenticated;

alter table public.services add column if not exists default_effort_minutes integer not null default 60 check (default_effort_minutes > 0);
alter table public.tickets add column if not exists estimated_effort_minutes integer check (estimated_effort_minutes is null or estimated_effort_minutes > 0);

create or replace function public.initialize_ticket_workflow()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
declare v_version uuid; v_start uuid; v_instance uuid;
begin
  select wv.id into v_version
  from public.services s
  join public.workflow_versions wv on wv.workflow_id=s.workflow_id and wv.status='published'
  where s.id=new.service_id
  order by wv.version desc limit 1;
  if v_version is null then return new; end if;

  select id into v_start from public.workflow_steps where workflow_version_id=v_version order by case when step_type='start' then 0 else 1 end,sort_order limit 1;
  insert into public.ticket_workflow_instances(ticket_id,workflow_version_id,current_step_id,status)
  values(new.id,v_version,v_start,'running')
  on conflict(ticket_id) do nothing
  returning id into v_instance;

  if v_instance is not null and v_start is not null then
    insert into public.ticket_step_instances(workflow_instance_id,step_id,status,started_at)
    values(v_instance,v_start,'active',now());
  end if;
  return new;
end;
$$;

drop trigger if exists ticket_initialize_workflow on public.tickets;
create trigger ticket_initialize_workflow after insert on public.tickets for each row execute function public.initialize_ticket_workflow();

create or replace function public.initialize_ticket_approvals()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
declare r record; target_user uuid;
begin
  if new.approval_status<>'pending' then return new; end if;
  for r in select * from public.approval_rules where service_id=new.service_id and is_active order by sequence_no loop
    target_user:=r.approver_profile_id;
    if target_user is null and r.approver_type='team_lead' and r.approver_team_id is not null then
      select tm.profile_id into target_user from public.team_members tm
      where tm.team_id=r.approver_team_id and tm.is_active and tm.member_role in ('lead','manager')
      order by case tm.member_role when 'manager' then 0 else 1 end limit 1;
    end if;
    if target_user is null and r.approver_type='department_head' then
      select p.id into target_user
      from public.profiles p join public.positions pos on pos.id=p.position_id
      where p.department_id=new.requester_department_id and p.is_active and lower(pos.name) like '%secretar%'
      order by p.created_at limit 1;
    end if;
    insert into public.approval_requests(ticket_id,rule_id,requested_from,requested_team_id,sequence_no,status)
    values(new.id,r.id,target_user,r.approver_team_id,r.sequence_no,'pending');
  end loop;
  return new;
end;
$$;

drop trigger if exists ticket_initialize_approvals on public.tickets;
create trigger ticket_initialize_approvals after insert on public.tickets for each row execute function public.initialize_ticket_approvals();

create or replace function public.get_assignee_suggestions(
  p_service_id uuid,
  p_start_at timestamptz default null,
  p_end_at timestamptz default null,
  p_limit integer default 5
)
returns table(
  profile_id uuid,
  display_name text,
  avatar_url text,
  skill_score numeric,
  active_ticket_minutes integer,
  reserved_minutes integer,
  capacity_minutes integer,
  load_percent numeric,
  is_available boolean,
  recommendation_score numeric
)
language sql
stable
security definer
set search_path=public
as $$
  with svc as (
    select s.id,s.owner_team_id from public.services s where s.id=p_service_id and s.is_active
  ), candidates as (
    select distinct p.id,p.display_name,p.full_name,p.avatar_url,p.is_available,
      coalesce(tm.capacity_minutes_per_day,480) capacity_minutes
    from svc
    join public.team_members tm on tm.team_id=svc.owner_team_id and tm.is_active
    join public.profiles p on p.id=tm.profile_id and p.is_active
  ), skill as (
    select c.id,
      coalesce(sum(case when ps.proficiency>=srs.minimum_proficiency then srs.weight*ps.proficiency else 0 end),0)::numeric skill_score,
      coalesce(sum(srs.weight*5),1)::numeric max_skill
    from candidates c
    left join public.service_required_skills srs on srs.service_id=p_service_id
    left join public.profile_skills ps on ps.profile_id=c.id and ps.skill_id=srs.skill_id
    group by c.id
  ), active_work as (
    select c.id,coalesce(sum(coalesce(t.estimated_effort_minutes,s.default_effort_minutes,60)),0)::integer active_minutes
    from candidates c
    left join public.tickets t on t.current_assignee_id=c.id and t.status in ('assigned','in_progress','waiting_requester','scheduled','pending_approval','reopened')
    left join public.services s on s.id=t.service_id
    group by c.id
  ), reservations_work as (
    select c.id,coalesce(sum(extract(epoch from (r.end_at-r.start_at))/60),0)::integer reserved
    from candidates c
    left join public.reservations r on r.profile_id=c.id and r.status in ('tentative','confirmed')
      and r.start_at::date=coalesce(p_start_at::date,current_date)
    group by c.id
  )
  select c.id,c.display_name,c.avatar_url,
    round(sk.skill_score,2),aw.active_minutes,rw.reserved,c.capacity_minutes,
    round(least(100,100.0*(aw.active_minutes+rw.reserved)/greatest(c.capacity_minutes,1)),1) load_percent,
    (c.is_available and not exists(
      select 1 from public.absences a where a.profile_id=c.id and a.status='approved'
      and p_start_at is not null and p_end_at is not null
      and tstzrange(a.start_at,a.end_at,'[)') && tstzrange(p_start_at,p_end_at,'[)')
    ) and not exists(
      select 1 from public.reservations r where r.profile_id=c.id and r.status in ('tentative','confirmed')
      and p_start_at is not null and p_end_at is not null
      and tstzrange(r.start_at,r.end_at,'[)') && tstzrange(p_start_at,p_end_at,'[)')
    )) available,
    round(
      65*(sk.skill_score/greatest(sk.max_skill,1))
      + 25*(1-least(1.0,(aw.active_minutes+rw.reserved)::numeric/greatest(c.capacity_minutes,1)))
      + 10*(case when c.is_available then 1 else 0 end),2
    ) recommendation_score
  from candidates c join skill sk on sk.id=c.id join active_work aw on aw.id=c.id join reservations_work rw on rw.id=c.id
  order by available desc,recommendation_score desc,load_percent asc
  limit greatest(1,least(coalesce(p_limit,5),20));
$$;

grant execute on function public.get_assignee_suggestions(uuid,timestamptz,timestamptz,integer) to authenticated;
