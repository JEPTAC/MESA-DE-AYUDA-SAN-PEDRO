# Administration Studio · Diseño funcional

## 1. Servicios y pop-ups

Cada servicio conserva:
- propietario/área;
- categoría;
- SLA;
- aprobación;
- habilidades/cola;
- versión publicada;
- borrador;
- secuencia de campos;
- condiciones;
- fecha de actualización.

### Ciclo de edición

`Publicado → Crear/editar borrador → Vista previa → Publicar nueva versión`

La configuración publicada es la que utiliza la radicación guiada.

## 2. Workflow Studio

Modelo objetivo:
- `workflow`
- `workflow_version`
- `workflow_node`
- `workflow_transition`
- `workflow_condition`
- `workflow_action`
- `workflow_execution`
- `workflow_execution_step`

Los bloques visibles en v0.6 representan la futura configuración persistente.

## 3. RBAC

La v0.6 modela permisos funcionales. La fase Supabase deberá convertirlos en:
- roles/perfiles;
- scopes por dependencia;
- permisos de acción;
- políticas RLS;
- claims o relaciones de autorización;
- auditoría de decisiones sensibles.

## 4. Notificaciones

Cada regla contiene:
- trigger;
- audiencia;
- canales;
- plantilla;
- estado;
- criticidad.

La v0.6 solo simula eventos. En producción, las reglas podrán disparar notificación in-app, correo institucional y otros conectores aprobados.

## 5. Plantillas

Las respuestas rápidas soportan variables de contexto. El objetivo es acelerar respuestas repetitivas sin perder personalización ni trazabilidad.

## 6. Auditoría

El prototipo ya separa auditoría administrativa de la actividad del ticket. Supabase deberá almacenar estos eventos de manera persistente y restringida.
