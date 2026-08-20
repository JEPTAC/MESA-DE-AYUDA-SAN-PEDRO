# Plan de aplicación al proyecto Supabase

Project ref: `jppykxqsxayzypzdbnqd`

1. Aplicar migraciones `01` a `22` en orden con `apply_migration`.
2. Validar tablas públicas, funciones y políticas RLS.
3. Desplegar Edge Function `admin-users` con `verify_jwt=true`.
4. Desplegar Edge Function `bulk-import` con `verify_jwt=true`.
5. Crear/autenticar el usuario inicial desde Supabase Auth usando el correo autorizado.
6. Ejecutar `select public.claim_initial_admin()` desde la sesión del usuario (la UI v1.1 lo hace mediante RPC).
7. Ejecutar Security Advisor y Performance Advisor.
8. Verificar Storage/Reatime configurados por migración 18.
9. Probar desde la UI: login, creación de usuario, cambio de clave, validación CSV e importación CSV.

## Importante
No almacenar la contraseña del administrador ni una service-role key en migraciones, Git, archivos ZIP o frontend.
