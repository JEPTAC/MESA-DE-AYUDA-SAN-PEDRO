# Arquitectura funcional previa a Supabase

La v0.5 modela las entidades que más adelante se persistirán.

## Identidad y organización
- profiles
- departments
- roles
- permissions
- staff_skills
- work_schedules
- absences

## Catálogo
- service_families
- services
- service_fields
- field_options
- conditional_rules
- service_visibility

## Solicitudes
- tickets
- ticket_messages
- ticket_attachments
- ticket_watchers
- ticket_audit_events
- ticket_relations
- ticket_resolutions
- satisfaction_surveys

## Operación
- assignments
- availability_blocks
- reservations
- sla_policies
- sla_events
- escalations
- approvals

## Workflows
- workflows
- workflow_steps
- workflow_transitions
- workflow_conditions
- workflow_actions
- approval_definitions

## ITSM
- incidents
- incident_ticket_links
- problems
- problem_incident_links
- changes
- change_risk_assessments
- change_approvals
- service_status_events

## ITAM / CMDB
- assets
- asset_types
- asset_assignments
- asset_relationships
- warranties
- software_licenses
- configuration_items

## Conocimiento
- knowledge_articles
- knowledge_versions
- knowledge_categories
- knowledge_service_links
- knowledge_feedback
- knowledge_review_cycles

## Notificaciones
- notifications
- notification_preferences
- notification_templates
- delivery_events

## Regla de seguridad futura
El navegador del solicitante no debe recibir notas internas. La separación no será solamente visual: RLS y las consultas deberán impedir la lectura de registros `visibility=internal` para usuarios no autorizados.
