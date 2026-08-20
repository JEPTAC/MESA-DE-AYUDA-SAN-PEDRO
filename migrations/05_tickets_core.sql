-- Mesa de Ayuda TIC · 05_tickets_core.sql

create table if not exists public.ticket_counters (
  year integer primary key,
  last_value integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number text not null unique,
  requester_id uuid not null references public.profiles(id) on delete restrict,
  requester_department_id uuid references public.departments(id) on delete set null,
  service_id uuid not null references public.services(id) on delete restrict,
  current_team_id uuid references public.teams(id) on delete set null,
  current_assignee_id uuid references public.profiles(id) on delete set null,
  subject text not null,
  description text,
  status text not null default 'new' check (status in ('new','triage','assigned','in_progress','waiting_requester','scheduled','pending_approval','resolved','closed','cancelled','reopened')),
  priority text not null default 'medium' check (priority in ('low','medium','high','critical')),
  impact text not null default 'medium' check (impact in ('low','medium','high','critical')),
  urgency text not null default 'medium' check (urgency in ('low','medium','high','critical')),
  source text not null default 'portal' check (source in ('portal','email','phone','chat','api','internal')),
  approval_status text not null default 'not_required' check (approval_status in ('not_required','pending','approved','rejected','cancelled')),
  scheduled_start_at timestamptz,
  scheduled_end_at timestamptz,
  due_at timestamptz,
  first_response_at timestamptz,
  resolved_at timestamptz,
  closed_at timestamptz,
  cancelled_at timestamptz,
  reopened_at timestamptz,
  last_activity_at timestamptz not null default now(),
  resolution_code text,
  resolution_summary text,
  requester_confirmed_resolution boolean,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (scheduled_end_at is null or scheduled_start_at is null or scheduled_end_at > scheduled_start_at)
);

create table if not exists public.ticket_field_values (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  field_id uuid references public.service_fields(id) on delete set null,
  field_key text not null,
  field_label text,
  value jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(ticket_id, field_key)
);

create table if not exists public.ticket_status_history (
  id bigint generated always as identity primary key,
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  from_status text,
  to_status text not null,
  changed_by uuid references public.profiles(id) on delete set null,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists public.ticket_watchers (
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  added_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key(ticket_id, profile_id)
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  color text,
  created_at timestamptz not null default now()
);

create table if not exists public.ticket_tags (
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  added_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key(ticket_id, tag_id)
);

create table if not exists public.ticket_relations (
  id uuid primary key default gen_random_uuid(),
  source_ticket_id uuid not null references public.tickets(id) on delete cascade,
  target_ticket_id uuid not null references public.tickets(id) on delete cascade,
  relation_type text not null check (relation_type in ('duplicates','blocks','blocked_by','related','parent','child','caused_by')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique(source_ticket_id, target_ticket_id, relation_type),
  check (source_ticket_id <> target_ticket_id)
);

create index if not exists tickets_requester_idx on public.tickets(requester_id, created_at desc);
create index if not exists tickets_team_status_idx on public.tickets(current_team_id, status, priority, created_at desc);
create index if not exists tickets_assignee_status_idx on public.tickets(current_assignee_id, status, created_at desc);
create index if not exists tickets_service_idx on public.tickets(service_id, created_at desc);
create index if not exists tickets_due_idx on public.tickets(due_at) where status not in ('resolved','closed','cancelled');
create index if not exists tickets_search_idx on public.tickets using gin ((coalesce(ticket_number,'') || ' ' || coalesce(subject,'') || ' ' || coalesce(description,'')) gin_trgm_ops);
create index if not exists ticket_status_history_ticket_idx on public.ticket_status_history(ticket_id, created_at desc);

create trigger tickets_set_updated_at before update on public.tickets for each row execute function public.set_updated_at();
create trigger ticket_field_values_set_updated_at before update on public.ticket_field_values for each row execute function public.set_updated_at();
