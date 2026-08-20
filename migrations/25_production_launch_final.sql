-- Mesa de Ayuda TIC · 25_production_launch_final.sql
-- Final production hardening. No demo users, tickets, assets or operational records are created here.

-- 1) Make module visibility mutually aligned with the production roles.
delete from public.role_modules rm
using public.roles r
where rm.role_id=r.id and r.code in (
  'requester','agent','tic_agent','communications_agent','coordinator','admin','super_admin','auditor'
);

-- Requester: self-service only.
insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r join public.app_modules m on m.code in (
  'home','new_request','my_requests','notifications','knowledge','service_status','my_calendar'
) where r.code='requester'
on conflict do nothing;

-- Generic/service agents: operational shell only; team membership adds the actual work module.
insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r join public.app_modules m on m.code in (
  'home','notifications','knowledge','team_calendar'
) where r.code='agent'
on conflict do nothing;

-- TIC agent: no requester portal; only TIC operation plus useful support modules.
insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r join public.app_modules m on m.code in (
  'home','notifications','knowledge','operations','team_calendar','continuity','assets'
) where r.code='tic_agent'
on conflict do nothing;

-- Communications agent: publications/campaign coverage workspace, team agenda and supporting knowledge only.
insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r join public.app_modules m on m.code in (
  'home','notifications','knowledge','communications','team_calendar'
) where r.code='communications_agent'
on conflict do nothing;

-- Coordinator: visibility comes from the team; can additionally see team indicators.
insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r join public.app_modules m on m.code in (
  'home','notifications','knowledge','team_calendar','reports'
) where r.code='coordinator'
on conflict do nothing;

-- Configuration administrator is not automatically an operational agent.
insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r join public.app_modules m on m.code in (
  'home','catalog','workflows','admin_settings','audit'
) where r.code='admin'
on conflict do nothing;

insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r join public.app_modules m on m.code in ('home','reports','audit')
where r.code='auditor'
on conflict do nothing;

-- Superadmin is the only role with the complete application shell.
insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r cross join public.app_modules m
where r.code='super_admin' and m.is_active
on conflict do nothing;

-- 2) Superadmin bootstrap is exclusive: no inherited requester role remains.
create or replace function public.claim_initial_admin()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_email text := lower(coalesce(auth.jwt()->>'email',''));
  v_role_id uuid;
begin
  if v_uid is null then raise exception 'authentication_required' using errcode='42501'; end if;
  if v_email <> 'adminterritorial@sanpedro-valle.gov.co' then
    raise exception 'bootstrap_admin_email_not_allowed' using errcode='42501';
  end if;

  select id into v_role_id from public.roles where code='super_admin';
  if v_role_id is null then raise exception 'super_admin_role_not_seeded'; end if;

  insert into public.profiles(id,full_name,display_name,institutional_email,is_active)
  values(v_uid,'Administrador Territorial','Administrador Territorial',v_email,true)
  on conflict(id) do update set institutional_email=excluded.institutional_email,is_active=true,updated_at=now();

  delete from public.user_roles where profile_id=v_uid;
  insert into public.user_roles(profile_id,role_id,scope_type,scope_id,granted_by)
  values(v_uid,v_role_id,'global',null,v_uid);

  insert into public.audit_events(actor_id,entity_type,entity_id,action,new_data,context)
  values(v_uid,'profile',v_uid::text,'bootstrap_super_admin_claimed',jsonb_build_object('email',v_email),jsonb_build_object('source','claim_initial_admin'));

  return jsonb_build_object('ok',true,'profile_id',v_uid,'role','super_admin');
end;
$$;

revoke all on function public.claim_initial_admin() from public;
grant execute on function public.claim_initial_admin() to authenticated;

-- 3) Ticket creation belongs to requester accounts (or superadmin for support/testing).
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
  if uid is null then raise exception 'authentication_required' using errcode='42501'; end if;
  if not (public.has_role('requester') or public.has_role('super_admin')) then
    raise exception 'requester_role_required' using errcode='42501';
  end if;
  if not exists(select 1 from public.profiles p where p.id=uid and p.is_active) then
    raise exception 'inactive_profile' using errcode='42501';
  end if;
  if nullif(btrim(p_subject),'') is null then raise exception 'subject_required'; end if;
  if p_priority not in ('low','medium','high','critical') then raise exception 'invalid_priority'; end if;

  select * into service_row from public.services where code=p_service_code and is_active and is_published;
  if service_row.id is null then raise exception 'service_not_available'; end if;

  insert into public.tickets(
    ticket_number,requester_id,requester_department_id,service_id,current_team_id,
    subject,description,priority,impact,urgency,status,approval_status
  ) values (
    public.next_ticket_number('MA'),uid,coalesce(p_department_id,(select department_id from public.profiles where id=uid)),service_row.id,service_row.owner_team_id,
    btrim(p_subject),nullif(btrim(coalesce(p_description,'')),''),p_priority,p_priority,p_priority,
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
  values(ticket_id,uid,'system','public','Solicitud radicada desde la Mesa de Ayuda TIC.');

  return ticket_id;
end;
$$;

-- 4) Assignment requires BOTH ticket scope and assignment permission.
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
declare
  uid uuid := auth.uid();
  resolved_team uuid;
begin
  if uid is null then raise exception 'authentication_required' using errcode='42501'; end if;
  if not public.can_manage_ticket(p_ticket_id) then raise exception 'ticket_scope_denied' using errcode='42501'; end if;
  if not (public.has_permission('tickets.assign') or public.has_permission('tickets.manage.all')) then
    raise exception 'assignment_permission_required' using errcode='42501';
  end if;
  if not exists(select 1 from public.profiles where id=p_assignee_id and is_active) then raise exception 'assignee_not_active'; end if;

  resolved_team := coalesce(p_team_id,(select current_team_id from public.tickets where id=p_ticket_id));
  if resolved_team is null then raise exception 'responsible_team_required'; end if;
  if not exists(select 1 from public.team_members tm where tm.profile_id=p_assignee_id and tm.team_id=resolved_team and tm.is_active) then
    raise exception 'assignee_not_in_responsible_team';
  end if;

  update public.ticket_assignments set ended_at=now() where ticket_id=p_ticket_id and ended_at is null;
  insert into public.ticket_assignments(ticket_id,team_id,assignee_id,assigned_by,assignment_method,reason)
  values(p_ticket_id,resolved_team,p_assignee_id,uid,p_method,p_reason);
  update public.tickets
  set current_team_id=resolved_team,current_assignee_id=p_assignee_id,
      status=case when status in ('new','triage') then 'assigned' else status end,last_activity_at=now()
  where id=p_ticket_id;
end;
$$;

-- 5) Published catalog is self-service; operational roles do not get create RPC access without requester role.
revoke all on function public.create_ticket(text,text,text,text,jsonb,uuid) from public;
revoke all on function public.assign_ticket(uuid,uuid,uuid,text,jsonb) from public;
grant execute on function public.create_ticket(text,text,text,text,jsonb,uuid) to authenticated;
grant execute on function public.assign_ticket(uuid,uuid,uuid,text,jsonb) to authenticated;

-- 6) Production role labels and import help.
update public.roles set name='Funcionario solicitante',description='Radica y consulta únicamente sus propias solicitudes.' where code='requester';
update public.roles set name='Gestor de Comunicaciones',description='Opera únicamente los servicios asignados al equipo de Comunicaciones.' where code='communications_agent';
update public.roles set name='Gestor TIC',description='Opera únicamente los servicios asignados al equipo TIC.' where code='tic_agent';
update public.roles set name='Superadministrador',description='Control total de usuarios, seguridad, configuración y operación.' where code='super_admin';

update public.import_templates
set mapping_help = mapping_help || jsonb_build_object(
  'role_code','Roles de lanzamiento: requester, communications_agent, tic_agent, coordinator, approver, auditor, admin o super_admin.',
  'team_codes','communications_agent debe pertenecer a COM; tic_agent debe pertenecer a TIC; coordinator puede pertenecer a uno o más equipos.'
)
where entity_code='users';

-- 7) Only institutional accounts may be provisioned through Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is null or lower(new.email) !~ '^[^@]+@sanpedro-valle\.gov\.co$' then
    raise exception 'institutional_email_required' using errcode='42501';
  end if;

  insert into public.profiles(id, full_name, display_name, institutional_email, metadata)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', new.email, ''),
    lower(new.email),
    coalesce(new.raw_user_meta_data, '{}'::jsonb)
  )
  on conflict (id) do update set institutional_email=excluded.institutional_email,updated_at=now();

  insert into public.user_roles(profile_id, role_id, scope_type, scope_id)
  select new.id,r.id,'global',null from public.roles r where r.code='requester'
  on conflict (profile_id,role_id,scope_type,scope_id) do nothing;
  return new;
end;
$$;

-- 8) Requesters cannot mutate institutional authorization fields on their own profile.
revoke update on public.profiles from authenticated;
grant update(display_name,phone,avatar_url,timezone,locale,is_available) on public.profiles to authenticated;
