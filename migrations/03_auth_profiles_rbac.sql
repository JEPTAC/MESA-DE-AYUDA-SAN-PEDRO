-- Mesa de Ayuda TIC · 03_auth_profiles_rbac.sql

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  department_id uuid references public.departments(id) on delete set null,
  position_id uuid references public.positions(id) on delete set null,
  employee_code text unique,
  full_name text not null default '',
  display_name text,
  institutional_email text,
  phone text,
  avatar_url text,
  timezone text not null default 'America/Bogota',
  locale text not null default 'es-CO',
  is_active boolean not null default true,
  is_available boolean not null default true,
  last_seen_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.team_members
  drop constraint if exists team_members_profile_id_fkey,
  add constraint team_members_profile_id_fkey foreign key(profile_id) references public.profiles(id) on delete cascade;

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  module text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.role_permissions (
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(role_id, permission_id)
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  scope_type text not null default 'global' check (scope_type in ('global','department','team')),
  scope_id uuid,
  granted_by uuid references public.profiles(id) on delete set null,
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  unique nulls not distinct(profile_id, role_id, scope_type, scope_id)
);

create index if not exists profiles_department_idx on public.profiles(department_id);
create index if not exists user_roles_profile_idx on public.user_roles(profile_id);
create index if not exists permissions_module_idx on public.permissions(module);

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger roles_set_updated_at before update on public.roles for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles(id, full_name, display_name, institutional_email, metadata)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', new.email, ''),
    new.email,
    coalesce(new.raw_user_meta_data, '{}'::jsonb)
  )
  on conflict (id) do update set
    institutional_email = excluded.institutional_email,
    updated_at = now();

  insert into public.user_roles(profile_id, role_id, scope_type, scope_id)
  select new.id, r.id, 'global', null
  from public.roles r
  where r.code='requester'
  on conflict (profile_id, role_id, scope_type, scope_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
