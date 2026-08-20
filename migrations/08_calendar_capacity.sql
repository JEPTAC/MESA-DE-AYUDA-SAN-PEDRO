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
