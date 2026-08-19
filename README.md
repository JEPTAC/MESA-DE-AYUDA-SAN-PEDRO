# MESA 360 · Prototipo de Mesa de Ayuda para Alcaldía

Prototipo frontend sin backend y sin Supabase. Está diseñado para abrirse directamente en navegador y servir como base funcional/visual para una futura integración con autenticación, base de datos, archivos, notificaciones y tiempo real.

## Cómo abrir

Opción rápida: abrir `index.html` en Chrome/Edge.

Opción recomendada para desarrollo local:

```bash
python -m http.server 8080
```

Luego visitar `http://localhost:8080`.

## Incluye

- Portal del funcionario.
- Catálogo modular de servicios.
- Solicitudes de publicaciones, cubrimientos, desarrollo, revisión, correo, equipos, conectividad, accesos, web, datos, seguridad y capacitación.
- Formularios dinámicos según el servicio.
- Asignación sugerida por habilidades + carga.
- Selección manual de responsable.
- Agenda y disponibilidad.
- Centro de operaciones tipo tablero.
- Seguimiento de tickets y SLA.
- Vista de equipo y capacidad.
- Indicadores y reportes.
- Vista administrativa.
- Persistencia local de solicitudes creadas mediante `localStorage`.
- Tres perfiles de demostración: Funcionario, Gestor y Administrador.

## Arquitectura futura con Supabase

La siguiente fase puede incorporar:

- Supabase Auth para funcionarios y roles.
- Tablas `profiles`, `departments`, `services`, `service_fields`, `tickets`, `ticket_events`, `skills`, `staff_skills`, `availability`, `assignments`, `sla_rules`, `approvals` y `attachments`.
- RLS por rol, dependencia y nivel de acceso.
- Storage para evidencias y adjuntos.
- Realtime para bandejas y cambios de estado.
- Edge Functions para enrutamiento, notificaciones y escalamiento.

## Nota

Los datos actuales son ficticios y se utilizan únicamente para demostrar el flujo y el diseño.
