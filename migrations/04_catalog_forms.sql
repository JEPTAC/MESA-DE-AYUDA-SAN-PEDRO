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
