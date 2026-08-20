-- Mesa de Ayuda TIC · 02_organization.sql

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.departments(id) on delete set null,
  code text unique,
  name text not null,
  description text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.positions (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  code text unique,
  name text not null unique,
  description text,
  team_type text not null default 'service' check (team_type in ('service','approval','support','administrative')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  profile_id uuid not null,
  member_role text not null default 'member' check (member_role in ('member','lead','manager','backup')),
  capacity_minutes_per_day integer not null default 480 check (capacity_minutes_per_day > 0),
  is_active boolean not null default true,
  valid_from date,
  valid_to date,
  created_at timestamptz not null default now(),
  unique(team_id, profile_id)
);

create index if not exists departments_parent_idx on public.departments(parent_id);
create index if not exists teams_active_idx on public.teams(is_active);
create index if not exists team_members_team_idx on public.team_members(team_id, is_active);
create index if not exists team_members_profile_idx on public.team_members(profile_id, is_active);

create trigger departments_set_updated_at before update on public.departments for each row execute function public.set_updated_at();
create trigger positions_set_updated_at before update on public.positions for each row execute function public.set_updated_at();
create trigger teams_set_updated_at before update on public.teams for each row execute function public.set_updated_at();
