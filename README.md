# MESA 360 · Alcaldía de San Pedro

Prototipo funcional de una Mesa de Servicios Institucional para TIC, Comunicaciones, Desarrollo, Datos y servicios internos.

## Versión 0.3 · Planificador visual profesional

Esta iteración eleva la agenda de recursos para que las secretarías puedan leer disponibilidad, carga y reservas con mucha más facilidad. El cronograma utiliza una escala temporal ampliable, columnas fijas y navegación tipo scheduler profesional.

### Novedades principales del calendario
- Zoom real de la línea de tiempo, con vista amplia por defecto.
- Control de zoom con botones, deslizador y `Ctrl + rueda`.
- Paneo horizontal arrastrando el fondo del cronograma.
- `Shift + rueda` para desplazamiento horizontal.
- Columnas de **Funcionario / carga** y **Disponibilidad** fijas mientras se mueve la agenda.
- Etiquetas de horas, funcionarios, eventos y espacios libres de mayor tamaño.
- Filas **Amplias** o **Compactas**.
- Cuadrícula configurable en 15, 30 o 60 minutos.
- Línea visual de **Ahora** cuando se consulta el día actual.
- Botón **Encajar día** para mostrar la jornada completa.
- Botón **Ahora** para centrar inmediatamente la hora actual.
- **Vista amplia** para ocultar el buscador lateral y dedicar más espacio al cronograma.
- Posibilidad de ocultar/mostrar los bloques de espacios libres.
- Bloques verdes de disponibilidad clicables para reservar directamente.
- Vista Día y Semana con mayor legibilidad.
- Buscador de espacios por servicio, duración y equipo.
- Recomendaciones de horario según competencia, carga y agenda.
- Indicadores de capacidad libre, disponibilidad y alta carga.

### Atajos del planificador
- `+` / `-`: acercar o alejar.
- `0`: encajar la jornada.
- `N`: centrar la hora actual.
- `F`: activar/desactivar la vista amplia.
- `Ctrl + rueda`: zoom.
- `Shift + rueda`: mover horizontalmente.

## Uso
Abre `index.html` en un navegador moderno. No requiere instalación ni compilación.

Por ahora el prototipo continúa sin Supabase. Usa datos simulados y `localStorage` para las solicitudes.

## Próxima fase recomendada
Supabase Auth + tablas de perfiles, servicios, habilidades, tickets, agenda, bloqueos, SLA, aprobaciones y archivos, con RLS y Realtime. Después se puede habilitar edición colaborativa de agenda, drag & drop de reservas, bloqueos en tiempo real y prevención de conflictos.
