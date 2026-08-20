-- Mesa de Ayuda TIC · 09_sla.sql

create table if not exists public.sla_policies (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  work_schedule_id uuid references public.work_schedules(id) on delete set null,
  pause_on_waiting_requester boolean not null default true,
  pause_on_pending_approval boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sla_targets (
  id uuid primary key default gen_random_uuid(),
  policy_id uuid not null references public.sla_policies(id) on delete cascade,
  metric text not null check (metric in ('first_response','assignment','resolution','approval','scheduled_start')),
  priority text not null default 'any' check (priority in ('any','low','medium','high','critical')),
  target_minutes integer not null check (target_minutes > 0),
  warning_percent numeric(5,2) not null default 70 check (warning_percent > 0 and warning_percent < 100),
  critical_percent numeric(5,2) not null default 90 check (critical_percent > warning_percent and critical_percent <= 100),
  is_active boolean not null default true,
  unique(policy_id, metric, priority)
);

alter table public.services add column if not exists default_sla_policy_id uuid references public.sla_policies(id) on delete set null;

create table if not exists public.ticket_sla_instances (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  target_id uuid not null references public.sla_targets(id) on delete restrict,
  started_at timestamptz not null default now(),
  due_at timestamptz,
  paused_at timestamptz,
  paused_seconds bigint not null default 0,
  completed_at timestamptz,
  breached_at timestamptz,
  state text not null default 'running' check (state in ('running','paused','completed','breached','cancelled')),
  metadata jsonb not null default '{}'::jsonb,
  unique(ticket_id, target_id)
);

create table if not exists public.sla_events (
  id bigint generated always as identity primary key,
  ticket_sla_instance_id uuid not null references public.ticket_sla_instances(id) on delete cascade,
  event_type text not null check (event_type in ('started','warning','critical','paused','resumed','completed','breached','cancelled','recalculated')),
  event_at timestamptz not null default now(),
  actor_id uuid references public.profiles(id) on delete set null,
  details jsonb not null default '{}'::jsonb
);

create index if not exists ticket_sla_ticket_idx on public.ticket_sla_instances(ticket_id);
create index if not exists ticket_sla_due_idx on public.ticket_sla_instances(due_at) where state in ('running','paused');
create index if not exists sla_events_instance_idx on public.sla_events(ticket_sla_instance_id, event_at desc);

create trigger sla_policies_set_updated_at before update on public.sla_policies for each row execute function public.set_updated_at();
