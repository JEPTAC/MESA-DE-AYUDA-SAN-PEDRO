# MESA 360 · Alcaldía de San Pedro
## Prototipo v0.4 · Service Desk Institucional

MESA 360 es un prototipo frontend de mesa de servicios para la Alcaldía. Esta versión sigue trabajando **sin Supabase**: utiliza datos simulados y `localStorage` para probar la experiencia, flujos, asignación y visualización antes de conectar autenticación, PostgreSQL, Storage, RLS y Realtime.

### Novedades v0.4

- **Radicación asistida por pop-ups**: categoría → servicio → comprobación rápida → preguntas una por una → agenda → responsable → revisión → radicación.
- Formularios realmente distintos por servicio: publicaciones, cubrimientos, desarrollo, revisión, correo, equipos, internet, accesos, web, datos, seguridad y capacitación.
- Explicación de por qué se solicita cada dato y validación de campos obligatorios.
- Comprobaciones de autoservicio para correo, internet, equipos y accesos antes de generar un ticket.
- Programación inteligente con búsqueda de espacios según competencia, carga y disponibilidad.
- Asignación automática o seleccionable según la naturaleza del servicio.
- Servicios con aprobación generan el estado **En aprobación** y muestran el aprobador correspondiente.
- **Centro de Comandos** con `Ctrl + K` para buscar solicitudes, abrir vistas o iniciar un servicio.
- **Centro de Operaciones PRO** con bandejas: Ahora, En riesgo, Aprobaciones, Programados, Sin asignar y Todos.
- Semáforo SLA: En tiempo, En riesgo, Crítico, Pausado, En aprobación y Cumplido.
- **Ficha 360° de solicitud** con Resumen, Actividad, SLA y Aprobación.
- Comentarios visibles al funcionario y notas internas para gestores.
- Aprobación operativa simulada desde la ficha de la solicitud.
- **Calendario PRO 2.0**: zoom, paneo, escala temporal amplia y drag & drop de actividades entre funcionarios/horarios para perfiles gestores.
- Detección de cruces al reprogramar y bloqueo de movimientos fuera de la jornada laboral.

### Uso

1. Abre `index.html` en un navegador moderno.
2. Cambia la vista entre **Funcionario**, **Gestor** y **Administrador** desde el selector del menú lateral.
3. Como Funcionario, pulsa **Crear solicitud** y recorre el asistente guiado.
4. Como Gestor, abre **Centro de Operaciones** y **Agenda y disponibilidad**.
5. Usa `Ctrl + K` para abrir el Centro de Comandos.

### Persistencia del prototipo

Las solicitudes creadas se guardan en `localStorage` del navegador. Las actividades preconfiguradas del calendario son datos simulados en memoria. Esta versión no realiza llamadas externas ni requiere backend.

### Próxima fase recomendada

Conectar Supabase para: perfiles/roles, catálogo configurable, tickets, estados, eventos de auditoría, archivos, comentarios, aprobaciones, disponibilidad, ausencias, reglas SLA, notificaciones y seguridad RLS.
