# MESA 360 · Alcaldía de San Pedro

Prototipo funcional de una Mesa de Servicios Institucional para TIC, Comunicaciones, Desarrollo, Datos y servicios internos.

## Versión 0.2 · Planificador visual

Esta iteración incorpora patrones de productos ITSM reconocidos: catálogo de servicios y formularios por tipo de solicitud; colas y SLA; enrutamiento por habilidad, capacidad y disponibilidad; balanceo de carga; autoservicio y agenda de recursos.

### Novedades principales
- Planificador visual por funcionario con línea de tiempo del día.
- Bloques libres y ocupados visibles en la misma fila.
- Vista Día / Semana.
- Buscador de espacios por servicio, duración y equipo.
- Recomendaciones de los mejores horarios según competencia y carga.
- Reserva rápida desde un bloque libre hacia el formulario de solicitud.
- Indicadores de capacidad libre, disponibilidad actual y alta carga.
- Filtros por Comunicaciones, TIC y Datos / Calidad.
- Eventos de cubrimiento, soporte, desarrollo, revisión, reunión y trabajo interno.
- Sin Supabase: datos simulados y `localStorage` para esta fase.

## Uso
Abre `index.html` en un navegador moderno. No requiere instalación ni compilación.

## Próxima fase recomendada
Supabase Auth + tablas de perfiles, servicios, habilidades, tickets, agenda, bloqueos, SLA, aprobaciones y archivos, con RLS y Realtime.
