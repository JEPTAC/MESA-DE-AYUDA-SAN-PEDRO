# Mesa de Ayuda TIC · Supabase Native · Backend de lanzamiento

Este paquete corresponde al backend de producción para la Mesa de Ayuda TIC de la Alcaldía de San Pedro.

## Principios de lanzamiento

- Sin información operativa simulada.
- Sin usuarios, tickets, activos, correos, reservas ni métricas ficticias.
- Supabase Auth es obligatorio antes de cargar la aplicación.
- El menú se genera con `get_my_app_context()` según rol, equipo y permisos.
- RLS sigue siendo la barrera de autorización aunque el frontend oculte módulos.
- Únicamente cuentas `@sanpedro-valle.gov.co` pueden ser aprovisionadas.
- El superadministrador inicial autorizado es el correo institucional definido en `claim_initial_admin()`.
- La contraseña del administrador NO forma parte de este paquete.

## Roles de lanzamiento

| Rol | Experiencia principal | Equipo |
|---|---|---|
| `requester` | Nueva solicitud, mis solicitudes, ayuda, estado y agenda propia | Ninguno |
| `communications_agent` | Publicaciones/cubrimientos, conocimiento y agenda del equipo | Solo `COM` |
| `tic_agent` | Operación TIC, activos, continuidad, conocimiento y agenda del equipo | Solo `TIC` |
| `coordinator` | Coordinación, agenda e indicadores del/los equipos asignados | 1 o más |
| `admin` | Catálogo, workflows/SLA, configuración y auditoría | Opcional |
| `super_admin` | Control total, usuarios, roles, importaciones y operación | Opcional |
| `approver` | Aprobaciones autorizadas | Según configuración |
| `auditor` | Indicadores y auditoría | Ninguno |

## Orden de aplicación

Aplicar `migrations/01_...sql` hasta `migrations/25_production_launch_final.sql` en orden.

Después desplegar con JWT habilitado:

1. `edge-functions/admin-users`
2. `edge-functions/bulk-import`

Las migraciones crean Storage privado y agregan a Realtime las tablas operativas requeridas.

## Bootstrap inicial

1. Crear en Supabase Auth el usuario institucional superadministrador.
2. Iniciar sesión con ese usuario.
3. Ejecutar `rpc('claim_initial_admin')` una sola vez.
4. Cerrar/reabrir sesión para cargar el contexto `super_admin`.
5. Desde **Usuarios e importaciones** crear el resto de funcionarios.

## Importaciones

Se incluyen CSV vacíos con encabezados para:

- dependencias;
- usuarios;
- activos;
- correos institucionales.

La importación dispone de `dry_run`: primero valida y luego escribe.
Las contraseñas nunca se admiten en CSV.

## Validaciones obligatorias antes de publicación

- Security Advisor sin hallazgos críticos.
- Performance Advisor revisado.
- RLS: requester A no puede leer requester B.
- RLS: Comunicaciones no puede leer/gestionar TIC.
- RLS: TIC no puede leer/gestionar COM.
- Nota interna invisible para requester.
- `admin-users` y `bulk-import` responden 403 a no-superadmin.
- Storage impide acceso a adjuntos de tickets no autorizados.
- Realtime respeta el alcance RLS.
