-- Mesa de Ayuda TIC · 07_skills_routing.sql

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null unique,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.profile_skills (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  skill_id uuid not null references public.skills(id) on delete cascade,
  proficiency smallint not null default 3 check (proficiency between 1 and 5),
  is_primary boolean not null default false,
  verified_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key(profile_id, skill_id)
);

create table if not exists public.service_required_skills (
  service_id uuid not null references public.services(id) on delete cascade,
  skill_id uuid not null references public.skills(id) on delete cascade,
  weight numeric(6,3) not null default 1.0 check (weight > 0),
  minimum_proficiency smallint not null default 1 check (minimum_proficiency between 1 and 5),
  is_required boolean not null default true,
  primary key(service_id, skill_id)
);

create table if not exists public.ticket_assignments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  team_id uuid references public.teams(id) on delete set null,
  assignee_id uuid references public.profiles(id) on delete set null,
  assigned_by uuid references public.profiles(id) on delete set null,
  assignment_method text not null default 'manual' check (assignment_method in ('manual','skill_capacity','round_robin','workflow','fixed')),
  score numeric(8,3),
  reason jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  check (ended_at is null or ended_at >= started_at)
);

create index if not exists profile_skills_skill_idx on public.profile_skills(skill_id, proficiency desc);
create index if not exists service_required_skills_service_idx on public.service_required_skills(service_id);
create index if not exists ticket_assignments_ticket_idx on public.ticket_assignments(ticket_id, started_at desc);
create index if not exists ticket_assignments_assignee_active_idx on public.ticket_assignments(assignee_id) where ended_at is null;
