-- Mesa de Ayuda TIC · 24_launch_security_hardening.sql
-- Least privilege corrections for production launch.

-- Team membership is no longer a public authenticated directory.
drop policy if exists team_members_read_auth on public.team_members;
create policy team_members_read_scoped on public.team_members for select to authenticated using (
  profile_id=auth.uid()
  or public.has_permission('directory.read')
  or public.has_permission('teams.manage')
);

-- Directory RPC must not leak the complete staff directory to requesters.
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
  from public.profiles p
  where p.is_active
    and (
      p.id=auth.uid()
      or public.has_permission('directory.read')
      or public.has_permission('teams.manage')
    )
  order by coalesce(p.display_name,p.full_name);
$$;

-- Superadmin is the only role allowed to administer Auth users and bulk imports.
delete from public.role_permissions rp
using public.roles r, public.permissions p
where rp.role_id=r.id and rp.permission_id=p.id
  and r.code<>'super_admin' and p.code in ('users.manage','roles.manage','teams.manage','imports.manage');

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in ('users.manage','roles.manage','teams.manage','imports.manage')
where r.code='super_admin'
on conflict do nothing;

-- Initial bootstrap grants root role instead of the legacy admin role.
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

  insert into public.user_roles(profile_id,role_id,scope_type,scope_id,granted_by)
  values(v_uid,v_role_id,'global',null,v_uid)
  on conflict (profile_id,role_id,scope_type,scope_id) do nothing;

  insert into public.audit_events(actor_id,entity_type,entity_id,action,new_data,context)
  values(v_uid,'profile',v_uid::text,'bootstrap_super_admin_claimed',jsonb_build_object('email',v_email),jsonb_build_object('source','claim_initial_admin'));

  return jsonb_build_object('ok',true,'profile_id',v_uid,'role','super_admin');
end;
$$;

create or replace function public.is_admin_user(profile_uuid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path=public
as $$
  select exists(
    select 1 from public.user_roles ur join public.roles r on r.id=ur.role_id
    where ur.profile_id=profile_uuid and r.code in ('super_admin','admin')
      and (ur.valid_until is null or ur.valid_until>now())
  );
$$;

revoke all on function public.claim_initial_admin() from public;
revoke all on function public.is_admin_user(uuid) from public;
grant execute on function public.claim_initial_admin(),public.is_admin_user(uuid),public.get_profile_directory() to authenticated;

-- Useful indexes for the production shell.
create index if not exists team_members_profile_active_idx on public.team_members(profile_id,is_active,team_id);
create index if not exists user_roles_profile_valid_idx on public.user_roles(profile_id,valid_until,role_id);
create index if not exists notifications_profile_read_idx on public.notifications(profile_id,read_at,created_at desc);
create index if not exists reservations_profile_start_idx on public.reservations(profile_id,start_at);

update public.import_templates
set optional_headers=array['display_name','department_code','position_code','phone','role_code','team_codes','is_active'],
    mapping_help=mapping_help || '{"team_codes":"Códigos de equipos separados por punto y coma, por ejemplo COM o TIC;DATOS.","role_code":"requester, communications_agent, tic_agent, coordinator, approver, auditor, catalog_manager, admin o super_admin."}'::jsonb
where entity_code='users';
