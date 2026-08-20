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
