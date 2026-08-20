-- Mesa de Ayuda TIC · 06_messages_attachments_audit.sql

create table if not exists public.ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  message_type text not null default 'comment' check (message_type in ('comment','system','status','assignment','approval','sla','resolution')),
  visibility text not null default 'public' check (visibility in ('public','internal')),
  body text not null,
  body_format text not null default 'plain' check (body_format in ('plain','markdown','html')),
  is_edited boolean not null default false,
  edited_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ticket_attachments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  message_id uuid references public.ticket_messages(id) on delete cascade,
  uploaded_by uuid references public.profiles(id) on delete set null,
  bucket_name text not null default 'ticket-attachments',
  object_path text not null,
  original_name text not null,
  mime_type text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  visibility text not null default 'public' check (visibility in ('public','internal')),
  sha256 text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(bucket_name, object_path)
);

create table if not exists public.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  entity_type text not null,
  entity_id text not null,
  action text not null,
  old_data jsonb,
  new_data jsonb,
  context jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ticket_messages_ticket_idx on public.ticket_messages(ticket_id, created_at);
create index if not exists ticket_messages_visibility_idx on public.ticket_messages(ticket_id, visibility, created_at);
create index if not exists ticket_attachments_ticket_idx on public.ticket_attachments(ticket_id, created_at);
create index if not exists audit_events_entity_idx on public.audit_events(entity_type, entity_id, created_at desc);
create index if not exists audit_events_actor_idx on public.audit_events(actor_id, created_at desc);

create trigger ticket_messages_set_updated_at before update on public.ticket_messages for each row execute function public.set_updated_at();
