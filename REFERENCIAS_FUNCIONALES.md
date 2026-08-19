# Referencias funcionales usadas en MESA 360 v0.3

MESA 360 adapta patrones de plataformas ITSM y de planificación de recursos reconocidas, sin copiar sus interfaces ni depender de sus productos.

## Mesa de servicios / ITSM
- **ServiceNow**: asignación por habilidades, disponibilidad y capacidad; calendario del agente; workspace operacional.
- **Jira Service Management**: tipos de solicitud, formularios, colas, prioridades, SLA y organización del trabajo.
- **Freshservice**: catálogo de servicios, automatización, tareas y visibilidad de agenda de agentes/departamentos.
- **Zendesk**: enrutamiento por capacidad, habilidades, estado y prioridad.
- **ManageEngine ServiceDesk Plus**: autoasignación, balanceo de carga y consideración de disponibilidad.

## Planificadores visuales estudiados para v0.3
- **FullCalendar Scheduler**: líneas de tiempo horizontales por recurso, navegación temporal y edición de eventos.
  https://fullcalendar.io/docs/timeline-view
- **DHTMLX Scheduler**: Timeline/Units, planificación de recursos y edición mediante drag/resize.
  https://docs.dhtmlx.com/scheduler/views/timeline/
- **Bryntum Scheduler**: timeline de recursos, paneo y programación visual mediante drag & drop.
  https://bryntum.com/products/scheduler/

## Adaptación municipal
En MESA 360 estas ideas se traducen en:

1. Catálogo comprensible para funcionarios no técnicos.
2. Formularios específicos según servicio.
3. Responsables definidos por función y competencia.
4. Selección manual entre funcionarios compatibles cuando corresponda.
5. Recomendación basada en habilidad, ocupación y espacios de agenda.
6. Cronograma con escala temporal real y zoom.
7. Paneo horizontal mediante arrastre.
8. Columnas fijas de funcionario y disponibilidad.
9. Cuadrícula de 15/30/60 minutos.
10. Vista Día / Semana y modo de visualización amplia.
11. Bloques visuales diferenciados por cubrimiento, soporte, reunión, desarrollo, revisión y trabajo interno.
12. Reserva desde un espacio libre hacia el formulario de solicitud.
13. Preparación para persistencia y colaboración real con Supabase en una fase posterior.
