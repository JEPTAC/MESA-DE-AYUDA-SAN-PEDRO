# MESA 360 v0.5 · Enterprise Service Management pre-backend

## Objetivo de esta versión
Llevar el prototipo a una madurez funcional avanzada antes de conectar Supabase. La experiencia, los módulos y las relaciones de negocio quedan definidos para que la última fase se concentre en identidad, persistencia, permisos, archivos y tiempo real.

## Nuevas capacidades
- Portal **Mis solicitudes PRO** con filtros: todas, requieren respuesta, actualizadas, en proceso, programadas y resueltas.
- Búsqueda dentro de títulos, descripciones y conversación.
- **Centro de actualizaciones** con leídos/no leídos y acceso directo al radicado.
- **Centro de conocimiento** con artículos, búsqueda, categorías, utilidad y radicación desde la respuesta.
- Conocimiento contextual dentro del wizard de soporte.
- Preguntas condicionales en la radicación guiada.
- **Estado de servicios** para informar degradaciones y disminuir tickets duplicados.
- Separación en el modelo local de **respuesta pública** y **nota interna**.
- Ficha 360 ampliada: resumen, actividad, adjuntos, SLA, aprobación, relacionados y resolución.
- Evidencias/adjuntos simulados preparados para Storage.
- Confirmación de solución, reapertura y CSAT.
- **Incidentes, problemas y cambios** con MESA Radar para detectar patrones.
- **Activos + CMDB** con relaciones entre activo, usuario, dependencia, IP y ticket.
- **Constructor de workflows no-code** por servicio.
- Centro de Comandos ampliado para buscar conocimiento y activos.
- Analítica ampliada: SLA, autoservicio, CSAT, reaperturas, conocimiento y capacidad.
- Administración con matriz de madurez pre-backend.
- Herramientas de accesibilidad: aumento/disminución de texto y alto contraste.

## Qué queda deliberadamente para Supabase
- Supabase Auth y perfiles reales.
- RLS para aislamiento por usuario, dependencia y rol.
- Persistencia PostgreSQL de tickets, mensajes, workflows, activos, SLA y auditoría.
- Storage para adjuntos y evidencias.
- Realtime para respuestas, bandejas, agenda y notificaciones.
- Edge Functions / jobs para escalamiento, notificaciones e integraciones.

## Principio de arquitectura
Supabase será la capa final de datos y seguridad. No debe obligar a rediseñar el producto.
