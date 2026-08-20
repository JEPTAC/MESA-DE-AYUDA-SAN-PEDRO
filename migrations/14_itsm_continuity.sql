-- Mesa de Ayuda TIC · 14_itsm_continuity.sql

create table if not exists public.service_statuses (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  status text not null check (status in ('operational','degraded','partial_outage','major_outage','maintenance')),
  title text,
  message text,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  check (ended_at is null or ended_at >= started_at)
);

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  incident_number text not null unique,
  title text not null,
  description text,
  severity text not null default 'major' check (severity in ('minor','major','critical')),
  status text not null default 'open' check (status in ('open','investigating','identified','monitoring','resolved','closed')),
  service_id uuid references public.services(id) on delete set null,
  owner_team_id uuid references public.teams(id) on delete set null,
  commander_id uuid references public.profiles(id) on delete set null,
  started_at timestamptz not null default now(),
  resolved_at timestamptz,
  summary text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.incident_tickets (
  incident_id uuid not null references public.incidents(id) on delete cascade,
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  linked_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key(incident_id, ticket_id)
);

create table if not exists public.problems (
  id uuid primary key default gen_random_uuid(),
  problem_number text not null unique,
  title text not null,
  description text,
  status text not null default 'open' check (status in ('open','investigating','known_error','resolved','closed')),
  owner_team_id uuid references public.teams(id) on delete set null,
  owner_id uuid references public.profiles(id) on delete set null,
  root_cause text,
  workaround text,
  permanent_fix text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.problem_incidents (
  problem_id uuid not null references public.problems(id) on delete cascade,
  incident_id uuid not null references public.incidents(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(problem_id, incident_id)
);

create table if not exists public.changes (
  id uuid primary key default gen_random_uuid(),
  change_number text not null unique,
  title text not null,
  description text,
  change_type text not null default 'normal' check (change_type in ('standard','normal','emergency')),
  status text not null default 'draft' check (status in ('draft','assessment','pending_approval','scheduled','implementing','review','completed','failed','cancelled')),
  risk text not null default 'medium' check (risk in ('low','medium','high','critical')),
  owner_team_id uuid references public.teams(id) on delete set null,
  owner_id uuid references public.profiles(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  planned_start_at timestamptz,
  planned_end_at timestamptz,
  implementation_plan text,
  rollback_plan text,
  validation_plan text,
  outcome text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (planned_end_at is null or planned_start_at is null or planned_end_at > planned_start_at)
);

create table if not exists public.change_configuration_items (
  change_id uuid not null references public.changes(id) on delete cascade,
  ci_id uuid not null references public.configuration_items(id) on delete cascade,
  primary key(change_id, ci_id)
);

create table if not exists public.change_approvals (
  id uuid primary key default gen_random_uuid(),
  change_id uuid not null references public.changes(id) on delete cascade,
  approver_id uuid references public.profiles(id) on delete set null,
  status text not null default 'pending' check (status in ('pending','approved','rejected','cancelled')),
  comment text,
  decided_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists incidents_status_idx on public.incidents(status, severity, created_at desc);
create index if not exists problems_status_idx on public.problems(status, created_at desc);
create index if not exists changes_status_idx on public.changes(status, planned_start_at);

create trigger incidents_set_updated_at before update on public.incidents for each row execute function public.set_updated_at();
create trigger problems_set_updated_at before update on public.problems for each row execute function public.set_updated_at();
create trigger changes_set_updated_at before update on public.changes for each row execute function public.set_updated_at();
