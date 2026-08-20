-- Mesa de Ayuda TIC · 19_seed_core.sql
-- Safe seed: no auth users and no generated IDs referenced directly.

insert into public.roles(code,name,description,is_system) values
('requester','Funcionario solicitante','Radica y consulta sus propias solicitudes.',true),
('secretary','Secretario / coordinador','Consulta y acompaña solicitudes de su ámbito.',true),
('agent','Gestor TIC','Opera colas, tickets y agenda.',true),
('approver','Aprobador','Atiende solicitudes de aprobación.',true),
('auditor','Auditor / Control Interno','Consulta trazabilidad y auditoría.',true),
('catalog_manager','Gestor de catálogo','Administra servicios, formularios y conocimiento.',true),
('admin','Administrador Mesa de Ayuda TIC','Administración global.',true)
on conflict (code) do update set name=excluded.name, description=excluded.description, is_system=excluded.is_system;

insert into public.permissions(code,name,module,description) values
('directory.read','Consultar directorio','organization','Consultar perfiles necesarios para operación.'),
('users.manage','Gestionar usuarios','organization','Actualizar perfiles y organización.'),
('teams.manage','Gestionar equipos','organization','Gestionar membresías, habilidades y capacidad.'),
('roles.manage','Gestionar roles y permisos','security','Administrar RBAC.'),
('catalog.manage','Gestionar catálogo','catalog','Administrar categorías, servicios y formularios.'),
('tickets.create.for_others','Radicar para terceros','tickets','Crear solicitudes en nombre de otro funcionario.'),
('tickets.read.all','Leer todas las solicitudes','tickets','Acceso global a tickets.'),
('tickets.manage.all','Gestionar todas las solicitudes','tickets','Gestionar cualquier ticket.'),
('tickets.assign','Asignar solicitudes','tickets','Asignar y reasignar tickets.'),
('tickets.internal_notes','Ver y crear notas internas','tickets','Acceso a conversación interna.'),
('calendar.manage','Gestionar agenda','calendar','Administrar reservas y disponibilidad.'),
('sla.manage','Gestionar SLA','sla','Configurar políticas y objetivos.'),
('workflow.read','Consultar workflows','workflow','Leer diseño de procesos.'),
('workflow.manage','Gestionar workflows','workflow','Crear, versionar y publicar workflows.'),
('approvals.manage','Gestionar aprobaciones','workflow','Administrar decisiones y delegaciones.'),
('knowledge.manage','Gestionar conocimiento','knowledge','Crear y publicar artículos.'),
('assets.read','Consultar activos y CMDB','assets','Acceso de lectura a activos.'),
('assets.manage','Gestionar activos y CMDB','assets','Administración de inventario/CMDB.'),
('itsm.read','Consultar ITSM','itsm','Consultar incidentes, problemas y cambios.'),
('itsm.manage','Gestionar ITSM','itsm','Gestionar incidentes, problemas, cambios y estado de servicios.'),
('notifications.manage','Gestionar notificaciones','notifications','Configurar reglas y entregas.'),
('audit.read','Consultar auditoría','audit','Leer eventos de auditoría.'),
('reports.read','Consultar indicadores','reports','Consultar reportes y satisfacción.'),
('admin.settings','Administración global','admin','Administrar configuración global.')
on conflict (code) do update set name=excluded.name, module=excluded.module, description=excluded.description;

-- Role grants.
insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r cross join public.permissions p
where r.code='admin'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in (
  'directory.read','tickets.manage.all','tickets.assign','tickets.internal_notes','calendar.manage','workflow.read','itsm.read','assets.read','reports.read'
) where r.code='agent'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in ('directory.read','approvals.manage') where r.code='approver'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in ('audit.read','reports.read','itsm.read','assets.read') where r.code='auditor'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in ('catalog.manage','knowledge.manage','workflow.read') where r.code='catalog_manager'
on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.code in ('directory.read','tickets.create.for_others','reports.read') where r.code='secretary'
on conflict do nothing;

insert into public.teams(code,name,description,team_type) values
('TIC','TIC','Mesa técnica, soporte, infraestructura, desarrollo y seguridad.','service'),
('COM','Comunicaciones','Publicaciones, contenidos y cubrimientos.','service'),
('DATOS','Datos y Calidad','Datos, BI, calidad digital y validaciones.','service')
on conflict (code) do update set name=excluded.name, description=excluded.description;

insert into public.service_categories(code,name,description,icon,color,sort_order) values
('comunicaciones','Comunicaciones','Publicaciones, cubrimientos y sitio web.','megaphone','#1769ff',10),
('soporte_tic','Soporte TIC','Correo, equipos, conectividad y soporte.','headset','#0e8fd6',20),
('desarrollo_datos','Desarrollo y datos','Aplicaciones, automatización, datos e informes.','code','#7357d9',30),
('calidad_digital','Calidad digital','Revisiones, QA y validación.','check','#14a36f',40),
('identidad_acceso','Identidad y acceso','Usuarios, permisos y accesos.','key','#d4644b',50),
('seguridad_digital','Seguridad digital','Incidentes y riesgos de seguridad.','shield','#d94b5c',60),
('acompanamiento','Acompañamiento','Capacitación y orientación.','graduation','#14a36f',70)
on conflict (code) do update set name=excluded.name, description=excluded.description, icon=excluded.icon, color=excluded.color, sort_order=excluded.sort_order;

insert into public.skills(code,name) values
('diseno','Diseño'),('redes_sociales','Redes sociales'),('web','Web'),('foto_video','Foto/Video'),('protocolo','Protocolo'),
('desarrollo','Desarrollo'),('procesos','Procesos'),('datos','Datos'),('qa','QA'),('comunicaciones','Comunicaciones'),
('correo','Correo'),('microsoft365','Microsoft 365'),('soporte','Soporte'),('hardware','Hardware'),('redes_datos','Redes de datos'),
('infraestructura','Infraestructura'),('identidad','Identidad'),('seguridad','Seguridad'),('contenido','Contenido'),('accesibilidad','Accesibilidad'),
('bi','BI'),('capacitacion','Capacitación')
on conflict (code) do update set name=excluded.name;

-- Services aligned with the v1.0 frontend.
with data(code,category_code,owner_team_code,name,description,service_type,routing_mode,requires_approval,requires_schedule,critical) as (
  values
  ('publicaciones','comunicaciones','COM','Solicitar publicación','Piezas, copys, publicación en web, redes sociales o canales institucionales.','request','skill_capacity',true,false,false),
  ('cubrimientos','comunicaciones','COM','Solicitar cubrimiento','Fotografía, video, transmisión, acompañamiento o registro de eventos institucionales.','scheduled','skill_capacity',false,true,false),
  ('desarrollo','desarrollo_datos','TIC','Aplicaciones y automatizaciones','Crear, mejorar o automatizar aplicaciones, formularios, procesos y herramientas internas.','request','skill_capacity',true,false,false),
  ('revision','calidad_digital','DATOS','Revisión y validación','Revisar piezas, documentos, páginas, formularios, aplicaciones o contenidos antes de publicar.','request','skill_capacity',false,false,false),
  ('correo','soporte_tic','TIC','Correo institucional','Acceso, bloqueo, creación, contraseña, configuración, envío/recepción y listas de correo.','request','skill_capacity',false,false,false),
  ('equipos','soporte_tic','TIC','Equipo o periférico','Computador, impresora, escáner, proyector, periféricos o mantenimiento preventivo.','request','skill_capacity',false,false,false),
  ('internet','soporte_tic','TIC','Internet y conectividad','Wi-Fi, red cableada, VPN, acceso a servicios, puntos de red e intermitencias.','incident','skill_capacity',false,false,false),
  ('accesos','identidad_acceso','TIC','Usuarios, accesos y permisos','Altas, bajas, permisos, bloqueos y accesos a sistemas o recursos institucionales.','access','skill_capacity',true,false,false),
  ('web','comunicaciones','COM','Sitio web institucional','Actualizar páginas, publicar información, corregir enlaces, crear secciones o formularios web.','request','skill_capacity',false,false,false),
  ('datos','desarrollo_datos','DATOS','Datos e informes','Extracciones, consolidaciones, tableros, indicadores, depuración y análisis de información.','request','skill_capacity',false,false,false),
  ('seguridad','seguridad_digital','TIC','Incidente de seguridad','Phishing, malware, cuenta comprometida, pérdida de equipo o comportamiento sospechoso.','incident','fixed_team',false,false,true),
  ('capacitacion','acompanamiento','TIC','Capacitación o acompañamiento','Solicitar orientación, capacitación o asistencia para herramientas digitales y procesos.','scheduled','skill_capacity',false,true,false)
)
insert into public.services(code,category_id,owner_team_id,name,description,service_type,routing_mode,requires_approval,requires_schedule,is_critical)
select d.code,c.id,t.id,d.name,d.description,d.service_type,d.routing_mode,d.requires_approval,d.requires_schedule,d.critical
from data d
join public.service_categories c on c.code=d.category_code
left join public.teams t on t.code=d.owner_team_code
on conflict (code) do update set
  category_id=excluded.category_id, owner_team_id=excluded.owner_team_id, name=excluded.name, description=excluded.description,
  service_type=excluded.service_type, routing_mode=excluded.routing_mode, requires_approval=excluded.requires_approval,
  requires_schedule=excluded.requires_schedule, is_critical=excluded.is_critical, updated_at=now();

-- Default work schedule: Colombia municipal office, Mon-Fri, 08:00-12:00 / 13:00-17:00.
insert into public.work_schedules(name,timezone,is_default,is_active)
values ('Jornada institucional','America/Bogota',true,true)
on conflict (name) do update set timezone=excluded.timezone,is_default=true,is_active=true;

insert into public.work_schedule_days(schedule_id,weekday,start_time,end_time,second_start_time,second_end_time,is_working_day)
select s.id,d.weekday,d.start_time,d.end_time,d.second_start,d.second_end,d.is_working
from public.work_schedules s
cross join (values
  (0,null::time,null::time,null::time,null::time,false),
  (1,'08:00'::time,'12:00'::time,'13:00'::time,'17:00'::time,true),
  (2,'08:00'::time,'12:00'::time,'13:00'::time,'17:00'::time,true),
  (3,'08:00'::time,'12:00'::time,'13:00'::time,'17:00'::time,true),
  (4,'08:00'::time,'12:00'::time,'13:00'::time,'17:00'::time,true),
  (5,'08:00'::time,'12:00'::time,'13:00'::time,'17:00'::time,true),
  (6,null::time,null::time,null::time,null::time,false)
) d(weekday,start_time,end_time,second_start,second_end,is_working)
where s.name='Jornada institucional'
on conflict (schedule_id,weekday) do update set
  start_time=excluded.start_time,end_time=excluded.end_time,second_start_time=excluded.second_start_time,second_end_time=excluded.second_end_time,is_working_day=excluded.is_working_day;

-- Forms/fields from current prototype.
insert into public.service_forms(service_id,version,name,is_draft,is_published,published_at)
select id,1,name || ' · Formulario v1',false,true,now() from public.services
on conflict (service_id,version) do update set is_draft=false,is_published=true,published_at=coalesce(public.service_forms.published_at,now());

-- Field helper data.
with form_map as (select s.code service_code,f.id form_id from public.services s join public.service_forms f on f.service_id=s.id and f.version=1),
field_data(service_code,field_key,label,field_type,required,sort_order) as (
 values
 ('publicaciones','canal','Canal requerido','select',true,10),('publicaciones','fecha_publicacion','Fecha ideal de publicación','date',true,20),('publicaciones','objetivo','Objetivo y mensaje principal','textarea',true,30),('publicaciones','insumos','¿Cuenta con insumos?','select',true,40),('publicaciones','archivos','Enlace o ubicación de archivos','text',false,50),
 ('cubrimientos','tipo','Tipo de cubrimiento','select',true,10),('cubrimientos','fecha','Fecha del evento','date',true,20),('cubrimientos','hora_inicio','Hora de inicio','time',true,30),('cubrimientos','hora_fin','Hora estimada de finalización','time',true,40),('cubrimientos','lugar','Lugar','text',true,50),('cubrimientos','descripcion','Descripción del evento','textarea',true,60),
 ('desarrollo','tipo','Tipo de necesidad','select',true,10),('desarrollo','problema','Problema que se quiere resolver','textarea',true,20),('desarrollo','usuarios','Usuarios o dependencias involucradas','text',true,30),('desarrollo','fecha_objetivo','Fecha objetivo','date',false,40),('desarrollo','impacto','Impacto esperado','select',true,50),
 ('revision','elemento','Elemento a revisar','select',true,10),('revision','enlace','Enlace o archivo','text',true,20),('revision','validacion','Qué debe validarse','textarea',true,30),('revision','fecha_limite','Fecha límite','date',true,40),
 ('correo','tipo','Tipo de problema','select',true,10),('correo','cuenta','Cuenta afectada','email',true,20),('correo','descripcion','Descripción','textarea',true,30),
 ('equipos','equipo','Equipo','select',true,10),('equipos','activo','Activo / placa (si aplica)','text',false,20),('equipos','sintoma','Síntoma o falla','textarea',true,30),('equipos','impide_trabajar','¿Impide trabajar?','select',true,40),
 ('internet','conexion','Tipo de conexión','select',true,10),('internet','ubicacion','Ubicación','text',true,20),('internet','descripcion','Descripción de la falla','textarea',true,30),('internet','personas_afectadas','¿A cuántas personas afecta?','number',true,40),
 ('accesos','solicitud','Solicitud','select',true,10),('accesos','usuario','Usuario involucrado','text',true,20),('accesos','recurso','Sistema / recurso','text',true,30),('accesos','justificacion','Justificación','textarea',true,40),
 ('web','tipo','Tipo de cambio','select',true,10),('web','url','URL o sección','text',false,20),('web','detalle','Detalle del cambio','textarea',true,30),('web','fecha','Fecha requerida','date',false,40),
 ('datos','producto','Producto esperado','select',true,10),('datos','fuentes','Fuentes de información','text',true,20),('datos','descripcion','Descripción del requerimiento','textarea',true,30),('datos','fecha_corte','Fecha de corte','date',false,40),
 ('seguridad','tipo','Tipo de incidente','select',true,10),('seguridad','ocurrio','Qué ocurrió','textarea',true,20),('seguridad','hora','Hora aproximada','time',false,30),('seguridad','conectado','¿El equipo sigue conectado?','select',true,40),
 ('capacitacion','tema','Tema','text',true,10),('capacitacion','asistentes','Número aproximado de asistentes','number',true,20),('capacitacion','modalidad','Modalidad','select',true,30),('capacitacion','fecha','Fecha preferida','date',false,40),('capacitacion','necesidad','Necesidad específica','textarea',true,50)
)
insert into public.service_fields(form_id,field_key,label,field_type,is_required,sort_order)
select fm.form_id,fd.field_key,fd.label,fd.field_type,fd.required,fd.sort_order
from field_data fd join form_map fm on fm.service_code=fd.service_code
on conflict (form_id,field_key) do update set label=excluded.label,field_type=excluded.field_type,is_required=excluded.is_required,sort_order=excluded.sort_order;

-- Options for select fields.
with field_map as (
 select s.code service_code,sf.field_key,sf.id field_id from public.services s join public.service_forms f on f.service_id=s.id and f.version=1 join public.service_fields sf on sf.form_id=f.id
), options(service_code,field_key,value,label,sort_order) as (
 values
 ('publicaciones','canal','redes_sociales','Redes sociales',10),('publicaciones','canal','sitio_web','Sitio web',20),('publicaciones','canal','cartelera','Cartelera interna',30),('publicaciones','canal','prensa','Prensa / boletín',40),('publicaciones','canal','varios','Varios canales',50),
 ('publicaciones','insumos','completos','Sí, completos',10),('publicaciones','insumos','parciales','Parciales',20),('publicaciones','insumos','no','No',30),
 ('cubrimientos','tipo','fotografia','Fotografía',10),('cubrimientos','tipo','video','Video',20),('cubrimientos','tipo','foto_video','Foto + video',30),('cubrimientos','tipo','transmision','Transmisión en vivo',40),('cubrimientos','tipo','acompanamiento','Acompañamiento de comunicaciones',50),
 ('desarrollo','tipo','nueva_aplicacion','Nueva aplicación',10),('desarrollo','tipo','funcionalidad','Nueva funcionalidad',20),('desarrollo','tipo','automatizacion','Automatización',30),('desarrollo','tipo','formulario','Formulario digital',40),('desarrollo','tipo','integracion','Integración',50),('desarrollo','tipo','dashboard','Dashboard / reporte',60),
 ('desarrollo','impacto','bajo','Bajo',10),('desarrollo','impacto','medio','Medio',20),('desarrollo','impacto','alto','Alto',30),('desarrollo','impacto','critico','Crítico',40),
 ('revision','elemento','pieza','Pieza gráfica',10),('revision','elemento','documento','Documento',20),('revision','elemento','web','Página web',30),('revision','elemento','formulario','Formulario',40),('revision','elemento','aplicacion','Aplicación',50),('revision','elemento','publicacion','Publicación',60),
 ('correo','tipo','no_ingresa','No puedo ingresar',10),('correo','tipo','password','Olvidé contraseña',20),('correo','tipo','no_envia','No envía',30),('correo','tipo','no_recibe','No recibe',40),('correo','tipo','crear_cuenta','Crear cuenta',50),('correo','tipo','configurar','Configurar dispositivo',60),('correo','tipo','grupo','Lista / grupo',70),('correo','tipo','otro','Otro',80),
 ('equipos','equipo','computador','Computador',10),('equipos','equipo','portatil','Portátil',20),('equipos','equipo','impresora','Impresora',30),('equipos','equipo','escaner','Escáner',40),('equipos','equipo','proyector','Proyector',50),('equipos','equipo','periferico','Teclado / mouse',60),('equipos','equipo','otro','Otro',70),
 ('equipos','impide_trabajar','si','Sí',10),('equipos','impide_trabajar','parcial','Parcialmente',20),('equipos','impide_trabajar','no','No',30),
 ('internet','conexion','wifi','Wi-Fi',10),('internet','conexion','cableada','Cableada',20),('internet','conexion','vpn','VPN',30),('internet','conexion','sistema','Acceso a sistema',40),('internet','conexion','punto','Punto de red',50),
 ('accesos','solicitud','crear','Crear usuario',10),('accesos','solicitud','modificar','Modificar permisos',20),('accesos','solicitud','retirar','Retirar acceso',30),('accesos','solicitud','desbloquear','Desbloquear',40),('accesos','solicitud','carpeta','Acceso a carpeta',50),('accesos','solicitud','aplicacion','Acceso a aplicación',60),
 ('web','tipo','actualizar','Actualizar contenido',10),('web','tipo','seccion','Crear sección',20),('web','tipo','error','Corregir error',30),('web','tipo','archivo','Publicar archivo',40),('web','tipo','formulario','Crear formulario',50),('web','tipo','enlace','Enlace roto',60),
 ('datos','producto','base','Base consolidada',10),('datos','producto','indicador','Indicador',20),('datos','producto','dashboard','Dashboard',30),('datos','producto','informe','Informe',40),('datos','producto','cruce','Cruce de datos',50),('datos','producto','depuracion','Depuración',60),
 ('seguridad','tipo','phishing','Correo sospechoso / phishing',10),('seguridad','tipo','cuenta','Cuenta comprometida',20),('seguridad','tipo','malware','Malware',30),('seguridad','tipo','perdida','Pérdida de equipo',40),('seguridad','tipo','acceso','Acceso no autorizado',50),('seguridad','tipo','otro','Otro',60),
 ('seguridad','conectado','si','Sí',10),('seguridad','conectado','no','No',20),('seguridad','conectado','na','No aplica',30),
 ('capacitacion','modalidad','presencial','Presencial',10),('capacitacion','modalidad','virtual','Virtual',20),('capacitacion','modalidad','indiferente','Indiferente',30)
)
insert into public.service_field_options(field_id,value,label,sort_order)
select fm.field_id,o.value,o.label,o.sort_order from options o join field_map fm on fm.service_code=o.service_code and fm.field_key=o.field_key
on conflict (field_id,value) do update set label=excluded.label,sort_order=excluded.sort_order;

-- Skill requirements.
with req(service_code,skill_code,weight,required) as (
 values
 ('publicaciones','diseno',1.2,true),('publicaciones','redes_sociales',1.0,true),('publicaciones','web',0.7,false),
 ('cubrimientos','foto_video',1.3,true),('cubrimientos','protocolo',0.8,false),('cubrimientos','redes_sociales',0.8,false),
 ('desarrollo','desarrollo',1.3,true),('desarrollo','procesos',1.0,true),('desarrollo','datos',0.7,false),
 ('revision','qa',1.2,true),('revision','web',0.7,false),('revision','comunicaciones',0.7,false),
 ('correo','correo',1.2,true),('correo','microsoft365',1.0,false),('correo','soporte',1.0,true),
 ('equipos','hardware',1.2,true),('equipos','soporte',1.0,true),
 ('internet','redes_datos',1.3,true),('internet','infraestructura',1.0,true),
 ('accesos','identidad',1.2,true),('accesos','seguridad',1.0,true),('accesos','soporte',0.7,false),
 ('web','web',1.3,true),('web','contenido',0.8,false),('web','accesibilidad',0.8,false),
 ('datos','datos',1.3,true),('datos','bi',1.0,false),('datos','procesos',0.7,false),
 ('seguridad','seguridad',1.5,true),('seguridad','infraestructura',1.0,true),
 ('capacitacion','capacitacion',1.2,true),('capacitacion','soporte',0.7,false)
)
insert into public.service_required_skills(service_id,skill_id,weight,is_required)
select s.id,k.id,r.weight,r.required from req r join public.services s on s.code=r.service_code join public.skills k on k.code=r.skill_code
on conflict (service_id,skill_id) do update set weight=excluded.weight,is_required=excluded.is_required;

-- Default SLA policies.
insert into public.sla_policies(code,name,description,work_schedule_id,pause_on_waiting_requester)
select 'tic_standard','TIC estándar','SLA para solicitudes TIC estándar.',id,true from public.work_schedules where name='Jornada institucional'
on conflict (code) do update set name=excluded.name,description=excluded.description,work_schedule_id=excluded.work_schedule_id;
insert into public.sla_policies(code,name,description,work_schedule_id,pause_on_waiting_requester)
select 'tic_urgent','TIC urgente','SLA para incidentes de conectividad y seguridad.',id,true from public.work_schedules where name='Jornada institucional'
on conflict (code) do update set name=excluded.name,description=excluded.description,work_schedule_id=excluded.work_schedule_id;
insert into public.sla_policies(code,name,description,work_schedule_id,pause_on_waiting_requester)
select 'communications','Comunicaciones','SLA para publicaciones y revisiones de comunicaciones.',id,true from public.work_schedules where name='Jornada institucional'
on conflict (code) do update set name=excluded.name,description=excluded.description,work_schedule_id=excluded.work_schedule_id;

insert into public.sla_targets(policy_id,metric,priority,target_minutes,warning_percent,critical_percent)
select p.id,x.metric,x.priority,x.minutes,70,90
from public.sla_policies p
join (values
 ('tic_standard','first_response','any',120),('tic_standard','resolution','low',1440),('tic_standard','resolution','medium',480),('tic_standard','resolution','high',240),('tic_standard','resolution','critical',120),
 ('tic_urgent','first_response','any',30),('tic_urgent','resolution','high',180),('tic_urgent','resolution','critical',60),
 ('communications','first_response','any',240),('communications','resolution','medium',1440),('communications','resolution','high',480)
) x(policy_code,metric,priority,minutes) on x.policy_code=p.code
on conflict (policy_id,metric,priority) do update set target_minutes=excluded.target_minutes,warning_percent=excluded.warning_percent,critical_percent=excluded.critical_percent;

update public.services set default_sla_policy_id=(select id from public.sla_policies where code='tic_standard') where code in ('correo','equipos','accesos','desarrollo','datos','capacitacion');
update public.services set default_sla_policy_id=(select id from public.sla_policies where code='tic_urgent') where code in ('internet','seguridad');
update public.services set default_sla_policy_id=(select id from public.sla_policies where code='communications') where code in ('publicaciones','revision','web');

-- Backfill profiles for users that existed before this schema was installed.
insert into public.profiles(id,full_name,display_name,institutional_email,metadata,work_schedule_id)
select
  u.id,
  coalesce(u.raw_user_meta_data->>'full_name',u.raw_user_meta_data->>'name',''),
  coalesce(u.raw_user_meta_data->>'display_name',u.raw_user_meta_data->>'full_name',u.email,''),
  u.email,
  coalesce(u.raw_user_meta_data,'{}'::jsonb),
  (select id from public.work_schedules where name='Jornada institucional')
from auth.users u
on conflict (id) do update set
  institutional_email=excluded.institutional_email,
  work_schedule_id=coalesce(public.profiles.work_schedule_id,excluded.work_schedule_id),
  updated_at=now();

insert into public.user_roles(profile_id,role_id,scope_type,scope_id)
select p.id,r.id,'global',null
from public.profiles p cross join public.roles r
where r.code='requester'
on conflict (profile_id,role_id,scope_type,scope_id) do nothing;

update public.profiles
set work_schedule_id=(select id from public.work_schedules where name='Jornada institucional')
where work_schedule_id is null;

-- Reusable workflows.
insert into public.workflows(code,name,description) values
('standard_request','Solicitud estándar','Radicación → asignación → gestión → validación → cierre.'),
('approval_request','Solicitud con aprobación','Radicación → aprobación → asignación → ejecución → cierre.'),
('scheduled_service','Servicio programado','Radicación → programación → ejecución → evidencia → cierre.'),
('incident_response','Respuesta a incidente','Detección → triage → contención → resolución → cierre.')
on conflict (code) do update set name=excluded.name,description=excluded.description;

insert into public.workflow_versions(workflow_id,version,status,definition,published_at)
select id,1,'published','{}'::jsonb,now() from public.workflows
on conflict (workflow_id,version) do update set status='published',published_at=coalesce(public.workflow_versions.published_at,now());

-- Standard request workflow steps.
with wf as (
  select w.id workflow_id,v.id version_id from public.workflows w join public.workflow_versions v on v.workflow_id=w.id and v.version=1 where w.code='standard_request'
), data(step_key,name,step_type,sort_order) as (
  values ('start','Radicación','start',10),('assign','Asignación','automation',20),('work','En gestión','task',30),('validate','Validación','task',40),('end','Cierre','end',50)
)
insert into public.workflow_steps(workflow_version_id,step_key,name,step_type,sort_order)
select wf.version_id,d.step_key,d.name,d.step_type,d.sort_order from wf cross join data d
on conflict (workflow_version_id,step_key) do update set name=excluded.name,step_type=excluded.step_type,sort_order=excluded.sort_order;

-- Approval request workflow steps.
with wf as (
  select v.id version_id from public.workflows w join public.workflow_versions v on v.workflow_id=w.id and v.version=1 where w.code='approval_request'
), data(step_key,name,step_type,sort_order) as (
  values ('start','Radicación','start',10),('approve','Aprobación','approval',20),('assign','Asignación','automation',30),('work','Ejecución','task',40),('end','Cierre','end',50)
)
insert into public.workflow_steps(workflow_version_id,step_key,name,step_type,sort_order)
select wf.version_id,d.step_key,d.name,d.step_type,d.sort_order from wf cross join data d
on conflict (workflow_version_id,step_key) do update set name=excluded.name,step_type=excluded.step_type,sort_order=excluded.sort_order;

-- Scheduled workflow steps.
with wf as (
  select v.id version_id from public.workflows w join public.workflow_versions v on v.workflow_id=w.id and v.version=1 where w.code='scheduled_service'
), data(step_key,name,step_type,sort_order) as (
  values ('start','Radicación','start',10),('schedule','Programación','task',20),('execute','Ejecución','task',30),('evidence','Evidencia','task',40),('end','Cierre','end',50)
)
insert into public.workflow_steps(workflow_version_id,step_key,name,step_type,sort_order)
select wf.version_id,d.step_key,d.name,d.step_type,d.sort_order from wf cross join data d
on conflict (workflow_version_id,step_key) do update set name=excluded.name,step_type=excluded.step_type,sort_order=excluded.sort_order;

-- Incident workflow steps.
with wf as (
  select v.id version_id from public.workflows w join public.workflow_versions v on v.workflow_id=w.id and v.version=1 where w.code='incident_response'
), data(step_key,name,step_type,sort_order) as (
  values ('start','Detección','start',10),('triage','Triage','task',20),('contain','Contención','task',30),('resolve','Resolución','task',40),('end','Cierre','end',50)
)
insert into public.workflow_steps(workflow_version_id,step_key,name,step_type,sort_order)
select wf.version_id,d.step_key,d.name,d.step_type,d.sort_order from wf cross join data d
on conflict (workflow_version_id,step_key) do update set name=excluded.name,step_type=excluded.step_type,sort_order=excluded.sort_order;

-- Build sequential transitions for each workflow version.
insert into public.workflow_transitions(workflow_version_id,from_step_id,to_step_id,name,sort_order)
select a.workflow_version_id,a.id,b.id,'Continuar',a.sort_order
from public.workflow_steps a
join public.workflow_steps b on b.workflow_version_id=a.workflow_version_id and b.sort_order=(
  select min(c.sort_order) from public.workflow_steps c where c.workflow_version_id=a.workflow_version_id and c.sort_order>a.sort_order
)
where not exists (
  select 1 from public.workflow_transitions t where t.workflow_version_id=a.workflow_version_id and t.from_step_id=a.id and t.to_step_id=b.id
);

update public.services s
set workflow_id=(select id from public.workflows where code=
  case
    when s.code in ('publicaciones','desarrollo','accesos') then 'approval_request'
    when s.code in ('cubrimientos','capacitacion') then 'scheduled_service'
    when s.code in ('internet','seguridad') then 'incident_response'
    else 'standard_request'
  end
);

-- Dynamic approval rules for services that require approval.
insert into public.approval_rules(service_id,name,approver_type,approver_team_id,sequence_no,is_required)
select s.id,'Aprobación del líder del equipo propietario','team_lead',s.owner_team_id,1,true
from public.services s
where s.requires_approval and s.owner_team_id is not null
  and not exists (select 1 from public.approval_rules ar where ar.service_id=s.id and ar.sequence_no=1);

-- Knowledge taxonomy.
insert into public.knowledge_categories(code,name,description,icon,color,sort_order) values
('correo','Correo institucional','Acceso, contraseñas y configuración de correo.','mail','#d48a00',10),
('conectividad','Internet y conectividad','Wi-Fi, red, VPN y puntos de acceso.','wifi','#0e8fd6',20),
('equipos','Equipos','Computadores, impresoras y periféricos.','monitor','#60728c',30),
('accesos','Accesos','Usuarios, permisos y autenticación.','key','#d4644b',40),
('web','Sitio web','Publicación y mantenimiento web.','globe','#1769ff',50),
('seguridad','Seguridad','Phishing, malware y protección de cuentas.','shield','#d94b5c',60)
on conflict (code) do update set name=excluded.name,description=excluded.description,icon=excluded.icon,color=excluded.color,sort_order=excluded.sort_order;

-- Asset types baseline.
insert into public.asset_types(code,name,icon) values
('desktop','Computador de escritorio','monitor'),('laptop','Portátil','laptop'),('printer','Impresora','printer'),('scanner','Escáner','scan'),
('projector','Proyector','projector'),('switch','Switch de red','network'),('access_point','Access Point','wifi'),('phone','Teléfono','phone'),
('license','Licencia de software','key'),('application','Aplicación / sistema','app')
on conflict (code) do update set name=excluded.name,icon=excluded.icon;

-- Default notification rule templates.
insert into public.notification_rules(code,name,event_type,channels,recipients,template_subject,template_body) values
('ticket_created_requester','Confirmación de radicación','ticket.created',array['in_app','email'],jsonb_build_object('requester',true),'Solicitud {{ticket.number}} radicada','Tu solicitud {{ticket.number}} fue radicada correctamente.'),
('ticket_assigned_agent','Nueva asignación','ticket.assigned',array['in_app','email'],jsonb_build_object('assignee',true),'Nueva solicitud {{ticket.number}}','La solicitud {{ticket.number}} fue asignada a tu bandeja.'),
('sla_warning','SLA en riesgo','sla.warning',array['in_app','email'],jsonb_build_object('assignee',true,'team_lead',true),'SLA en riesgo · {{ticket.number}}','La solicitud {{ticket.number}} alcanzó el umbral de alerta del SLA.'),
('sla_critical','SLA crítico','sla.critical',array['in_app','email'],jsonb_build_object('assignee',true,'team_lead',true),'SLA crítico · {{ticket.number}}','La solicitud {{ticket.number}} está próxima a incumplir el SLA.'),
('waiting_requester','Información requerida','ticket.waiting_requester',array['in_app','email'],jsonb_build_object('requester',true),'Necesitamos información · {{ticket.number}}','El equipo necesita información adicional para continuar con {{ticket.number}}.'),
('ticket_resolved','Solicitud resuelta','ticket.resolved',array['in_app','email'],jsonb_build_object('requester',true),'Solicitud resuelta · {{ticket.number}}','La solicitud {{ticket.number}} fue marcada como resuelta. Confirma si la solución fue satisfactoria.')
on conflict (code) do update set name=excluded.name,event_type=excluded.event_type,channels=excluded.channels,recipients=excluded.recipients,template_subject=excluded.template_subject,template_body=excluded.template_body;

-- Initial service health baseline.
insert into public.service_statuses(service_id,status,title,message,started_at)
select s.id,'operational','Servicio operativo','El servicio se encuentra operando normalmente.',now()
from public.services s
where not exists (select 1 from public.service_statuses ss where ss.service_id=s.id and ss.ended_at is null);

update public.services set default_effort_minutes=case code
  when 'publicaciones' then 120
  when 'cubrimientos' then 180
  when 'desarrollo' then 360
  when 'revision' then 90
  when 'correo' then 45
  when 'equipos' then 90
  when 'internet' then 60
  when 'accesos' then 45
  when 'web' then 120
  when 'datos' then 240
  when 'seguridad' then 90
  when 'capacitacion' then 180
  else 60 end;

update public.services set allows_requester_assignee_choice=true where code='cubrimientos';
