-- Mesa de Ayuda TIC · 22_bootstrap_admin_helpers.sql
-- Safe bootstrap: does NOT store or embed any password.

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
  if v_uid is null then
    raise exception 'authentication_required' using errcode='42501';
  end if;

  if v_email <> 'adminterritorial@sanpedro-valle.gov.co' then
    raise exception 'bootstrap_admin_email_not_allowed' using errcode='42501';
  end if;

  select id into v_role_id from public.roles where code='admin';
  if v_role_id is null then
    raise exception 'admin_role_not_seeded';
  end if;

  insert into public.profiles(id,full_name,display_name,institutional_email,is_active)
  values(v_uid,'Administrador Territorial','Administrador Territorial',v_email,true)
  on conflict(id) do update set
    institutional_email=excluded.institutional_email,
    is_active=true,
    updated_at=now();

  insert into public.user_roles(profile_id,role_id,scope_type,scope_id,granted_by)
  values(v_uid,v_role_id,'global',null,v_uid)
  on conflict (profile_id,role_id,scope_type,scope_id) do nothing;

  insert into public.audit_events(actor_id,entity_type,entity_id,action,new_data,context)
  values(v_uid,'profile',v_uid::text,'bootstrap_admin_claimed',jsonb_build_object('email',v_email),jsonb_build_object('source','claim_initial_admin'));

  return jsonb_build_object('ok',true,'profile_id',v_uid,'role','admin');
end;
$$;

revoke all on function public.claim_initial_admin() from public;
grant execute on function public.claim_initial_admin() to authenticated;

create or replace function public.is_admin_user(profile_uuid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1
    from public.user_roles ur
    join public.roles r on r.id=ur.role_id
    where ur.profile_id=profile_uuid
      and r.code='admin'
      and (ur.valid_until is null or ur.valid_until > now())
  );
$$;

revoke all on function public.is_admin_user(uuid) from public;
grant execute on function public.is_admin_user(uuid) to authenticated;
