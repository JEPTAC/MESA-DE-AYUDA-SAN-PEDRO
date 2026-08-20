-- Mesa de Ayuda TIC · 11_approvals.sql

create table if not exists public.approval_rules (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id) on delete cascade,
  workflow_step_id uuid references public.workflow_steps(id) on delete cascade,
  name text not null,
  approver_type text not null check (approver_type in ('user','role','team_lead','department_head','team')),
  approver_profile_id uuid references public.profiles(id) on delete set null,
  approver_role_code text,
  approver_team_id uuid references public.teams(id) on delete set null,
  sequence_no integer not null default 1,
  is_required boolean not null default true,
  condition_expression jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.approval_requests (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  rule_id uuid references public.approval_rules(id) on delete set null,
  requested_from uuid references public.profiles(id) on delete set null,
  requested_team_id uuid references public.teams(id) on delete set null,
  sequence_no integer not null default 1,
  status text not null default 'pending' check (status in ('pending','approved','rejected','cancelled','expired','delegated')),
  due_at timestamptz,
  decided_at timestamptz,
  decision_comment text,
  delegated_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.approval_actions (
  id bigint generated always as identity primary key,
  approval_request_id uuid not null references public.approval_requests(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null check (action in ('requested','approved','rejected','commented','delegated','cancelled','expired')),
  comment text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists approval_requests_ticket_idx on public.approval_requests(ticket_id, sequence_no);
create index if not exists approval_requests_assignee_idx on public.approval_requests(requested_from, status, created_at desc);

create trigger approval_requests_set_updated_at before update on public.approval_requests for each row execute function public.set_updated_at();
