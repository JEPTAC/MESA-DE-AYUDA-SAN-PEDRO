
-- ============================================================
-- 01_extensions_and_types.sql
-- ============================================================

-- Mesa de Ayuda TIC · 01_extensions_and_types.sql
-- Base extensions and reusable domain enums.

create extension if not exists pgcrypto;
create extension if not exists pg_trgm;
create extension if not exists unaccent;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.safe_uuid(value text)
returns uuid
language plpgsql
immutable
as $$
begin
  return value::uuid;
exception when others then
  return null;
end;
$$;


-- ============================================================
-- 02_organization.sql
-- ============================================================

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


-- ============================================================
-- 03_auth_profiles_rbac.sql
-- ============================================================

-- Mesa de Ayuda TIC · 03_auth_profiles_rbac.sql

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  department_id uuid references public.departments(id) on delete set null,
  position_id uuid references public.positions(id) on delete set null,
  employee_code text unique,
  full_name text not null default '',
  display_name text,
  institutional_email text,
  phone text,
  avatar_url text,
  timezone text not null default 'America/Bogota',
  locale text not null default 'es-CO',
  is_active boolean not null default true,
  is_available boolean not null default true,
  last_seen_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.team_members
  drop constraint if exists team_members_profile_id_fkey,
  add constraint team_members_profile_id_fkey foreign key(profile_id) references public.profiles(id) on delete cascade;

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  module text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.role_permissions (
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(role_id, permission_id)
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  scope_type text not null default 'global' check (scope_type in ('global','department','team')),
  scope_id uuid,
  granted_by uuid references public.profiles(id) on delete set null,
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  unique nulls not distinct(profile_id, role_id, scope_type, scope_id)
);

create index if not exists profiles_department_idx on public.profiles(department_id);
create index if not exists user_roles_profile_idx on public.user_roles(profile_id);
create index if not exists permissions_module_idx on public.permissions(module);

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger roles_set_updated_at before update on public.roles for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles(id, full_name, display_name, institutional_email, metadata)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', new.email, ''),
    new.email,
    coalesce(new.raw_user_meta_data, '{}'::jsonb)
  )
  on conflict (id) do update set
    institutional_email = excluded.institutional_email,
    updated_at = now();

  insert into public.user_roles(profile_id, role_id, scope_type, scope_id)
  select new.id, r.id, 'global', null
  from public.roles r
  where r.code='requester'
  on conflict (profile_id, role_id, scope_type, scope_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();


-- ============================================================
-- 04_catalog_forms.sql
-- ============================================================

-- Mesa de Ayuda TIC · 04_catalog_forms.sql

create table if not exists public.service_categories (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  icon text,
  color text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  category_id uuid not null references public.service_categories(id) on delete restrict,
  owner_team_id uuid references public.teams(id) on delete set null,
  name text not null,
  short_name text,
  description text,
  icon text,
  color text,
  service_type text not null default 'request' check (service_type in ('request','incident','access','change','consultation','scheduled')),
  routing_mode text not null default 'skill_capacity' check (routing_mode in ('manual','round_robin','skill_capacity','fixed_team','fixed_user')),
  requires_approval boolean not null default false,
  requires_schedule boolean not null default false,
  allows_requester_assignee_choice boolean not null default false,
  is_critical boolean not null default false,
  is_active boolean not null default true,
  is_published boolean not null default true,
  current_version integer not null default 1,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_forms (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  version integer not null default 1,
  name text not null,
  intro_title text,
  intro_text text,
  is_draft boolean not null default true,
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(service_id, version)
);

create table if not exists public.service_fields (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.service_forms(id) on delete cascade,
  field_key text not null,
  label text not null,
  field_type text not null check (field_type in ('text','textarea','email','number','date','time','datetime','select','multiselect','checkbox','radio','info','file','url','asset','user','department')),
  placeholder text,
  help_text text,
  is_required boolean not null default false,
  default_value jsonb,
  validation jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(form_id, field_key)
);

create table if not exists public.service_field_options (
  id uuid primary key default gen_random_uuid(),
  field_id uuid not null references public.service_fields(id) on delete cascade,
  value text not null,
  label text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  unique(field_id, value)
);

create table if not exists public.service_field_conditions (
  id uuid primary key default gen_random_uuid(),
  target_field_id uuid not null references public.service_fields(id) on delete cascade,
  source_field_id uuid not null references public.service_fields(id) on delete cascade,
  operator text not null check (operator in ('eq','neq','contains','not_contains','gt','gte','lt','lte','in','not_in','is_empty','is_not_empty')),
  expected_value jsonb,
  action text not null default 'show' check (action in ('show','hide','require','optional','set_value')),
  action_value jsonb,
  condition_group integer not null default 1,
  created_at timestamptz not null default now()
);

create index if not exists services_category_idx on public.services(category_id, is_active, is_published);
create index if not exists services_owner_team_idx on public.services(owner_team_id);
create index if not exists service_forms_service_idx on public.service_forms(service_id, is_published);
create index if not exists service_fields_form_order_idx on public.service_fields(form_id, sort_order);

create trigger service_categories_set_updated_at before update on public.service_categories for each row execute function public.set_updated_at();
create trigger services_set_updated_at before update on public.services for each row execute function public.set_updated_at();
create trigger service_forms_set_updated_at before update on public.service_forms for each row execute function public.set_updated_at();
create trigger service_fields_set_updated_at before update on public.service_fields for each row execute function public.set_updated_at();


-- ============================================================
-- 05_tickets_core.sql
-- ============================================================

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


-- ============================================================
-- 06_messages_attachments_audit.sql
-- ============================================================

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


-- ============================================================
-- 07_skills_routing.sql
-- ============================================================

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


-- ============================================================
-- 08_calendar_capacity.sql
-- ============================================================

-- Mesa de Ayuda TIC · 08_calendar_capacity.sql

create table if not exists public.work_schedules (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  timezone text not null default 'America/Bogota',
  is_default boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.work_schedule_days (
  id uuid primary key default gen_random_uuid(),
  schedule_id uuid not null references public.work_schedules(id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time,
  end_time time,
  second_start_time time,
  second_end_time time,
  is_working_day boolean not null default true,
  unique(schedule_id, weekday),
  check (not is_working_day or (start_time is not null and end_time is not null and end_time > start_time)),
  check (second_end_time is null or second_start_time is null or second_end_time > second_start_time)
);

alter table public.profiles add column if not exists work_schedule_id uuid references public.work_schedules(id) on delete set null;

create table if not exists public.holidays (
  id uuid primary key default gen_random_uuid(),
  holiday_date date not null,
  name text not null,
  scope text not null default 'national' check (scope in ('national','regional','municipal','institutional')),
  is_working_day_override boolean not null default false,
  created_at timestamptz not null default now(),
  unique(holiday_date, name)
);

create table if not exists public.absences (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  absence_type text not null check (absence_type in ('vacation','leave','medical','training','commission','personal','other')),
  start_at timestamptz not null,
  end_at timestamptz not null,
  status text not null default 'approved' check (status in ('pending','approved','rejected','cancelled')),
  reason text,
  approved_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_at > start_at)
);

create table if not exists public.availability_blocks (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  block_type text not null check (block_type in ('available','busy','meeting','internal','travel','focus','blocked')),
  title text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  source text not null default 'manual' check (source in ('manual','calendar','workflow','ticket','system')),
  source_ref text,
  is_private boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_at > start_at)
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references public.tickets(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  team_id uuid references public.teams(id) on delete set null,
  title text not null,
  reservation_type text not null default 'ticket' check (reservation_type in ('ticket','coverage','support','meeting','training','internal','other')),
  start_at timestamptz not null,
  end_at timestamptz not null,
  status text not null default 'confirmed' check (status in ('tentative','confirmed','completed','cancelled')),
  location text,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_at > start_at)
);

create index if not exists absences_profile_range_idx on public.absences(profile_id, start_at, end_at);
create index if not exists availability_profile_range_idx on public.availability_blocks(profile_id, start_at, end_at);
create index if not exists reservations_profile_range_idx on public.reservations(profile_id, start_at, end_at);
create index if not exists reservations_ticket_idx on public.reservations(ticket_id);

create trigger work_schedules_set_updated_at before update on public.work_schedules for each row execute function public.set_updated_at();
create trigger absences_set_updated_at before update on public.absences for each row execute function public.set_updated_at();
create trigger availability_blocks_set_updated_at before update on public.availability_blocks for each row execute function public.set_updated_at();
create trigger reservations_set_updated_at before update on public.reservations for each row execute function public.set_updated_at();


-- ============================================================
-- 09_sla.sql
-- ============================================================

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


-- ============================================================
-- 10_workflows.sql
-- ============================================================

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


-- ============================================================
-- 11_approvals.sql
-- ============================================================

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


-- ============================================================
-- 12_knowledge.sql
-- ============================================================

-- Mesa de Ayuda TIC · 12_knowledge.sql

create table if not exists public.knowledge_categories (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  icon text,
  color text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.knowledge_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category_id uuid references public.knowledge_categories(id) on delete set null,
  owner_team_id uuid references public.teams(id) on delete set null,
  title text not null,
  summary text,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  audience text not null default 'all' check (audience in ('all','requesters','agents','admins')),
  current_version integer not null default 1,
  view_count bigint not null default 0,
  helpful_count bigint not null default 0,
  not_helpful_count bigint not null default 0,
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.knowledge_article_versions (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.knowledge_articles(id) on delete cascade,
  version integer not null,
  content text not null,
  content_format text not null default 'markdown' check (content_format in ('markdown','html','plain')),
  change_note text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique(article_id, version)
);

create table if not exists public.knowledge_article_services (
  article_id uuid not null references public.knowledge_articles(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  relevance numeric(5,2) not null default 1.0,
  primary key(article_id, service_id)
);

create table if not exists public.knowledge_feedback (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.knowledge_articles(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  ticket_id uuid references public.tickets(id) on delete set null,
  helpful boolean not null,
  comment text,
  created_at timestamptz not null default now()
);

create index if not exists knowledge_articles_status_idx on public.knowledge_articles(status, category_id, published_at desc);
create index if not exists knowledge_articles_search_idx on public.knowledge_articles using gin ((coalesce(title,'') || ' ' || coalesce(summary,'')) gin_trgm_ops);

create trigger knowledge_categories_set_updated_at before update on public.knowledge_categories for each row execute function public.set_updated_at();
create trigger knowledge_articles_set_updated_at before update on public.knowledge_articles for each row execute function public.set_updated_at();


-- ============================================================
-- 13_assets_cmdb.sql
-- ============================================================

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


-- ============================================================
-- 14_itsm_continuity.sql
-- ============================================================

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


-- ============================================================
-- 15_notifications_surveys.sql
-- ============================================================

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


-- ============================================================
-- 16_functions_triggers.sql
-- ============================================================

-- Mesa de Ayuda TIC · 16_functions_triggers.sql

create or replace function public.next_ticket_number(prefix text default 'MA')
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  current_year integer := extract(year from now())::integer;
  next_value integer;
begin
  insert into public.ticket_counters(year, last_value)
  values (current_year, 1)
  on conflict (year)
  do update set last_value = public.ticket_counters.last_value + 1, updated_at = now()
  returning last_value into next_value;

  return upper(prefix) || '-' || current_year::text || '-' || lpad(next_value::text, 5, '0');
end;
$$;

create or replace function public.before_insert_ticket()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.ticket_number is null or btrim(new.ticket_number) = '' then
    new.ticket_number := public.next_ticket_number('MA');
  end if;
  if new.requester_department_id is null then
    select department_id into new.requester_department_id from public.profiles where id = new.requester_id;
  end if;
  new.last_activity_at := now();
  return new;
end;
$$;

drop trigger if exists tickets_before_insert on public.tickets;
create trigger tickets_before_insert before insert on public.tickets for each row execute function public.before_insert_ticket();

create or replace function public.on_ticket_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status is distinct from new.status then
    insert into public.ticket_status_history(ticket_id, from_status, to_status, changed_by)
    values (new.id, old.status, new.status, auth.uid());

    new.last_activity_at := now();

    if new.status = 'resolved' and new.resolved_at is null then new.resolved_at := now(); end if;
    if new.status = 'closed' and new.closed_at is null then new.closed_at := now(); end if;
    if new.status = 'cancelled' and new.cancelled_at is null then new.cancelled_at := now(); end if;
    if new.status = 'reopened' then new.reopened_at := now(); end if;
  end if;
  return new;
end;
$$;

drop trigger if exists tickets_status_change on public.tickets;
create trigger tickets_status_change before update on public.tickets for each row execute function public.on_ticket_status_change();

create or replace function public.touch_ticket_activity_from_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.tickets
  set last_activity_at = new.created_at,
      first_response_at = case
        when first_response_at is null and new.author_id is distinct from requester_id and new.visibility = 'public' and new.message_type = 'comment'
          then new.created_at
        else first_response_at
      end
  where id = new.ticket_id;
  return new;
end;
$$;

drop trigger if exists ticket_message_touch_activity on public.ticket_messages;
create trigger ticket_message_touch_activity after insert on public.ticket_messages for each row execute function public.touch_ticket_activity_from_message();

create or replace function public.audit_generic_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  entity_id text;
begin
  entity_id := coalesce((case when tg_op = 'DELETE' then to_jsonb(old) else to_jsonb(new) end)->>'id', 'unknown');
  insert into public.audit_events(actor_id, entity_type, entity_id, action, old_data, new_data)
  values (
    auth.uid(),
    tg_table_name,
    entity_id,
    lower(tg_op),
    case when tg_op in ('UPDATE','DELETE') then to_jsonb(old) else null end,
    case when tg_op in ('INSERT','UPDATE') then to_jsonb(new) else null end
  );
  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

-- High-value configuration audit.
drop trigger if exists audit_services on public.services;
create trigger audit_services after insert or update or delete on public.services for each row execute function public.audit_generic_change();
drop trigger if exists audit_workflows on public.workflows;
create trigger audit_workflows after insert or update or delete on public.workflows for each row execute function public.audit_generic_change();
drop trigger if exists audit_roles on public.roles;
create trigger audit_roles after insert or update or delete on public.roles for each row execute function public.audit_generic_change();

-- Add working minutes respecting schedule windows, weekends and configured holidays.
create or replace function public.add_business_minutes(
  p_start timestamptz,
  p_minutes integer,
  p_schedule_id uuid
)
returns timestamptz
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  tz text;
  remaining integer := greatest(coalesce(p_minutes,0),0);
  cursor_local timestamp;
  day_row record;
  interval_start timestamp;
  interval_end timestamp;
  available integer;
  safety integer := 0;
  holiday_nonworking boolean;
begin
  if remaining = 0 or p_schedule_id is null then
    return p_start + make_interval(mins => remaining);
  end if;

  select timezone into tz from public.work_schedules where id=p_schedule_id and is_active;
  if tz is null then
    return p_start + make_interval(mins => remaining);
  end if;

  cursor_local := p_start at time zone tz;

  while remaining > 0 loop
    safety := safety + 1;
    if safety > 400 then
      raise exception 'Could not calculate business due date within 400 days';
    end if;

    select exists(
      select 1 from public.holidays h
      where h.holiday_date=cursor_local::date and h.is_working_day_override=false
    ) into holiday_nonworking;

    select * into day_row
    from public.work_schedule_days d
    where d.schedule_id=p_schedule_id
      and d.weekday=extract(dow from cursor_local)::smallint;

    if holiday_nonworking or day_row.id is null or not day_row.is_working_day then
      cursor_local := (cursor_local::date + 1)::timestamp;
      continue;
    end if;

    interval_start := cursor_local::date + day_row.start_time;
    interval_end := cursor_local::date + day_row.end_time;

    if cursor_local < interval_start then cursor_local := interval_start; end if;
    if cursor_local < interval_end then
      available := floor(extract(epoch from (interval_end-cursor_local))/60)::integer;
      if remaining <= available then
        return (cursor_local + make_interval(mins=>remaining)) at time zone tz;
      end if;
      remaining := remaining - greatest(available,0);
      cursor_local := interval_end;
    end if;

    if day_row.second_start_time is not null and day_row.second_end_time is not null then
      interval_start := cursor_local::date + day_row.second_start_time;
      interval_end := cursor_local::date + day_row.second_end_time;
      if cursor_local < interval_start then cursor_local := interval_start; end if;
      if cursor_local < interval_end then
        available := floor(extract(epoch from (interval_end-cursor_local))/60)::integer;
        if remaining <= available then
          return (cursor_local + make_interval(mins=>remaining)) at time zone tz;
        end if;
        remaining := remaining - greatest(available,0);
        cursor_local := interval_end;
      end if;
    end if;

    cursor_local := (cursor_local::date + 1)::timestamp;
  end loop;

  return cursor_local at time zone tz;
end;
$$;

create or replace function public.start_ticket_slas(p_ticket_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  t record;
  target record;
  v_due timestamptz;
begin
  select tk.*,s.default_sla_policy_id,sp.work_schedule_id
  into t
  from public.tickets tk
  join public.services s on s.id=tk.service_id
  left join public.sla_policies sp on sp.id=s.default_sla_policy_id
  where tk.id=p_ticket_id;

  if t.id is null or t.default_sla_policy_id is null then return; end if;

  for target in
    select st.*
    from public.sla_targets st
    where st.policy_id=t.default_sla_policy_id
      and st.is_active
      and st.priority in ('any',t.priority)
      and not exists (
        select 1 from public.sla_targets more_specific
        where more_specific.policy_id=st.policy_id
          and more_specific.metric=st.metric
          and more_specific.priority=t.priority
          and st.priority='any'
          and more_specific.is_active
      )
  loop
    v_due := public.add_business_minutes(t.created_at,target.target_minutes,t.work_schedule_id);
    insert into public.ticket_sla_instances(ticket_id,target_id,started_at,due_at,state)
    values(t.id,target.id,t.created_at,v_due,'running')
    on conflict(ticket_id,target_id) do nothing;
  end loop;

  update public.tickets tk
  set due_at=(
    select min(i.due_at)
    from public.ticket_sla_instances i
    join public.sla_targets st on st.id=i.target_id
    where i.ticket_id=tk.id and st.metric='resolution'
  )
  where tk.id=t.id and tk.due_at is null;
end;
$$;

create or replace function public.after_insert_ticket_start_sla()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.start_ticket_slas(new.id);
  return new;
end;
$$;

drop trigger if exists tickets_start_sla on public.tickets;
create trigger tickets_start_sla after insert on public.tickets for each row execute function public.after_insert_ticket_start_sla();

create or replace function public.sync_sla_on_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  inst record;
  pause_allowed boolean;
  now_ts timestamptz := now();
begin
  if old.status is not distinct from new.status then return new; end if;

  for inst in
    select i.id,i.state,i.paused_at,i.paused_seconds,st.metric,sp.pause_on_waiting_requester,sp.pause_on_pending_approval
    from public.ticket_sla_instances i
    join public.sla_targets st on st.id=i.target_id
    join public.sla_policies sp on sp.id=st.policy_id
    where i.ticket_id=new.id and i.state in ('running','paused')
  loop
    pause_allowed := (new.status='waiting_requester' and inst.pause_on_waiting_requester)
      or (new.status='pending_approval' and inst.pause_on_pending_approval);

    if pause_allowed and inst.state='running' then
      update public.ticket_sla_instances set state='paused',paused_at=now_ts where id=inst.id;
      insert into public.sla_events(ticket_sla_instance_id,event_type,event_at,actor_id) values(inst.id,'paused',now_ts,auth.uid());
    elsif not pause_allowed and inst.state='paused' then
      update public.ticket_sla_instances
      set state='running',
          paused_seconds=paused_seconds + greatest(0,extract(epoch from (now_ts-paused_at))::bigint),
          due_at=due_at + (now_ts-paused_at),
          paused_at=null
      where id=inst.id;
      insert into public.sla_events(ticket_sla_instance_id,event_type,event_at,actor_id) values(inst.id,'resumed',now_ts,auth.uid());
    end if;
  end loop;

  if new.status in ('resolved','closed') then
    update public.ticket_sla_instances i
    set state=case when now_ts > i.due_at then 'breached' else 'completed' end,
        completed_at=now_ts,
        breached_at=case when now_ts > i.due_at then coalesce(i.breached_at,now_ts) else i.breached_at end
    from public.sla_targets st
    where i.ticket_id=new.id and i.target_id=st.id and st.metric='resolution' and i.state in ('running','paused');
  end if;

  return new;
end;
$$;

drop trigger if exists tickets_sync_sla_status on public.tickets;
create trigger tickets_sync_sla_status after update of status on public.tickets for each row execute function public.sync_sla_on_status_change();

create or replace function public.complete_first_response_sla()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requester uuid;
begin
  if new.visibility<>'public' or new.message_type<>'comment' or new.author_id is null then return new; end if;
  select requester_id into requester from public.tickets where id=new.ticket_id;
  if requester is null or new.author_id=requester then return new; end if;

  update public.ticket_sla_instances i
  set state=case when new.created_at > i.due_at then 'breached' else 'completed' end,
      completed_at=new.created_at,
      breached_at=case when new.created_at > i.due_at then coalesce(i.breached_at,new.created_at) else i.breached_at end
  from public.sla_targets st
  where i.ticket_id=new.ticket_id and i.target_id=st.id and st.metric='first_response' and i.state in ('running','paused');
  return new;
end;
$$;

drop trigger if exists messages_complete_first_response_sla on public.ticket_messages;
create trigger messages_complete_first_response_sla after insert on public.ticket_messages for each row execute function public.complete_first_response_sla();

-- Atomic ticket creation RPC used by the guided popup wizard.
create or replace function public.create_ticket(
  p_service_code text,
  p_subject text,
  p_description text default null,
  p_priority text default 'medium',
  p_field_values jsonb default '{}'::jsonb,
  p_department_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  service_row record;
  ticket_id uuid;
  kv record;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if p_priority not in ('low','medium','high','critical') then raise exception 'Invalid priority'; end if;

  select * into service_row from public.services where code=p_service_code and is_active and is_published;
  if service_row.id is null then raise exception 'Service not available'; end if;

  insert into public.tickets(
    ticket_number,requester_id,requester_department_id,service_id,current_team_id,
    subject,description,priority,impact,urgency,status,approval_status
  ) values (
    public.next_ticket_number('MA'),uid,coalesce(p_department_id,(select department_id from public.profiles where id=uid)),service_row.id,service_row.owner_team_id,
    p_subject,p_description,p_priority,p_priority,p_priority,
    case when service_row.requires_approval then 'pending_approval' else 'new' end,
    case when service_row.requires_approval then 'pending' else 'not_required' end
  ) returning id into ticket_id;

  for kv in select key,value from jsonb_each(coalesce(p_field_values,'{}'::jsonb)) loop
    insert into public.ticket_field_values(ticket_id,field_id,field_key,field_label,value)
    select ticket_id,sf.id,kv.key,sf.label,kv.value
    from public.service_forms f
    join public.service_fields sf on sf.form_id=f.id and sf.field_key=kv.key
    where f.service_id=service_row.id and f.is_published
    order by f.version desc limit 1
    on conflict(ticket_id,field_key) do update set value=excluded.value,field_label=excluded.field_label,field_id=excluded.field_id;

    if not found then
      insert into public.ticket_field_values(ticket_id,field_key,value)
      values(ticket_id,kv.key,kv.value)
      on conflict(ticket_id,field_key) do update set value=excluded.value;
    end if;
  end loop;

  insert into public.ticket_messages(ticket_id,author_id,message_type,visibility,body)
  values(ticket_id,uid,'system','public','Solicitud radicada desde el portal guiado.');

  return ticket_id;
end;
$$;

create or replace function public.add_ticket_message(
  p_ticket_id uuid,
  p_body text,
  p_visibility text default 'public'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  message_id uuid;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if not public.can_access_ticket(p_ticket_id) then raise exception 'Ticket access denied'; end if;
  if p_visibility not in ('public','internal') then raise exception 'Invalid visibility'; end if;
  if p_visibility='internal' and not public.can_view_internal_ticket_content(p_ticket_id) then raise exception 'Internal note access denied'; end if;
  if nullif(btrim(p_body),'') is null then raise exception 'Message body required'; end if;

  insert into public.ticket_messages(ticket_id,author_id,message_type,visibility,body)
  values(p_ticket_id,uid,'comment',p_visibility,p_body)
  returning id into message_id;
  return message_id;
end;
$$;

create or replace function public.assign_ticket(
  p_ticket_id uuid,
  p_assignee_id uuid,
  p_team_id uuid default null,
  p_method text default 'manual',
  p_reason jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare uid uuid := auth.uid(); resolved_team uuid;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if not (public.can_manage_ticket(p_ticket_id) or public.has_permission('tickets.assign')) then raise exception 'Assignment denied'; end if;
  if not exists(select 1 from public.profiles where id=p_assignee_id and is_active) then raise exception 'Assignee is not active'; end if;

  resolved_team := coalesce(p_team_id,(select current_team_id from public.tickets where id=p_ticket_id));
  update public.ticket_assignments set ended_at=now() where ticket_id=p_ticket_id and ended_at is null;
  insert into public.ticket_assignments(ticket_id,team_id,assignee_id,assigned_by,assignment_method,reason)
  values(p_ticket_id,resolved_team,p_assignee_id,uid,p_method,p_reason);
  update public.tickets set current_team_id=resolved_team,current_assignee_id=p_assignee_id,status=case when status in ('new','triage') then 'assigned' else status end,last_activity_at=now() where id=p_ticket_id;
end;
$$;

create or replace function public.transition_ticket(
  p_ticket_id uuid,
  p_new_status text,
  p_reason text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare uid uuid:=auth.uid(); current_ticket record;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if p_new_status not in ('new','triage','assigned','in_progress','waiting_requester','scheduled','pending_approval','resolved','closed','cancelled','reopened') then raise exception 'Invalid status'; end if;
  select * into current_ticket from public.tickets where id=p_ticket_id;
  if current_ticket.id is null then raise exception 'Ticket not found'; end if;

  if not public.can_manage_ticket(p_ticket_id) then
    if not (current_ticket.requester_id=uid and ((p_new_status='cancelled' and current_ticket.status in ('new','triage')) or (p_new_status='reopened' and current_ticket.status in ('resolved','closed')))) then
      raise exception 'Transition denied';
    end if;
  end if;

  update public.tickets set status=p_new_status,last_activity_at=now() where id=p_ticket_id;
  if p_reason is not null then
    insert into public.ticket_messages(ticket_id,author_id,message_type,visibility,body)
    values(p_ticket_id,uid,'status',case when public.can_view_internal_ticket_content(p_ticket_id) then 'internal' else 'public' end,p_reason);
  end if;
end;
$$;

create or replace function public.reserve_ticket_slot(
  p_ticket_id uuid,
  p_profile_id uuid,
  p_start_at timestamptz,
  p_end_at timestamptz,
  p_title text default null,
  p_location text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid:=auth.uid();
  t record;
  reservation_id uuid;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if p_end_at<=p_start_at then raise exception 'Invalid time range'; end if;
  select tk.*,s.owner_team_id,s.allows_requester_assignee_choice into t from public.tickets tk join public.services s on s.id=tk.service_id where tk.id=p_ticket_id;
  if t.id is null then raise exception 'Ticket not found'; end if;
  if not public.can_manage_ticket(p_ticket_id) and not (t.requester_id=uid and t.allows_requester_assignee_choice) then raise exception 'Reservation denied'; end if;
  if t.owner_team_id is not null and not exists(select 1 from public.team_members tm where tm.team_id=t.owner_team_id and tm.profile_id=p_profile_id and tm.is_active) then raise exception 'Profile is not part of the responsible team'; end if;
  if exists(select 1 from public.reservations r where r.profile_id=p_profile_id and r.status in ('tentative','confirmed') and tstzrange(r.start_at,r.end_at,'[)') && tstzrange(p_start_at,p_end_at,'[)')) then raise exception 'Schedule conflict'; end if;
  if exists(select 1 from public.absences a where a.profile_id=p_profile_id and a.status='approved' and tstzrange(a.start_at,a.end_at,'[)') && tstzrange(p_start_at,p_end_at,'[)')) then raise exception 'Assignee is absent'; end if;

  insert into public.reservations(ticket_id,profile_id,team_id,title,reservation_type,start_at,end_at,status,location,created_by)
  values(p_ticket_id,p_profile_id,t.owner_team_id,coalesce(p_title,t.subject),'ticket',p_start_at,p_end_at,'confirmed',p_location,uid)
  returning id into reservation_id;
  update public.tickets set scheduled_start_at=p_start_at,scheduled_end_at=p_end_at,current_assignee_id=p_profile_id,current_team_id=t.owner_team_id,status='scheduled' where id=p_ticket_id;
  return reservation_id;
end;
$$;

create or replace function public.mark_notification_read(p_notification_id uuid)
returns void
language sql
security definer
set search_path=public
as $$
  update public.notifications set read_at=coalesce(read_at,now()) where id=p_notification_id and profile_id=auth.uid();
$$;

create or replace function public.get_profile_directory()
returns table(
  id uuid,
  display_name text,
  full_name text,
  avatar_url text,
  department_id uuid,
  position_id uuid,
  is_available boolean
)
language sql
stable
security definer
set search_path=public
as $$
  select p.id,p.display_name,p.full_name,p.avatar_url,p.department_id,p.position_id,p.is_available
  from public.profiles p where p.is_active order by coalesce(p.display_name,p.full_name);
$$;

grant execute on function public.create_ticket(text,text,text,text,jsonb,uuid) to authenticated;
grant execute on function public.add_ticket_message(uuid,text,text) to authenticated;
grant execute on function public.assign_ticket(uuid,uuid,uuid,text,jsonb) to authenticated;
grant execute on function public.transition_ticket(uuid,text,text) to authenticated;
grant execute on function public.reserve_ticket_slot(uuid,uuid,timestamptz,timestamptz,text,text) to authenticated;
grant execute on function public.mark_notification_read(uuid) to authenticated;
grant execute on function public.get_profile_directory() to authenticated;

-- Independent yearly counters for ITSM records.
create table if not exists public.record_counters (
  prefix text not null,
  year integer not null,
  last_value integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key(prefix,year)
);

alter table public.record_counters enable row level security;

create or replace function public.next_record_number(p_prefix text)
returns text
language plpgsql
security definer
set search_path=public
as $$
declare y integer:=extract(year from now())::integer; n integer;
begin
  if upper(p_prefix) not in ('INC','PRB','CHG') then raise exception 'Invalid record prefix'; end if;
  insert into public.record_counters(prefix,year,last_value)
  values(upper(p_prefix),y,1)
  on conflict(prefix,year) do update set last_value=public.record_counters.last_value+1,updated_at=now()
  returning last_value into n;
  return upper(p_prefix)||'-'||y::text||'-'||lpad(n::text,5,'0');
end;
$$;

create or replace function public.before_insert_incident_number() returns trigger language plpgsql security definer set search_path=public as $$
begin if new.incident_number is null or btrim(new.incident_number)='' then new.incident_number:=public.next_record_number('INC'); end if; return new; end; $$;
create or replace function public.before_insert_problem_number() returns trigger language plpgsql security definer set search_path=public as $$
begin if new.problem_number is null or btrim(new.problem_number)='' then new.problem_number:=public.next_record_number('PRB'); end if; return new; end; $$;
create or replace function public.before_insert_change_number() returns trigger language plpgsql security definer set search_path=public as $$
begin if new.change_number is null or btrim(new.change_number)='' then new.change_number:=public.next_record_number('CHG'); end if; return new; end; $$;

drop trigger if exists incidents_number on public.incidents;
create trigger incidents_number before insert on public.incidents for each row execute function public.before_insert_incident_number();
drop trigger if exists problems_number on public.problems;
create trigger problems_number before insert on public.problems for each row execute function public.before_insert_problem_number();
drop trigger if exists changes_number on public.changes;
create trigger changes_number before insert on public.changes for each row execute function public.before_insert_change_number();

-- Approval decision RPC.
create or replace function public.decide_approval(
  p_approval_request_id uuid,
  p_decision text,
  p_comment text default null
)
returns void
language plpgsql
security definer
set search_path=public
as $$
declare uid uuid:=auth.uid(); ar record; pending_count integer; rejected_count integer;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if p_decision not in ('approved','rejected') then raise exception 'Invalid decision'; end if;
  select * into ar from public.approval_requests where id=p_approval_request_id;
  if ar.id is null then raise exception 'Approval not found'; end if;
  if ar.status<>'pending' then raise exception 'Approval already decided'; end if;
  if not (ar.requested_from=uid or public.is_team_member(ar.requested_team_id) or public.has_permission('approvals.manage')) then raise exception 'Approval denied'; end if;

  update public.approval_requests set status=p_decision,decision_comment=p_comment,decided_at=now() where id=ar.id;
  insert into public.approval_actions(approval_request_id,actor_id,action,comment) values(ar.id,uid,p_decision,p_comment);

  select count(*) filter(where status='pending'),count(*) filter(where status='rejected')
  into pending_count,rejected_count from public.approval_requests where ticket_id=ar.ticket_id;

  if rejected_count>0 then
    update public.tickets set approval_status='rejected',status='cancelled' where id=ar.ticket_id;
  elsif pending_count=0 then
    update public.tickets set approval_status='approved',status='new' where id=ar.ticket_id;
  end if;
end;
$$;

grant execute on function public.decide_approval(uuid,text,text) to authenticated;

-- In-app notifications for key ticket lifecycle events.
create or replace function public.notify_ticket_created()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  insert into public.notifications(profile_id,ticket_id,event_type,title,body,severity)
  values(new.requester_id,new.id,'ticket.created','Solicitud '||new.ticket_number||' radicada','Tu solicitud fue recibida y ya inició su trazabilidad.','success');
  return new;
end;
$$;

drop trigger if exists ticket_notify_created on public.tickets;
create trigger ticket_notify_created after insert on public.tickets for each row execute function public.notify_ticket_created();

create or replace function public.notify_ticket_update()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  if old.current_assignee_id is distinct from new.current_assignee_id and new.current_assignee_id is not null then
    insert into public.notifications(profile_id,ticket_id,event_type,title,body,severity)
    values(new.current_assignee_id,new.id,'ticket.assigned','Nueva asignación · '||new.ticket_number,new.subject,'info');
  end if;

  if old.status is distinct from new.status and new.status='waiting_requester' then
    insert into public.notifications(profile_id,ticket_id,event_type,title,body,severity)
    values(new.requester_id,new.id,'ticket.waiting_requester','Necesitamos información · '||new.ticket_number,'El equipo requiere información adicional para continuar.','warning');
  end if;

  if old.status is distinct from new.status and new.status='resolved' then
    insert into public.notifications(profile_id,ticket_id,event_type,title,body,severity)
    values(new.requester_id,new.id,'ticket.resolved','Solicitud resuelta · '||new.ticket_number,'Revisa la solución y confirma si quedó resuelta.','success');
    insert into public.ticket_surveys(ticket_id,requester_id,sent_at)
    values(new.id,new.requester_id,now()) on conflict(ticket_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists ticket_notify_update on public.tickets;
create trigger ticket_notify_update after update on public.tickets for each row execute function public.notify_ticket_update();

create or replace function public.create_ticket_for_requester(
  p_requester_id uuid,
  p_service_code text,
  p_subject text,
  p_description text default null,
  p_priority text default 'medium',
  p_field_values jsonb default '{}'::jsonb,
  p_department_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid:=auth.uid();
  service_row record;
  ticket_id uuid;
  kv record;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if not public.has_permission('tickets.create.for_others') then raise exception 'Permission denied'; end if;
  if not exists(select 1 from public.profiles where id=p_requester_id and is_active) then raise exception 'Requester is not active'; end if;
  if p_priority not in ('low','medium','high','critical') then raise exception 'Invalid priority'; end if;

  select * into service_row from public.services where code=p_service_code and is_active and is_published;
  if service_row.id is null then raise exception 'Service not available'; end if;

  insert into public.tickets(
    ticket_number,requester_id,requester_department_id,service_id,current_team_id,
    subject,description,priority,impact,urgency,status,approval_status
  ) values (
    public.next_ticket_number('MA'),p_requester_id,coalesce(p_department_id,(select department_id from public.profiles where id=p_requester_id)),service_row.id,service_row.owner_team_id,
    p_subject,p_description,p_priority,p_priority,p_priority,
    case when service_row.requires_approval then 'pending_approval' else 'new' end,
    case when service_row.requires_approval then 'pending' else 'not_required' end
  ) returning id into ticket_id;

  for kv in select key,value from jsonb_each(coalesce(p_field_values,'{}'::jsonb)) loop
    insert into public.ticket_field_values(ticket_id,field_id,field_key,field_label,value)
    select ticket_id,sf.id,kv.key,sf.label,kv.value
    from public.service_forms f
    join public.service_fields sf on sf.form_id=f.id and sf.field_key=kv.key
    where f.service_id=service_row.id and f.is_published
    order by f.version desc limit 1
    on conflict(ticket_id,field_key) do update set value=excluded.value,field_label=excluded.field_label,field_id=excluded.field_id;
    if not found then
      insert into public.ticket_field_values(ticket_id,field_key,value) values(ticket_id,kv.key,kv.value)
      on conflict(ticket_id,field_key) do update set value=excluded.value;
    end if;
  end loop;

  insert into public.ticket_messages(ticket_id,author_id,message_type,visibility,body)
  values(ticket_id,uid,'system','public','Solicitud radicada por un funcionario autorizado en nombre del solicitante.');
  return ticket_id;
end;
$$;

grant execute on function public.create_ticket_for_requester(uuid,text,text,text,text,jsonb,uuid) to authenticated;

alter table public.services add column if not exists default_effort_minutes integer not null default 60 check (default_effort_minutes > 0);
alter table public.tickets add column if not exists estimated_effort_minutes integer check (estimated_effort_minutes is null or estimated_effort_minutes > 0);

create or replace function public.initialize_ticket_workflow()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
declare v_version uuid; v_start uuid; v_instance uuid;
begin
  select wv.id into v_version
  from public.services s
  join public.workflow_versions wv on wv.workflow_id=s.workflow_id and wv.status='published'
  where s.id=new.service_id
  order by wv.version desc limit 1;
  if v_version is null then return new; end if;

  select id into v_start from public.workflow_steps where workflow_version_id=v_version order by case when step_type='start' then 0 else 1 end,sort_order limit 1;
  insert into public.ticket_workflow_instances(ticket_id,workflow_version_id,current_step_id,status)
  values(new.id,v_version,v_start,'running')
  on conflict(ticket_id) do nothing
  returning id into v_instance;

  if v_instance is not null and v_start is not null then
    insert into public.ticket_step_instances(workflow_instance_id,step_id,status,started_at)
    values(v_instance,v_start,'active',now());
  end if;
  return new;
end;
$$;

drop trigger if exists ticket_initialize_workflow on public.tickets;
create trigger ticket_initialize_workflow after insert on public.tickets for each row execute function public.initialize_ticket_workflow();

create or replace function public.initialize_ticket_approvals()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
declare r record; target_user uuid;
begin
  if new.approval_status<>'pending' then return new; end if;
  for r in select * from public.approval_rules where service_id=new.service_id and is_active order by sequence_no loop
    target_user:=r.approver_profile_id;
    if target_user is null and r.approver_type='team_lead' and r.approver_team_id is not null then
      select tm.profile_id into target_user from public.team_members tm
      where tm.team_id=r.approver_team_id and tm.is_active and tm.member_role in ('lead','manager')
      order by case tm.member_role when 'manager' then 0 else 1 end limit 1;
    end if;
    if target_user is null and r.approver_type='department_head' then
      select p.id into target_user
      from public.profiles p join public.positions pos on pos.id=p.position_id
      where p.department_id=new.requester_department_id and p.is_active and lower(pos.name) like '%secretar%'
      order by p.created_at limit 1;
    end if;
    insert into public.approval_requests(ticket_id,rule_id,requested_from,requested_team_id,sequence_no,status)
    values(new.id,r.id,target_user,r.approver_team_id,r.sequence_no,'pending');
  end loop;
  return new;
end;
$$;

drop trigger if exists ticket_initialize_approvals on public.tickets;
create trigger ticket_initialize_approvals after insert on public.tickets for each row execute function public.initialize_ticket_approvals();

create or replace function public.get_assignee_suggestions(
  p_service_id uuid,
  p_start_at timestamptz default null,
  p_end_at timestamptz default null,
  p_limit integer default 5
)
returns table(
  profile_id uuid,
  display_name text,
  avatar_url text,
  skill_score numeric,
  active_ticket_minutes integer,
  reserved_minutes integer,
  capacity_minutes integer,
  load_percent numeric,
  is_available boolean,
  recommendation_score numeric
)
language sql
stable
security definer
set search_path=public
as $$
  with svc as (
    select s.id,s.owner_team_id from public.services s where s.id=p_service_id and s.is_active
  ), candidates as (
    select distinct p.id,p.display_name,p.full_name,p.avatar_url,p.is_available,
      coalesce(tm.capacity_minutes_per_day,480) capacity_minutes
    from svc
    join public.team_members tm on tm.team_id=svc.owner_team_id and tm.is_active
    join public.profiles p on p.id=tm.profile_id and p.is_active
  ), skill as (
    select c.id,
      coalesce(sum(case when ps.proficiency>=srs.minimum_proficiency then srs.weight*ps.proficiency else 0 end),0)::numeric skill_score,
      coalesce(sum(srs.weight*5),1)::numeric max_skill
    from candidates c
    left join public.service_required_skills srs on srs.service_id=p_service_id
    left join public.profile_skills ps on ps.profile_id=c.id and ps.skill_id=srs.skill_id
    group by c.id
  ), active_work as (
    select c.id,coalesce(sum(coalesce(t.estimated_effort_minutes,s.default_effort_minutes,60)),0)::integer active_minutes
    from candidates c
    left join public.tickets t on t.current_assignee_id=c.id and t.status in ('assigned','in_progress','waiting_requester','scheduled','pending_approval','reopened')
    left join public.services s on s.id=t.service_id
    group by c.id
  ), reservations_work as (
    select c.id,coalesce(sum(extract(epoch from (r.end_at-r.start_at))/60),0)::integer reserved
    from candidates c
    left join public.reservations r on r.profile_id=c.id and r.status in ('tentative','confirmed')
      and r.start_at::date=coalesce(p_start_at::date,current_date)
    group by c.id
  )
  select c.id,c.display_name,c.avatar_url,
    round(sk.skill_score,2),aw.active_minutes,rw.reserved,c.capacity_minutes,
    round(least(100,100.0*(aw.active_minutes+rw.reserved)/greatest(c.capacity_minutes,1)),1) load_percent,
    (c.is_available and not exists(
      select 1 from public.absences a where a.profile_id=c.id and a.status='approved'
      and p_start_at is not null and p_end_at is not null
      and tstzrange(a.start_at,a.end_at,'[)') && tstzrange(p_start_at,p_end_at,'[)')
    ) and not exists(
      select 1 from public.reservations r where r.profile_id=c.id and r.status in ('tentative','confirmed')
      and p_start_at is not null and p_end_at is not null
      and tstzrange(r.start_at,r.end_at,'[)') && tstzrange(p_start_at,p_end_at,'[)')
    )) available,
    round(
      65*(sk.skill_score/greatest(sk.max_skill,1))
      + 25*(1-least(1.0,(aw.active_minutes+rw.reserved)::numeric/greatest(c.capacity_minutes,1)))
      + 10*(case when c.is_available then 1 else 0 end),2
    ) recommendation_score
  from candidates c join skill sk on sk.id=c.id join active_work aw on aw.id=c.id join reservations_work rw on rw.id=c.id
  order by available desc,recommendation_score desc,load_percent asc
  limit greatest(1,least(coalesce(p_limit,5),20));
$$;

grant execute on function public.get_assignee_suggestions(uuid,timestamptz,timestamptz,integer) to authenticated;


-- ============================================================
-- 17_security_helpers_rls.sql
-- ============================================================

-- Mesa de Ayuda TIC · 17_security_helpers_rls.sql
-- Central authorization helpers + RLS policies.

create or replace function public.has_permission(permission_code text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.role_permissions rp on rp.role_id = ur.role_id
    join public.permissions p on p.id = rp.permission_id
    where ur.profile_id = auth.uid()
      and p.code = permission_code
      and (ur.valid_until is null or ur.valid_until > now())
  );
$$;

create or replace function public.is_team_member(team_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select team_uuid is not null and exists (
    select 1 from public.team_members tm
    where tm.team_id = team_uuid and tm.profile_id = auth.uid() and tm.is_active
      and (tm.valid_from is null or tm.valid_from <= current_date)
      and (tm.valid_to is null or tm.valid_to >= current_date)
  );
$$;

create or replace function public.can_access_ticket(ticket_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tickets t
    where t.id = ticket_uuid
      and (
        t.requester_id = auth.uid()
        or t.current_assignee_id = auth.uid()
        or public.is_team_member(t.current_team_id)
        or exists (select 1 from public.ticket_watchers w where w.ticket_id = t.id and w.profile_id = auth.uid())
        or public.has_permission('tickets.read.all')
      )
  );
$$;

create or replace function public.can_manage_ticket(ticket_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tickets t
    where t.id = ticket_uuid
      and (
        t.current_assignee_id = auth.uid()
        or public.is_team_member(t.current_team_id)
        or public.has_permission('tickets.manage.all')
      )
  );
$$;

create or replace function public.can_view_internal_ticket_content(ticket_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.can_manage_ticket(ticket_uuid)
      or public.has_permission('tickets.internal_notes');
$$;

-- Enable RLS on every application table.
do $$
declare r record;
begin
  for r in
    select tablename from pg_tables
    where schemaname='public'
      and tablename in (
        'departments','positions','teams','team_members','profiles','roles','permissions','role_permissions','user_roles',
        'service_categories','services','service_forms','service_fields','service_field_options','service_field_conditions',
        'ticket_counters','tickets','ticket_field_values','ticket_status_history','ticket_watchers','tags','ticket_tags','ticket_relations',
        'ticket_messages','ticket_attachments','audit_events','skills','profile_skills','service_required_skills','ticket_assignments',
        'work_schedules','work_schedule_days','holidays','absences','availability_blocks','reservations',
        'sla_policies','sla_targets','ticket_sla_instances','sla_events','workflows','workflow_versions','workflow_steps','workflow_transitions','workflow_conditions','ticket_workflow_instances','ticket_step_instances',
        'approval_rules','approval_requests','approval_actions','knowledge_categories','knowledge_articles','knowledge_article_versions','knowledge_article_services','knowledge_feedback',
        'asset_types','assets','asset_assignments','configuration_items','ci_relationships','ticket_assets','asset_history',
        'service_statuses','incidents','incident_tickets','problems','problem_incidents','changes','change_configuration_items','change_approvals',
        'notification_rules','notification_preferences','notifications','notification_deliveries','ticket_surveys'
      )
  loop
    execute format('alter table public.%I enable row level security', r.tablename);
  end loop;
end $$;

-- Read-only organizational directory for authenticated users.
create policy departments_read_auth on public.departments for select to authenticated using (is_active or public.has_permission('admin.settings'));
create policy positions_read_auth on public.positions for select to authenticated using (is_active or public.has_permission('admin.settings'));
create policy teams_read_auth on public.teams for select to authenticated using (is_active or public.has_permission('admin.settings'));
create policy profiles_read_self_or_directory on public.profiles for select to authenticated using (id = auth.uid() or public.has_permission('directory.read') or public.has_permission('tickets.manage.all'));
create policy profiles_update_self on public.profiles for update to authenticated using (id = auth.uid() or public.has_permission('users.manage')) with check (id = auth.uid() or public.has_permission('users.manage'));

-- RBAC configuration admin only.
create policy roles_admin_all on public.roles for all to authenticated using (public.has_permission('roles.manage')) with check (public.has_permission('roles.manage'));
create policy permissions_admin_read on public.permissions for select to authenticated using (public.has_permission('roles.manage'));
create policy role_permissions_admin_all on public.role_permissions for all to authenticated using (public.has_permission('roles.manage')) with check (public.has_permission('roles.manage'));
create policy user_roles_admin_all on public.user_roles for all to authenticated using (public.has_permission('roles.manage')) with check (public.has_permission('roles.manage'));
create policy team_members_read_auth on public.team_members for select to authenticated using (true);
create policy team_members_manage on public.team_members for all to authenticated using (public.has_permission('teams.manage')) with check (public.has_permission('teams.manage'));
create policy departments_manage on public.departments for all to authenticated using (public.has_permission('admin.settings')) with check (public.has_permission('admin.settings'));
create policy positions_manage on public.positions for all to authenticated using (public.has_permission('admin.settings')) with check (public.has_permission('admin.settings'));
create policy teams_manage on public.teams for all to authenticated using (public.has_permission('teams.manage') or public.has_permission('admin.settings')) with check (public.has_permission('teams.manage') or public.has_permission('admin.settings'));

-- Catalog visible to authenticated users; mutation to catalog managers.
create policy service_categories_read on public.service_categories for select to authenticated using (is_active or public.has_permission('catalog.manage'));
create policy services_read on public.services for select to authenticated using ((is_active and is_published) or public.has_permission('catalog.manage'));
create policy service_forms_read on public.service_forms for select to authenticated using (is_published or public.has_permission('catalog.manage'));
create policy service_fields_read on public.service_fields for select to authenticated using (is_active or public.has_permission('catalog.manage'));
create policy service_field_options_read on public.service_field_options for select to authenticated using (is_active or public.has_permission('catalog.manage'));
create policy service_field_conditions_read on public.service_field_conditions for select to authenticated using (true);
create policy catalog_categories_manage on public.service_categories for all to authenticated using (public.has_permission('catalog.manage')) with check (public.has_permission('catalog.manage'));
create policy catalog_services_manage on public.services for all to authenticated using (public.has_permission('catalog.manage')) with check (public.has_permission('catalog.manage'));
create policy catalog_forms_manage on public.service_forms for all to authenticated using (public.has_permission('catalog.manage')) with check (public.has_permission('catalog.manage'));
create policy catalog_fields_manage on public.service_fields for all to authenticated using (public.has_permission('catalog.manage')) with check (public.has_permission('catalog.manage'));
create policy catalog_options_manage on public.service_field_options for all to authenticated using (public.has_permission('catalog.manage')) with check (public.has_permission('catalog.manage'));
create policy catalog_conditions_manage on public.service_field_conditions for all to authenticated using (public.has_permission('catalog.manage')) with check (public.has_permission('catalog.manage'));

-- Tickets: requester sees own; agents see assigned/team; administrators can see all.
create policy tickets_select_access on public.tickets for select to authenticated using (public.can_access_ticket(id));
create policy tickets_update_manager on public.tickets for update to authenticated using (public.can_manage_ticket(id)) with check (public.can_manage_ticket(id));
create policy ticket_field_values_select on public.ticket_field_values for select to authenticated using (public.can_access_ticket(ticket_id));
create policy ticket_field_values_insert on public.ticket_field_values for insert to authenticated with check (public.can_manage_ticket(ticket_id));
create policy ticket_field_values_update on public.ticket_field_values for update to authenticated using (public.can_manage_ticket(ticket_id)) with check (public.can_manage_ticket(ticket_id));
create policy ticket_status_history_select on public.ticket_status_history for select to authenticated using (public.can_access_ticket(ticket_id));
create policy ticket_watchers_select on public.ticket_watchers for select to authenticated using (public.can_access_ticket(ticket_id));
create policy ticket_watchers_manage on public.ticket_watchers for all to authenticated using (public.can_manage_ticket(ticket_id)) with check (public.can_manage_ticket(ticket_id));
create policy ticket_tags_select on public.ticket_tags for select to authenticated using (public.can_access_ticket(ticket_id));
create policy ticket_tags_manage on public.ticket_tags for all to authenticated using (public.can_manage_ticket(ticket_id)) with check (public.can_manage_ticket(ticket_id));
create policy ticket_relations_select on public.ticket_relations for select to authenticated using (public.can_access_ticket(source_ticket_id) or public.can_access_ticket(target_ticket_id));
create policy ticket_relations_manage on public.ticket_relations for all to authenticated using (public.can_manage_ticket(source_ticket_id)) with check (public.can_manage_ticket(source_ticket_id));
create policy tags_read on public.tags for select to authenticated using (true);
create policy tags_manage on public.tags for all to authenticated using (public.has_permission('catalog.manage')) with check (public.has_permission('catalog.manage'));

-- Public/internal conversation boundary.
create policy messages_select on public.ticket_messages for select to authenticated using (
  public.can_access_ticket(ticket_id)
  and (visibility = 'public' or public.can_view_internal_ticket_content(ticket_id))
);
create policy messages_insert on public.ticket_messages for insert to authenticated with check (
  public.can_access_ticket(ticket_id)
  and author_id = auth.uid()
  and (visibility = 'public' or public.can_view_internal_ticket_content(ticket_id))
);
create policy messages_update_own on public.ticket_messages for update to authenticated using (author_id = auth.uid() and public.can_access_ticket(ticket_id)) with check (author_id = auth.uid() and public.can_access_ticket(ticket_id));
create policy attachments_select on public.ticket_attachments for select to authenticated using (
  public.can_access_ticket(ticket_id) and (visibility='public' or public.can_view_internal_ticket_content(ticket_id))
);
create policy attachments_insert on public.ticket_attachments for insert to authenticated with check (
  uploaded_by = auth.uid() and public.can_access_ticket(ticket_id) and (visibility='public' or public.can_view_internal_ticket_content(ticket_id))
);

-- Routing / skills / calendar.
create policy skills_read on public.skills for select to authenticated using (true);
create policy skills_manage on public.skills for all to authenticated using (public.has_permission('teams.manage')) with check (public.has_permission('teams.manage'));
create policy profile_skills_read on public.profile_skills for select to authenticated using (true);
create policy profile_skills_manage on public.profile_skills for all to authenticated using (public.has_permission('teams.manage')) with check (public.has_permission('teams.manage'));
create policy service_required_skills_read on public.service_required_skills for select to authenticated using (true);
create policy service_required_skills_manage on public.service_required_skills for all to authenticated using (public.has_permission('catalog.manage')) with check (public.has_permission('catalog.manage'));
create policy assignments_select on public.ticket_assignments for select to authenticated using (public.can_access_ticket(ticket_id));
create policy assignments_manage on public.ticket_assignments for all to authenticated using (public.can_manage_ticket(ticket_id) or public.has_permission('tickets.assign')) with check (public.can_access_ticket(ticket_id));

create policy schedules_read on public.work_schedules for select to authenticated using (true);
create policy schedule_days_read on public.work_schedule_days for select to authenticated using (true);
create policy holidays_read on public.holidays for select to authenticated using (true);
create policy schedules_manage on public.work_schedules for all to authenticated using (public.has_permission('calendar.manage')) with check (public.has_permission('calendar.manage'));
create policy schedule_days_manage on public.work_schedule_days for all to authenticated using (public.has_permission('calendar.manage')) with check (public.has_permission('calendar.manage'));
create policy holidays_manage on public.holidays for all to authenticated using (public.has_permission('calendar.manage')) with check (public.has_permission('calendar.manage'));
create policy absences_read on public.absences for select to authenticated using (profile_id=auth.uid() or public.has_permission('calendar.manage'));
create policy absences_manage on public.absences for all to authenticated using (profile_id=auth.uid() or public.has_permission('calendar.manage')) with check (profile_id=auth.uid() or public.has_permission('calendar.manage'));
create policy availability_read on public.availability_blocks for select to authenticated using (not is_private or profile_id=auth.uid() or public.has_permission('calendar.manage'));
create policy availability_manage on public.availability_blocks for all to authenticated using (profile_id=auth.uid() or public.has_permission('calendar.manage')) with check (profile_id=auth.uid() or public.has_permission('calendar.manage'));
create policy reservations_read on public.reservations for select to authenticated using (profile_id=auth.uid() or public.can_access_ticket(ticket_id) or public.has_permission('calendar.manage'));
create policy reservations_manage on public.reservations for all to authenticated using (profile_id=auth.uid() or public.can_manage_ticket(ticket_id) or public.has_permission('calendar.manage')) with check (profile_id=auth.uid() or public.can_access_ticket(ticket_id) or public.has_permission('calendar.manage'));

-- Knowledge: published content for everyone; management protected.
create policy knowledge_categories_read on public.knowledge_categories for select to authenticated using (is_active or public.has_permission('knowledge.manage'));
create policy knowledge_articles_read on public.knowledge_articles for select to authenticated using (status='published' or public.has_permission('knowledge.manage'));
create policy knowledge_versions_read on public.knowledge_article_versions for select to authenticated using (exists(select 1 from public.knowledge_articles a where a.id=article_id and (a.status='published' or public.has_permission('knowledge.manage'))));
create policy knowledge_services_read on public.knowledge_article_services for select to authenticated using (true);
create policy knowledge_feedback_self on public.knowledge_feedback for insert to authenticated with check (profile_id=auth.uid());
create policy knowledge_feedback_read_managers on public.knowledge_feedback for select to authenticated using (profile_id=auth.uid() or public.has_permission('knowledge.manage'));
create policy knowledge_categories_manage on public.knowledge_categories for all to authenticated using (public.has_permission('knowledge.manage')) with check (public.has_permission('knowledge.manage'));
create policy knowledge_articles_manage on public.knowledge_articles for all to authenticated using (public.has_permission('knowledge.manage')) with check (public.has_permission('knowledge.manage'));
create policy knowledge_versions_manage on public.knowledge_article_versions for all to authenticated using (public.has_permission('knowledge.manage')) with check (public.has_permission('knowledge.manage'));
create policy knowledge_services_manage on public.knowledge_article_services for all to authenticated using (public.has_permission('knowledge.manage')) with check (public.has_permission('knowledge.manage'));

-- Notifications: users only see their own.
create policy notifications_self on public.notifications for select to authenticated using (profile_id=auth.uid());
create policy notifications_update_self on public.notifications for update to authenticated using (profile_id=auth.uid()) with check (profile_id=auth.uid());
create policy preferences_self on public.notification_preferences for all to authenticated using (profile_id=auth.uid()) with check (profile_id=auth.uid());
create policy notification_rules_admin on public.notification_rules for all to authenticated using (public.has_permission('notifications.manage')) with check (public.has_permission('notifications.manage'));
create policy notification_deliveries_admin on public.notification_deliveries for select to authenticated using (public.has_permission('notifications.manage'));

-- Surveys: requester can respond to own; service managers can read aggregate rows.
create policy surveys_select on public.ticket_surveys for select to authenticated using (requester_id=auth.uid() or public.has_permission('reports.read'));
create policy surveys_update_self on public.ticket_surveys for update to authenticated using (requester_id=auth.uid()) with check (requester_id=auth.uid());

-- Admin-only operational modules.
create policy audit_read on public.audit_events for select to authenticated using (public.has_permission('audit.read'));
create policy assets_read on public.assets for select to authenticated using (assigned_to=auth.uid() or public.has_permission('assets.read') or exists(select 1 from public.ticket_assets ta where ta.asset_id=assets.id and public.can_access_ticket(ta.ticket_id)));
create policy asset_types_read on public.asset_types for select to authenticated using (public.has_permission('assets.read'));
create policy asset_admin_all on public.assets for all to authenticated using (public.has_permission('assets.manage')) with check (public.has_permission('assets.manage'));
create policy asset_types_admin_all on public.asset_types for all to authenticated using (public.has_permission('assets.manage')) with check (public.has_permission('assets.manage'));
create policy asset_assignments_read on public.asset_assignments for select to authenticated using (profile_id=auth.uid() or public.has_permission('assets.read'));
create policy asset_assignments_manage on public.asset_assignments for all to authenticated using (public.has_permission('assets.manage')) with check (public.has_permission('assets.manage'));
create policy ci_read on public.configuration_items for select to authenticated using (public.has_permission('assets.read'));
create policy ci_manage on public.configuration_items for all to authenticated using (public.has_permission('assets.manage')) with check (public.has_permission('assets.manage'));
create policy ci_rel_read on public.ci_relationships for select to authenticated using (public.has_permission('assets.read'));
create policy ci_rel_manage on public.ci_relationships for all to authenticated using (public.has_permission('assets.manage')) with check (public.has_permission('assets.manage'));
create policy ticket_assets_read on public.ticket_assets for select to authenticated using (public.can_access_ticket(ticket_id));
create policy ticket_assets_manage on public.ticket_assets for all to authenticated using (public.can_manage_ticket(ticket_id)) with check (public.can_manage_ticket(ticket_id));
create policy asset_history_read on public.asset_history for select to authenticated using (public.has_permission('assets.read'));

-- SLA/workflow/approval/ITSM configs readable to operators and manageable by dedicated permissions.
create policy sla_read on public.sla_policies for select to authenticated using (public.has_permission('tickets.manage.all') or public.has_permission('sla.manage'));
create policy sla_targets_read on public.sla_targets for select to authenticated using (public.has_permission('tickets.manage.all') or public.has_permission('sla.manage'));
create policy sla_manage on public.sla_policies for all to authenticated using (public.has_permission('sla.manage')) with check (public.has_permission('sla.manage'));
create policy sla_targets_manage on public.sla_targets for all to authenticated using (public.has_permission('sla.manage')) with check (public.has_permission('sla.manage'));
create policy ticket_sla_access on public.ticket_sla_instances for select to authenticated using (public.can_access_ticket(ticket_id));
create policy sla_events_access on public.sla_events for select to authenticated using (exists(select 1 from public.ticket_sla_instances i where i.id=ticket_sla_instance_id and public.can_access_ticket(i.ticket_id)));

create policy workflows_read on public.workflows for select to authenticated using (public.has_permission('workflow.read') or public.has_permission('workflow.manage'));
create policy workflow_versions_read on public.workflow_versions for select to authenticated using (public.has_permission('workflow.read') or public.has_permission('workflow.manage'));
create policy workflow_steps_read on public.workflow_steps for select to authenticated using (public.has_permission('workflow.read') or public.has_permission('workflow.manage'));
create policy workflow_transitions_read on public.workflow_transitions for select to authenticated using (public.has_permission('workflow.read') or public.has_permission('workflow.manage'));
create policy workflow_conditions_read on public.workflow_conditions for select to authenticated using (public.has_permission('workflow.read') or public.has_permission('workflow.manage'));
create policy workflows_manage on public.workflows for all to authenticated using (public.has_permission('workflow.manage')) with check (public.has_permission('workflow.manage'));
create policy workflow_versions_manage on public.workflow_versions for all to authenticated using (public.has_permission('workflow.manage')) with check (public.has_permission('workflow.manage'));
create policy workflow_steps_manage on public.workflow_steps for all to authenticated using (public.has_permission('workflow.manage')) with check (public.has_permission('workflow.manage'));
create policy workflow_transitions_manage on public.workflow_transitions for all to authenticated using (public.has_permission('workflow.manage')) with check (public.has_permission('workflow.manage'));
create policy workflow_conditions_manage on public.workflow_conditions for all to authenticated using (public.has_permission('workflow.manage')) with check (public.has_permission('workflow.manage'));
create policy ticket_workflow_access on public.ticket_workflow_instances for select to authenticated using (public.can_access_ticket(ticket_id));
create policy ticket_steps_access on public.ticket_step_instances for select to authenticated using (exists(select 1 from public.ticket_workflow_instances i where i.id=workflow_instance_id and public.can_access_ticket(i.ticket_id)));

create policy approval_rules_manage on public.approval_rules for all to authenticated using (public.has_permission('workflow.manage')) with check (public.has_permission('workflow.manage'));
create policy approval_requests_access on public.approval_requests for select to authenticated using (public.can_access_ticket(ticket_id) or requested_from=auth.uid() or public.is_team_member(requested_team_id));
create policy approval_requests_update on public.approval_requests for update to authenticated using (requested_from=auth.uid() or public.is_team_member(requested_team_id) or public.has_permission('approvals.manage')) with check (public.can_access_ticket(ticket_id));
create policy approval_actions_access on public.approval_actions for select to authenticated using (exists(select 1 from public.approval_requests r where r.id=approval_request_id and (public.can_access_ticket(r.ticket_id) or r.requested_from=auth.uid() or public.is_team_member(r.requested_team_id))));

create policy service_status_read on public.service_statuses for select to authenticated using (true);
create policy service_status_manage on public.service_statuses for all to authenticated using (public.has_permission('itsm.manage')) with check (public.has_permission('itsm.manage'));
create policy incidents_read on public.incidents for select to authenticated using (public.has_permission('itsm.read') or public.has_permission('itsm.manage'));
create policy incidents_manage on public.incidents for all to authenticated using (public.has_permission('itsm.manage')) with check (public.has_permission('itsm.manage'));
create policy incident_tickets_read on public.incident_tickets for select to authenticated using (public.can_access_ticket(ticket_id) or public.has_permission('itsm.read'));
create policy incident_tickets_manage on public.incident_tickets for all to authenticated using (public.has_permission('itsm.manage')) with check (public.has_permission('itsm.manage'));
create policy problems_read on public.problems for select to authenticated using (public.has_permission('itsm.read') or public.has_permission('itsm.manage'));
create policy problems_manage on public.problems for all to authenticated using (public.has_permission('itsm.manage')) with check (public.has_permission('itsm.manage'));
create policy problem_incidents_read on public.problem_incidents for select to authenticated using (public.has_permission('itsm.read') or public.has_permission('itsm.manage'));
create policy problem_incidents_manage on public.problem_incidents for all to authenticated using (public.has_permission('itsm.manage')) with check (public.has_permission('itsm.manage'));
create policy changes_read on public.changes for select to authenticated using (public.has_permission('itsm.read') or public.has_permission('itsm.manage'));
create policy changes_manage on public.changes for all to authenticated using (public.has_permission('itsm.manage')) with check (public.has_permission('itsm.manage'));
create policy change_ci_read on public.change_configuration_items for select to authenticated using (public.has_permission('itsm.read') or public.has_permission('itsm.manage'));
create policy change_ci_manage on public.change_configuration_items for all to authenticated using (public.has_permission('itsm.manage')) with check (public.has_permission('itsm.manage'));
create policy change_approvals_read on public.change_approvals for select to authenticated using (approver_id=auth.uid() or public.has_permission('itsm.read') or public.has_permission('itsm.manage'));
create policy change_approvals_manage on public.change_approvals for all to authenticated using (approver_id=auth.uid() or public.has_permission('itsm.manage')) with check (approver_id=auth.uid() or public.has_permission('itsm.manage'));

-- Internal tables without direct client writes stay RLS protected with no insert/update policies.

-- API privileges. RLS remains the authorization boundary.
grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;


-- ============================================================
-- 18_storage_realtime.sql
-- ============================================================

-- Mesa de Ayuda TIC · 18_storage_realtime.sql

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values (
  'ticket-attachments',
  'ticket-attachments',
  false,
  52428800,
  array['image/jpeg','image/png','image/webp','application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/plain']
)
on conflict (id) do update set
  public=false,
  file_size_limit=excluded.file_size_limit,
  allowed_mime_types=excluded.allowed_mime_types;

insert into storage.buckets(id, name, public, file_size_limit)
values ('knowledge-assets','knowledge-assets',false,52428800)
on conflict (id) do update set public=false, file_size_limit=excluded.file_size_limit;

-- Expected path: <ticket_uuid>/<object_uuid>-<safe_filename>
create policy ticket_storage_select on storage.objects
for select to authenticated
using (
  bucket_id='ticket-attachments'
  and public.can_access_ticket(public.safe_uuid((storage.foldername(name))[1]))
);

create policy ticket_storage_insert on storage.objects
for insert to authenticated
with check (
  bucket_id='ticket-attachments'
  and public.can_access_ticket(public.safe_uuid((storage.foldername(name))[1]))
);

create policy ticket_storage_delete on storage.objects
for delete to authenticated
using (
  bucket_id='ticket-attachments'
  and public.can_manage_ticket(public.safe_uuid((storage.foldername(name))[1]))
);

create policy knowledge_storage_select on storage.objects
for select to authenticated
using (bucket_id='knowledge-assets' and public.has_permission('knowledge.manage'));

create policy knowledge_storage_manage on storage.objects
for all to authenticated
using (bucket_id='knowledge-assets' and public.has_permission('knowledge.manage'))
with check (bucket_id='knowledge-assets' and public.has_permission('knowledge.manage'));

-- Realtime tables used by portal/workspace.
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='tickets') then
    alter publication supabase_realtime add table public.tickets;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='ticket_messages') then
    alter publication supabase_realtime add table public.ticket_messages;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='notifications') then
    alter publication supabase_realtime add table public.notifications;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='reservations') then
    alter publication supabase_realtime add table public.reservations;
  end if;
end $$;


-- ============================================================
-- 19_seed_core.sql
-- ============================================================

-- Mesa de Ayuda TIC · 19_seed_core.sql
-- Safe seed: no auth users and no generated IDs referenced directly.

insert into public.roles(code,name,description,is_system) values
('requester','Funcionario solicitante','Radica y consulta sus propias solicitudes.',true),
('secretary','Secretario / coordinador','Consulta y acompaña solicitudes de su ámbito.',true),
('agent','Gestor TIC','Opera colas, tickets y agenda.',true),
('approver','Aprobador','Atiende solicitudes de aprobación.',true),
('auditor','Auditor / Control Interno','Consulta trazabilidad y auditoría.',true),
('catalog_manager','Gestor de catálogo','Administra servicios, formularios y conocimiento.',true),
('admin','Administrador Mesa de Ayuda TIC','Administración global.',true)
on conflict (code) do update set name=excluded.name, description=excluded.description, is_system=excluded.is_system;

insert into public.permissions(code,name,module,description) values
('directory.read','Consultar directorio','organization','Consultar perfiles necesarios para operación.'),
('users.manage','Gestionar usuarios','organization','Actualizar perfiles y organización.'),
('teams.manage','Gestionar equipos','organization','Gestionar membresías, habilidades y capacidad.'),
('roles.manage','Gestionar roles y permisos','security','Administrar RBAC.'),
('catalog.manage','Gestionar catálogo','catalog','Administrar categorías, servicios y formularios.'),
('tickets.create.for_others','Radicar para terceros','tickets','Crear solicitudes en nombre de otro funcionario.'),
('tickets.read.all','Leer todas las solicitudes','tickets','Acceso global a tickets.'),
('tickets.manage.all','Gestionar todas las solicitudes','tickets','Gestionar cualquier ticket.'),
('tickets.assign','Asignar solicitudes','tickets','Asignar y reasignar tickets.'),
('tickets.internal_notes','Ver y crear notas internas','tickets','Acceso a conversación interna.'),
('calendar.manage','Gestionar agenda','calendar','Administrar reservas y disponibilidad.'),
('sla.manage','Gestionar SLA','sla','Configurar políticas y objetivos.'),
('workflow.read','Consultar workflows','workflow','Leer diseño de procesos.'),
('workflow.manage','Gestionar workflows','workflow','Crear, versionar y publicar workflows.'),
('approvals.manage','Gestionar aprobaciones','workflow','Administrar decisiones y delegaciones.'),
('knowledge.manage','Gestionar conocimiento','knowledge','Crear y publicar artículos.'),
('assets.read','Consultar activos y CMDB','assets','Acceso de lectura a activos.'),
('assets.manage','Gestionar activos y CMDB','assets','Administración de inventario/CMDB.'),
('itsm.read','Consultar ITSM','itsm','Consultar incidentes, problemas y cambios.'),
('itsm.manage','Gestionar ITSM','itsm','Gestionar incidentes, problemas, cambios y estado de servicios.'),
('notifications.manage','Gestionar notificaciones','notifications','Configurar reglas y entregas.'),
('audit.read','Consultar auditoría','audit','Leer eventos de auditoría.'),
('reports.read','Consultar indicadores','reports','Consultar reportes y satisfacción.'),
('admin.settings','Administración global','admin','Administrar configuración global.')
on conflict (code) do update set name=excluded.name, module=excluded.module, description=excluded.description;

-- Role grants.
insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r cross join public.permissions p
where r.code='admin'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in (
  'directory.read','tickets.manage.all','tickets.assign','tickets.internal_notes','calendar.manage','workflow.read','itsm.read','assets.read','reports.read'
) where r.code='agent'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in ('directory.read','approvals.manage') where r.code='approver'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in ('audit.read','reports.read','itsm.read','assets.read') where r.code='auditor'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in ('catalog.manage','knowledge.manage','workflow.read') where r.code='catalog_manager'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in ('directory.read','tickets.create.for_others','reports.read') where r.code='secretary'
on conflict do nothing;

insert into public.teams(code,name,description,team_type) values
('TIC','TIC','Mesa técnica, soporte, infraestructura, desarrollo y seguridad.','service'),
('COM','Comunicaciones','Publicaciones, contenidos y cubrimientos.','service'),
('DATOS','Datos y Calidad','Datos, BI, calidad digital y validaciones.','service')
on conflict (code) do update set name=excluded.name, description=excluded.description;

insert into public.service_categories(code,name,description,icon,color,sort_order) values
('comunicaciones','Comunicaciones','Publicaciones, cubrimientos y sitio web.','megaphone','#1769ff',10),
('soporte_tic','Soporte TIC','Correo, equipos, conectividad y soporte.','headset','#0e8fd6',20),
('desarrollo_datos','Desarrollo y datos','Aplicaciones, automatización, datos e informes.','code','#7357d9',30),
('calidad_digital','Calidad digital','Revisiones, QA y validación.','check','#14a36f',40),
('identidad_acceso','Identidad y acceso','Usuarios, permisos y accesos.','key','#d4644b',50),
('seguridad_digital','Seguridad digital','Incidentes y riesgos de seguridad.','shield','#d94b5c',60),
('acompanamiento','Acompañamiento','Capacitación y orientación.','graduation','#14a36f',70)
on conflict (code) do update set name=excluded.name, description=excluded.description, icon=excluded.icon, color=excluded.color, sort_order=excluded.sort_order;

insert into public.skills(code,name) values
('diseno','Diseño'),('redes_sociales','Redes sociales'),('web','Web'),('foto_video','Foto/Video'),('protocolo','Protocolo'),
('desarrollo','Desarrollo'),('procesos','Procesos'),('datos','Datos'),('qa','QA'),('comunicaciones','Comunicaciones'),
('correo','Correo'),('microsoft365','Microsoft 365'),('soporte','Soporte'),('hardware','Hardware'),('redes_datos','Redes de datos'),
('infraestructura','Infraestructura'),('identidad','Identidad'),('seguridad','Seguridad'),('contenido','Contenido'),('accesibilidad','Accesibilidad'),
('bi','BI'),('capacitacion','Capacitación')
on conflict (code) do update set name=excluded.name;

-- Services aligned with the v1.0 frontend.
with data(code,category_code,owner_team_code,name,description,service_type,routing_mode,requires_approval,requires_schedule,critical) as (
  values
  ('publicaciones','comunicaciones','COM','Solicitar publicación','Piezas, copys, publicación en web, redes sociales o canales institucionales.','request','skill_capacity',true,false,false),
  ('cubrimientos','comunicaciones','COM','Solicitar cubrimiento','Fotografía, video, transmisión, acompañamiento o registro de eventos institucionales.','scheduled','skill_capacity',false,true,false),
  ('desarrollo','desarrollo_datos','TIC','Aplicaciones y automatizaciones','Crear, mejorar o automatizar aplicaciones, formularios, procesos y herramientas internas.','request','skill_capacity',true,false,false),
  ('revision','calidad_digital','DATOS','Revisión y validación','Revisar piezas, documentos, páginas, formularios, aplicaciones o contenidos antes de publicar.','request','skill_capacity',false,false,false),
  ('correo','soporte_tic','TIC','Correo institucional','Acceso, bloqueo, creación, contraseña, configuración, envío/recepción y listas de correo.','request','skill_capacity',false,false,false),
  ('equipos','soporte_tic','TIC','Equipo o periférico','Computador, impresora, escáner, proyector, periféricos o mantenimiento preventivo.','request','skill_capacity',false,false,false),
  ('internet','soporte_tic','TIC','Internet y conectividad','Wi-Fi, red cableada, VPN, acceso a servicios, puntos de red e intermitencias.','incident','skill_capacity',false,false,false),
  ('accesos','identidad_acceso','TIC','Usuarios, accesos y permisos','Altas, bajas, permisos, bloqueos y accesos a sistemas o recursos institucionales.','access','skill_capacity',true,false,false),
  ('web','comunicaciones','COM','Sitio web institucional','Actualizar páginas, publicar información, corregir enlaces, crear secciones o formularios web.','request','skill_capacity',false,false,false),
  ('datos','desarrollo_datos','DATOS','Datos e informes','Extracciones, consolidaciones, tableros, indicadores, depuración y análisis de información.','request','skill_capacity',false,false,false),
  ('seguridad','seguridad_digital','TIC','Incidente de seguridad','Phishing, malware, cuenta comprometida, pérdida de equipo o comportamiento sospechoso.','incident','fixed_team',false,false,true),
  ('capacitacion','acompanamiento','TIC','Capacitación o acompañamiento','Solicitar orientación, capacitación o asistencia para herramientas digitales y procesos.','scheduled','skill_capacity',false,true,false)
)
insert into public.services(code,category_id,owner_team_id,name,description,service_type,routing_mode,requires_approval,requires_schedule,is_critical)
select d.code,c.id,t.id,d.name,d.description,d.service_type,d.routing_mode,d.requires_approval,d.requires_schedule,d.critical
from data d
join public.service_categories c on c.code=d.category_code
left join public.teams t on t.code=d.owner_team_code
on conflict (code) do update set
  category_id=excluded.category_id, owner_team_id=excluded.owner_team_id, name=excluded.name, description=excluded.description,
  service_type=excluded.service_type, routing_mode=excluded.routing_mode, requires_approval=excluded.requires_approval,
  requires_schedule=excluded.requires_schedule, is_critical=excluded.is_critical, updated_at=now();

-- Default work schedule: Colombia municipal office, Mon-Fri, 08:00-12:00 / 13:00-17:00.
insert into public.work_schedules(name,timezone,is_default,is_active)
values ('Jornada institucional','America/Bogota',true,true)
on conflict (name) do update set timezone=excluded.timezone,is_default=true,is_active=true;

insert into public.work_schedule_days(schedule_id,weekday,start_time,end_time,second_start_time,second_end_time,is_working_day)
select s.id,d.weekday,d.start_time,d.end_time,d.second_start,d.second_end,d.is_working
from public.work_schedules s
cross join (values
  (0,null::time,null::time,null::time,null::time,false),
  (1,'08:00'::time,'12:00'::time,'13:00'::time,'17:00'::time,true),
  (2,'08:00'::time,'12:00'::time,'13:00'::time,'17:00'::time,true),
  (3,'08:00'::time,'12:00'::time,'13:00'::time,'17:00'::time,true),
  (4,'08:00'::time,'12:00'::time,'13:00'::time,'17:00'::time,true),
  (5,'08:00'::time,'12:00'::time,'13:00'::time,'17:00'::time,true),
  (6,null::time,null::time,null::time,null::time,false)
) d(weekday,start_time,end_time,second_start,second_end,is_working)
where s.name='Jornada institucional'
on conflict (schedule_id,weekday) do update set
  start_time=excluded.start_time,end_time=excluded.end_time,second_start_time=excluded.second_start_time,second_end_time=excluded.second_end_time,is_working_day=excluded.is_working_day;

-- Forms/fields from current prototype.
insert into public.service_forms(service_id,version,name,is_draft,is_published,published_at)
select id,1,name || ' · Formulario v1',false,true,now() from public.services
on conflict (service_id,version) do update set is_draft=false,is_published=true,published_at=coalesce(public.service_forms.published_at,now());

-- Field helper data.
with form_map as (select s.code service_code,f.id form_id from public.services s join public.service_forms f on f.service_id=s.id and f.version=1),
field_data(service_code,field_key,label,field_type,required,sort_order) as (
 values
 ('publicaciones','canal','Canal requerido','select',true,10),('publicaciones','fecha_publicacion','Fecha ideal de publicación','date',true,20),('publicaciones','objetivo','Objetivo y mensaje principal','textarea',true,30),('publicaciones','insumos','¿Cuenta con insumos?','select',true,40),('publicaciones','archivos','Enlace o ubicación de archivos','text',false,50),
 ('cubrimientos','tipo','Tipo de cubrimiento','select',true,10),('cubrimientos','fecha','Fecha del evento','date',true,20),('cubrimientos','hora_inicio','Hora de inicio','time',true,30),('cubrimientos','hora_fin','Hora estimada de finalización','time',true,40),('cubrimientos','lugar','Lugar','text',true,50),('cubrimientos','descripcion','Descripción del evento','textarea',true,60),
 ('desarrollo','tipo','Tipo de necesidad','select',true,10),('desarrollo','problema','Problema que se quiere resolver','textarea',true,20),('desarrollo','usuarios','Usuarios o dependencias involucradas','text',true,30),('desarrollo','fecha_objetivo','Fecha objetivo','date',false,40),('desarrollo','impacto','Impacto esperado','select',true,50),
 ('revision','elemento','Elemento a revisar','select',true,10),('revision','enlace','Enlace o archivo','text',true,20),('revision','validacion','Qué debe validarse','textarea',true,30),('revision','fecha_limite','Fecha límite','date',true,40),
 ('correo','tipo','Tipo de problema','select',true,10),('correo','cuenta','Cuenta afectada','email',true,20),('correo','descripcion','Descripción','textarea',true,30),
 ('equipos','equipo','Equipo','select',true,10),('equipos','activo','Activo / placa (si aplica)','text',false,20),('equipos','sintoma','Síntoma o falla','textarea',true,30),('equipos','impide_trabajar','¿Impide trabajar?','select',true,40),
 ('internet','conexion','Tipo de conexión','select',true,10),('internet','ubicacion','Ubicación','text',true,20),('internet','descripcion','Descripción de la falla','textarea',true,30),('internet','personas_afectadas','¿A cuántas personas afecta?','number',true,40),
 ('accesos','solicitud','Solicitud','select',true,10),('accesos','usuario','Usuario involucrado','text',true,20),('accesos','recurso','Sistema / recurso','text',true,30),('accesos','justificacion','Justificación','textarea',true,40),
 ('web','tipo','Tipo de cambio','select',true,10),('web','url','URL o sección','text',false,20),('web','detalle','Detalle del cambio','textarea',true,30),('web','fecha','Fecha requerida','date',false,40),
 ('datos','producto','Producto esperado','select',true,10),('datos','fuentes','Fuentes de información','text',true,20),('datos','descripcion','Descripción del requerimiento','textarea',true,30),('datos','fecha_corte','Fecha de corte','date',false,40),
 ('seguridad','tipo','Tipo de incidente','select',true,10),('seguridad','ocurrio','Qué ocurrió','textarea',true,20),('seguridad','hora','Hora aproximada','time',false,30),('seguridad','conectado','¿El equipo sigue conectado?','select',true,40),
 ('capacitacion','tema','Tema','text',true,10),('capacitacion','asistentes','Número aproximado de asistentes','number',true,20),('capacitacion','modalidad','Modalidad','select',true,30),('capacitacion','fecha','Fecha preferida','date',false,40),('capacitacion','necesidad','Necesidad específica','textarea',true,50)
)
insert into public.service_fields(form_id,field_key,label,field_type,is_required,sort_order)
select fm.form_id,fd.field_key,fd.label,fd.field_type,fd.required,fd.sort_order
from field_data fd join form_map fm on fm.service_code=fd.service_code
on conflict (form_id,field_key) do update set label=excluded.label,field_type=excluded.field_type,is_required=excluded.is_required,sort_order=excluded.sort_order;

-- Options for select fields.
with field_map as (
 select s.code service_code,sf.field_key,sf.id field_id from public.services s join public.service_forms f on f.service_id=s.id and f.version=1 join public.service_fields sf on sf.form_id=f.id
), options(service_code,field_key,value,label,sort_order) as (
 values
 ('publicaciones','canal','redes_sociales','Redes sociales',10),('publicaciones','canal','sitio_web','Sitio web',20),('publicaciones','canal','cartelera','Cartelera interna',30),('publicaciones','canal','prensa','Prensa / boletín',40),('publicaciones','canal','varios','Varios canales',50),
 ('publicaciones','insumos','completos','Sí, completos',10),('publicaciones','insumos','parciales','Parciales',20),('publicaciones','insumos','no','No',30),
 ('cubrimientos','tipo','fotografia','Fotografía',10),('cubrimientos','tipo','video','Video',20),('cubrimientos','tipo','foto_video','Foto + video',30),('cubrimientos','tipo','transmision','Transmisión en vivo',40),('cubrimientos','tipo','acompanamiento','Acompañamiento de comunicaciones',50),
 ('desarrollo','tipo','nueva_aplicacion','Nueva aplicación',10),('desarrollo','tipo','funcionalidad','Nueva funcionalidad',20),('desarrollo','tipo','automatizacion','Automatización',30),('desarrollo','tipo','formulario','Formulario digital',40),('desarrollo','tipo','integracion','Integración',50),('desarrollo','tipo','dashboard','Dashboard / reporte',60),
 ('desarrollo','impacto','bajo','Bajo',10),('desarrollo','impacto','medio','Medio',20),('desarrollo','impacto','alto','Alto',30),('desarrollo','impacto','critico','Crítico',40),
 ('revision','elemento','pieza','Pieza gráfica',10),('revision','elemento','documento','Documento',20),('revision','elemento','web','Página web',30),('revision','elemento','formulario','Formulario',40),('revision','elemento','aplicacion','Aplicación',50),('revision','elemento','publicacion','Publicación',60),
 ('correo','tipo','no_ingresa','No puedo ingresar',10),('correo','tipo','password','Olvidé contraseña',20),('correo','tipo','no_envia','No envía',30),('correo','tipo','no_recibe','No recibe',40),('correo','tipo','crear_cuenta','Crear cuenta',50),('correo','tipo','configurar','Configurar dispositivo',60),('correo','tipo','grupo','Lista / grupo',70),('correo','tipo','otro','Otro',80),
 ('equipos','equipo','computador','Computador',10),('equipos','equipo','portatil','Portátil',20),('equipos','equipo','impresora','Impresora',30),('equipos','equipo','escaner','Escáner',40),('equipos','equipo','proyector','Proyector',50),('equipos','equipo','periferico','Teclado / mouse',60),('equipos','equipo','otro','Otro',70),
 ('equipos','impide_trabajar','si','Sí',10),('equipos','impide_trabajar','parcial','Parcialmente',20),('equipos','impide_trabajar','no','No',30),
 ('internet','conexion','wifi','Wi-Fi',10),('internet','conexion','cableada','Cableada',20),('internet','conexion','vpn','VPN',30),('internet','conexion','sistema','Acceso a sistema',40),('internet','conexion','punto','Punto de red',50),
 ('accesos','solicitud','crear','Crear usuario',10),('accesos','solicitud','modificar','Modificar permisos',20),('accesos','solicitud','retirar','Retirar acceso',30),('accesos','solicitud','desbloquear','Desbloquear',40),('accesos','solicitud','carpeta','Acceso a carpeta',50),('accesos','solicitud','aplicacion','Acceso a aplicación',60),
 ('web','tipo','actualizar','Actualizar contenido',10),('web','tipo','seccion','Crear sección',20),('web','tipo','error','Corregir error',30),('web','tipo','archivo','Publicar archivo',40),('web','tipo','formulario','Crear formulario',50),('web','tipo','enlace','Enlace roto',60),
 ('datos','producto','base','Base consolidada',10),('datos','producto','indicador','Indicador',20),('datos','producto','dashboard','Dashboard',30),('datos','producto','informe','Informe',40),('datos','producto','cruce','Cruce de datos',50),('datos','producto','depuracion','Depuración',60),
 ('seguridad','tipo','phishing','Correo sospechoso / phishing',10),('seguridad','tipo','cuenta','Cuenta comprometida',20),('seguridad','tipo','malware','Malware',30),('seguridad','tipo','perdida','Pérdida de equipo',40),('seguridad','tipo','acceso','Acceso no autorizado',50),('seguridad','tipo','otro','Otro',60),
 ('seguridad','conectado','si','Sí',10),('seguridad','conectado','no','No',20),('seguridad','conectado','na','No aplica',30),
 ('capacitacion','modalidad','presencial','Presencial',10),('capacitacion','modalidad','virtual','Virtual',20),('capacitacion','modalidad','indiferente','Indiferente',30)
)
insert into public.service_field_options(field_id,value,label,sort_order)
select fm.field_id,o.value,o.label,o.sort_order from options o join field_map fm on fm.service_code=o.service_code and fm.field_key=o.field_key
on conflict (field_id,value) do update set label=excluded.label,sort_order=excluded.sort_order;

-- Skill requirements.
with req(service_code,skill_code,weight,required) as (
 values
 ('publicaciones','diseno',1.2,true),('publicaciones','redes_sociales',1.0,true),('publicaciones','web',0.7,false),
 ('cubrimientos','foto_video',1.3,true),('cubrimientos','protocolo',0.8,false),('cubrimientos','redes_sociales',0.8,false),
 ('desarrollo','desarrollo',1.3,true),('desarrollo','procesos',1.0,true),('desarrollo','datos',0.7,false),
 ('revision','qa',1.2,true),('revision','web',0.7,false),('revision','comunicaciones',0.7,false),
 ('correo','correo',1.2,true),('correo','microsoft365',1.0,false),('correo','soporte',1.0,true),
 ('equipos','hardware',1.2,true),('equipos','soporte',1.0,true),
 ('internet','redes_datos',1.3,true),('internet','infraestructura',1.0,true),
 ('accesos','identidad',1.2,true),('accesos','seguridad',1.0,true),('accesos','soporte',0.7,false),
 ('web','web',1.3,true),('web','contenido',0.8,false),('web','accesibilidad',0.8,false),
 ('datos','datos',1.3,true),('datos','bi',1.0,false),('datos','procesos',0.7,false),
 ('seguridad','seguridad',1.5,true),('seguridad','infraestructura',1.0,true),
 ('capacitacion','capacitacion',1.2,true),('capacitacion','soporte',0.7,false)
)
insert into public.service_required_skills(service_id,skill_id,weight,is_required)
select s.id,k.id,r.weight,r.required from req r join public.services s on s.code=r.service_code join public.skills k on k.code=r.skill_code
on conflict (service_id,skill_id) do update set weight=excluded.weight,is_required=excluded.is_required;

-- Default SLA policies.
insert into public.sla_policies(code,name,description,work_schedule_id,pause_on_waiting_requester)
select 'tic_standard','TIC estándar','SLA para solicitudes TIC estándar.',id,true from public.work_schedules where name='Jornada institucional'
on conflict (code) do update set name=excluded.name,description=excluded.description,work_schedule_id=excluded.work_schedule_id;
insert into public.sla_policies(code,name,description,work_schedule_id,pause_on_waiting_requester)
select 'tic_urgent','TIC urgente','SLA para incidentes de conectividad y seguridad.',id,true from public.work_schedules where name='Jornada institucional'
on conflict (code) do update set name=excluded.name,description=excluded.description,work_schedule_id=excluded.work_schedule_id;
insert into public.sla_policies(code,name,description,work_schedule_id,pause_on_waiting_requester)
select 'communications','Comunicaciones','SLA para publicaciones y revisiones de comunicaciones.',id,true from public.work_schedules where name='Jornada institucional'
on conflict (code) do update set name=excluded.name,description=excluded.description,work_schedule_id=excluded.work_schedule_id;

insert into public.sla_targets(policy_id,metric,priority,target_minutes,warning_percent,critical_percent)
select p.id,x.metric,x.priority,x.minutes,70,90
from public.sla_policies p
join (values
 ('tic_standard','first_response','any',120),('tic_standard','resolution','low',1440),('tic_standard','resolution','medium',480),('tic_standard','resolution','high',240),('tic_standard','resolution','critical',120),
 ('tic_urgent','first_response','any',30),('tic_urgent','resolution','high',180),('tic_urgent','resolution','critical',60),
 ('communications','first_response','any',240),('communications','resolution','medium',1440),('communications','resolution','high',480)
) x(policy_code,metric,priority,minutes) on x.policy_code=p.code
on conflict (policy_id,metric,priority) do update set target_minutes=excluded.target_minutes,warning_percent=excluded.warning_percent,critical_percent=excluded.critical_percent;

update public.services set default_sla_policy_id=(select id from public.sla_policies where code='tic_standard') where code in ('correo','equipos','accesos','desarrollo','datos','capacitacion');
update public.services set default_sla_policy_id=(select id from public.sla_policies where code='tic_urgent') where code in ('internet','seguridad');
update public.services set default_sla_policy_id=(select id from public.sla_policies where code='communications') where code in ('publicaciones','revision','web');

-- Backfill profiles for users that existed before this schema was installed.
insert into public.profiles(id,full_name,display_name,institutional_email,metadata,work_schedule_id)
select
  u.id,
  coalesce(u.raw_user_meta_data->>'full_name',u.raw_user_meta_data->>'name',''),
  coalesce(u.raw_user_meta_data->>'display_name',u.raw_user_meta_data->>'full_name',u.email,''),
  u.email,
  coalesce(u.raw_user_meta_data,'{}'::jsonb),
  (select id from public.work_schedules where name='Jornada institucional')
from auth.users u
on conflict (id) do update set
  institutional_email=excluded.institutional_email,
  work_schedule_id=coalesce(public.profiles.work_schedule_id,excluded.work_schedule_id),
  updated_at=now();

insert into public.user_roles(profile_id,role_id,scope_type,scope_id)
select p.id,r.id,'global',null
from public.profiles p cross join public.roles r
where r.code='requester'
on conflict (profile_id,role_id,scope_type,scope_id) do nothing;

update public.profiles
set work_schedule_id=(select id from public.work_schedules where name='Jornada institucional')
where work_schedule_id is null;

-- Reusable workflows.
insert into public.workflows(code,name,description) values
('standard_request','Solicitud estándar','Radicación → asignación → gestión → validación → cierre.'),
('approval_request','Solicitud con aprobación','Radicación → aprobación → asignación → ejecución → cierre.'),
('scheduled_service','Servicio programado','Radicación → programación → ejecución → evidencia → cierre.'),
('incident_response','Respuesta a incidente','Detección → triage → contención → resolución → cierre.')
on conflict (code) do update set name=excluded.name,description=excluded.description;

insert into public.workflow_versions(workflow_id,version,status,definition,published_at)
select id,1,'published','{}'::jsonb,now() from public.workflows
on conflict (workflow_id,version) do update set status='published',published_at=coalesce(public.workflow_versions.published_at,now());

-- Standard request workflow steps.
with wf as (
  select w.id workflow_id,v.id version_id from public.workflows w join public.workflow_versions v on v.workflow_id=w.id and v.version=1 where w.code='standard_request'
), data(step_key,name,step_type,sort_order) as (
  values ('start','Radicación','start',10),('assign','Asignación','automation',20),('work','En gestión','task',30),('validate','Validación','task',40),('end','Cierre','end',50)
)
insert into public.workflow_steps(workflow_version_id,step_key,name,step_type,sort_order)
select wf.version_id,d.step_key,d.name,d.step_type,d.sort_order from wf cross join data d
on conflict (workflow_version_id,step_key) do update set name=excluded.name,step_type=excluded.step_type,sort_order=excluded.sort_order;

-- Approval request workflow steps.
with wf as (
  select v.id version_id from public.workflows w join public.workflow_versions v on v.workflow_id=w.id and v.version=1 where w.code='approval_request'
), data(step_key,name,step_type,sort_order) as (
  values ('start','Radicación','start',10),('approve','Aprobación','approval',20),('assign','Asignación','automation',30),('work','Ejecución','task',40),('end','Cierre','end',50)
)
insert into public.workflow_steps(workflow_version_id,step_key,name,step_type,sort_order)
select wf.version_id,d.step_key,d.name,d.step_type,d.sort_order from wf cross join data d
on conflict (workflow_version_id,step_key) do update set name=excluded.name,step_type=excluded.step_type,sort_order=excluded.sort_order;

-- Scheduled workflow steps.
with wf as (
  select v.id version_id from public.workflows w join public.workflow_versions v on v.workflow_id=w.id and v.version=1 where w.code='scheduled_service'
), data(step_key,name,step_type,sort_order) as (
  values ('start','Radicación','start',10),('schedule','Programación','task',20),('execute','Ejecución','task',30),('evidence','Evidencia','task',40),('end','Cierre','end',50)
)
insert into public.workflow_steps(workflow_version_id,step_key,name,step_type,sort_order)
select wf.version_id,d.step_key,d.name,d.step_type,d.sort_order from wf cross join data d
on conflict (workflow_version_id,step_key) do update set name=excluded.name,step_type=excluded.step_type,sort_order=excluded.sort_order;

-- Incident workflow steps.
with wf as (
  select v.id version_id from public.workflows w join public.workflow_versions v on v.workflow_id=w.id and v.version=1 where w.code='incident_response'
), data(step_key,name,step_type,sort_order) as (
  values ('start','Detección','start',10),('triage','Triage','task',20),('contain','Contención','task',30),('resolve','Resolución','task',40),('end','Cierre','end',50)
)
insert into public.workflow_steps(workflow_version_id,step_key,name,step_type,sort_order)
select wf.version_id,d.step_key,d.name,d.step_type,d.sort_order from wf cross join data d
on conflict (workflow_version_id,step_key) do update set name=excluded.name,step_type=excluded.step_type,sort_order=excluded.sort_order;

-- Build sequential transitions for each workflow version.
insert into public.workflow_transitions(workflow_version_id,from_step_id,to_step_id,name,sort_order)
select a.workflow_version_id,a.id,b.id,'Continuar',a.sort_order
from public.workflow_steps a
join public.workflow_steps b on b.workflow_version_id=a.workflow_version_id and b.sort_order=(
  select min(c.sort_order) from public.workflow_steps c where c.workflow_version_id=a.workflow_version_id and c.sort_order>a.sort_order
)
where not exists (
  select 1 from public.workflow_transitions t where t.workflow_version_id=a.workflow_version_id and t.from_step_id=a.id and t.to_step_id=b.id
);

update public.services s
set workflow_id=(select id from public.workflows where code=
  case
    when s.code in ('publicaciones','desarrollo','accesos') then 'approval_request'
    when s.code in ('cubrimientos','capacitacion') then 'scheduled_service'
    when s.code in ('internet','seguridad') then 'incident_response'
    else 'standard_request'
  end
);

-- Dynamic approval rules for services that require approval.
insert into public.approval_rules(service_id,name,approver_type,approver_team_id,sequence_no,is_required)
select s.id,'Aprobación del líder del equipo propietario','team_lead',s.owner_team_id,1,true
from public.services s
where s.requires_approval and s.owner_team_id is not null
  and not exists (select 1 from public.approval_rules ar where ar.service_id=s.id and ar.sequence_no=1);

-- Knowledge taxonomy.
insert into public.knowledge_categories(code,name,description,icon,color,sort_order) values
('correo','Correo institucional','Acceso, contraseñas y configuración de correo.','mail','#d48a00',10),
('conectividad','Internet y conectividad','Wi-Fi, red, VPN y puntos de acceso.','wifi','#0e8fd6',20),
('equipos','Equipos','Computadores, impresoras y periféricos.','monitor','#60728c',30),
('accesos','Accesos','Usuarios, permisos y autenticación.','key','#d4644b',40),
('web','Sitio web','Publicación y mantenimiento web.','globe','#1769ff',50),
('seguridad','Seguridad','Phishing, malware y protección de cuentas.','shield','#d94b5c',60)
on conflict (code) do update set name=excluded.name,description=excluded.description,icon=excluded.icon,color=excluded.color,sort_order=excluded.sort_order;

-- Asset types baseline.
insert into public.asset_types(code,name,icon) values
('desktop','Computador de escritorio','monitor'),('laptop','Portátil','laptop'),('printer','Impresora','printer'),('scanner','Escáner','scan'),
('projector','Proyector','projector'),('switch','Switch de red','network'),('access_point','Access Point','wifi'),('phone','Teléfono','phone'),
('license','Licencia de software','key'),('application','Aplicación / sistema','app')
on conflict (code) do update set name=excluded.name,icon=excluded.icon;

-- Default notification rule templates.
insert into public.notification_rules(code,name,event_type,channels,recipients,template_subject,template_body) values
('ticket_created_requester','Confirmación de radicación','ticket.created',array['in_app','email'],jsonb_build_object('requester',true),'Solicitud {{ticket.number}} radicada','Tu solicitud {{ticket.number}} fue radicada correctamente.'),
('ticket_assigned_agent','Nueva asignación','ticket.assigned',array['in_app','email'],jsonb_build_object('assignee',true),'Nueva solicitud {{ticket.number}}','La solicitud {{ticket.number}} fue asignada a tu bandeja.'),
('sla_warning','SLA en riesgo','sla.warning',array['in_app','email'],jsonb_build_object('assignee',true,'team_lead',true),'SLA en riesgo · {{ticket.number}}','La solicitud {{ticket.number}} alcanzó el umbral de alerta del SLA.'),
('sla_critical','SLA crítico','sla.critical',array['in_app','email'],jsonb_build_object('assignee',true,'team_lead',true),'SLA crítico · {{ticket.number}}','La solicitud {{ticket.number}} está próxima a incumplir el SLA.'),
('waiting_requester','Información requerida','ticket.waiting_requester',array['in_app','email'],jsonb_build_object('requester',true),'Necesitamos información · {{ticket.number}}','El equipo necesita información adicional para continuar con {{ticket.number}}.'),
('ticket_resolved','Solicitud resuelta','ticket.resolved',array['in_app','email'],jsonb_build_object('requester',true),'Solicitud resuelta · {{ticket.number}}','La solicitud {{ticket.number}} fue marcada como resuelta. Confirma si la solución fue satisfactoria.')
on conflict (code) do update set name=excluded.name,event_type=excluded.event_type,channels=excluded.channels,recipients=excluded.recipients,template_subject=excluded.template_subject,template_body=excluded.template_body;

-- Initial service health baseline.
insert into public.service_statuses(service_id,status,title,message,started_at)
select s.id,'operational','Servicio operativo','El servicio se encuentra operando normalmente.',now()
from public.services s
where not exists (select 1 from public.service_statuses ss where ss.service_id=s.id and ss.ended_at is null);

update public.services set default_effort_minutes=case code
  when 'publicaciones' then 120
  when 'cubrimientos' then 180
  when 'desarrollo' then 360
  when 'revision' then 90
  when 'correo' then 45
  when 'equipos' then 90
  when 'internet' then 60
  when 'accesos' then 45
  when 'web' then 120
  when 'datos' then 240
  when 'seguridad' then 90
  when 'capacitacion' then 180
  else 60 end;

update public.services set allows_requester_assignee_choice=true where code='cubrimientos';


-- ============================================================
-- 20_validation.sql
-- ============================================================

-- Mesa de Ayuda TIC · 20_validation.sql
-- Structural validation. Raises an exception if a required baseline object is missing.

do $$
declare
  missing_tables text[];
  services_count integer;
  rls_missing integer;
begin
  select array_agg(expected_name) into missing_tables
  from (values
    ('profiles'),('services'),('service_forms'),('service_fields'),('tickets'),('ticket_messages'),('ticket_attachments'),
    ('reservations'),('sla_policies'),('workflows'),('approval_requests'),('knowledge_articles'),('assets'),('incidents'),('notifications')
  ) v(expected_name)
  where not exists (
    select 1 from information_schema.tables t where t.table_schema='public' and t.table_name=v.expected_name
  );

  if missing_tables is not null then
    raise exception 'Missing required tables: %', missing_tables;
  end if;

  select count(*) into services_count from public.services where is_active;
  if services_count < 12 then
    raise exception 'Expected at least 12 active services, found %', services_count;
  end if;

  select count(*) into rls_missing
  from pg_tables
  where schemaname='public'
    and tablename in ('profiles','tickets','ticket_messages','ticket_attachments','services','reservations','notifications')
    and rowsecurity=false;
  if rls_missing > 0 then
    raise exception 'RLS missing on % core tables', rls_missing;
  end if;

  raise notice 'Mesa de Ayuda TIC schema validation OK. Active services: %', services_count;
end $$;


-- ============================================================
-- 21_import_center_and_email_inventory.sql
-- ============================================================

-- Mesa de Ayuda TIC · 21_import_center_and_email_inventory.sql
-- Adds CSV import governance and an institutional e-mail inventory.

alter table public.departments add column if not exists department_type text not null default 'office' check (department_type in ('secretariat','office','unit','group','other'));
alter table public.positions add column if not exists code text;
create unique index if not exists positions_lower_code_uq on public.positions(lower(code)) where code is not null;

create table if not exists public.institutional_email_accounts (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  display_name text,
  account_type text not null default 'personal' check (account_type in ('personal','shared','service','distribution')),
  provider text not null default 'microsoft365' check (provider in ('microsoft365','google_workspace','other')),
  profile_id uuid references public.profiles(id) on delete set null,
  department_id uuid references public.departments(id) on delete set null,
  status text not null default 'active' check (status in ('active','pending','suspended','disabled','retired')),
  aliases text[] not null default '{}',
  storage_quota_mb integer check (storage_quota_mb is null or storage_quota_mb >= 0),
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists institutional_email_accounts_lower_email_uq
  on public.institutional_email_accounts(lower(email));
create index if not exists institutional_email_accounts_profile_idx on public.institutional_email_accounts(profile_id);
create index if not exists institutional_email_accounts_department_idx on public.institutional_email_accounts(department_id);

create table if not exists public.import_templates (
  id uuid primary key default gen_random_uuid(),
  entity_code text not null unique,
  name text not null,
  description text,
  required_headers text[] not null default '{}',
  optional_headers text[] not null default '{}',
  mapping_help jsonb not null default '{}'::jsonb,
  max_rows_per_job integer not null default 2000 check (max_rows_per_job between 1 and 20000),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.data_import_jobs (
  id uuid primary key default gen_random_uuid(),
  entity_code text not null references public.import_templates(entity_code) on delete restrict,
  source_file_name text not null,
  source_file_size bigint check (source_file_size is null or source_file_size >= 0),
  status text not null default 'queued' check (status in ('queued','validating','ready','running','completed','completed_with_errors','failed','cancelled')),
  dry_run boolean not null default true,
  uploaded_by uuid references public.profiles(id) on delete set null,
  total_rows integer not null default 0,
  processed_rows integer not null default 0,
  success_rows integer not null default 0,
  failed_rows integer not null default 0,
  summary jsonb not null default '{}'::jsonb,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.data_import_errors (
  id bigint generated always as identity primary key,
  job_id uuid not null references public.data_import_jobs(id) on delete cascade,
  row_number integer,
  error_code text,
  message text not null,
  row_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists data_import_jobs_entity_idx on public.data_import_jobs(entity_code, created_at desc);
create index if not exists data_import_jobs_uploaded_by_idx on public.data_import_jobs(uploaded_by, created_at desc);
create index if not exists data_import_errors_job_idx on public.data_import_errors(job_id, row_number);

create trigger institutional_email_accounts_set_updated_at
before update on public.institutional_email_accounts
for each row execute function public.set_updated_at();

create trigger import_templates_set_updated_at
before update on public.import_templates
for each row execute function public.set_updated_at();

create trigger data_import_jobs_set_updated_at
before update on public.data_import_jobs
for each row execute function public.set_updated_at();

insert into public.permissions(code,name,module,description) values
('imports.manage','Gestionar importaciones CSV','admin','Validar y ejecutar importaciones masivas controladas desde la Mesa de Ayuda TIC.')
on conflict (code) do update set name=excluded.name,module=excluded.module,description=excluded.description;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r cross join public.permissions p
where r.code='admin' and p.code='imports.manage'
on conflict do nothing;

insert into public.import_templates(entity_code,name,description,required_headers,optional_headers,mapping_help,max_rows_per_job) values
(
  'assets','Activos y equipos','Inventario de equipos, periféricos e infraestructura.',
  array['asset_type','name'],
  array['asset_tag','serial_number','status','criticality','department_code','assigned_email','location','manufacturer','model','purchase_date','warranty_end_date','ip_address','mac_address','metadata_json'],
  '{"asset_type":"Código o nombre del tipo de activo. Si no existe, el importador puede crearlo.","department_code":"Código de la dependencia.","assigned_email":"Correo institucional del funcionario asignado."}'::jsonb,
  2000
),
(
  'institutional_emails','Correos institucionales','Inventario de cuentas de correo institucional, compartidas y de servicio.',
  array['email'],
  array['display_name','account_type','provider','profile_email','department_code','status','aliases','storage_quota_mb','notes','metadata_json'],
  '{"aliases":"Separar varios alias con punto y coma (;).","profile_email":"Correo del perfil titular si aplica.","account_type":"personal, shared, service o distribution."}'::jsonb,
  2000
),
(
  'users','Usuarios y funcionarios','Alta o actualización masiva de funcionarios. Los usuarios nuevos se crean mediante invitación; no se importan contraseñas por CSV.',
  array['email','full_name'],
  array['display_name','department_code','position_code','phone','role_code','is_active'],
  '{"role_code":"requester, agent, approver, auditor, catalog_manager, secretary o admin.","department_code":"La dependencia debe existir o importarse primero.","position_code":"Código del cargo si existe."}'::jsonb,
  1000
),
(
  'departments','Dependencias','Estructura organizacional de secretarías, oficinas y dependencias.',
  array['code','name'],
  array['parent_code','department_type','is_active'],
  '{"parent_code":"Código de la dependencia superior. Puede quedar vacío para dependencias raíz."}'::jsonb,
  1000
)
on conflict (entity_code) do update set
  name=excluded.name,
  description=excluded.description,
  required_headers=excluded.required_headers,
  optional_headers=excluded.optional_headers,
  mapping_help=excluded.mapping_help,
  max_rows_per_job=excluded.max_rows_per_job,
  is_active=true;

alter table public.institutional_email_accounts enable row level security;
alter table public.import_templates enable row level security;
alter table public.data_import_jobs enable row level security;
alter table public.data_import_errors enable row level security;

drop policy if exists institutional_email_accounts_read on public.institutional_email_accounts;
create policy institutional_email_accounts_read on public.institutional_email_accounts
for select to authenticated
using (
  profile_id = auth.uid()
  or public.has_permission('directory.read')
  or public.has_permission('users.manage')
  or public.has_permission('imports.manage')
);

drop policy if exists institutional_email_accounts_manage on public.institutional_email_accounts;
create policy institutional_email_accounts_manage on public.institutional_email_accounts
for all to authenticated
using (public.has_permission('users.manage') or public.has_permission('imports.manage'))
with check (public.has_permission('users.manage') or public.has_permission('imports.manage'));

drop policy if exists import_templates_read on public.import_templates;
create policy import_templates_read on public.import_templates
for select to authenticated using (public.has_permission('imports.manage'));

drop policy if exists import_templates_manage on public.import_templates;
create policy import_templates_manage on public.import_templates
for all to authenticated
using (public.has_permission('imports.manage'))
with check (public.has_permission('imports.manage'));

drop policy if exists data_import_jobs_manage on public.data_import_jobs;
create policy data_import_jobs_manage on public.data_import_jobs
for all to authenticated
using (public.has_permission('imports.manage'))
with check (public.has_permission('imports.manage'));

drop policy if exists data_import_errors_read on public.data_import_errors;
create policy data_import_errors_read on public.data_import_errors
for select to authenticated
using (
  public.has_permission('imports.manage')
  and exists(select 1 from public.data_import_jobs j where j.id=job_id)
);

comment on table public.data_import_jobs is 'Auditable CSV import jobs initiated from Mesa de Ayuda TIC.';
comment on table public.institutional_email_accounts is 'Inventory of municipal institutional email accounts; authentication secrets are never stored here.';


-- ============================================================
-- 22_bootstrap_admin_helpers.sql
-- ============================================================

-- Mesa de Ayuda TIC · 22_bootstrap_admin_helpers.sql
-- Safe bootstrap: does NOT store or embed any password.

create or replace function public.claim_initial_admin()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_email text := lower(coalesce(auth.jwt()->>'email',''));
  v_role_id uuid;
begin
  if v_uid is null then
    raise exception 'authentication_required' using errcode='42501';
  end if;

  if v_email <> 'adminterritorial@sanpedro-valle.gov.co' then
    raise exception 'bootstrap_admin_email_not_allowed' using errcode='42501';
  end if;

  select id into v_role_id from public.roles where code='admin';
  if v_role_id is null then
    raise exception 'admin_role_not_seeded';
  end if;

  insert into public.profiles(id,full_name,display_name,institutional_email,is_active)
  values(v_uid,'Administrador Territorial','Administrador Territorial',v_email,true)
  on conflict(id) do update set
    institutional_email=excluded.institutional_email,
    is_active=true,
    updated_at=now();

  insert into public.user_roles(profile_id,role_id,scope_type,scope_id,granted_by)
  values(v_uid,v_role_id,'global',null,v_uid)
  on conflict (profile_id,role_id,scope_type,scope_id) do nothing;

  insert into public.audit_events(actor_id,entity_type,entity_id,action,new_data,context)
  values(v_uid,'profile',v_uid::text,'bootstrap_admin_claimed',jsonb_build_object('email',v_email),jsonb_build_object('source','claim_initial_admin'));

  return jsonb_build_object('ok',true,'profile_id',v_uid,'role','admin');
end;
$$;

revoke all on function public.claim_initial_admin() from public;
grant execute on function public.claim_initial_admin() to authenticated;

create or replace function public.is_admin_user(profile_uuid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1
    from public.user_roles ur
    join public.roles r on r.id=ur.role_id
    where ur.profile_id=profile_uuid
      and r.code='admin'
      and (ur.valid_until is null or ur.valid_until > now())
  );
$$;

revoke all on function public.is_admin_user(uuid) from public;
grant execute on function public.is_admin_user(uuid) to authenticated;
