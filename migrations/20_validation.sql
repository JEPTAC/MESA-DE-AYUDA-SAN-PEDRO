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
