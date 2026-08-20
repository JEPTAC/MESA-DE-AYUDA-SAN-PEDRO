-- Mesa de Ayuda TIC · 23_launch_access_model.sql
-- Production access model: session bootstrap, module visibility and team-scoped operations.

insert into public.roles(code,name,description,is_system) values
('super_admin','Superadministrador','Control total de la Mesa de Ayuda TIC, usuarios, seguridad y configuración.',true),
('tic_agent','Gestor TIC','Opera únicamente servicios y tickets de los equipos TIC a los que pertenece.',true),
('communications_agent','Gestor de Comunicaciones','Opera únicamente publicaciones, cubrimientos y servicios del equipo de Comunicaciones.',true),
('coordinator','Coordinador de servicio','Coordina colas, asignaciones y capacidad dentro de sus equipos.',true)
on conflict (code) do update set name=excluded.name,description=excluded.description,is_system=true;

-- The generic agent role must never have global ticket visibility.
delete from public.role_permissions rp
using public.roles r, public.permissions p
where rp.role_id=r.id and rp.permission_id=p.id
  and r.code in ('agent','tic_agent','communications_agent','coordinator')
  and p.code in ('tickets.read.all','tickets.manage.all');

-- Rebuild administrator grants as configuration administration, not root access.
delete from public.role_permissions rp
using public.roles r
where rp.role_id=r.id and r.code='admin';

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r cross join public.permissions p
where r.code='super_admin'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in (
  'catalog.manage','sla.manage','workflow.read','workflow.manage','knowledge.manage',
  'notifications.manage','reports.read','audit.read','admin.settings'
) where r.code='admin'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in (
  'directory.read','tickets.assign','tickets.internal_notes'
) where r.code in ('agent','communications_agent')
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in (
  'directory.read','tickets.assign','tickets.internal_notes','assets.read','itsm.read'
) where r.code='tic_agent'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in (
  'directory.read','tickets.assign','tickets.internal_notes','reports.read'
) where r.code='coordinator'
on conflict do nothing;

create table if not exists public.app_modules (
  code text primary key,
  label text not null,
  description text,
  icon text,
  section text not null default 'general',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.role_modules (
  role_id uuid not null references public.roles(id) on delete cascade,
  module_code text not null references public.app_modules(code) on delete cascade,
  primary key(role_id,module_code)
);

create table if not exists public.team_modules (
  team_id uuid not null references public.teams(id) on delete cascade,
  module_code text not null references public.app_modules(code) on delete cascade,
  primary key(team_id,module_code)
);

drop trigger if exists app_modules_set_updated_at on public.app_modules;
create trigger app_modules_set_updated_at before update on public.app_modules
for each row execute function public.set_updated_at();

insert into public.app_modules(code,label,description,icon,section,sort_order) values
('home','Inicio','Resumen personal y accesos principales.','home','general',10),
('new_request','Nueva solicitud','Radicación guiada desde el catálogo institucional.','plus-circle','general',20),
('my_requests','Mis solicitudes','Seguimiento de las solicitudes propias.','inbox','general',30),
('notifications','Notificaciones','Actualizaciones de solicitudes y acciones pendientes.','bell','general',40),
('knowledge','Centro de ayuda','Artículos y soluciones institucionales.','book-open','general',50),
('service_status','Estado de servicios','Disponibilidad y afectaciones de servicios.','activity','general',60),
('my_calendar','Mi agenda','Reservas y actividades asociadas al usuario.','calendar','general',70),
('communications','Comunicaciones','Publicaciones, cubrimientos y servicios del equipo de Comunicaciones.','megaphone','operation',100),
('operations','Operación TIC','Colas y tickets operativos de los equipos TIC.','headphones','operation',110),
('team_calendar','Agenda del equipo','Planificador real de reservas y capacidad del equipo.','calendar-days','operation',120),
('continuity','Incidentes y continuidad','Incidentes, problemas y cambios autorizados.','shield-alert','operation',130),
('assets','Activos y CMDB','Inventario y elementos de configuración autorizados.','monitor','operation',140),
('reports','Indicadores','Indicadores calculados con información real.','chart','management',200),
('catalog','Catálogo y formularios','Administración de servicios y formularios.','layers','admin',300),
('workflows','Workflows y SLA','Configuración de procesos, aprobaciones y niveles de servicio.','workflow','admin',310),
('admin_settings','Configuración','Parámetros institucionales de la Mesa.','settings','admin',320),
('admin_users','Usuarios e importaciones','Usuarios, roles, equipos e importaciones CSV.','users','admin',330),
('audit','Auditoría','Trazabilidad administrativa y de seguridad.','file-search','admin',340)
on conflict (code) do update set label=excluded.label,description=excluded.description,icon=excluded.icon,section=excluded.section,sort_order=excluded.sort_order,is_active=true;

-- Everyone authenticated starts as requester and receives only the self-service experience.
insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r join public.app_modules m on m.code in (
  'home','new_request','my_requests','notifications','knowledge','service_status','my_calendar'
) where r.code='requester'
on conflict do nothing;

insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r join public.app_modules m on m.code in (
  'home','new_request','my_requests','notifications','knowledge','service_status','my_calendar','team_calendar'
) where r.code in ('agent','tic_agent','communications_agent','coordinator')
on conflict do nothing;

insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r join public.app_modules m on m.code in (
  'home','new_request','my_requests','notifications','knowledge','service_status','my_calendar','reports','catalog','workflows','admin_settings','audit'
) where r.code='admin'
on conflict do nothing;

insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r cross join public.app_modules m
where r.code='super_admin'
on conflict do nothing;

insert into public.role_modules(role_id,module_code)
select r.id,m.code from public.roles r join public.app_modules m on m.code in ('home','reports','audit')
where r.code='auditor'
on conflict do nothing;

-- Team membership is the second authorization dimension.
insert into public.team_modules(team_id,module_code)
select t.id,m.code from public.teams t join public.app_modules m on
  (t.code='TIC' and m.code in ('operations','team_calendar','continuity','assets'))
  or (t.code='COM' and m.code in ('communications','team_calendar'))
  or (t.code='DATOS' and m.code in ('operations','team_calendar','reports'))
on conflict do nothing;

alter table public.app_modules enable row level security;
alter table public.role_modules enable row level security;
alter table public.team_modules enable row level security;

drop policy if exists app_modules_read on public.app_modules;
create policy app_modules_read on public.app_modules for select to authenticated using (is_active);
drop policy if exists app_modules_manage on public.app_modules;
create policy app_modules_manage on public.app_modules for all to authenticated
using (public.has_permission('admin.settings')) with check (public.has_permission('admin.settings'));

-- Mapping tables are intentionally not readable directly by normal clients. Context is delivered by RPC.
drop policy if exists role_modules_manage on public.role_modules;
create policy role_modules_manage on public.role_modules for all to authenticated
using (public.has_permission('roles.manage')) with check (public.has_permission('roles.manage'));
drop policy if exists team_modules_manage on public.team_modules;
create policy team_modules_manage on public.team_modules for all to authenticated
using (public.has_permission('teams.manage') or public.has_permission('admin.settings'))
with check (public.has_permission('teams.manage') or public.has_permission('admin.settings'));

grant select on public.app_modules to authenticated;
grant select,insert,update,delete on public.role_modules,public.team_modules to authenticated;

create or replace function public.has_role(role_code text)
returns boolean
language sql
stable
security definer
set search_path=public
as $$
  select exists(
    select 1 from public.user_roles ur join public.roles r on r.id=ur.role_id
    where ur.profile_id=auth.uid() and r.code=role_code
      and (ur.valid_until is null or ur.valid_until>now())
  );
$$;

create or replace function public.get_my_app_context()
returns jsonb
language plpgsql
stable
security definer
set search_path=public
as $$
declare
  uid uuid:=auth.uid();
  result jsonb;
begin
  if uid is null then raise exception 'authentication_required' using errcode='42501'; end if;

  select jsonb_build_object(
    'profile', jsonb_build_object(
      'id',p.id,'full_name',p.full_name,'display_name',coalesce(p.display_name,p.full_name),
      'email',p.institutional_email,'phone',p.phone,'avatar_url',p.avatar_url,'is_active',p.is_active,
      'department',case when d.id is null then null else jsonb_build_object('id',d.id,'code',d.code,'name',d.name) end,
      'position',case when pos.id is null then null else jsonb_build_object('id',pos.id,'code',pos.code,'name',pos.name) end
    ),
    'roles',coalesce((select jsonb_agg(distinct r.code order by r.code) from public.user_roles ur join public.roles r on r.id=ur.role_id where ur.profile_id=uid and (ur.valid_until is null or ur.valid_until>now())),'[]'::jsonb),
    'permissions',coalesce((select jsonb_agg(distinct per.code order by per.code) from public.user_roles ur join public.role_permissions rp on rp.role_id=ur.role_id join public.permissions per on per.id=rp.permission_id where ur.profile_id=uid and (ur.valid_until is null or ur.valid_until>now())),'[]'::jsonb),
    'teams',coalesce((select jsonb_agg(jsonb_build_object('id',t.id,'code',t.code,'name',t.name) order by t.name) from public.team_members tm join public.teams t on t.id=tm.team_id where tm.profile_id=uid and tm.is_active and (tm.valid_from is null or tm.valid_from<=current_date) and (tm.valid_to is null or tm.valid_to>=current_date)),'[]'::jsonb),
    'modules',coalesce((
      select jsonb_agg(module_row.code order by module_row.sort_order)
      from (
        select distinct m.code,m.sort_order
        from public.app_modules m
        where m.is_active and (
          exists(select 1 from public.user_roles ur join public.role_modules rm on rm.role_id=ur.role_id where ur.profile_id=uid and rm.module_code=m.code and (ur.valid_until is null or ur.valid_until>now()))
          or exists(select 1 from public.team_members tm join public.team_modules tmm on tmm.team_id=tm.team_id where tm.profile_id=uid and tm.is_active and tmm.module_code=m.code and (tm.valid_from is null or tm.valid_from<=current_date) and (tm.valid_to is null or tm.valid_to>=current_date))
        )
      ) module_row
    ),'[]'::jsonb),
    'operational_services',coalesce((
      select jsonb_agg(jsonb_build_object('id',s.id,'code',s.code,'name',s.name,'team_id',s.owner_team_id) order by s.name)
      from public.services s
      where s.is_active and s.is_published and exists(
        select 1 from public.team_members tm where tm.profile_id=uid and tm.team_id=s.owner_team_id and tm.is_active
      )
    ),'[]'::jsonb)
  ) into result
  from public.profiles p
  left join public.departments d on d.id=p.department_id
  left join public.positions pos on pos.id=p.position_id
  where p.id=uid;

  if result is null then
    return jsonb_build_object('profile',null,'roles','[]'::jsonb,'permissions','[]'::jsonb,'teams','[]'::jsonb,'modules','[]'::jsonb,'operational_services','[]'::jsonb);
  end if;
  return result;
end;
$$;

create or replace function public.get_accessible_tickets(p_limit integer default 200, p_offset integer default 0)
returns table(
  id uuid,ticket_number text,subject text,description text,status text,priority text,approval_status text,
  service_id uuid,service_code text,service_name text,current_team_id uuid,team_name text,
  requester_id uuid,requester_name text,current_assignee_id uuid,assignee_name text,
  scheduled_start_at timestamptz,scheduled_end_at timestamptz,due_at timestamptz,last_activity_at timestamptz,created_at timestamptz
)
language sql
stable
security definer
set search_path=public
as $$
  select t.id,t.ticket_number,t.subject,t.description,t.status,t.priority,t.approval_status,
    s.id,s.code,s.name,t.current_team_id,tm.name,t.requester_id,coalesce(req.display_name,req.full_name),
    t.current_assignee_id,coalesce(ass.display_name,ass.full_name),t.scheduled_start_at,t.scheduled_end_at,t.due_at,t.last_activity_at,t.created_at
  from public.tickets t
  join public.services s on s.id=t.service_id
  left join public.teams tm on tm.id=t.current_team_id
  left join public.profiles req on req.id=t.requester_id
  left join public.profiles ass on ass.id=t.current_assignee_id
  where public.can_access_ticket(t.id)
  order by t.last_activity_at desc
  limit least(greatest(coalesce(p_limit,200),1),500)
  offset greatest(coalesce(p_offset,0),0);
$$;

create or replace function public.get_ticket_detail(p_ticket_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path=public
as $$
declare result jsonb;
begin
  if auth.uid() is null or not public.can_access_ticket(p_ticket_id) then
    raise exception 'ticket_access_denied' using errcode='42501';
  end if;

  select jsonb_build_object(
    'ticket',jsonb_build_object(
      'id',t.id,'ticket_number',t.ticket_number,'subject',t.subject,'description',t.description,'status',t.status,'priority',t.priority,
      'approval_status',t.approval_status,'created_at',t.created_at,'last_activity_at',t.last_activity_at,'due_at',t.due_at,
      'scheduled_start_at',t.scheduled_start_at,'scheduled_end_at',t.scheduled_end_at,'resolution_summary',t.resolution_summary,
      'requester_id',t.requester_id,'requester_name',coalesce(req.display_name,req.full_name),
      'assignee_id',t.current_assignee_id,'assignee_name',coalesce(ass.display_name,ass.full_name),
      'team_id',t.current_team_id,'team_name',team.name,'service_id',s.id,'service_code',s.code,'service_name',s.name
    ),
    'can_manage',public.can_manage_ticket(t.id),
    'can_internal',public.can_view_internal_ticket_content(t.id),
    'fields',coalesce((select jsonb_agg(jsonb_build_object('key',v.field_key,'label',coalesce(v.field_label,v.field_key),'value',v.value) order by v.created_at) from public.ticket_field_values v where v.ticket_id=t.id),'[]'::jsonb),
    'messages',coalesce((select jsonb_agg(jsonb_build_object('id',m.id,'type',m.message_type,'visibility',m.visibility,'body',m.body,'created_at',m.created_at,'author_id',m.author_id,'author_name',coalesce(ap.display_name,ap.full_name,'Sistema')) order by m.created_at) from public.ticket_messages m left join public.profiles ap on ap.id=m.author_id where m.ticket_id=t.id and (m.visibility='public' or public.can_view_internal_ticket_content(t.id))),'[]'::jsonb),
    'history',coalesce((select jsonb_agg(jsonb_build_object('from',h.from_status,'to',h.to_status,'reason',h.reason,'created_at',h.created_at,'changed_by',coalesce(hp.display_name,hp.full_name)) order by h.created_at) from public.ticket_status_history h left join public.profiles hp on hp.id=h.changed_by where h.ticket_id=t.id),'[]'::jsonb),
    'sla',coalesce((select jsonb_agg(jsonb_build_object('state',i.state,'due_at',i.due_at,'completed_at',i.completed_at,'metric',st.metric,'target_minutes',st.target_minutes) order by st.metric) from public.ticket_sla_instances i join public.sla_targets st on st.id=i.target_id where i.ticket_id=t.id),'[]'::jsonb),
    'reservations',coalesce((select jsonb_agg(jsonb_build_object('id',r.id,'start_at',r.start_at,'end_at',r.end_at,'status',r.status,'title',r.title,'location',r.location) order by r.start_at) from public.reservations r where r.ticket_id=t.id),'[]'::jsonb)
  ) into result
  from public.tickets t
  join public.services s on s.id=t.service_id
  left join public.teams team on team.id=t.current_team_id
  left join public.profiles req on req.id=t.requester_id
  left join public.profiles ass on ass.id=t.current_assignee_id
  where t.id=p_ticket_id;

  return result;
end;
$$;

create or replace function public.get_ticket_assignable_people(p_ticket_id uuid)
returns table(profile_id uuid,display_name text,team_id uuid,team_name text,is_available boolean)
language plpgsql
stable
security definer
set search_path=public
as $$
begin
  if not public.can_manage_ticket(p_ticket_id) and not public.has_permission('tickets.assign') then
    raise exception 'assignment_denied' using errcode='42501';
  end if;
  return query
  select p.id,coalesce(p.display_name,p.full_name),t.id,t.name,p.is_available
  from public.tickets tk
  join public.team_members tm on tm.team_id=tk.current_team_id and tm.is_active
  join public.profiles p on p.id=tm.profile_id and p.is_active
  join public.teams t on t.id=tm.team_id
  where tk.id=p_ticket_id
    and (tm.valid_from is null or tm.valid_from<=current_date)
    and (tm.valid_to is null or tm.valid_to>=current_date)
  order by p.is_available desc,coalesce(p.display_name,p.full_name);
end;
$$;

revoke all on function public.has_role(text) from public;
revoke all on function public.get_my_app_context() from public;
revoke all on function public.get_accessible_tickets(integer,integer) from public;
revoke all on function public.get_ticket_detail(uuid) from public;
revoke all on function public.get_ticket_assignable_people(uuid) from public;
grant execute on function public.has_role(text),public.get_my_app_context(),public.get_accessible_tickets(integer,integer),public.get_ticket_detail(uuid),public.get_ticket_assignable_people(uuid) to authenticated;
