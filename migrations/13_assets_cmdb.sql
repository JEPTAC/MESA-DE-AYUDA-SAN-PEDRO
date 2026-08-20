-- Mesa de Ayuda TIC · 13_assets_cmdb.sql

create table if not exists public.asset_types (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  icon text,
  schema jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  asset_type_id uuid not null references public.asset_types(id) on delete restrict,
  asset_tag text unique,
  serial_number text,
  name text not null,
  status text not null default 'active' check (status in ('active','stock','maintenance','retired','lost','disposed')),
  criticality text not null default 'medium' check (criticality in ('low','medium','high','critical')),
  department_id uuid references public.departments(id) on delete set null,
  assigned_to uuid references public.profiles(id) on delete set null,
  location text,
  manufacturer text,
  model text,
  purchase_date date,
  warranty_end_date date,
  ip_address inet,
  mac_address macaddr,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.asset_assignments (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.assets(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  department_id uuid references public.departments(id) on delete set null,
  assigned_by uuid references public.profiles(id) on delete set null,
  assigned_at timestamptz not null default now(),
  returned_at timestamptz,
  notes text,
  check (returned_at is null or returned_at >= assigned_at)
);

create table if not exists public.configuration_items (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid references public.assets(id) on delete set null,
  ci_type text not null,
  name text not null,
  status text not null default 'operational' check (status in ('operational','degraded','outage','maintenance','retired')),
  service_owner_team_id uuid references public.teams(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ci_relationships (
  id uuid primary key default gen_random_uuid(),
  parent_ci_id uuid not null references public.configuration_items(id) on delete cascade,
  child_ci_id uuid not null references public.configuration_items(id) on delete cascade,
  relation_type text not null check (relation_type in ('depends_on','runs_on','connects_to','contains','supports','used_by')),
  created_at timestamptz not null default now(),
  unique(parent_ci_id, child_ci_id, relation_type),
  check (parent_ci_id <> child_ci_id)
);

create table if not exists public.ticket_assets (
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  asset_id uuid not null references public.assets(id) on delete cascade,
  relation_type text not null default 'affected' check (relation_type in ('affected','requested','replacement','related')),
  created_at timestamptz not null default now(),
  primary key(ticket_id, asset_id, relation_type)
);

create table if not exists public.asset_history (
  id bigint generated always as identity primary key,
  asset_id uuid not null references public.assets(id) on delete cascade,
  event_type text not null,
  actor_id uuid references public.profiles(id) on delete set null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists assets_type_status_idx on public.assets(asset_type_id, status);
create index if not exists assets_assigned_to_idx on public.assets(assigned_to);
create index if not exists assets_department_idx on public.assets(department_id);
create index if not exists ticket_assets_ticket_idx on public.ticket_assets(ticket_id);

create trigger assets_set_updated_at before update on public.assets for each row execute function public.set_updated_at();
create trigger configuration_items_set_updated_at before update on public.configuration_items for each row execute function public.set_updated_at();
