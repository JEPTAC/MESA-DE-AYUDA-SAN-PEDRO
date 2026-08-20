# Mesa de Ayuda TIC v0.6 · Administration Studio / ESM Control Plane

Versión de madurez funcional **pre-Supabase**. El propósito de esta iteración es cerrar la administración, el catálogo y el gobierno de Mesa de Ayuda TIC antes de conectar autenticación, base de datos, RLS, Storage y Realtime.

## Principio de arquitectura

La plataforma separa tres capas:

1. **Experiencia del funcionario:** autoservicio, conocimiento, radicación guiada, seguimiento y agenda.
2. **Operación:** tickets, SLA, capacidad, agenda, incidentes, problemas, cambios, activos y colaboración.
3. **Control Plane:** catálogo, formularios, workflows, roles, permisos, notificaciones, plantillas, auditoría y matriz de servicios.

Supabase deberá persistir y proteger estas estructuras, no redefinir la experiencia.

## Novedades principales v0.6

- Form Builder no-code con borrador y publicación.
- Vista previa del popup de radicación pregunta por pregunta.
- Campos de texto, texto largo, selección, fecha, hora, número, correo, confirmación e información.
- Reordenamiento de preguntas.
- Campos obligatorios, ayuda contextual y condiciones simples.
- Nuevo servicio como borrador y publicación versionada.
- Catálogo ESM multidependencia.
- Servicios de ejemplo para Talento Humano, Almacén, Jurídica y Servicios Generales.
- Workflow Studio avanzado con tareas, formularios, aprobaciones, decisiones, notificaciones, esperas, SLA y automatizaciones.
- Prueba simulada de workflow antes de publicar.
- Versionado de workflows.
- Matriz RBAC de perfiles y permisos.
- Simulación de perfiles desde el selector superior.
- Nuevos perfiles: solicitante, secretario/coordinador, gestor, aprobador, auditor, gestor de catálogo y administrador.
- Centro de reglas de notificación configurable.
- Canales y audiencia por regla.
- Plantillas con variables dinámicas.
- Biblioteca de respuestas rápidas.
- Inserción de respuestas rápidas directamente en la conversación de un ticket.
- Auditoría visual de cambios administrativos.
- Matriz institucional de servicios.
- Búsqueda de servicios en Administration Studio y Workflow Studio.

## Persistencia actual

Se utiliza `localStorage` para simular persistencia del Control Plane. El objeto principal se guarda bajo:

`mesa360_v06_control_plane`

Esta persistencia es únicamente de prototipo y no constituye seguridad.

## Uso sugerido

1. Cambiar la vista de demostración a **Administrador Mesa de Ayuda TIC**.
2. Abrir **Administración 360**.
3. Probar Servicios y pop-ups, Roles, Notificaciones, Plantillas, Auditoría y Matriz.
4. Abrir **Diseñador de workflows** para configurar el ciclo de vida de un servicio.
5. Volver a Funcionario y probar el catálogo multidependencia y la radicación guiada.

