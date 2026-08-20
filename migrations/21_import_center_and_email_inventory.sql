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
