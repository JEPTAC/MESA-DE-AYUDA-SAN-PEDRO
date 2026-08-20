-- Mesa de Ayuda TIC · 10_workflows.sql

create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workflow_versions (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  version integer not null,
  status text not null default 'draft' check (status in ('draft','published','retired')),
  definition jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  published_by uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  unique(workflow_id, version)
);

create table if not exists public.workflow_steps (
  id uuid primary key default gen_random_uuid(),
  workflow_version_id uuid not null references public.workflow_versions(id) on delete cascade,
  step_key text not null,
  name text not null,
  step_type text not null check (step_type in ('start','task','approval','decision','notification','wait','sla_check','automation','end')),
  sort_order integer not null default 0,
  config jsonb not null default '{}'::jsonb,
  ui_position jsonb not null default '{}'::jsonb,
  unique(workflow_version_id, step_key)
);

create table if not exists public.workflow_transitions (
  id uuid primary key default gen_random_uuid(),
  workflow_version_id uuid not null references public.workflow_versions(id) on delete cascade,
  from_step_id uuid not null references public.workflow_steps(id) on delete cascade,
  to_step_id uuid not null references public.workflow_steps(id) on delete cascade,
  name text,
  condition_expression jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  unique(workflow_version_id, from_step_id, to_step_id, name)
);

create table if not exists public.workflow_conditions (
  id uuid primary key default gen_random_uuid(),
  workflow_version_id uuid not null references public.workflow_versions(id) on delete cascade,
  name text not null,
  expression jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.services add column if not exists workflow_id uuid references public.workflows(id) on delete set null;

create table if not exists public.ticket_workflow_instances (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null unique references public.tickets(id) on delete cascade,
  workflow_version_id uuid not null references public.workflow_versions(id) on delete restrict,
  current_step_id uuid references public.workflow_steps(id) on delete set null,
  status text not null default 'running' check (status in ('running','waiting','completed','cancelled','failed')),
  context jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.ticket_step_instances (
  id uuid primary key default gen_random_uuid(),
  workflow_instance_id uuid not null references public.ticket_workflow_instances(id) on delete cascade,
  step_id uuid not null references public.workflow_steps(id) on delete restrict,
  status text not null default 'pending' check (status in ('pending','active','waiting','completed','skipped','failed','cancelled')),
  assigned_to uuid references public.profiles(id) on delete set null,
  assigned_team_id uuid references public.teams(id) on delete set null,
  input_data jsonb not null default '{}'::jsonb,
  output_data jsonb not null default '{}'::jsonb,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists workflow_versions_workflow_idx on public.workflow_versions(workflow_id, version desc);
create index if not exists workflow_steps_version_idx on public.workflow_steps(workflow_version_id, sort_order);
create index if not exists workflow_instances_status_idx on public.ticket_workflow_instances(status, updated_at);

create trigger workflows_set_updated_at before update on public.workflows for each row execute function public.set_updated_at();
create trigger ticket_workflow_instances_set_updated_at before update on public.ticket_workflow_instances for each row execute function public.set_updated_at();
