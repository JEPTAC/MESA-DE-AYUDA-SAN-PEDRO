# Referencias funcionales usadas en MESA 360 v0.2

La versión 0.2 toma patrones de uso comunes en plataformas ITSM empresariales y los adapta a una alcaldía, sin copiar su interfaz ni depender de ellas.

- ServiceNow: asignación por habilidades, disponibilidad y capacidad; calendario de agente; enfoque de workspace para operación.
- Jira Service Management: tipos de solicitud, formularios, colas, prioridades, SLA y visualización de trabajo en calendario.
- Freshservice: catálogo de servicios, automatización de flujos, calendario de tareas y visibilidad de agentes/departamentos.
- Zendesk: enrutamiento por estado, capacidad, habilidades y prioridad.
- ManageEngine ServiceDesk Plus: autoasignación, round robin, balanceo de carga y exclusión de técnicos no disponibles.

## Adaptación municipal

En MESA 360 estas ideas se traducen en:

1. Catálogo comprensible para funcionarios no técnicos.
2. Formularios específicos según el servicio.
3. Equipo responsable definido por función y competencia.
4. Selección manual entre funcionarios compatibles cuando corresponda.
5. Planificador visual de disponibilidad para secretarías.
6. Recomendación de horario según servicio, duración, ocupación y agenda.
7. Vista día y semana.
8. Identificación visual de espacios libres, reuniones, cubrimientos, soporte, desarrollo y revisiones.
9. Reserva de un espacio desde la agenda hacia la creación de solicitud.
10. Preparación para persistencia real en Supabase en una fase posterior.
