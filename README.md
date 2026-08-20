# Supabase · Mesa de Ayuda TIC v1

Backend preparado para el proyecto objetivo de la Mesa de Ayuda TIC.

## Estado de aplicación

El paquete está listo para migración, pero **todavía no fue aplicado al proyecto objetivo** porque el conector Supabase disponible en esta conversación no tiene permiso sobre ese proyecto. No se incluyeron claves ni contraseñas dentro de estos archivos.

## Orden de migraciones

Ejecutar en orden los archivos de `migrations/`:

1. `01_extensions_and_types.sql`
2. `02_organization.sql`
3. `03_auth_profiles_rbac.sql`
4. `04_catalog_forms.sql`
5. `05_tickets_core.sql`
6. `06_messages_attachments_audit.sql`
7. `07_skills_routing.sql`
8. `08_calendar_capacity.sql`
9. `09_sla.sql`
10. `10_workflows.sql`
11. `11_approvals.sql`
12. `12_knowledge.sql`
13. `13_assets_cmdb.sql`
14. `14_itsm_continuity.sql`
15. `15_notifications_surveys.sql`
16. `16_functions_triggers.sql`
17. `17_security_helpers_rls.sql`
18. `18_storage_realtime.sql`
19. `19_seed_core.sql`
20. `20_validation.sql`

## Qué queda creado

- organización: dependencias, cargos, equipos y miembros;
- Auth/Profile y RBAC granular;
- catálogo, formularios dinámicos, opciones y condiciones;
- tickets, datos del formulario, estados, relaciones, etiquetas y watchers;
- conversación pública vs. notas internas;
- adjuntos privados con Supabase Storage;
- skills y asignación por competencia/carga;
- agenda, horarios, ausencias, reservas y festivos;
- SLA por horas laborales, pausas y eventos;
- workflows versionados;
- aprobaciones y delegación;
- conocimiento y artículos versionados;
- activos y CMDB;
- incidentes, problemas, cambios y estado de servicios;
- notificaciones y encuestas CSAT;
- auditoría;
- RLS;
- Realtime para tickets, mensajes, notificaciones y reservas;
- RPCs para radicar, responder, asignar, cambiar estado, aprobar y reservar.

## Seguridad

La frontera principal es RLS. El solicitante no puede leer notas internas ni solicitudes de otros funcionarios. Los gestores acceden por asignación/equipo/permisos. Los cambios administrativos requieren permisos explícitos.

## Integración frontend

La carpeta `integration/` incluye una base de conexión para reemplazar gradualmente `localStorage` y los arrays simulados de la v1.0.

## Recomendación al conectar el proyecto

Después de aplicar las migraciones:

1. ejecutar `20_validation.sql`;
2. revisar Supabase Security Advisors;
3. crear los primeros usuarios;
4. asignar el rol `admin` al administrador inicial mediante SQL seguro;
5. configurar dependencias y miembros reales;
6. conectar el frontend por módulos: Auth → Catálogo → Tickets → Mensajes → Agenda → SLA → demás módulos.


## Actualización: administración de usuarios e importación CSV

Se agregaron las migraciones `21_import_center_and_email_inventory.sql` y `22_bootstrap_admin_helpers.sql`.

También se prepararon dos Edge Functions:
- `admin-users`: alta/invitación de usuarios, cambio de contraseña, roles, perfil y activación.
- `bulk-import`: validación y carga CSV de activos, correos institucionales, usuarios y dependencias.

El administrador inicial permitido por bootstrap es `adminterritorial@sanpedro-valle.gov.co`. La contraseña **no** se almacena en SQL ni en archivos; el usuario debe registrarse/autenticarse con Supabase Auth y ejecutar `claim_initial_admin()` una sola vez para reclamar el rol administrativo.

Los datos operativos de activos, correos y usuarios permanecen vacíos. Se incluyen plantillas CSV solo con encabezados en `templates/`.
