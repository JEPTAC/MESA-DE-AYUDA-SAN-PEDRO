# Edge Functions · Mesa de Ayuda TIC

## `admin-users`
JWT requerido. Solo usuarios con rol `admin` pueden ejecutar acciones.

Acciones JSON:
- `list`
- `create`
- `change_password`
- `set_roles`
- `update_profile`
- `set_active`

`create` permite crear con contraseña explícita o enviar invitación cuando no se suministra contraseña.
Las contraseñas no se guardan en tablas de la aplicación ni en auditoría.

## `bulk-import`
JWT requerido. Solo administradores.
Recibe `multipart/form-data` con:
- `file`: CSV
- `entity`: `assets`, `institutional_emails`, `users`, `departments`
- `dry_run`: `true` / `false`

Siempre se recomienda ejecutar primero con `dry_run=true`.
Los CSV de usuarios NO aceptan columnas `password` ni `clave`; los usuarios nuevos se invitan por correo. El cambio de contraseña administrativo se hace con `admin-users`.

## Secrets
Las Edge Functions usan únicamente secrets administrados por Supabase:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Nunca incluir la service-role key en el frontend.
