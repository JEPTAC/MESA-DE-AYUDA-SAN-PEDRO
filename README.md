# Mesa de Ayuda TIC · Visual Rebuild 2026

Versión reconstruida de la experiencia visual de la Mesa de Ayuda TIC de la Alcaldía de San Pedro.

## Qué conserva
- Portal del funcionario.
- Radicación guiada por pasos y preguntas condicionales.
- Mis solicitudes y conversación por ticket.
- Centro de conocimiento.
- Estado de servicios.
- Agenda y disponibilidad con zoom, paneo, vista día/semana y reservas.
- Centro de operaciones.
- Incidentes, problemas y cambios.
- Equipo y capacidad.
- Activos / CMDB.
- Catálogo de servicios.
- Indicadores.
- Workflow Studio y Administración pre-Supabase.

## Qué se reconstruyó
- Estructura visual completa de la aplicación.
- Identidad "Mesa de Ayuda TIC".
- Uso del logo institucional suministrado.
- Navegación lateral, topbar y navegación móvil.
- Tipografía con tamaño mínimo legible.
- Sistema SVG coherente y reconocible para navegación y servicios.
- Botones, cards, filtros, tablas, modales, command palette y drawers.
- Centro de conocimiento y portal de solicitudes.
- Calendario / resource scheduler con mayor escala visual.
- Responsive para portátil, tablet, 780/640 px y móvil.

## Arquitectura del prototipo
La entrega utiliza únicamente:
- `index.html`
- `app.css`
- `app.bundle.js`
- `assets/logo-san-pedro.png`

La lógica sigue siendo local/simulada. Supabase continúa deliberadamente fuera de esta fase.
