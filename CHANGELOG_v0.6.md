# Changelog · MESA 360 v0.6

## Administración / Control Plane
- Se reemplaza la configuración informativa por Administration Studio funcional.
- Se implementa modelo borrador/publicado para servicios.
- Se incorpora versionado simulado de servicios y workflows.
- Se registra auditoría de publicaciones, roles, permisos y reglas.

## Form Builder
- Editor de preguntas por servicio.
- Tipos de campo configurables.
- Requerido/opcional.
- Ayuda contextual.
- Opciones de select editables.
- Reordenamiento.
- Lógica condicional simple.
- Vista previa del popup.
- Creación de servicios desde la interfaz.

## ESM
- Catálogo organizado por área propietaria.
- Nuevas áreas: Talento Humano, Almacén y recursos, Jurídica, Servicios Generales.
- Enrutamiento a cola de área para servicios ESM que todavía no tienen funcionarios reales cargados.

## Workflow Studio
- Caja de herramientas visual.
- Formulario, tarea, aprobación, condición, notificación, espera, SLA y automatización.
- Inspector de propiedades.
- Reordenamiento y eliminación.
- Prueba estructural simulada.
- Publicación versionada.
- Zoom básico del lienzo.

## Roles y seguridad funcional
- Matriz de permisos por perfil.
- Simulación de experiencia por perfil.
- Ocultamiento de acciones del ticket según permisos simulados.
- Modelo preparado para RLS posterior.

## Comunicaciones
- Reglas configurables de notificación.
- Disparador, audiencia, canales, plantilla y estado.
- Prueba de envío simulada.
- Biblioteca de respuestas rápidas con variables.
- Inserción de plantilla desde la conversación del ticket.

## Gobierno
- Auditoría visual global.
- Matriz institucional de servicios.
- Búsquedas internas de Administration Studio y Workflow Studio.
