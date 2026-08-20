/* =========================================================
   Mesa de Ayuda TIC v0.6 · ADMIN STUDIO / ESM CONTROL PLANE
   Configuración no-code pre-Supabase.
   ========================================================= */

const V06_VERSION = '0.6';
const v06StoreKey = 'mesa360_v06_control_plane';

const v06DepartmentsSeed = [
  {id:'comunicaciones',name:'Comunicaciones',icon:'✦',owner:'Coordinación de Comunicaciones',scope:'Institucional',accent:'blue'},
  {id:'tic',name:'Tecnologías de la Información',icon:'⌁',owner:'Líder TIC',scope:'Institucional',accent:'cyan'},
  {id:'talento',name:'Talento Humano',icon:'◉',owner:'Responsable de Talento Humano',scope:'Servidores y contratistas',accent:'purple'},
  {id:'almacen',name:'Almacén y recursos',icon:'▧',owner:'Responsable de Almacén',scope:'Dependencias internas',accent:'amber'},
  {id:'juridica',name:'Jurídica',icon:'§',owner:'Oficina Jurídica',scope:'Dependencias autorizadas',accent:'green'},
  {id:'servicios-generales',name:'Servicios Generales',icon:'◇',owner:'Secretaría General',scope:'Institucional',accent:'slate'}
];

const v06EsmServices = [
  {id:'certificado-laboral',family:'talento',department:'talento',category:'Talento Humano',icon:'◉',tone:'#f3efff',color:'#6f52bd',title:'Certificado laboral o contractual',desc:'Solicita certificaciones de vinculación, tiempo de servicio o información laboral disponible.',sla:'2 días',skills:['Talento Humano'],approval:false,esmQueue:'Talento Humano',fields:[['Tipo de certificado','select',['Certificación laboral','Certificación contractual','Tiempo de servicio','Otro']],['Finalidad','text'],['Fecha requerida','date'],['Observaciones','textarea']]},
  {id:'novedad-talento',family:'talento',department:'talento',category:'Talento Humano',icon:'◎',tone:'#f3efff',color:'#6f52bd',title:'Novedad de Talento Humano',desc:'Reporta una novedad administrativa que requiera validación o acompañamiento del área.',sla:'1–3 días',skills:['Talento Humano'],approval:true,esmQueue:'Talento Humano',fields:[['Tipo de novedad','select',['Permiso','Cambio de información','Incapacidad / soporte','Vacaciones / programación','Otra']],['Fecha relacionada','date'],['Detalle de la novedad','textarea'],['Soporte disponible','select',['Sí','No','No aplica']]]},
  {id:'solicitud-almacen',family:'almacen',department:'almacen',category:'Almacén y recursos',icon:'▧',tone:'#fff6df',color:'#a86800',title:'Solicitud de elementos o suministros',desc:'Solicita elementos disponibles en almacén para la operación de la dependencia.',sla:'1–2 días',skills:['Almacén'],approval:true,esmQueue:'Almacén',fields:[['Tipo de elemento','select',['Papelería','Aseo','Elemento de oficina','Consumible tecnológico','Otro']],['Cantidad requerida','number'],['Justificación / uso','textarea'],['Fecha requerida','date']]},
  {id:'prestamo-recurso',family:'almacen',department:'almacen',category:'Almacén y recursos',icon:'▣',tone:'#fff6df',color:'#a86800',title:'Préstamo de recurso institucional',desc:'Reserva o solicita préstamo temporal de equipos y recursos de uso compartido.',sla:'Agenda',skills:['Almacén'],approval:false,esmQueue:'Almacén',fields:[['Recurso requerido','select',['Video beam','Pantalla','Equipo portátil','Sonido','Mobiliario','Otro']],['Fecha de uso','date'],['Hora de inicio','time'],['Hora de devolución','time'],['Actividad / finalidad','textarea']]},
  {id:'revision-juridica',family:'juridica',department:'juridica',category:'Jurídica',icon:'§',tone:'#edf8f1',color:'#147348',title:'Revisión jurídica de documento',desc:'Solicita revisión de actos, documentos, respuestas o instrumentos antes de su trámite.',sla:'2–5 días',skills:['Jurídica'],approval:false,esmQueue:'Jurídica',fields:[['Tipo de documento','select',['Acto administrativo','Contrato / convenio','Respuesta oficial','Circular','Documento interno','Otro']],['Fecha límite','date'],['Objeto de la revisión','textarea'],['Enlace o referencia del documento','text']]},
  {id:'concepto-juridico',family:'juridica',department:'juridica',category:'Jurídica',icon:'§',tone:'#edf8f1',color:'#147348',title:'Solicitud de concepto jurídico',desc:'Formula una consulta institucional que requiera análisis o concepto del área jurídica.',sla:'3–7 días',skills:['Jurídica'],approval:true,esmQueue:'Jurídica',fields:[['Tema de consulta','text'],['Pregunta concreta','textarea'],['Antecedentes relevantes','textarea'],['Fecha requerida','date']]},
  {id:'mantenimiento-locativo',family:'servicios-generales',department:'servicios-generales',category:'Servicios Generales',icon:'◇',tone:'#eef2f6',color:'#526070',title:'Mantenimiento locativo',desc:'Reporta necesidades de reparación, adecuación o mantenimiento físico dentro de las sedes.',sla:'1–5 días',skills:['Servicios Generales'],approval:false,esmQueue:'Servicios Generales',fields:[['Tipo de necesidad','select',['Eléctrica','Hidráulica','Mobiliario','Pintura / acabados','Puerta / cerradura','Otro']],['Ubicación exacta','text'],['Descripción','textarea'],['¿Representa riesgo?','select',['Sí','No']]]}
];

const v06RoleSeed = [
  {id:'requester',name:'Funcionario solicitante',desc:'Radica, consulta y responde únicamente sus solicitudes.',mappedRole:'requester'},
  {id:'secretary',name:'Secretario / coordinador',desc:'Consulta demanda de su dependencia, agenda y solicitudes autorizadas.',mappedRole:'requester'},
  {id:'agent',name:'Gestor de servicio',desc:'Opera colas, responde, programa, relaciona activos y resuelve.',mappedRole:'agent'},
  {id:'approver',name:'Aprobador',desc:'Evalúa solicitudes y decisiones que requieren autorización.',mappedRole:'agent'},
  {id:'auditor',name:'Auditor / Control Interno',desc:'Consulta trazabilidad, SLA, cambios y auditoría sin administrar.',mappedRole:'agent'},
  {id:'catalog',name:'Gestor de catálogo',desc:'Diseña servicios, formularios y conocimiento autorizado.',mappedRole:'admin'},
  {id:'admin',name:'Administrador Mesa de Ayuda TIC',desc:'Gobierno integral de plataforma y configuración.',mappedRole:'admin'}
];

const v06PermissionCatalog = [
  ['request.create','Radicar solicitudes','Portal'],['request.own.read','Ver solicitudes propias','Portal'],['request.department.read','Ver solicitudes de dependencia','Portal'],['request.comment','Responder solicitudes','Portal'],
  ['ticket.queue.read','Ver colas operativas','Operación'],['ticket.assign','Asignar / reasignar','Operación'],['ticket.status','Cambiar estado','Operación'],['ticket.internal_note','Crear notas internas','Operación'],['ticket.resolve','Resolver / cerrar','Operación'],
  ['approval.decide','Aprobar / rechazar','Gobierno'],['calendar.manage','Gestionar agenda','Operación'],['asset.manage','Gestionar activos','ITSM'],['continuity.manage','Gestionar incidentes / problemas / cambios','ITSM'],
  ['catalog.design','Diseñar catálogo y formularios','Administración'],['workflow.design','Diseñar workflows','Administración'],['notification.design','Configurar notificaciones','Administración'],['template.manage','Gestionar plantillas','Administración'],['role.manage','Gestionar roles','Administración'],['audit.read','Consultar auditoría','Gobierno'],['report.read','Consultar indicadores','Gobierno']
];

function defaultRoleMatrix(){
  const m={};v06RoleSeed.forEach(r=>m[r.id]={});
  const allow=(role,...perms)=>perms.forEach(p=>m[role][p]=true);
  allow('requester','request.create','request.own.read','request.comment');
  allow('secretary','request.create','request.own.read','request.department.read','request.comment','report.read');
  allow('agent','request.create','request.own.read','request.comment','ticket.queue.read','ticket.assign','ticket.status','ticket.internal_note','ticket.resolve','calendar.manage','asset.manage','continuity.manage','report.read');
  allow('approver','request.create','request.own.read','request.comment','ticket.queue.read','approval.decide','audit.read','report.read');
  allow('auditor','request.department.read','ticket.queue.read','audit.read','report.read');
  allow('catalog','request.create','request.own.read','ticket.queue.read','catalog.design','workflow.design','notification.design','template.manage','audit.read','report.read');
  v06PermissionCatalog.forEach(([p])=>m.admin[p]=true);
  return m;
}

const notificationSeed = [
  {id:'NR-01',name:'Radicación confirmada',trigger:'Solicitud creada',audience:'Solicitante',channels:['In-app','Correo'],template:'Tu solicitud {{ticket.id}} fue radicada correctamente.',enabled:true,critical:false},
  {id:'NR-02',name:'Asignación al gestor',trigger:'Responsable asignado',audience:'Responsable',channels:['In-app','Correo'],template:'Se te asignó {{ticket.id}} · {{ticket.title}}.',enabled:true,critical:false},
  {id:'NR-03',name:'Riesgo SLA 70%',trigger:'SLA alcanza 70%',audience:'Responsable + líder',channels:['In-app'],template:'{{ticket.id}} entró en zona preventiva de SLA.',enabled:true,critical:false},
  {id:'NR-04',name:'Escalamiento SLA 90%',trigger:'SLA alcanza 90%',audience:'Responsable + líder + coordinador',channels:['In-app','Correo'],template:'Atención: {{ticket.id}} está próximo a incumplir el SLA.',enabled:true,critical:true},
  {id:'NR-05',name:'Solicitud requiere información',trigger:'Estado cambia a Esperando funcionario',audience:'Solicitante',channels:['In-app','Correo'],template:'Necesitamos información adicional para continuar con {{ticket.id}}.',enabled:true,critical:false},
  {id:'NR-06',name:'Resolución disponible',trigger:'Solicitud resuelta',audience:'Solicitante',channels:['In-app','Correo'],template:'{{ticket.id}} fue resuelta. Confirma si la solución funcionó.',enabled:true,critical:false}
];

const responseTemplateSeed = [
  {id:'RT-01',name:'Solicitar información faltante',category:'General',scope:'Todos los gestores',body:'Hola {{requester.name}}. Para continuar con {{ticket.id}} necesitamos la siguiente información: [DETALLE]. Cuando la adjuntes, retomaremos la atención.'},
  {id:'RT-02',name:'Cubrimiento confirmado',category:'Comunicaciones',scope:'Comunicaciones',body:'Tu cubrimiento quedó confirmado para {{schedule.date}} de {{schedule.start}} a {{schedule.end}}. Responsable: {{assignee.name}}.'},
  {id:'RT-03',name:'Correo · prueba de acceso',category:'TIC',scope:'Soporte TIC',body:'Realizamos una validación inicial de la cuenta. Por favor intenta nuevamente desde el navegador institucional y confirma el resultado en esta solicitud.'},
  {id:'RT-04',name:'Resolución documentada',category:'General',scope:'Todos los gestores',body:'La solicitud fue atendida. Solución aplicada: [SOLUCIÓN]. Evidencia / observación: [EVIDENCIA]. Por favor confirma si el servicio quedó restablecido.'}
];

function clone(x){return JSON.parse(JSON.stringify(x));}
function makeServiceSnapshot(s){
  return {id:s.id,title:s.title,desc:s.desc,category:s.category,department:s.department||inferDepartment(s),family:s.family||familyForService(s.id)?.id||inferFamily(s),icon:s.icon,tone:s.tone,color:s.color,sla:s.sla,approval:!!s.approval,critical:!!s.critical,esmQueue:s.esmQueue||'',skills:clone(s.skills||[]),fields:(s.fields||[]).map((f,i)=>({id:`fld-${i+1}`,label:f[0],type:f[1],options:clone(f[2]||[]),required:!/(si aplica|opcional)/i.test(f[0]),helper:'',condition:null}))};
}
function inferDepartment(s){const f=familyForService(s.id)?.id;if(f==='comunicaciones')return'comunicaciones';if(['soporte','soluciones','acompanamiento'].includes(f))return'tic';return s.department||'tic';}
function inferFamily(s){return familyForService(s.id)?.id||'soporte';}
function applySnapshotToRuntime(snap){
  let runtime=serviceById(snap.id);
  const def={id:snap.id,title:snap.title,desc:snap.desc,category:snap.category,department:snap.department,family:snap.family,icon:snap.icon||'◇',tone:snap.tone||'#eef2f6',color:snap.color||'#1557c0',sla:snap.sla||'1–3 días',approval:!!snap.approval,critical:!!snap.critical,esmQueue:snap.esmQueue||'',skills:clone(snap.skills||[]),fields:(snap.fields||[]).filter(f=>f.type!=='info').map(f=>[f.label,f.type,f.options||[]])};
  if(runtime)Object.assign(runtime,def);else services.push(def);
  let fam=guidedFamilies.find(f=>f.id===snap.family);
  if(!fam){const dep=v06DepartmentsSeed.find(d=>d.id===snap.department);fam={id:snap.family||snap.department,icon:dep?.icon||'◇',title:dep?.name||snap.category,desc:`Servicios de ${dep?.name||snap.category}.`,services:[]};guidedFamilies.push(fam);}
  if(!fam.services.includes(snap.id))fam.services.push(snap.id);
}

function baseControlPlane(){
  const serviceRecords={};services.forEach(s=>{const snap=makeServiceSnapshot(s);serviceRecords[s.id]={version:1,status:'published',published:snap,draft:clone(snap),updated:'20 Ago 2026 · 8:18 a. m.',owner:'Administrador Mesa de Ayuda TIC'};});
  v06EsmServices.forEach(s=>{const snap={...makeServiceSnapshot(s),department:s.department,family:s.family,esmQueue:s.esmQueue};serviceRecords[s.id]={version:1,status:'published',published:snap,draft:clone(snap),updated:'20 Ago 2026 · 8:18 a. m.',owner:v06DepartmentsSeed.find(d=>d.id===s.department)?.owner||'Propietario del servicio'};});
  const flows={};Object.keys(workflowTemplates||{}).forEach(id=>{flows[id]=flowFromLegacy(id,workflowTemplates[id]);});
  return {version:V06_VERSION,departments:clone(v06DepartmentsSeed),services:serviceRecords,roles:clone(v06RoleSeed),roleMatrix:defaultRoleMatrix(),notificationRules:clone(notificationSeed),templates:clone(responseTemplateSeed),workflows:flows,audit:[
    {id:'AUD-001',at:'20 Ago 2026 · 8:18',actor:'Administrador Mesa de Ayuda TIC',action:'Control plane v0.6 inicializado',object:'Plataforma',detail:'Se habilitó administración no-code en modo pre-Supabase.',severity:'info'},
    {id:'AUD-002',at:'20 Ago 2026 · 8:12',actor:'Coordinación de Comunicaciones',action:'Servicio publicado',object:'Solicitar publicación',detail:'Versión 3 publicada con validación de insumos.',severity:'success'},
    {id:'AUD-003',at:'20 Ago 2026 · 7:54',actor:'Líder TIC',action:'Regla SLA actualizada',object:'Correo institucional',detail:'Escalamiento preventivo configurado al 70%.',severity:'warning'}
  ]};
}
function flowFromLegacy(id,nodes){
  const s=serviceById(id);return {id:`WF-${id}`,service:id,name:`Flujo · ${s?.title||id}`,version:1,status:'published',updated:'20 Ago 2026',nodes:(nodes||[]).map((n,i)=>({id:`n-${i+1}`,type:n.type,title:n.title,desc:n.desc||'',owner:n.type==='approval'?'Aprobador del servicio':'',condition:n.type==='decision'?'Condición configurable':'',sla:'',x:0,y:i*120})),draft:null};
}

let controlPlane;
try{controlPlane=JSON.parse(localStorage.getItem(v06StoreKey)||'null');}catch(e){controlPlane=null;}
if(!controlPlane||controlPlane.version!==V06_VERSION)controlPlane=baseControlPlane();

function saveControlPlane(){localStorage.setItem(v06StoreKey,JSON.stringify(controlPlane));}
function auditV6(action,object,detail,severity='info',actor='Administrador Mesa de Ayuda TIC'){
  controlPlane.audit.unshift({id:`AUD-${Date.now()}`,at:'Ahora',actor,action,object,detail,severity});
  controlPlane.audit=controlPlane.audit.slice(0,100);saveControlPlane();
}

// Aplica únicamente las versiones publicadas al runtime del prototipo.
Object.values(controlPlane.services).filter(r=>r.published).forEach(r=>applySnapshotToRuntime(r.published));

// Familias ESM para la radicación guiada.
const esmFamilySeed=[
  {id:'talento',icon:'◉',title:'Talento Humano',desc:'Certificados, novedades y servicios internos de personas.'},
  {id:'almacen',icon:'▧',title:'Almacén y recursos',desc:'Suministros, préstamos y recursos institucionales.'},
  {id:'juridica',icon:'§',title:'Jurídica',desc:'Revisiones, conceptos y acompañamiento jurídico interno.'},
  {id:'servicios-generales',icon:'◇',title:'Servicios Generales',desc:'Mantenimiento y necesidades locativas.'}
];
esmFamilySeed.forEach(seed=>{let f=guidedFamilies.find(x=>x.id===seed.id);if(!f){f={...seed,services:[]};guidedFamilies.push(f);}Object.values(controlPlane.services).filter(r=>r.published.family===seed.id).forEach(r=>{if(!f.services.includes(r.published.id))f.services.push(r.published.id);});});

let simulatedRoleId='requester';
let adminStudio={tab:'services',service:Object.keys(controlPlane.services)[0],field:null,serviceQuery:'',role:'agent',notification:controlPlane.notificationRules[0]?.id,template:controlPlane.templates[0]?.id,auditQuery:'',auditType:'all'};
let workflowV6State={service:'publicaciones',selected:null,mode:'design',query:'',zoom:100};

function currentServiceRecord(){return controlPlane.services[adminStudio.service]||Object.values(controlPlane.services)[0];}
function currentServiceDraft(){return currentServiceRecord()?.draft;}
function serviceDepartmentName(id){return controlPlane.departments.find(d=>d.id===id)?.name||id;}
function fieldTypeLabel(type){return {text:'Texto corto',textarea:'Texto largo',select:'Selección',date:'Fecha',time:'Hora',number:'Número',email:'Correo',checkbox:'Confirmación',info:'Bloque informativo'}[type]||type;}
function studioStatus(rec){return rec.status==='draft'?'<span class="studio-badge draft">BORRADOR CON CAMBIOS</span>':'<span class="studio-badge published">PUBLICADO</span>';}

function renderAdmin(){
  const tabs=[['services','Servicios y pop-ups'],['roles','Roles y permisos'],['notifications','Notificaciones'],['templates','Plantillas'],['audit','Auditoría'],['matrix','Matriz de servicios']];
  const total=Object.keys(controlPlane.services).length,drafts=Object.values(controlPlane.services).filter(r=>r.status==='draft').length,activeRules=controlPlane.notificationRules.filter(r=>r.enabled).length;
  $('#view-admin').innerHTML=`
    <div class="admin360-head"><div><span class="eyebrow">CONTROL PLANE · PRE-SUPABASE</span><h1>Administración 360</h1><p>Diseña y gobierna el comportamiento de la Mesa sin tocar código. Los cambios se trabajan como borrador y solo afectan el portal cuando se publican.</p></div><div class="admin360-health"><span class="pulse"></span><div><small>CONFIGURACIÓN LOCAL</small><strong>Modo avanzado · v0.6</strong></div></div></div>
    <div class="admin360-kpis"><div><span>Servicios</span><strong>${total}</strong><small>${controlPlane.departments.length} áreas de servicio</small></div><div><span>Borradores</span><strong>${drafts}</strong><small>Pendientes de publicación</small></div><div><span>Reglas activas</span><strong>${activeRules}</strong><small>Notificaciones configuradas</small></div><div><span>Roles</span><strong>${controlPlane.roles.length}</strong><small>Matriz de permisos simulada</small></div></div>
    <div class="admin360-tabs">${tabs.map(([id,l])=>`<button class="${adminStudio.tab===id?'active':''}" data-admin-tab="${id}">${l}</button>`).join('')}</div>
    <div id="admin360Workspace"></div>`;
  renderAdminWorkspace();
}

function renderAdminWorkspace(){
  const root=$('#admin360Workspace');if(!root)return;
  if(adminStudio.tab==='services')renderServiceStudio(root);
  else if(adminStudio.tab==='roles')renderRoleStudio(root);
  else if(adminStudio.tab==='notifications')renderNotificationStudio(root);
  else if(adminStudio.tab==='templates')renderTemplateStudio(root);
  else if(adminStudio.tab==='audit')renderAuditStudio(root);
  else renderServiceMatrix(root);
}

function renderServiceStudio(root){
  const allRecords=Object.values(controlPlane.services),q=adminStudio.serviceQuery.trim().toLowerCase(),records=allRecords.filter(r=>!q||[r.draft.title,r.draft.category,serviceDepartmentName(r.draft.department)].join(' ').toLowerCase().includes(q)),rec=currentServiceRecord(),d=rec.draft;
  if(!adminStudio.field&&d.fields[0])adminStudio.field=d.fields[0].id;
  const selectedField=d.fields.find(f=>f.id===adminStudio.field)||d.fields[0];
  root.innerHTML=`<div class="service-studio">
    <aside class="studio-service-list"><div class="studio-pane-head"><div><strong>Catálogo</strong><span>${records.length} servicios</span></div><button class="studio-icon-btn" data-new-service title="Nuevo servicio">＋</button></div><label class="studio-search"><span>⌕</span><input id="studioServiceSearch" value="${safe(adminStudio.serviceQuery)}" placeholder="Buscar servicio..."></label><div class="studio-service-scroll">${controlPlane.departments.map(dep=>{const list=records.filter(r=>r.draft.department===dep.id);if(!list.length)return'';return `<div class="studio-dep-group"><span>${dep.icon} ${dep.name}</span>${list.map(r=>`<button class="${r.draft.id===d.id?'active':''}" data-studio-service="${r.draft.id}"><div><strong>${safe(r.draft.title)}</strong><small>v${r.version} · ${r.status==='draft'?'borrador':'publicado'}</small></div><i class="${r.status}"></i></button>`).join('')}</div>`}).join('')}</div></aside>
    <section class="studio-builder"><div class="studio-builder-head"><div><span class="eyebrow">FORM BUILDER · ${safe(serviceDepartmentName(d.department)).toUpperCase()}</span><h2>${safe(d.title)}</h2><p>${safe(d.desc)}</p></div><div class="studio-actions">${studioStatus(rec)}<button class="btn btn-secondary compact" data-preview-service>Vista previa</button><button class="btn btn-primary compact" data-publish-service>Publicar v${rec.version+(rec.status==='draft'?1:0)}</button></div></div>
      <div class="studio-service-config"><label>Nombre<input data-service-prop="title" value="${safe(d.title)}"></label><label>SLA<select data-service-prop="sla">${['Inmediato','1–6 h','2–8 h','4–24 h','1–2 días','1–3 días','2–5 días','3–7 días','Agenda','Evaluación'].map(x=>`<option ${d.sla===x?'selected':''}>${x}</option>`).join('')}</select></label><label>Área<select data-service-prop="department">${controlPlane.departments.map(x=>`<option value="${x.id}" ${d.department===x.id?'selected':''}>${x.name}</option>`).join('')}</select></label><label class="switch-label"><span>Requiere aprobación</span><input type="checkbox" data-service-check="approval" ${d.approval?'checked':''}></label></div>
      <div class="form-builder-body"><div class="form-outline"><div class="form-outline-head"><div><strong>Secuencia del pop-up</strong><span>Una pregunta por pantalla</span></div><span>${d.fields.length} pasos personalizados</span></div><div class="form-field-list">${d.fields.map((f,i)=>`<div class="form-field-card ${f.id===selectedField?.id?'selected':''}" data-field-select="${f.id}"><span class="drag-handle">⋮⋮</span><i>${i+1}</i><div><strong>${safe(f.label)}</strong><small>${fieldTypeLabel(f.type)}${f.required?' · obligatorio':''}${f.condition?' · condicional':''}</small></div><div class="field-order"><button data-field-move="up|${f.id}" title="Subir">↑</button><button data-field-move="down|${f.id}" title="Bajar">↓</button></div></div>`).join('')}</div><div class="field-palette"><span>AÑADIR CAMPO</span>${[['text','T Texto'],['textarea','¶ Texto largo'],['select','☷ Selección'],['date','▦ Fecha'],['time','◷ Hora'],['number','# Número'],['checkbox','✓ Confirmación'],['info','i Información']].map(([t,l])=>`<button data-field-add="${t}">${l}</button>`).join('')}</div></div>
        <div class="popup-preview"><div class="popup-device"><div class="popup-preview-head"><span>Mesa de Ayuda TIC · RADICACIÓN GUIADA</span><strong>${safe(d.title)}</strong><i>${Math.max(1,d.fields.findIndex(f=>f.id===selectedField?.id)+1)} / ${d.fields.length}</i></div>${selectedField?renderFieldPreview(selectedField,d):'<div class="preview-empty">Agrega una pregunta al formulario.</div>'}<div class="popup-preview-footer"><button>← Atrás</button><button class="primary">Continuar →</button></div></div><div class="preview-note"><span>VISTA PREVIA EN VIVO</span><p>El funcionario verá una pregunta a la vez. Las reglas condicionales pueden omitir o mostrar pasos según respuestas anteriores.</p></div></div>
      </div>
    </section>
    <aside class="studio-inspector">${selectedField?renderFieldInspector(selectedField):'<div class="inspector-empty">Selecciona un campo para editar sus propiedades.</div>'}</aside>
  </div>`;
}

function renderFieldPreview(f,d){
  let control='';const ph=safe(f.placeholder||'Escribe aquí...');
  if(f.type==='textarea')control=`<textarea disabled placeholder="${ph}"></textarea>`;
  else if(f.type==='select')control=`<div class="preview-options">${(f.options||['Opción 1','Opción 2']).map(o=>`<span>○ ${safe(o)}</span>`).join('')}</div>`;
  else if(f.type==='checkbox')control=`<label class="preview-check"><input type="checkbox" disabled> Confirmo esta información</label>`;
  else if(f.type==='info')control=`<div class="preview-info">i ${safe(f.helper||'Información contextual para orientar al solicitante.')}</div>`;
  else control=`<input disabled type="${['date','time','number','email'].includes(f.type)?f.type:'text'}" placeholder="${ph}">`;
  return `<div class="popup-question"><span>${safe(d.category||serviceDepartmentName(d.department)).toUpperCase()}</span><h3>${safe(f.label)} ${f.required?'<em>*</em>':''}</h3><p>${safe(f.helper||'Explica de manera breve por qué se solicita este dato.')}</p>${control}${f.condition?`<div class="condition-preview">⚡ Visible cuando: ${safe(f.condition)}</div>`:''}</div>`;
}
function renderFieldInspector(f){
  return `<div class="inspector-head"><span>PROPIEDADES DEL CAMPO</span><strong>${fieldTypeLabel(f.type)}</strong></div><label>Pregunta<input data-field-prop="label" value="${safe(f.label)}"></label><label>Tipo<select data-field-prop="type">${['text','textarea','select','date','time','number','email','checkbox','info'].map(t=>`<option value="${t}" ${f.type===t?'selected':''}>${fieldTypeLabel(t)}</option>`).join('')}</select></label><label>Texto de ayuda<textarea data-field-prop="helper" rows="4">${safe(f.helper||'')}</textarea></label><label class="switch-line"><span><strong>Obligatorio</strong><small>Impide continuar sin respuesta.</small></span><input type="checkbox" data-field-check="required" ${f.required?'checked':''}></label>${f.type==='select'?`<label>Opciones<textarea data-field-prop="options" rows="5" placeholder="Una opción por línea">${safe((f.options||[]).join('\n'))}</textarea></label>`:''}<div class="condition-box"><span>LÓGICA CONDICIONAL</span><strong>Mostrar este campo solo cuando...</strong><input data-field-prop="condition" value="${safe(f.condition||'')}" placeholder="Ej. f4 = Sí"><small>En producción se convertirá en reglas estructuradas; aquí se modela y previsualiza.</small></div><button class="btn btn-danger-outline" data-field-delete="${f.id}">Eliminar campo</button>`;
}

function renderRoleStudio(root){
  const role=controlPlane.roles.find(r=>r.id===adminStudio.role)||controlPlane.roles[0],matrix=controlPlane.roleMatrix[role.id]||{};
  const groups=[...new Set(v06PermissionCatalog.map(x=>x[2]))];
  root.innerHTML=`<div class="role-studio"><aside class="role-list"><div class="studio-pane-head"><div><strong>Perfiles y roles</strong><span>Simulación RBAC</span></div><button class="studio-icon-btn" data-role-add>＋</button></div>${controlPlane.roles.map(r=>`<button class="role-card ${r.id===role.id?'active':''}" data-role-select="${r.id}"><span>${r.id==='requester'?'U':r.id==='admin'?'A':r.id==='auditor'?'O':'R'}</span><div><strong>${r.name}</strong><small>${r.desc}</small></div></button>`).join('')}</aside><section class="role-matrix-panel"><div class="studio-builder-head"><div><span class="eyebrow">RBAC · MODELO DE PERMISOS</span><h2>${role.name}</h2><p>${role.desc}</p></div><button class="btn btn-secondary" data-role-simulate="${role.id}">▶ Simular este perfil</button></div><div class="permission-groups">${groups.map(g=>`<div class="permission-group"><div class="permission-group-head"><strong>${g}</strong><span>${v06PermissionCatalog.filter(x=>x[2]===g&&matrix[x[0]]).length}/${v06PermissionCatalog.filter(x=>x[2]===g).length} habilitados</span></div>${v06PermissionCatalog.filter(x=>x[2]===g).map(([key,label])=>`<label class="permission-row"><div><strong>${label}</strong><small>${key}</small></div><input type="checkbox" data-permission="${key}" ${matrix[key]?'checked':''}></label>`).join('')}</div>`).join('')}</div></section><aside class="role-security-note"><span>SEGURIDAD FUTURA</span><h3>La interfaz no será la barrera de seguridad.</h3><p>Esta matriz define el modelo funcional. Supabase RLS aplicará después las mismas reglas directamente sobre los datos.</p><div class="security-stack"><div><i>1</i><span><strong>Autenticación</strong><small>Quién es la persona</small></span></div><div><i>2</i><span><strong>Rol + alcance</strong><small>Qué puede hacer y sobre qué dependencia</small></span></div><div><i>3</i><span><strong>RLS</strong><small>Qué filas puede leer/modificar</small></span></div><div><i>4</i><span><strong>Auditoría</strong><small>Qué hizo, cuándo y desde dónde</small></span></div></div></aside></div>`;
}

function renderNotificationStudio(root){
  const rules=controlPlane.notificationRules,selected=rules.find(r=>r.id===adminStudio.notification)||rules[0];adminStudio.notification=selected?.id;
  root.innerHTML=`<div class="notification-studio"><section class="notification-rule-list"><div class="studio-builder-head"><div><span class="eyebrow">EVENT-DRIVEN COMMUNICATIONS</span><h2>Centro de notificaciones configurable</h2><p>Define quién recibe qué mensaje, cuándo y por qué canal.</p></div><button class="btn btn-primary" data-notification-rule-add>＋ Nueva regla</button></div><div class="notification-rule-table"><div class="nr-head"><span>Regla</span><span>Disparador</span><span>Audiencia</span><span>Canales</span><span>Estado</span></div>${rules.map(r=>`<button class="nr-row ${r.id===selected?.id?'selected':''}" data-notification-rule="${r.id}"><div><strong>${r.name}</strong><small>${r.id}${r.critical?' · crítica':''}</small></div><span>${r.trigger}</span><span>${r.audience}</span><div class="channel-chips">${r.channels.map(c=>`<i>${c}</i>`).join('')}</div><span class="rule-state ${r.enabled?'on':'off'}">${r.enabled?'ACTIVA':'PAUSADA'}</span></button>`).join('')}</div></section>${selected?`<aside class="notification-inspector"><span class="eyebrow">EDITAR REGLA</span><h3>${safe(selected.name)}</h3><label>Nombre<input data-nr-prop="name" value="${safe(selected.name)}"></label><label>Disparador<select data-nr-prop="trigger">${['Solicitud creada','Responsable asignado','SLA alcanza 70%','SLA alcanza 90%','Estado cambia a Esperando funcionario','Solicitud resuelta','Aprobación pendiente','Reserva próxima'].map(x=>`<option ${selected.trigger===x?'selected':''}>${x}</option>`).join('')}</select></label><label>Audiencia<input data-nr-prop="audience" value="${safe(selected.audience)}"></label><div class="channel-selector"><span>CANALES</span>${['In-app','Correo','Resumen diario','Teams (futuro)'].map(c=>`<label><input type="checkbox" data-nr-channel="${c}" ${selected.channels.includes(c)?'checked':''}> ${c}</label>`).join('')}</div><label>Plantilla<textarea data-nr-prop="template" rows="6">${safe(selected.template)}</textarea></label><div class="variable-chips"><span>Variables:</span><i>{{ticket.id}}</i><i>{{ticket.title}}</i><i>{{assignee.name}}</i><i>{{requester.name}}</i></div><label class="switch-line"><span><strong>Regla activa</strong><small>Ejecutará el disparador cuando exista backend.</small></span><input type="checkbox" data-nr-enabled ${selected.enabled?'checked':''}></label><button class="btn btn-secondary" data-test-notification>Enviar prueba simulada</button></aside>`:''}</div>`;
}

function renderTemplateStudio(root){
  const list=controlPlane.templates,sel=list.find(t=>t.id===adminStudio.template)||list[0];adminStudio.template=sel?.id;
  root.innerHTML=`<div class="template-studio"><aside class="template-list"><div class="studio-pane-head"><div><strong>Respuestas rápidas</strong><span>${list.length} plantillas</span></div><button class="studio-icon-btn" data-template-add>＋</button></div>${list.map(t=>`<button class="template-item ${t.id===sel?.id?'active':''}" data-template="${t.id}"><span>${t.category==='TIC'?'⌁':t.category==='Comunicaciones'?'✦':'◇'}</span><div><strong>${safe(t.name)}</strong><small>${safe(t.category)} · ${safe(t.scope)}</small></div></button>`).join('')}</aside>${sel?`<section class="template-editor"><div class="studio-builder-head"><div><span class="eyebrow">MACROS · RESPUESTAS CONSISTENTES</span><h2>${safe(sel.name)}</h2><p>Las plantillas aceleran la operación sin sacrificar claridad ni trazabilidad.</p></div><button class="btn btn-primary" data-template-save>✓ Guardar</button></div><div class="template-form"><label>Nombre<input data-template-prop="name" value="${safe(sel.name)}"></label><div class="template-grid"><label>Categoría<input data-template-prop="category" value="${safe(sel.category)}"></label><label>Disponible para<input data-template-prop="scope" value="${safe(sel.scope)}"></label></div><label>Contenido<textarea data-template-prop="body" rows="10">${safe(sel.body)}</textarea></label><div class="variable-chips big"><span>Insertar variable</span>${['{{requester.name}}','{{ticket.id}}','{{ticket.title}}','{{assignee.name}}','{{schedule.date}}','{{schedule.start}}','{{schedule.end}}'].map(v=>`<button data-template-variable="${safe(v)}">${safe(v)}</button>`).join('')}</div></div><div class="template-preview"><span>VISTA PREVIA</span><div class="message-bubble"><strong>Mesa de Ayuda TIC · Gestor</strong><p>${safe(templateExample(sel.body))}</p><small>Visible al funcionario · ahora</small></div></div></section>`:''}</div>`;
}
function templateExample(str){return String(str).replaceAll('{{requester.name}}','María Gómez').replaceAll('{{ticket.id}}','MA-2026-0154').replaceAll('{{ticket.title}}','Solicitud de cubrimiento').replaceAll('{{assignee.name}}','Ana López').replaceAll('{{schedule.date}}','21 de agosto').replaceAll('{{schedule.start}}','9:00 a. m.').replaceAll('{{schedule.end}}','11:00 a. m.');}

function renderAuditStudio(root){
  const q=adminStudio.auditQuery.toLowerCase(),type=adminStudio.auditType;const rows=controlPlane.audit.filter(a=>(type==='all'||a.severity===type)&&(!q||Object.values(a).join(' ').toLowerCase().includes(q)));
  root.innerHTML=`<div class="audit-studio"><div class="audit-toolbar"><div><span class="eyebrow">AUDIT TRAIL · GOBIERNO</span><h2>Auditoría visual</h2><p>Todo cambio administrativo importante genera un evento independiente del ticket.</p></div><div class="audit-filters"><label><span>⌕</span><input id="auditSearch" value="${safe(adminStudio.auditQuery)}" placeholder="Actor, servicio, acción..."></label><select id="auditType"><option value="all">Todos los eventos</option><option value="success" ${type==='success'?'selected':''}>Publicaciones</option><option value="warning" ${type==='warning'?'selected':''}>Cambios sensibles</option><option value="info" ${type==='info'?'selected':''}>Información</option></select></div></div><div class="audit-timeline">${rows.map(a=>`<div class="audit-event ${a.severity}"><i></i><div class="audit-time"><strong>${safe(a.at)}</strong><span>${safe(a.actor)}</span></div><div class="audit-copy"><div><strong>${safe(a.action)}</strong><span>${safe(a.object)}</span></div><p>${safe(a.detail)}</p></div><button title="Ver contexto">›</button></div>`).join('')||'<div class="request-empty"><strong>Sin eventos</strong><p>No hay resultados con estos filtros.</p></div>'}</div></div>`;
}

function renderServiceMatrix(root){
  const deps=controlPlane.departments,records=Object.values(controlPlane.services);
  root.innerHTML=`<div class="matrix-studio"><div class="studio-builder-head"><div><span class="eyebrow">ESM · PORTAFOLIO DE SERVICIOS</span><h2>Matriz institucional de servicios</h2><p>Visualiza propiedad, SLA, aprobación, workflow, audiencia y madurez antes de publicar cambios.</p></div><button class="btn btn-secondary" data-matrix-export>Exportar matriz</button></div><div class="matrix-summary">${deps.map(d=>{const n=records.filter(r=>r.published.department===d.id).length;return `<div><span>${d.icon}</span><strong>${d.name}</strong><b>${n}</b><small>${d.owner}</small></div>`}).join('')}</div><div class="service-matrix-wrap"><table class="service-matrix"><thead><tr><th>Servicio</th><th>Área propietaria</th><th>SLA</th><th>Aprobación</th><th>Workflow</th><th>Canal</th><th>Estado</th></tr></thead><tbody>${records.map(r=>{const s=r.published||r.draft,wf=controlPlane.workflows[s.id];return `<tr><td><div class="matrix-service"><span>${s.icon}</span><div><strong>${safe(s.title)}</strong><small>${safe(s.category)}</small></div></div></td><td>${safe(serviceDepartmentName(s.department))}</td><td><span class="matrix-pill">${safe(s.sla)}</span></td><td>${s.approval?'<span class="matrix-yes">✓ Sí</span>':'No'}</td><td>${wf?`v${wf.version} · ${wf.status}`:'Por diseñar'}</td><td>Portal guiado</td><td>${r.status==='draft'?'<span class="studio-badge draft">BORRADOR</span>':'<span class="studio-badge published">PUBLICADO</span>'}</td></tr>`}).join('')}</tbody></table></div></div>`;
}

// -------- Diseñador avanzado de workflows --------
function workflowRecord(serviceId){
  if(!controlPlane.workflows[serviceId]){
    const legacy=workflowTemplates[serviceId]||[{type:'start',title:'Radicación',desc:'Entrada del servicio'},{type:'task',title:'Atención',desc:'Trabajo del equipo'},{type:'end',title:'Cierre',desc:'Confirmación y resolución'}];
    controlPlane.workflows[serviceId]=flowFromLegacy(serviceId,legacy);
  }
  const wf=controlPlane.workflows[serviceId];if(!wf.draft)wf.draft=clone(wf.nodes);return wf;
}
function workflowNodeMeta(type){return {start:['▶','Inicio'],form:['▤','Formulario'],task:['✓','Tarea'],approval:['A','Aprobación'],decision:['?','Condición'],notification:['◌','Notificación'],wait:['◷','Espera'],sla:['S','Control SLA'],automation:['⚡','Automatización'],end:['■','Cierre']}[type]||['◇','Paso'];}
function renderWorkflows(){
  const svc=serviceById(workflowV6State.service)||services[0];workflowV6State.service=svc.id;const wf=workflowRecord(svc.id),nodes=wf.draft||wf.nodes;let selected=nodes.find(n=>n.id===workflowV6State.selected)||nodes[0];workflowV6State.selected=selected?.id;
  $('#view-workflows').innerHTML=`<div class="workflow-v6"><div class="wf-v6-head"><div><span class="eyebrow">WORKFLOW STUDIO · NO-CODE</span><h1>Diseñador de workflows</h1><p>Modela tareas, aprobaciones, decisiones, esperas, SLA y notificaciones antes de llevar la ejecución a Supabase.</p></div><div class="wf-head-actions"><span class="studio-badge ${wf.status==='draft'?'draft':'published'}">${wf.status==='draft'?'BORRADOR':'PUBLICADO'} · v${wf.version}</span><button class="btn btn-secondary" data-wf-test>▶ Probar flujo</button><button class="btn btn-primary" data-wf-publish>Publicar versión</button></div></div><div class="wf-v6-layout"><aside class="wf-service-rail"><strong>Servicios</strong><input id="wfServiceSearch" value="${safe(workflowV6State.query)}" placeholder="Buscar..."><div>${services.filter(s=>!workflowV6State.query||[s.title,s.category].join(' ').toLowerCase().includes(workflowV6State.query.toLowerCase())).map(s=>`<button class="${s.id===svc.id?'active':''}" data-wf-service="${s.id}"><span>${s.icon}</span><div><strong>${safe(s.title)}</strong><small>${controlPlane.workflows[s.id]?`v${controlPlane.workflows[s.id].version}`:'sin flujo'}</small></div></button>`).join('')}</div></aside><aside class="wf-toolbox"><strong>BLOQUES</strong><p>Agrega comportamiento al proceso.</p>${['form','task','approval','decision','notification','wait','sla','automation'].map(t=>{const [i,l]=workflowNodeMeta(t);return `<button data-wf-add="${t}"><span>${i}</span><div><strong>${l}</strong><small>${wfNodeHelp(t)}</small></div></button>`}).join('')}</aside><section class="wf-canvas-v6"><div class="wf-canvas-toolbar"><span>${safe(svc.title)}</span><div><button data-wf-zoom="out">−</button><strong>${workflowV6State.zoom}%</strong><button data-wf-zoom="in">＋</button></div></div><div class="wf-flow-v6" style="transform:scale(${workflowV6State.zoom/100});transform-origin:top center">${nodes.map((n,i)=>renderWfNode(n,i,selected?.id===n.id,nodes.length)).join('')}</div></section><aside class="wf-inspector">${selected?renderWfInspector(selected):'<p>Selecciona un paso.</p>'}</aside></div></div>`;
}
function wfNodeHelp(t){return {form:'Captura datos adicionales',task:'Trabajo humano o de equipo',approval:'Decisión de un aprobador',decision:'Ramifica por una condición',notification:'Comunica un evento',wait:'Pausa hasta fecha o evento',sla:'Evalúa objetivo de tiempo',automation:'Acción automática / integración'}[t]||'';}
function renderWfNode(n,i,selected,total){const [ico,label]=workflowNodeMeta(n.type);return `${i?'<div class="wf-edge"><span>continúa</span></div>':''}<button class="wf-node-v6 ${n.type} ${selected?'selected':''}" data-wf-node="${n.id}"><span class="wf-node-icon">${ico}</span><div><small>${label.toUpperCase()}</small><strong>${safe(n.title)}</strong><p>${safe(n.desc||wfNodeHelp(n.type))}</p>${n.type==='decision'?'<div class="decision-branches"><i>SI</i><i>NO</i></div>':''}</div><b>⋮</b></button>`;}
function renderWfInspector(n){return `<div class="inspector-head"><span>CONFIGURAR PASO</span><strong>${workflowNodeMeta(n.type)[1]}</strong></div><label>Nombre<input data-wf-prop="title" value="${safe(n.title)}"></label><label>Descripción<textarea data-wf-prop="desc" rows="4">${safe(n.desc||'')}</textarea></label>${['task','approval'].includes(n.type)?`<label>Responsable / grupo<input data-wf-prop="owner" value="${safe(n.owner||'')}" placeholder="Ej. Líder TIC"></label>`:''}${n.type==='decision'?`<label>Condición<input data-wf-prop="condition" value="${safe(n.condition||'')}" placeholder="Ej. Prioridad = Crítica"></label><div class="branch-config"><span>Ramas</span><div><i>SI</i><input value="Continúa por ruta prioritaria" disabled></div><div><i>NO</i><input value="Continúa por ruta estándar" disabled></div></div>`:''}${n.type==='sla'?`<label>Objetivo / regla<input data-wf-prop="sla" value="${safe(n.sla||'70% aviso · 90% escala')}" placeholder="70% aviso · 90% escala"></label>`:''}<div class="wf-inspector-order"><button data-wf-move="up|${n.id}">↑ Subir</button><button data-wf-move="down|${n.id}">↓ Bajar</button></div>${!['start','end'].includes(n.type)?`<button class="btn btn-danger-outline" data-wf-delete="${n.id}">Eliminar paso</button>`:''}`;}

// -------- Wizard ESM: las áreas no operativas se enrutan a cola --------
const renderWizardAssignmentV4=renderWizardAssignment;
renderWizardAssignment=function(body,foot,s){
  if(!s?.esmQueue)return renderWizardAssignmentV4(body,foot,s);
  wizard.assignee='queue';
  body.innerHTML=`<div class="guided-intro compact"><span class="guided-kicker">ENRUTAMIENTO INSTITUCIONAL</span><h3>La solicitud irá a ${safe(s.esmQueue)}</h3><p>Mesa de Ayuda TIC identificó el área responsable según el catálogo. El equipo interno podrá asignar una persona específica según su carga y reglas del servicio.</p></div><div class="esm-routing-card"><span>${s.icon}</span><div><small>GRUPO RESPONSABLE</small><strong>${safe(s.esmQueue)}</strong><p>${safe(serviceDepartmentName(s.department))} · SLA ${safe(s.sla)}</p></div><b>✓</b></div><div class="routing-explain"><span>360</span><div><strong>Sin rebotes entre dependencias</strong><p>El funcionario no necesita saber quién atiende el caso. El catálogo conserva propietario, workflow, SLA y cola de destino.</p></div></div>`;
  foot.innerHTML=`<button class="btn btn-secondary" data-guide-back>← Atrás</button><button class="btn btn-primary" data-guide-assignment-next>Revisar solicitud →</button>`;
};

const submitRequestV5=submitRequest;
submitRequest=function(){
  const s=serviceById(wizard.service);if(!s?.esmQueue)return submitRequestV5();
  const nextNum=Math.max(148,...tickets.map(t=>Number(String(t.id).match(/(\d+)$/)?.[1]||0)))+1,id=`MA-2026-${String(nextNum).padStart(4,'0')}`;
  const t=ensureTicketModel({id,service:s.id,title:wizard.details.title||s.title,requester:wizard.details.requester||'Secretaría General',assignee:'',assignmentGroup:s.esmQueue,priority:wizard.details.priority||'Media',status:s.approval?'En aprobación':'Nuevo',created:'20 Ago · ahora',due:'Según SLA',sla:s.sla,description:wizard.details.f2||wizard.details.f1||wizard.details.f0||wizard.details.title||'Solicitud registrada.',details:{...wizard.details},messages:[{kind:'system',visibility:'public',author:'Mesa de Ayuda TIC',text:`Solicitud radicada y enviada a la cola ${s.esmQueue}.`,at:'Ahora'}],attachments:[],watchers:['Solicitante',s.esmQueue],requesterActionRequired:false,unread:false,approval:s.approval?{required:true,status:'Pendiente',owner:serviceDepartmentName(s.department)}:null,audit:[{action:'Solicitud registrada',actor:'Juan Pérez',at:'Ahora'},{action:'Enrutada por catálogo ESM',actor:'Mesa de Ayuda TIC',at:'Ahora'}]});
  tickets.unshift(t);saveTickets();addNotification({ticket:id,type:'success',title:'Solicitud radicada',text:`${id} fue enviada a ${s.esmQueue}.`});closeRequestModal();showToast('Radicación completada',`${id} quedó en la cola ${s.esmQueue}.`);setView('my-tickets');
};

// -------- Simulación avanzada de perfiles --------
function permissionForRole(role,key){return !!controlPlane.roleMatrix[role]?.[key];}
function setupRoleSwitcher(){
  const sel=$('#roleSelect');if(!sel)return;sel.innerHTML=controlPlane.roles.map(r=>`<option value="${r.id}" ${r.id===simulatedRoleId?'selected':''}>${r.name}</option>`).join('');
}
setRole=function(role){
  const r=controlPlane.roles.find(x=>x.id===role)||controlPlane.roles.find(x=>x.id==='requester');simulatedRoleId=r.id;currentRole=r.mappedRole||'requester';$('#roleSelect').value=r.id;$('#profileRole').textContent=r.name;
  const canOperate=permissionForRole(r.id,'ticket.queue.read');const canAdmin=['catalog','admin'].includes(r.id)||permissionForRole(r.id,'catalog.design');
  $$('.admin-nav').forEach(x=>x.style.display=canOperate?'':'none');$$('.admin-only').forEach(x=>x.style.display=canAdmin?'':'none');
  const active=$('.view.active')?.id.replace('view-','');if(!canOperate&&['ops','continuity','team','assets','reports'].includes(active))setView('home');else if(!canAdmin&&['workflows','admin'].includes(active))setView('home');else renderView(active||'home');
  showToast('Perfil simulado',`Ahora estás viendo Mesa de Ayuda TIC como ${r.name.toLowerCase()}.`);
};

// -------- Eventos del Control Plane --------
function markServiceDraft(rec){rec.status='draft';rec.updated='Ahora';saveControlPlane();}
function refreshAdmin(){renderAdmin();}
function serviceFieldById(id){return currentServiceDraft()?.fields.find(f=>f.id===id);}

function openStudioDialog(title,html){
  let el=$('#studioDialogBackdrop');if(!el){el=document.createElement('div');el.id='studioDialogBackdrop';el.className='modal-backdrop studio-dialog-backdrop';document.body.appendChild(el);}el.hidden=false;el.innerHTML=`<div class="studio-dialog" role="dialog" aria-modal="true"><div class="studio-dialog-head"><div><span class="eyebrow">ADMINISTRACIÓN 360</span><h2>${safe(title)}</h2></div><button data-studio-dialog-close>×</button></div><div class="studio-dialog-body">${html}</div></div>`;
}
function closeStudioDialog(){const el=$('#studioDialogBackdrop');if(el)el.hidden=true;}

function createServiceDialog(){openStudioDialog('Crear un nuevo servicio',`<div class="create-service-form"><p>Se creará como <strong>borrador</strong>. No aparecerá en el portal hasta que lo publiques.</p><label>Nombre del servicio<input id="newServiceName" placeholder="Ej. Solicitar vehículo institucional"></label><label>Área propietaria<select id="newServiceDepartment">${controlPlane.departments.map(d=>`<option value="${d.id}">${d.name}</option>`).join('')}</select></label><label>Descripción<textarea id="newServiceDesc" rows="4" placeholder="Explica en lenguaje ciudadano cuándo debe utilizarse."></textarea></label><div class="dialog-actions"><button class="btn btn-secondary" data-studio-dialog-close>Cancelar</button><button class="btn btn-primary" data-confirm-new-service>Crear borrador</button></div></div>`);}
function createNewService(){const name=$('#newServiceName')?.value.trim();if(!name)return showToast('Falta el nombre','Escribe un nombre para el nuevo servicio.');const dep=$('#newServiceDepartment').value,desc=$('#newServiceDesc').value.trim()||'Nuevo servicio institucional configurable.';const id=`svc-${Date.now()}`;const d={id,title:name,desc,category:serviceDepartmentName(dep),department:dep,family:dep,icon:'◇',tone:'#eef2f6',color:'#1557c0',sla:'1–3 días',approval:false,critical:false,esmQueue:serviceDepartmentName(dep),skills:[],fields:[{id:'fld-1',label:'Describe brevemente lo que necesitas',type:'textarea',options:[],required:true,helper:'Incluye el contexto necesario para orientar la atención.',condition:null}]};controlPlane.services[id]={version:0,status:'draft',published:null,draft:clone(d),updated:'Ahora',owner:controlPlane.departments.find(x=>x.id===dep)?.owner||'Propietario'};adminStudio.service=id;adminStudio.field='fld-1';auditV6('Borrador de servicio creado',name,`Área propietaria: ${serviceDepartmentName(dep)}.`,'info');closeStudioDialog();refreshAdmin();}
function previewServiceDraft(){const d=currentServiceDraft();openStudioDialog(`Vista previa · ${d.title}`,`<div class="draft-preview-wizard"><div class="draft-preview-progress"><span>RADICACIÓN GUIADA</span><strong>${d.fields.length} preguntas personalizadas</strong></div>${d.fields.map((f,i)=>`<div class="draft-preview-step"><i>${i+1}</i><div><strong>${safe(f.label)}</strong><span>${fieldTypeLabel(f.type)}${f.required?' · obligatorio':''}</span>${f.condition?`<small>⚡ ${safe(f.condition)}</small>`:''}</div></div>`).join('')}<div class="preview-publish-note"><strong>Esto es un borrador.</strong><p>El portal de funcionarios continúa utilizando la última versión publicada.</p></div><div class="dialog-actions"><button class="btn btn-secondary" data-studio-dialog-close>Cerrar</button><button class="btn btn-primary" data-publish-service>Publicar versión</button></div></div>`);}
function publishCurrentService(){const rec=currentServiceRecord(),d=rec.draft;rec.published=clone(d);rec.version+=1;rec.status='published';rec.updated='Ahora';applySnapshotToRuntime(rec.published);saveControlPlane();auditV6('Servicio publicado',d.title,`Versión ${rec.version} publicada con ${d.fields.length} campos y SLA ${d.sla}.`,'success');closeStudioDialog();showToast('Servicio publicado',`${d.title} v${rec.version} ya es la configuración activa.`);refreshAdmin();}

function addWorkflowNode(type){const wf=workflowRecord(workflowV6State.service),nodes=wf.draft;const endIndex=nodes.findIndex(n=>n.type==='end');const [i,label]=workflowNodeMeta(type),node={id:`n-${Date.now()}`,type,title:`Nuevo ${label.toLowerCase()}`,desc:wfNodeHelp(type),owner:'',condition:type==='decision'?'Campo = valor':'',sla:type==='sla'?'70% aviso · 90% escala':'',x:0,y:0};nodes.splice(endIndex<0?nodes.length:endIndex,0,node);wf.status='draft';workflowV6State.selected=node.id;saveControlPlane();renderWorkflows();}
function publishWorkflow(){const wf=workflowRecord(workflowV6State.service),svc=serviceById(workflowV6State.service);wf.nodes=clone(wf.draft);wf.version+=1;wf.status='published';wf.updated='Ahora';workflowTemplates[svc.id]=wf.nodes.map(n=>({type:['form','notification','wait','sla','automation'].includes(n.type)?'task':n.type,title:n.title,desc:n.desc}));saveWorkflows();saveControlPlane();auditV6('Workflow publicado',svc.title,`${wf.nodes.length} pasos · versión ${wf.version}.`,'success');showToast('Workflow publicado',`${svc.title} ahora utiliza la versión ${wf.version}.`);renderWorkflows();}
function testWorkflow(){const wf=workflowRecord(workflowV6State.service);openStudioDialog('Simulación del workflow',`<div class="workflow-test"><div class="test-banner"><span>▶</span><div><strong>Ejecución simulada</strong><p>No se ejecutan automatizaciones reales. Se valida estructura, decisiones y responsables configurados.</p></div></div>${wf.draft.map((n,i)=>`<div class="test-step"><i>${i+1}</i><div><strong>${safe(n.title)}</strong><small>${workflowNodeMeta(n.type)[1]} · ${n.owner?safe(n.owner):'configuración válida'}</small></div><span>✓</span></div>`).join('')}<div class="test-result"><strong>✓ Flujo válido para prototipo</strong><p>${wf.draft.length} pasos recorridos sin bloqueo estructural.</p></div><div class="dialog-actions"><button class="btn btn-primary" data-studio-dialog-close>Entendido</button></div></div>`);}

document.addEventListener('click',e=>{
  const tab=e.target.closest('[data-admin-tab]');if(tab){adminStudio.tab=tab.dataset.adminTab;renderAdmin();return;}
  const svc=e.target.closest('[data-studio-service]');if(svc){adminStudio.service=svc.dataset.studioService;adminStudio.field=currentServiceDraft()?.fields[0]?.id||null;renderAdminWorkspace();return;}
  if(e.target.closest('[data-new-service]')){createServiceDialog();return;}
  if(e.target.closest('[data-studio-dialog-close]')){closeStudioDialog();return;}
  if(e.target.closest('[data-confirm-new-service]')){createNewService();return;}
  if(e.target.closest('[data-preview-service]')){previewServiceDraft();return;}
  if(e.target.closest('[data-publish-service]')){publishCurrentService();return;}
  const fsel=e.target.closest('[data-field-select]');if(fsel&&!e.target.closest('[data-field-move]')){adminStudio.field=fsel.dataset.fieldSelect;renderAdminWorkspace();return;}
  const add=e.target.closest('[data-field-add]');if(add){const d=currentServiceDraft(),type=add.dataset.fieldAdd,id=`fld-${Date.now()}`;d.fields.push({id,label:type==='info'?'Información importante':'Nueva pregunta',type,options:type==='select'?['Opción 1','Opción 2']:[],required:type!=='info',helper:'',condition:null});adminStudio.field=id;markServiceDraft(currentServiceRecord());renderAdminWorkspace();return;}
  const move=e.target.closest('[data-field-move]');if(move){e.preventDefault();e.stopPropagation();const [dir,id]=move.dataset.fieldMove.split('|'),arr=currentServiceDraft().fields,idx=arr.findIndex(f=>f.id===id),to=dir==='up'?idx-1:idx+1;if(idx>=0&&to>=0&&to<arr.length){[arr[idx],arr[to]]=[arr[to],arr[idx]];markServiceDraft(currentServiceRecord());}renderAdminWorkspace();return;}
  const del=e.target.closest('[data-field-delete]');if(del){const d=currentServiceDraft();d.fields=d.fields.filter(f=>f.id!==del.dataset.fieldDelete);adminStudio.field=d.fields[0]?.id||null;markServiceDraft(currentServiceRecord());renderAdminWorkspace();return;}
  const role=e.target.closest('[data-role-select]');if(role){adminStudio.role=role.dataset.roleSelect;renderAdminWorkspace();return;}
  const sim=e.target.closest('[data-role-simulate]');if(sim){setRole(sim.dataset.roleSimulate);return;}
  const nr=e.target.closest('[data-notification-rule]');if(nr){adminStudio.notification=nr.dataset.notificationRule;renderAdminWorkspace();return;}
  if(e.target.closest('[data-notification-rule-add]')){const r={id:`NR-${Date.now()}`,name:'Nueva regla',trigger:'Solicitud creada',audience:'Solicitante',channels:['In-app'],template:'Actualización de {{ticket.id}}.',enabled:false,critical:false};controlPlane.notificationRules.unshift(r);adminStudio.notification=r.id;saveControlPlane();auditV6('Regla de notificación creada',r.name,'Se creó como regla pausada.','info');renderAdminWorkspace();return;}
  if(e.target.closest('[data-test-notification]')){const r=controlPlane.notificationRules.find(x=>x.id===adminStudio.notification);showToast('Prueba simulada',`${r.channels.join(' + ')} · ${templateExample(r.template)}`);return;}
  const tmp=e.target.closest('[data-template]');if(tmp){adminStudio.template=tmp.dataset.template;renderAdminWorkspace();return;}
  if(e.target.closest('[data-template-add]')){const t={id:`RT-${Date.now()}`,name:'Nueva respuesta',category:'General',scope:'Todos los gestores',body:'Hola {{requester.name}}. [ESCRIBE AQUÍ LA RESPUESTA].'};controlPlane.templates.unshift(t);adminStudio.template=t.id;saveControlPlane();renderAdminWorkspace();return;}
  const variable=e.target.closest('[data-template-variable]');if(variable){const t=controlPlane.templates.find(x=>x.id===adminStudio.template);t.body+=` ${variable.dataset.templateVariable}`;saveControlPlane();renderAdminWorkspace();return;}
  if(e.target.closest('[data-template-save]')){const t=controlPlane.templates.find(x=>x.id===adminStudio.template);saveControlPlane();auditV6('Plantilla actualizada',t.name,`Categoría ${t.category}.`,'info');showToast('Plantilla guardada','La respuesta rápida quedó actualizada.');return;}
  if(e.target.closest('[data-matrix-export]')){showToast('Matriz preparada','En producción podrá exportarse a Excel/PDF. La estructura ya está modelada.');return;}
  const wfSvc=e.target.closest('[data-wf-service]');if(wfSvc){workflowV6State.service=wfSvc.dataset.wfService;workflowV6State.selected=null;renderWorkflows();return;}
  const wfAdd=e.target.closest('[data-wf-add]');if(wfAdd){addWorkflowNode(wfAdd.dataset.wfAdd);return;}
  const wfNode=e.target.closest('[data-wf-node]');if(wfNode){workflowV6State.selected=wfNode.dataset.wfNode;renderWorkflows();return;}
  const wfMove=e.target.closest('[data-wf-move]');if(wfMove){const [dir,id]=wfMove.dataset.wfMove.split('|'),wf=workflowRecord(workflowV6State.service),arr=wf.draft,idx=arr.findIndex(n=>n.id===id),to=dir==='up'?idx-1:idx+1;if(idx>0&&to>0&&to<arr.length-1){[arr[idx],arr[to]]=[arr[to],arr[idx]];wf.status='draft';saveControlPlane();}renderWorkflows();return;}
  const wfDel=e.target.closest('[data-wf-delete]');if(wfDel){const wf=workflowRecord(workflowV6State.service);wf.draft=wf.draft.filter(n=>n.id!==wfDel.dataset.wfDelete);wf.status='draft';workflowV6State.selected=wf.draft[0]?.id;saveControlPlane();renderWorkflows();return;}
  if(e.target.closest('[data-wf-publish]')){publishWorkflow();return;}
  if(e.target.closest('[data-wf-test]')){testWorkflow();return;}
},true);

document.addEventListener('input',e=>{
  if(e.target.matches('[data-service-prop]')){const rec=currentServiceRecord(),d=rec.draft,key=e.target.dataset.serviceProp;d[key]=e.target.value;if(key==='department'){d.family=e.target.value;d.category=serviceDepartmentName(e.target.value);d.esmQueue=['comunicaciones','tic'].includes(e.target.value)?d.esmQueue:serviceDepartmentName(e.target.value);}markServiceDraft(rec);return;}
  if(e.target.matches('[data-field-prop]')){const f=serviceFieldById(adminStudio.field);if(!f)return;const key=e.target.dataset.fieldProp;f[key]=key==='options'?e.target.value.split('\n').map(x=>x.trim()).filter(Boolean):e.target.value;markServiceDraft(currentServiceRecord());return;}
  if(e.target.matches('[data-nr-prop]')){const r=controlPlane.notificationRules.find(x=>x.id===adminStudio.notification);r[e.target.dataset.nrProp]=e.target.value;saveControlPlane();return;}
  if(e.target.matches('[data-template-prop]')){const t=controlPlane.templates.find(x=>x.id===adminStudio.template);t[e.target.dataset.templateProp]=e.target.value;saveControlPlane();return;}
  if(e.target.id==='auditSearch'){adminStudio.auditQuery=e.target.value;renderAuditStudio($('#admin360Workspace'));setTimeout(()=>{const x=$('#auditSearch');x?.focus();x?.setSelectionRange(x.value.length,x.value.length);},0);return;}
  if(e.target.matches('[data-wf-prop]')){const wf=workflowRecord(workflowV6State.service),n=wf.draft.find(x=>x.id===workflowV6State.selected);if(n){n[e.target.dataset.wfProp]=e.target.value;wf.status='draft';saveControlPlane();}return;}
});

document.addEventListener('change',e=>{
  if(e.target.matches('[data-service-check]')){const rec=currentServiceRecord();rec.draft[e.target.dataset.serviceCheck]=e.target.checked;markServiceDraft(rec);return;}
  if(e.target.matches('[data-field-check]')){const f=serviceFieldById(adminStudio.field);if(f){f[e.target.dataset.fieldCheck]=e.target.checked;markServiceDraft(currentServiceRecord());}return;}
  if(e.target.matches('[data-permission]')){controlPlane.roleMatrix[adminStudio.role][e.target.dataset.permission]=e.target.checked;saveControlPlane();auditV6('Permiso modificado',controlPlane.roles.find(r=>r.id===adminStudio.role)?.name||adminStudio.role,`${e.target.dataset.permission}: ${e.target.checked?'permitido':'denegado'}.`,'warning');return;}
  if(e.target.matches('[data-nr-channel]')){const r=controlPlane.notificationRules.find(x=>x.id===adminStudio.notification),c=e.target.dataset.nrChannel;if(e.target.checked&&!r.channels.includes(c))r.channels.push(c);if(!e.target.checked)r.channels=r.channels.filter(x=>x!==c);saveControlPlane();renderAdminWorkspace();return;}
  if(e.target.matches('[data-nr-enabled]')){const r=controlPlane.notificationRules.find(x=>x.id===adminStudio.notification);r.enabled=e.target.checked;saveControlPlane();auditV6(r.enabled?'Regla activada':'Regla pausada',r.name,r.trigger,r.enabled?'success':'warning');renderAdminWorkspace();return;}
  if(e.target.id==='auditType'){adminStudio.auditType=e.target.value;renderAdminWorkspace();return;}
  if(e.target.matches('[data-service-prop="sla"],[data-service-prop="department"]')){renderAdminWorkspace();return;}
  if(e.target.matches('[data-field-prop="type"]')){const f=serviceFieldById(adminStudio.field);if(f){f.type=e.target.value;if(f.type==='select'&&!f.options.length)f.options=['Opción 1','Opción 2'];markServiceDraft(currentServiceRecord());renderAdminWorkspace();}return;}
});

// Extiende renderView / breadcrumbs sin romper v0.5.
renderView=function(view){const fn={home:renderHomeV5,'new-request':renderNewRequest,'my-tickets':renderMyTicketsV5,notifications:renderNotifications,knowledge:renderKnowledge,status:renderStatus,calendar:renderCalendar,ops:renderOps,continuity:renderContinuity,team:renderTeam,assets:renderAssets,catalog:renderCatalog,reports:renderReports,workflows:renderWorkflows,admin:renderAdmin}[view];fn?.();};
const setViewV6Base=setView;
setView=function(view){$$('.view').forEach(v=>v.classList.remove('active'));const target=$(`#view-${view}`);if(!target)return;target.classList.add('active');$$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===view));const names={home:'Inicio','new-request':'Nueva solicitud','my-tickets':'Mis solicitudes',notifications:'Actualizaciones',knowledge:'Centro de conocimiento',status:'Estado de servicios',calendar:'Agenda y disponibilidad',ops:'Centro de operaciones',continuity:'Incidentes, problemas y cambios',team:'Equipo y capacidad',assets:'Activos y CMDB',catalog:'Catálogo multidependencia',reports:'Indicadores',workflows:'Diseñador de workflows',admin:'Administración 360'};$('#breadcrumb').textContent=`Mesa de Ayuda TIC / ${names[view]||'Inicio'}`;renderView(view);if(innerWidth<860)$('#sidebar').classList.remove('open');};

// Catálogo multidependencia: agrega navegación por área propietaria.
const renderCatalogV5=renderCatalog;
renderCatalog=function(category='Todos'){
  const departments=controlPlane.departments;
  const grouped=departments.map(dep=>({dep,items:services.filter(s=>(s.department||inferDepartment(s))===dep.id)})).filter(g=>g.items.length);
  $('#view-catalog').innerHTML=`<div class="catalog-v6-head"><div><span class="eyebrow">ENTERPRISE SERVICE MANAGEMENT · ESM</span><h1>Catálogo institucional de servicios</h1><p>Una sola puerta de entrada para TIC, Comunicaciones y otras áreas internas. El funcionario elige la necesidad; Mesa de Ayuda TIC conserva el propietario y las reglas por detrás.</p></div><button class="btn btn-primary" data-action="open-new-request">＋ Radicar solicitud</button></div><div class="department-catalog-grid">${grouped.map(({dep,items})=>`<section class="department-catalog-card"><div class="department-catalog-head"><span>${dep.icon}</span><div><strong>${dep.name}</strong><small>${dep.owner}</small></div><b>${items.length}</b></div><div class="department-service-list">${items.map(s=>`<button data-service="${s.id}"><span>${s.icon}</span><div><strong>${safe(s.title)}</strong><small>${safe(s.desc)}</small></div><i>${safe(s.sla)}</i></button>`).join('')}</div></section>`).join('')}</div>`;
};

setupRoleSwitcher();
setRole('requester');
renderHomeV5();


// Plantillas operativas integradas en la conversación del ticket.
const renderTicketDrawerV6Base=renderTicketDrawerV5;
renderTicketDrawerV5=function(){
  renderTicketDrawerV6Base();
  if(currentRole==='requester'||ticketDrawerState.tab!=='activity')return;
  const box=$('.pro-comment');if(!box||box.querySelector('.quick-template-row'))return;
  const row=document.createElement('div');row.className='quick-template-row';
  row.innerHTML=`<span>RESPUESTA RÁPIDA</span><select id="ticketQuickTemplate"><option value="">Seleccionar plantilla...</option>${controlPlane.templates.map(t=>`<option value="${t.id}">${safe(t.name)}</option>`).join('')}</select><button type="button" data-insert-template>Insertar</button>`;
  const textarea=box.querySelector('textarea');box.insertBefore(row,textarea);
};
renderTicketDrawer=renderTicketDrawerV5;

const addTicketCommentV6Base=addTicketCommentV5;
addTicketCommentV5=function(id){
  const text=$('#ticketCommentText')?.value.trim();const visibility=$('input[name="commentMode"]:checked')?.value||'public';
  addTicketCommentV6Base(id);
  if(text)auditV6(visibility==='internal'?'Nota interna registrada':'Respuesta al funcionario publicada',id,text.slice(0,120),visibility==='internal'?'warning':'info',currentRole==='admin'?'Administrador Mesa de Ayuda TIC':'Gestor de servicio');
};

document.addEventListener('click',e=>{
  if(e.target.closest('[data-insert-template]')){
    const id=$('#ticketQuickTemplate')?.value,t=controlPlane.templates.find(x=>x.id===id),ticket=tickets.find(x=>x.id===ticketDrawerState.id);if(!t||!ticket)return;
    const assignee=personById(ticket.assignee)?.name||ticket.assignmentGroup||'Mesa de Ayuda TIC';let body=t.body.replaceAll('{{requester.name}}',ticket.requester||'Funcionario').replaceAll('{{ticket.id}}',ticket.id).replaceAll('{{ticket.title}}',ticket.title).replaceAll('{{assignee.name}}',assignee).replaceAll('{{schedule.date}}',ticket.details?.scheduledDate||'fecha programada').replaceAll('{{schedule.start}}',ticket.details?.scheduledStart||'hora inicial').replaceAll('{{schedule.end}}',ticket.details?.scheduledEnd||'hora final');
    const ta=$('#ticketCommentText');if(ta){ta.value=body;ta.focus();showToast('Plantilla insertada',t.name);}
  }
},true);

// Re-render del inspector al confirmar cambios estructurales de campos.
document.addEventListener('change',e=>{
  if(e.target.matches('[data-field-prop="label"],[data-field-prop="helper"],[data-field-prop="options"],[data-field-prop="condition"]')){renderAdminWorkspace();}
  if(e.target.matches('[data-service-prop="title"]'))renderAdminWorkspace();
});

// -------- Runtime de formularios publicados: helper, requerido y condiciones simples --------
function conditionMatches(expr){
  if(!expr)return true;const m=String(expr).match(/^\s*([\w-]+)\s*(=|!=)\s*(.+?)\s*$/);if(!m)return true;
  const [,key,op,raw]=m,value=String(wizard.details[key]??'').trim().toLowerCase(),expected=raw.replace(/^['"]|['"]$/g,'').trim().toLowerCase();
  return op==='='?value===expected:value!==expected;
}
buildWizardQuestions=function(s){
  const priorityOptions=s.critical?['Crítica']:['Baja','Media','Alta','Crítica'];
  const base=[{key:'requester',label:'¿Desde qué dependencia estás radicando?',type:'select',options:dependencyOptions,required:true,helper:'Esto permite entregar trazabilidad por área y dirigir aprobaciones cuando correspondan.'},{key:'title',label:'Resume en una frase lo que necesitas',type:'text',placeholder:'Ej. Solicitud institucional',required:true,helper:'Usa una frase corta y concreta; será el título visible de la solicitud.'},{key:'priority',label:'¿Qué nivel de impacto tiene esta solicitud?',type:'select',options:priorityOptions,required:true,helper:'La prioridad debe representar impacto operativo, no preferencia personal.'}];
  const cfg=controlPlane.services[s.id]?.published;
  const custom=(cfg?.fields||s.fields.map(([label,type,opts],i)=>({id:`fld-${i+1}`,label,type,options:opts||[],required:!/(si aplica|opcional)/i.test(label),helper:'',condition:null}))).map((f,i)=>({key:`f${i}`,fieldId:f.id,label:f.label,type:f.type,options:f.options||[],required:f.required!==false,helper:f.helper||'',condition:f.condition||null,placeholder:f.type==='textarea'?'Describe la necesidad con el contexto suficiente':''})).filter(q=>conditionMatches(q.condition));
  return [...base,...custom];
};
isQuestionRequired=function(q){return typeof q.required==='boolean'?q.required:['requester','title','priority'].includes(q.key);};
const questionControlV6Base=questionControl;
questionControl=function(q,s){if(q.type==='info')return `<div class="guided-info-step"><span>i</span><p>${safe(q.helper||q.label)}</p></div>`;return questionControlV6Base(q,s);};
renderWizardQuestion=function(body,foot,s){
  const questions=buildWizardQuestions(s);wizard.questionIndex=Math.max(0,Math.min(wizard.questionIndex,questions.length-1));const q=questions[wizard.questionIndex],pct=Math.round(((wizard.questionIndex+1)/questions.length)*100);
  body.innerHTML=`<div class="question-shell"><div class="question-progress"><div><span>PREGUNTA ${wizard.questionIndex+1} DE ${questions.length}</span><strong>${pct}%</strong></div><div class="question-progress-track"><i style="width:${pct}%"></i></div></div><div class="guided-question"><span class="guided-kicker">${safe((s.category||'Servicio').toUpperCase())}</span><h3>${safe(q.label)} ${isQuestionRequired(q)?'<em>*</em>':''}</h3><p>${safe(q.helper||questionHelper(q.label,s))}</p>${questionControl(q,s)}${q.condition?`<div class="guided-condition-note">⚡ Esta pregunta apareció por una respuesta anterior.</div>`:''}${wizard.error?`<div class="guided-error">${safe(wizard.error)}</div>`:''}</div></div>`;
  foot.innerHTML=`<button class="btn btn-secondary" data-guide-back>← Atrás</button><div class="footer-actions"><span class="guided-footer-note">${wizard.questionIndex+1}/${questions.length}</span><button class="btn btn-primary" data-guide-question-next>${wizard.questionIndex===questions.length-1?'Continuar a programación →':'Continuar →'}</button></div>`;requestAnimationFrame(()=>$('#requestWizard [data-guide-field]')?.focus());
};

function hasPermissionV6(key){return !!controlPlane.roleMatrix[simulatedRoleId]?.[key];}
const renderTicketDrawerV6PermissionsBase=renderTicketDrawerV5;
renderTicketDrawerV5=function(){
  renderTicketDrawerV6PermissionsBase();
  if(currentRole==='requester')return;
  if(!hasPermissionV6('ticket.internal_note'))$('input[name="commentMode"][value="internal"]')?.closest('label')?.remove();
  if(!hasPermissionV6('request.comment'))$('.pro-comment')?.remove();
  if(!hasPermissionV6('ticket.status'))$('.ticket-actionbar')?.remove();
  if(!hasPermissionV6('approval.decide'))$('.approval-actions')?.remove();
};
renderTicketDrawer=renderTicketDrawerV5;

preferredDateForService=function(s){const cfg=controlPlane.services[s.id]?.published;const fields=cfg?.fields||s.fields.map(([label,type])=>({label,type}));const idx=fields.findIndex(f=>f.type==='date'||String(f.label).toLowerCase().includes('fecha'));const value=idx>=0?wizard.details[`f${idx}`]:'';return /^\d{4}-\d{2}-\d{2}$/.test(value||'')?value:calendarState.date;};
guidedDurationForService=function(s){
  const cfg=controlPlane.services[s.id]?.published,fields=cfg?.fields||s.fields.map(([label,type])=>({label,type}));const timeIdx=fields.map((f,i)=>f.type==='time'?i:-1).filter(i=>i>=0);
  if(timeIdx.length>=2){const start=wizard.details[`f${timeIdx[0]}`],end=wizard.details[`f${timeIdx[1]}`];if(/^\d\d:\d\d$/.test(start||'')&&/^\d\d:\d\d$/.test(end||'')){const d=timeToMin(end)-timeToMin(start);if(d>0&&d<=8*60)return d;}}
  return s.id==='cubrimientos'?120:s.id==='capacitacion'?60:calendarState.duration||60;
};

function createRoleDialog(){openStudioDialog('Crear perfil / rol',`<div class="create-service-form"><p>El nuevo rol iniciará sin permisos. Después podrás habilitar únicamente las capacidades necesarias.</p><label>Nombre del rol<input id="newRoleName" placeholder="Ej. Gestor de Comunicaciones"></label><label>Tipo de experiencia<select id="newRoleMapped"><option value="requester">Portal / solicitante</option><option value="agent">Operación / gestor</option><option value="admin">Administración</option></select></label><label>Descripción<textarea id="newRoleDesc" rows="4" placeholder="Qué responsabilidad tendrá este perfil."></textarea></label><div class="dialog-actions"><button class="btn btn-secondary" data-studio-dialog-close>Cancelar</button><button class="btn btn-primary" data-confirm-new-role>Crear rol</button></div></div>`);}
function createNewRole(){const name=$('#newRoleName')?.value.trim();if(!name)return showToast('Falta el nombre','Escribe un nombre para el perfil.');const id=`role-${Date.now()}`,mappedRole=$('#newRoleMapped').value,desc=$('#newRoleDesc').value.trim()||'Perfil configurable de Mesa de Ayuda TIC.';controlPlane.roles.push({id,name,desc,mappedRole});controlPlane.roleMatrix[id]={};adminStudio.role=id;saveControlPlane();setupRoleSwitcher();auditV6('Rol creado',name,`Experiencia base: ${mappedRole}.`,'warning');closeStudioDialog();renderAdmin();}

document.addEventListener('click',e=>{
  if(e.target.closest('[data-role-add]')){createRoleDialog();return;}
  if(e.target.closest('[data-confirm-new-role]')){createNewRole();return;}
  const zoom=e.target.closest('[data-wf-zoom]');if(zoom){workflowV6State.zoom=Math.max(70,Math.min(140,workflowV6State.zoom+(zoom.dataset.wfZoom==='in'?10:-10)));renderWorkflows();return;}
},true);

document.addEventListener('input',e=>{
  if(e.target.id==='studioServiceSearch'){adminStudio.serviceQuery=e.target.value;renderServiceStudio($('#admin360Workspace'));setTimeout(()=>{const x=$('#studioServiceSearch');x?.focus();x?.setSelectionRange(x.value.length,x.value.length);},0);return;}
  if(e.target.id==='wfServiceSearch'){workflowV6State.query=e.target.value;renderWorkflows();setTimeout(()=>{const x=$('#wfServiceSearch');x?.focus();x?.setSelectionRange(x.value.length,x.value.length);},0);return;}
});
