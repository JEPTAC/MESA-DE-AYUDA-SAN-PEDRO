-- Mesa de Ayuda TIC · 15_notifications_surveys.sql

create table if not exists public.notification_rules (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  event_type text not null,
  channels text[] not null default array['in_app']::text[],
  recipients jsonb not null default '{}'::jsonb,
  condition_expression jsonb not null default '{}'::jsonb,
  template_subject text,
  template_body text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notification_preferences (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  in_app_enabled boolean not null default true,
  email_enabled boolean not null default true,
  push_enabled boolean not null default false,
  quiet_hours jsonb not null default '{}'::jsonb,
  event_preferences jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  ticket_id uuid references public.tickets(id) on delete cascade,
  entity_type text,
  entity_id text,
  event_type text not null,
  title text not null,
  body text,
  action_url text,
  severity text not null default 'info' check (severity in ('info','success','warning','critical')),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.notification_deliveries (
  id uuid primary key default gen_random_uuid(),
  notification_id uuid not null references public.notifications(id) on delete cascade,
  channel text not null check (channel in ('in_app','email','push','sms','webhook')),
  status text not null default 'queued' check (status in ('queued','sent','delivered','failed','skipped')),
  provider_message_id text,
  attempt_count integer not null default 0,
  last_error text,
  sent_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.ticket_surveys (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null unique references public.tickets(id) on delete cascade,
  requester_id uuid not null references public.profiles(id) on delete cascade,
  sent_at timestamptz,
  responded_at timestamptz,
  score smallint check (score between 1 and 5),
  resolved boolean,
  comment text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists notifications_profile_unread_idx on public.notifications(profile_id, created_at desc) where read_at is null;
create index if not exists notification_deliveries_status_idx on public.notification_deliveries(status, created_at);

create trigger notification_rules_set_updated_at before update on public.notification_rules for each row execute function public.set_updated_at();
create trigger notification_preferences_set_updated_at before update on public.notification_preferences for each row execute function public.set_updated_at();
