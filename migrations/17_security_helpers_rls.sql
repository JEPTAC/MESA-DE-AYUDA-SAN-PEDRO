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

