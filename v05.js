/* =========================================================
   Mesa de Ayuda TIC v0.5 · MADUREZ PRE-BACKEND
   Autoservicio, conocimiento, notificaciones, ESM, ITSM,
   activos/CMDB, workflows, auditoría y experiencia pública.
   ========================================================= */

const knowledgeArticles = [
  {id:'KB-001',service:'correo',category:'Correo y acceso',icon:'@',title:'No puedo iniciar sesión en el correo institucional',summary:'Comprobaciones seguras para diferenciar contraseña, sesión, MFA y problemas del dispositivo.',updated:'18 Ago 2026',owner:'Mesa TIC',views:184,helpful:92,body:`<p>Antes de radicar un caso, realiza estas comprobaciones:</p><ol><li>Confirma que tienes conexión a internet.</li><li>Prueba el correo desde el navegador institucional.</li><li>Verifica que estés usando la cuenta correcta.</li><li>Si aparece un código MFA, completa la validación desde tu método registrado.</li></ol><div class="article-callout"><strong>Importante:</strong> nunca envíes tu contraseña o códigos de verificación en una solicitud.</div><p>Si el problema continúa, radica una solicitud de <b>Correo institucional</b> indicando el mensaje exacto que aparece.</p>`},
  {id:'KB-002',service:'internet',category:'Conectividad',icon:'⌁',title:'Cómo identificar si una falla de internet es individual o general',summary:'Guía rápida para reportar conectividad con la información que acelera el diagnóstico.',updated:'19 Ago 2026',owner:'Infraestructura TIC',views:121,helpful:95,body:`<p>Comprueba si la falla afecta:</p><ul><li>solo tu computador;</li><li>varios equipos de la oficina;</li><li>toda la dependencia;</li><li>Wi‑Fi, cable o ambos.</li></ul><p>Registra ubicación exacta, hora aproximada y cantidad de personas afectadas. Si son varios funcionarios, Mesa de Ayuda TIC puede asociar las solicitudes a un incidente general.</p>`},
  {id:'KB-003',service:'publicaciones',category:'Comunicaciones',icon:'✦',title:'Qué insumos debe tener una solicitud de publicación',summary:'Checklist para evitar devoluciones y acelerar diseño, revisión y publicación.',updated:'17 Ago 2026',owner:'Comunicaciones',views:208,helpful:89,body:`<p>Una solicitud completa debería incluir:</p><ul><li>objetivo de la publicación;</li><li>público objetivo;</li><li>fecha ideal;</li><li>texto base o datos verificados;</li><li>fotografías o soportes, si aplican;</li><li>canales requeridos.</li></ul><div class="article-callout">Mesa de Ayuda TIC mostrará campos adicionales cuando el tipo de publicación requiera aprobación o programación.</div>`},
  {id:'KB-004',service:'cubrimientos',category:'Comunicaciones',icon:'◉',title:'Cómo solicitar un cubrimiento institucional',summary:'Fecha, lugar, duración, objetivo y tipo de registro necesarios para reservar agenda.',updated:'19 Ago 2026',owner:'Comunicaciones',views:97,helpful:96,body:`<p>Define el tipo de registro requerido: fotografía, video, transmisión o acompañamiento. Indica lugar, hora de inicio, hora estimada de cierre y propósito del evento.</p><p>El planificador de Mesa de Ayuda TIC compara disponibilidad y competencias para sugerir el mejor espacio y responsable.</p>`},
  {id:'KB-005',service:'equipos',category:'Equipos',icon:'▣',title:'Qué hacer cuando un computador presenta un error',summary:'Pasos seguros antes de solicitar soporte y datos mínimos para identificar el activo.',updated:'14 Ago 2026',owner:'Mesa TIC',views:153,helpful:91,body:`<p>Guarda tu trabajo, toma una captura del mensaje y reinicia una sola vez si es seguro hacerlo. No desarmes el equipo ni modifiques componentes.</p><p>Si tiene placa de inventario, inclúyela en la solicitud para que el gestor consulte su historial y garantías.</p>`},
  {id:'KB-006',service:'accesos',category:'Identidad y permisos',icon:'◇',title:'Diferencia entre bloqueo, acceso y permiso',summary:'Ayuda a escoger correctamente entre desbloqueo, alta de usuario o modificación de permisos.',updated:'12 Ago 2026',owner:'Seguridad Digital',views:88,helpful:93,body:`<p><b>Bloqueo:</b> la cuenta existe pero no permite iniciar sesión. <b>Acceso:</b> necesitas entrar a un sistema que aún no tienes habilitado. <b>Permiso:</b> ya ingresas al sistema, pero necesitas una función o carpeta adicional.</p>`},
  {id:'KB-007',service:'web',category:'Sitio web',icon:'◫',title:'Cómo reportar una corrección del sitio web',summary:'Qué URL, evidencia y resultado esperado debes adjuntar para una corrección rápida.',updated:'16 Ago 2026',owner:'Gobierno Digital',views:76,helpful:94,body:`<p>Copia la URL exacta, explica qué está incorrecto y cómo debería verse. Si el problema ocurre solo en móvil o en un navegador específico, indícalo.</p>`},
  {id:'KB-008',service:'seguridad',category:'Seguridad digital',icon:'△',title:'Qué hacer ante un correo sospechoso o posible phishing',summary:'Acciones inmediatas de contención antes de radicar un incidente de seguridad.',updated:'19 Ago 2026',owner:'Seguridad Digital',views:246,helpful:98,body:`<p>No abras enlaces ni adjuntos. No respondas. Si ya ingresaste credenciales, desconecta el equipo de la red si es seguro hacerlo y reporta inmediatamente un <b>Incidente de seguridad</b>.</p><div class="article-callout"><strong>Prioridad:</strong> estos casos se consideran de atención inmediata.</div>`}
];

const serviceStatusData = [
  {id:'correo',name:'Correo institucional',state:'operational',detail:'Operación normal',history:['ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','ok']},
  {id:'internet',name:'Internet sede principal',state:'degraded',detail:'Intermitencia menor segundo piso',history:['ok','ok','ok','ok','warn','warn','ok','ok','warn','ok','ok','warn']},
  {id:'web',name:'Sitio web institucional',state:'operational',detail:'Operación normal',history:['ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','ok']},
  {id:'erp',name:'Aplicaciones internas',state:'operational',detail:'Operación normal',history:['ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','ok']},
  {id:'telefonia',name:'Telefonía / comunicaciones',state:'operational',detail:'Operación normal',history:['ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','ok']},
  {id:'impresion',name:'Impresión compartida',state:'operational',detail:'Operación normal',history:['ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','ok']}
];

const assetsData = [
  {id:'PC-SP-034',type:'Computador',name:'Dell OptiPlex 7010',user:'Laura Gómez',department:'Hacienda',state:'Operativo',serial:'DX34-19A',ip:'10.10.4.34',warranty:'12 Feb 2027',location:'Segundo piso · Hacienda',tickets:['MA-2026-0144'],criticality:'Media'},
  {id:'PC-SP-041',type:'Portátil',name:'Lenovo ThinkPad E14',user:'Camilo Torres',department:'Planeación',state:'Operativo',serial:'LNV-2148',ip:'10.10.3.41',warranty:'03 Jun 2027',location:'Planeación',tickets:['MA-2026-0147'],criticality:'Media'},
  {id:'PR-SP-008',type:'Impresora',name:'HP LaserJet Pro M428',user:'Compartida',department:'Secretaría General',state:'Atención',serial:'HPM428-88',ip:'10.10.2.18',warranty:'Vencida',location:'Primer piso',tickets:[],criticality:'Alta'},
  {id:'SW-SP-003',type:'Switch',name:'Cisco CBS350-24T',user:'Infraestructura TIC',department:'TIC',state:'Operativo',serial:'CBS-3100',ip:'10.10.0.3',warranty:'22 Nov 2028',location:'Rack principal',tickets:['MA-2026-0144'],criticality:'Crítica'},
  {id:'AP-SP-012',type:'Access Point',name:'Ubiquiti U6 Pro',user:'Infraestructura TIC',department:'TIC',state:'Atención',serial:'U6P-122',ip:'10.10.20.12',warranty:'18 Ene 2028',location:'Segundo piso',tickets:['MA-2026-0144'],criticality:'Alta'},
  {id:'LIC-SP-365',type:'Licencia',name:'Microsoft 365 Business',user:'Planeación',department:'Planeación',state:'Operativo',serial:'TENANT-M365',ip:'No aplica',warranty:'Renovación anual',location:'Cloud',tickets:['MA-2026-0147'],criticality:'Alta'}
];

const continuityData = {
  incidents:[
    {id:'INC-2026-021',title:'Intermitencia de conectividad segundo piso',state:'Investigando',owner:'Diana Gómez',impact:'Hacienda / Planeación',risk:'Alta',linked:4,started:'20 Ago · 7:34'},
    {id:'INC-2026-020',title:'Retraso temporal de recepción de correo externo',state:'Resuelto',owner:'Carlos Rojas',impact:'Correo institucional',risk:'Media',linked:7,started:'18 Ago · 10:12'}
  ],
  problems:[
    {id:'PRB-2026-006',title:'Pérdida recurrente de señal Wi‑Fi segundo piso',state:'Análisis causa raíz',owner:'Diana Gómez',impact:'Conectividad',risk:'Alta',linked:9,started:'12 Ago'},
    {id:'PRB-2026-005',title:'Bloqueos reiterados de sesión en cuentas antiguas',state:'Workaround publicado',owner:'Carlos Rojas',impact:'Identidad',risk:'Media',linked:6,started:'08 Ago'}
  ],
  changes:[
    {id:'CHG-2026-011',title:'Actualización de configuración de puntos de acceso',state:'En aprobación',owner:'Diana Gómez',impact:'Red institucional',risk:'Media',linked:1,started:'Ventana: 21 Ago · 6:00 p. m.'},
    {id:'CHG-2026-010',title:'Despliegue nueva versión formulario de emergencias',state:'Programado',owner:'Juan Pérez',impact:'Gestión del Riesgo',risk:'Baja',linked:1,started:'Ventana: 22 Ago · 5:30 p. m.'}
  ]
};

const baseWorkflowTemplates = {
  publicaciones:[
    {type:'start',title:'Radicación completa',desc:'Valida datos mínimos y documentos.'},
    {type:'decision',title:'¿Requiere aprobación?',desc:'Regla por canal, fecha y tipo de contenido.'},
    {type:'approval',title:'Aprobación de Comunicaciones',desc:'Responsable configurable y delegable.'},
    {type:'task',title:'Diseño / preparación',desc:'Crea tareas internas según el producto.'},
    {type:'task',title:'Revisión y publicación',desc:'Control de calidad y evidencia.'},
    {type:'end',title:'Cierre y notificación',desc:'Entrega evidencia y solicita satisfacción.'}
  ],
  cubrimientos:[
    {type:'start',title:'Radicación + agenda',desc:'Fecha, lugar, duración y objetivo.'},
    {type:'decision',title:'Validar disponibilidad',desc:'Cruza agenda, habilidades y capacidad.'},
    {type:'task',title:'Confirmar responsable',desc:'Reserva y notifica al funcionario.'},
    {type:'task',title:'Ejecutar cubrimiento',desc:'Registro, evidencias y novedades.'},
    {type:'end',title:'Entrega / cierre',desc:'Publicación o entrega de material.'}
  ],
  correo:[
    {type:'start',title:'Triage automático',desc:'Clasifica acceso, MFA, envío o recepción.'},
    {type:'decision',title:'¿Puede resolverse con conocimiento?',desc:'Ofrece autosolución antes de crear trabajo manual.'},
    {type:'task',title:'Diagnóstico técnico',desc:'Valida identidad, servicio y dispositivo.'},
    {type:'task',title:'Resolver y documentar',desc:'Registra causa, acción y respuesta.'},
    {type:'end',title:'Confirmar solución',desc:'El funcionario valida o reabre.'}
  ],
  desarrollo:[
    {type:'start',title:'Recepción de necesidad',desc:'Problema, usuarios, impacto y objetivo.'},
    {type:'approval',title:'Aprobación / priorización',desc:'Valida pertinencia y capacidad.'},
    {type:'task',title:'Análisis funcional',desc:'Alcance, riesgos y criterios de aceptación.'},
    {type:'task',title:'Desarrollo / configuración',desc:'Ejecución de la solución.'},
    {type:'decision',title:'QA aprobado',desc:'Pruebas funcionales y accesibilidad.'},
    {type:'end',title:'Entrega y conocimiento',desc:'Cierre, manual y evidencia.'}
  ]
};

let workflowTemplates = JSON.parse(localStorage.getItem('mesa360_workflows') || 'null') || baseWorkflowTemplates;
let mesaNotifications = JSON.parse(localStorage.getItem('mesa360_notifications') || 'null') || [
  {id:'N-1',ticket:'MA-2026-0147',type:'alert',title:'Planeación debe confirmar la validación',text:'Carlos Rojas dejó una respuesta en la solicitud de correo institucional.',at:'Hace 12 min',read:false},
  {id:'N-2',ticket:'MA-2026-0146',type:'success',title:'Cubrimiento confirmado',text:'La reserva con Sofía Martínez quedó programada para el Consejo de Gobierno.',at:'Hace 34 min',read:false},
  {id:'N-3',ticket:'MA-2026-0148',type:'info',title:'Insumos de publicación validados',text:'Comunicaciones confirmó que la solicitud puede continuar a diseño.',at:'Hace 1 h',read:false},
  {id:'N-4',ticket:'MA-2026-0145',type:'info',title:'Solicitud en análisis',text:'El formulario de emergencias ya se encuentra en análisis funcional.',at:'Ayer',read:true}
];

let myTicketsState={filter:'all',query:''};
let knowledgeState={query:'',category:'Todos',selected:'KB-001'};
let continuityState={tab:'incidents'};
let assetState={query:'',type:'Todos',selected:'PC-SP-034'};
let workflowState={service:'publicaciones'};
let accessibilityState={scale:100,contrast:false};

function saveNotifications(){ localStorage.setItem('mesa360_notifications',JSON.stringify(mesaNotifications)); updateBadges(); }
function saveWorkflows(){ localStorage.setItem('mesa360_workflows',JSON.stringify(workflowTemplates)); }
function addNotification(data){ mesaNotifications.unshift({id:`N-${Date.now()}`,read:false,at:'Ahora',type:'info',...data}); saveNotifications(); }

function ensureTicketModel(t){
  if(!t.messages){
    t.messages=(t.timeline||[]).map(([text,at])=>({kind:'system',visibility:'public',author:'Mesa de Ayuda TIC',text,at}));
    if(t.id==='MA-2026-0147')t.messages.push({kind:'comment',visibility:'public',author:'Carlos Rojas',text:'Realicé una validación inicial. Por favor confirma si puedes ingresar nuevamente desde el navegador institucional.',at:'19 Ago · 8:18'});
    if(t.id==='MA-2026-0148')t.messages.push({kind:'comment',visibility:'internal',author:'Ana López',text:'Los textos ya están validados; pendiente ajustar formato para publicación web.',at:'19 Ago · 9:02'});
  }
  t.attachments=t.attachments||((t.service==='publicaciones')?[{name:'insumos_publicacion.pdf',type:'PDF',size:'1,2 MB'}]:[]);
  t.watchers=t.watchers||['Solicitante',personById(t.assignee)?.name].filter(Boolean);
  t.requesterActionRequired=t.requesterActionRequired ?? (t.id==='MA-2026-0147');
  t.unread=t.unread ?? (['MA-2026-0147','MA-2026-0148'].includes(t.id));
  t.resolution=t.resolution|| (t.status==='Resuelto'?{summary:'Validación completada y hallazgos reportados al solicitante.',confirmed:false,csat:null}:null);
  t.related=t.related||[];
  t.audit=t.audit||[{action:'Solicitud registrada',actor:'Mesa de Ayuda TIC',at:t.created}];
  return t;
}
tickets.forEach(ensureTicketModel);
saveTickets();

const updateBadgesV4=updateBadges;
updateBadges=function(){
  updateBadgesV4();
  const unread=mesaNotifications.filter(n=>!n.read).length;
  const badge=$('#notificationBadge'); if(badge){badge.textContent=unread;badge.style.display=unread?'grid':'none';}
  const dot=$('.notification-dot'); if(dot)dot.style.display=unread?'block':'none';
};

function currentRequesterTickets(){ return tickets.map(ensureTicketModel); }
function messageText(t){ return (t.messages||[]).filter(m=>m.visibility!=='internal'||currentRole!=='requester').map(m=>m.text).join(' '); }
function hasRecentUpdate(t){ return !!t.unread; }
function ticketFilterMatches(t){
  const f=myTicketsState.filter;
  if(f==='action'&&!t.requesterActionRequired)return false;
  if(f==='updates'&&!hasRecentUpdate(t))return false;
  if(f==='active'&&['Resuelto','Cerrado','Cancelado'].includes(t.status))return false;
  if(f==='scheduled'&&t.status!=='Programado')return false;
  if(f==='resolved'&&!['Resuelto','Cerrado'].includes(t.status))return false;
  const q=myTicketsState.query.trim().toLowerCase();
  if(q){const hay=[t.id,t.title,t.requester,serviceById(t.service)?.title,t.description,messageText(t)].join(' ').toLowerCase();if(!hay.includes(q))return false;}
  return true;
}

function renderHomeV5(){
  const open=tickets.filter(t=>!['Resuelto','Cerrado','Cancelado'].includes(t.status));
  const action=currentRequesterTickets().filter(t=>t.requesterActionRequired).length;
  const unread=mesaNotifications.filter(n=>!n.read).length;
  const degraded=serviceStatusData.filter(s=>s.state!=='operational');
  $('#view-home').innerHTML=`
    <div class="home-command-hero"><div class="home-command-grid"><div><span class="eyebrow" style="color:#bcd5ff">Mesa de Ayuda TIC · SERVICIOS INSTITUCIONALES</span><h1>Una sola puerta para gestionar servicios internos.</h1><p>Describe tu necesidad en lenguaje cotidiano. Mesa de Ayuda TIC te guía, busca soluciones antes de radicar, solicita solo la información necesaria y conecta cada caso con el equipo, agenda y flujo correctos.</p><div class="home-command-actions"><button class="btn btn-primary" data-action="open-new-request">＋ Radicar una solicitud</button><button class="btn btn-secondary" data-view-link="knowledge">⌕ Buscar una solución</button><button class="btn btn-secondary" data-view-link="my-tickets">▤ Ver mis solicitudes</button></div></div><div class="service-health-panel"><div class="service-health-head"><strong>Estado de servicios · ahora</strong><button data-view-link="status">Ver detalle →</button></div>${serviceStatusData.slice(0,4).map(s=>`<div class="service-health-row ${s.state==='degraded'?'degraded':''}"><i></i><strong>${s.name}</strong><span>${s.detail}</span></div>`).join('')}</div></div></div>
    <div class="home-v5-strip"><div class="home-v5-metric"><span>▤</span><div><small>Solicitudes activas</small><strong>${open.length}</strong><p>Seguimiento desde un único lugar</p></div></div><div class="home-v5-metric"><span>!</span><div><small>Requieren tu respuesta</small><strong>${action}</strong><p>Información pendiente del solicitante</p></div></div><div class="home-v5-metric"><span>◌</span><div><small>Actualizaciones nuevas</small><strong>${unread}</strong><p>Respuestas y cambios recientes</p></div></div><div class="home-v5-metric"><span>${degraded.length?'△':'✓'}</span><div><small>Servicios con novedad</small><strong>${degraded.length}</strong><p>${degraded.length?'Hay degradación informada':'Todo operativo'}</p></div></div></div>
    <div class="section-head"><div><h2>¿Cómo quieres empezar?</h2><p>La experiencia prioriza autoservicio, trazabilidad y claridad.</p></div></div>
    <div class="service-journey-grid"><div class="service-journey-card"><h3>Acciones rápidas</h3><p>No necesitas saber qué área atiende cada caso.</p><div class="journey-actions"><button class="journey-action" data-action="open-new-request"><span>＋</span><strong>Necesito algo</strong><small>El asistente clasifica y guía toda la radicación.</small></button><button class="journey-action" data-view="knowledge"><span>◈</span><strong>Quiero resolverlo</strong><small>Busca respuestas antes de crear un ticket.</small></button><button class="journey-action" data-view="calendar"><span>▦</span><strong>Necesito un espacio</strong><small>Consulta agenda, capacidad y reservas.</small></button></div></div><div class="knowledge-preview"><div class="knowledge-preview-head"><div><h3>Respuestas frecuentes</h3><p>Conocimiento integrado al servicio.</p></div><button class="link-btn" data-view="knowledge">Ver todo →</button></div>${knowledgeArticles.slice(0,3).map(a=>`<button class="mini-article" data-knowledge="${a.id}"><span>${a.icon}</span><div><strong>${a.title}</strong><small>${a.category} · ${a.helpful}% útil</small></div><b>›</b></button>`).join('')}</div></div>
    <div class="section-head"><div><h2>Servicios destacados</h2><p>Catálogo unificado y orientado por necesidad.</p></div><button class="link-btn" data-view-link="catalog">Ver catálogo completo →</button></div><div class="service-grid">${services.slice(0,8).map(serviceCard).join('')}</div>`;
}

function renderMyTicketsV5(){
  const all=currentRequesterTickets();
  const counts={all:all.length,action:all.filter(t=>t.requesterActionRequired).length,updates:all.filter(hasRecentUpdate).length,active:all.filter(t=>!['Resuelto','Cerrado','Cancelado'].includes(t.status)).length,scheduled:all.filter(t=>t.status==='Programado').length,resolved:all.filter(t=>['Resuelto','Cerrado'].includes(t.status)).length};
  const filtered=all.filter(ticketFilterMatches);
  const tabs=[['all','Todas'],['action','Requieren mi respuesta'],['updates','Actualizadas'],['active','En proceso'],['scheduled','Programadas'],['resolved','Resueltas']];
  $('#view-my-tickets').innerHTML=`<div class="page-head"><div><span class="eyebrow">PORTAL DEL FUNCIONARIO · TRAZABILIDAD</span><h1>Mis solicitudes</h1><p>Consulta respuestas, novedades, documentos, agenda y estado. En producción esta vista quedará aislada por usuario mediante autenticación y políticas de acceso.</p></div><button class="btn btn-primary" data-action="open-new-request">＋ Nueva solicitud</button></div><div class="requester-toolbar"><div class="request-tabs">${tabs.map(([id,label])=>`<button class="${myTicketsState.filter===id?'active':''}" data-my-filter="${id}">${label}<span>${counts[id]}</span></button>`).join('')}</div><label class="request-search"><span>⌕</span><input id="myTicketSearch" value="${safe(myTicketsState.query)}" placeholder="Buscar en solicitudes y respuestas..."></label></div><div class="my-request-list">${filtered.map(t=>{const s=serviceById(t.service),p=personById(t.assignee),h=slaHealth(t);return `<button class="my-request-card ${t.unread?'unread':''} ${t.requesterActionRequired?'action':''}" data-ticket="${t.id}"><div><div class="my-request-idline"><b>${t.id}</b>${t.unread?'<span class="unread-chip">NUEVA RESPUESTA</span>':''}${t.requesterActionRequired?'<span class="action-chip">REQUIERE TU ACCIÓN</span>':''}</div><h3>${safe(t.title)}</h3><small>${safe(s?.title||t.service)} · ${safe(t.requester)}</small></div><div class="my-request-mid"><strong>${p?.name||'Por asignar'}</strong><span>${statusPill(t.status)}</span></div><div class="my-request-right"><strong>${h.label}</strong><span>${h.detail}</span></div><b>›</b></button>`}).join('')||`<div class="request-empty"><strong>No encontramos solicitudes</strong><p>Cambia el filtro o la búsqueda para ver otros resultados.</p></div>`}</div>`;
}

function renderNotifications(){
  $('#view-notifications').innerHTML=`<div class="page-head"><div><span class="eyebrow">CENTRO DE ACTUALIZACIONES</span><h1>Respuestas y novedades</h1><p>Centraliza cambios de estado, mensajes, aprobaciones, reservas y solicitudes que requieren tu intervención.</p></div><button class="btn btn-secondary" data-notification-read-all>✓ Marcar todo como leído</button></div><div class="notification-layout"><section class="notification-feed"><div class="notification-feed-head"><strong>${mesaNotifications.filter(n=>!n.read).length} sin leer</strong><button data-notification-read-all>Marcar todas</button></div>${mesaNotifications.map(n=>`<button class="notification-item ${n.read?'':'unread'} ${n.type}" data-notification="${n.id}" ${n.ticket?`data-ticket-ref="${n.ticket}"`:''}><span class="notification-icon">${n.type==='alert'?'!':n.type==='success'?'✓':'◌'}</span><div class="notification-copy"><strong>${safe(n.title)}</strong><p>${safe(n.text)}</p><small>${n.ticket?safe(n.ticket)+' · ':''}${safe(n.at)}</small></div><span>${n.read?'':'NUEVO'}</span></button>`).join('')}</section><aside class="notification-settings"><h3>Preferencias de comunicación</h3><p>En la fase productiva estas reglas enviarán notificaciones reales por los canales habilitados.</p>${[['Actualizaciones dentro de Mesa de Ayuda TIC',true],['Correo institucional',true],['Recordatorios de SLA / agenda',true],['Resumen diario',false]].map(([t,on])=>`<div class="pref-row"><div><strong>${t}</strong><small>${on?'Activo':'Opcional'}</small></div><span class="fake-switch ${on?'on':''}"><i></i></span></div>`).join('')}</aside></div>`;
}

function knowledgeCategories(){ return ['Todos',...new Set(knowledgeArticles.map(a=>a.category))]; }
function filteredKnowledge(){ const q=knowledgeState.query.trim().toLowerCase();return knowledgeArticles.filter(a=>(knowledgeState.category==='Todos'||a.category===knowledgeState.category)&&(!q||[a.title,a.summary,a.category,serviceById(a.service)?.title].join(' ').toLowerCase().includes(q))); }
function renderKnowledge(){
  const list=filteredKnowledge();let article=knowledgeArticles.find(a=>a.id===knowledgeState.selected);if(!article||!list.some(a=>a.id===article.id))article=list[0]||knowledgeArticles[0];knowledgeState.selected=article?.id||null;
  $('#view-knowledge').innerHTML=`<div class="knowledge-search-hero"><span class="eyebrow">AUTOSERVICIO · TIER 0</span><h1>¿Podemos resolverlo antes de radicar?</h1><p>Busca guías institucionales y soluciones verificadas. Los artículos están vinculados al catálogo para aparecer también dentro de la radicación guiada.</p><label class="knowledge-searchbar"><span>⌕</span><input id="knowledgeSearch" value="${safe(knowledgeState.query)}" placeholder="Ej. no puedo entrar al correo, internet lento, publicar en web..."></label></div><div class="knowledge-filters">${knowledgeCategories().map(c=>`<button class="${knowledgeState.category===c?'active':''}" data-knowledge-category="${safe(c)}">${safe(c)}</button>`).join('')}</div><div class="knowledge-workspace"><div class="knowledge-list">${list.map(a=>`<button class="knowledge-card ${a.id===knowledgeState.selected?'active':''}" data-knowledge="${a.id}"><span>${a.icon}</span><div><h3>${a.title}</h3><p>${a.summary}</p><small>${a.id} · ${a.owner} · actualizado ${a.updated}</small></div><b>›</b></button>`).join('')||'<div class="request-empty"><strong>Sin resultados</strong><p>Prueba con términos más generales o inicia una solicitud guiada.</p></div>'}</div>${article?`<article class="knowledge-detail"><span class="article-kicker">${article.id} · ${article.category.toUpperCase()}</span><h2>${article.title}</h2><div class="article-meta">Propietario: ${article.owner} · ${article.views} consultas · ${article.helpful}% lo encontró útil</div><div class="article-body">${article.body}</div><div class="article-actions"><span>¿Esta respuesta resolvió tu necesidad?</span><div><button data-article-helpful="${article.id}" data-helpful="yes">Sí</button><button data-article-helpful="${article.id}" data-helpful="no">No</button><button class="btn btn-primary compact" data-service="${article.service}">Radicar</button></div></div></article>`:''}</div>`;
}

function renderStatus(){
  const degraded=serviceStatusData.filter(s=>s.state!=='operational');
  $('#view-status').innerHTML=`<div class="page-head"><div><span class="eyebrow">TRANSPARENCIA OPERATIVA</span><h1>Estado de servicios</h1><p>Evita solicitudes duplicadas mostrando interrupciones conocidas, degradaciones y mantenimientos programados.</p></div></div><div class="status-summary ${degraded.length?'degraded':''}"><div><span class="eyebrow">ESTADO GENERAL</span><h2>${degraded.length?`${degraded.length} servicio con novedad`:'Todos los servicios operan normalmente'}</h2><p>${degraded.length?'El equipo ya está investigando las degradaciones visibles abajo.':'No se reportan interrupciones generales en este momento.'}</p></div><span class="status-big-icon">${degraded.length?'!':'✓'}</span></div><div class="status-grid">${serviceStatusData.map(s=>`<div class="status-card"><div class="status-card-head"><strong>${s.name}</strong><span class="status-indicator ${s.state==='degraded'?'degraded':''}"><i></i>${s.state==='degraded'?'Degradado':'Operativo'}</span></div><p>${s.detail}</p><div class="status-history">${s.history.map(h=>`<i class="${h==='warn'?'warn':''}"></i>`).join('')}</div><small>Historial de disponibilidad · demostración</small></div>`).join('')}</div>`;
}

function renderContinuity(){
  const items=continuityData[continuityState.tab]||[];
  const openInc=continuityData.incidents.filter(i=>i.state!=='Resuelto').length,openPr=continuityData.problems.length,openCh=continuityData.changes.filter(c=>!['Completado','Cancelado'].includes(c.state)).length;
  const tabs=[['incidents','Incidentes'],['problems','Problemas'],['changes','Cambios']];
  $('#view-continuity').innerHTML=`<div class="page-head"><div><span class="eyebrow">ITSM · CONTINUIDAD Y CONTROL</span><h1>Incidentes, problemas y cambios</h1><p>Agrupa interrupciones, investiga causas raíz y gobierna cambios antes de que afecten servicios críticos.</p></div><button class="btn btn-primary" data-continuity-new="${continuityState.tab}">＋ Nuevo registro</button></div><div class="continuity-hero"><div class="radar-card"><span>MESA RADAR · DETECCIÓN PROACTIVA</span><h2>Posible patrón de conectividad detectado</h2><p>Varias solicitudes recientes están relacionadas con el segundo piso y comparten el servicio de internet. MESA sugiere mantenerlas asociadas al incidente INC-2026-021 y al problema PRB-2026-006.</p><button class="btn btn-secondary compact" data-continuity-tab="incidents">Revisar incidente →</button></div><div class="continuity-kpis"><div class="continuity-kpi"><small>INCIDENTES ACTIVOS</small><strong>${openInc}</strong><span>Interrupciones en atención</span></div><div class="continuity-kpi"><small>PROBLEMAS</small><strong>${openPr}</strong><span>Causa raíz / recurrencias</span></div><div class="continuity-kpi"><small>CAMBIOS ABIERTOS</small><strong>${openCh}</strong><span>Riesgo y aprobación</span></div><div class="continuity-kpi"><small>TICKETS RELACIONADOS</small><strong>${continuityData.incidents.reduce((a,i)=>a+i.linked,0)}</strong><span>Comunicación centralizada</span></div></div></div><div class="continuity-tabs">${tabs.map(([id,l])=>`<button class="${continuityState.tab===id?'active':''}" data-continuity-tab="${id}">${l}</button>`).join('')}</div><div class="continuity-table"><div class="continuity-row header"><span>Registro</span><span>Descripción</span><span>Responsable / alcance</span><span>Estado</span><span>Riesgo</span></div>${items.map(x=>`<div class="continuity-row"><div><strong>${x.id}</strong><small>${x.started}</small></div><div><strong>${x.title}</strong><span>${x.linked} elementos relacionados</span></div><div><strong>${x.owner}</strong><span>${x.impact}</span></div><div><strong>${x.state}</strong></div><div class="risk-score ${x.risk==='Baja'?'low':x.risk==='Alta'?'high':''}">${x.risk}</div></div>`).join('')}</div>`;
}

function filteredAssets(){const q=assetState.query.trim().toLowerCase();return assetsData.filter(a=>(assetState.type==='Todos'||a.type===assetState.type)&&(!q||Object.values(a).join(' ').toLowerCase().includes(q)));}
function renderAssets(){
  const list=filteredAssets();let selected=assetsData.find(a=>a.id===assetState.selected)||list[0]||assetsData[0];assetState.selected=selected?.id;
  const types=['Todos',...new Set(assetsData.map(a=>a.type))];
  $('#view-assets').innerHTML=`<div class="page-head"><div><span class="eyebrow">ITAM + CMDB</span><h1>Activos y contexto tecnológico</h1><p>Relaciona equipos, licencias, infraestructura, usuarios y solicitudes para resolver con contexto y conservar historial.</p></div><button class="btn btn-primary" data-asset-new>＋ Registrar activo</button></div><div class="asset-top-grid"><div class="asset-kpi"><span>ACTIVOS REGISTRADOS</span><strong>${assetsData.length}</strong><small>Hardware, licencias e infraestructura</small></div><div class="asset-kpi"><span>CON ATENCIÓN</span><strong>${assetsData.filter(a=>a.state==='Atención').length}</strong><small>Requieren seguimiento</small></div><div class="asset-kpi"><span>CRÍTICOS</span><strong>${assetsData.filter(a=>a.criticality==='Crítica').length}</strong><small>Impacto institucional alto</small></div><div class="asset-kpi"><span>VINCULADOS A TICKETS</span><strong>${assetsData.filter(a=>a.tickets.length).length}</strong><small>Con trazabilidad operativa</small></div></div><div class="asset-workspace"><section class="asset-list-panel"><div class="asset-toolbar"><input id="assetSearch" value="${safe(assetState.query)}" placeholder="Buscar placa, equipo, usuario, IP o dependencia..."><select id="assetTypeFilter">${types.map(t=>`<option ${assetState.type===t?'selected':''}>${t}</option>`).join('')}</select></div>${list.map(a=>`<button class="asset-table-row ${a.id===assetState.selected?'selected':''}" data-asset="${a.id}"><span class="asset-code">${a.id}</span><div><strong>${a.name}</strong><small>${a.type} · ${a.department}</small></div><div><strong>${a.user}</strong><small>${a.location}</small></div><div><strong>${a.ip}</strong><small>Garantía: ${a.warranty}</small></div><span class="asset-state ${a.state==='Atención'?'warning':''}">${a.state}</span><b>›</b></button>`).join('')}</section>${selected?`<aside class="asset-detail-panel"><div class="asset-detail-icon">▧</div><span class="eyebrow">${selected.id}</span><h2>${selected.name}</h2><p>${selected.type} · criticidad ${selected.criticality}</p><div class="asset-facts"><div><span>Usuario / responsable</span><strong>${selected.user}</strong></div><div><span>Dependencia</span><strong>${selected.department}</strong></div><div><span>Ubicación</span><strong>${selected.location}</strong></div><div><span>IP / identificador</span><strong>${selected.ip}</strong></div><div><span>Serial</span><strong>${selected.serial}</strong></div><div><span>Garantía</span><strong>${selected.warranty}</strong></div><div><span>Estado</span><strong>${selected.state}</strong></div></div><div class="asset-linked"><h3>Solicitudes relacionadas</h3>${selected.tickets.length?selected.tickets.map(id=>{const t=tickets.find(x=>x.id===id);return `<button data-ticket="${id}"><strong>${id} · ${safe(t?.title||'Solicitud')}</strong><small>${safe(t?.status||'')}</small></button>`}).join(''):'<p style="font-size:7px;color:var(--muted)">Sin solicitudes relacionadas.</p>'}</div></aside>`:''}</div>`;
}

function workflowNodeIcon(type){return {start:'✓',end:'✓',approval:'A',decision:'?',task:'▤'}[type]||'▤';}
function workflowNodeLabel(type){return {start:'Inicio',end:'Cierre',approval:'Aprobación',decision:'Decisión',task:'Tarea'}[type]||'Paso';}
function renderWorkflows(){
  const supported=services.filter(s=>workflowTemplates[s.id]||['publicaciones','cubrimientos','correo','desarrollo'].includes(s.id));
  if(!workflowTemplates[workflowState.service])workflowTemplates[workflowState.service]=JSON.parse(JSON.stringify(baseWorkflowTemplates.publicaciones));
  const flow=workflowTemplates[workflowState.service],service=serviceById(workflowState.service)||services[0];
  $('#view-workflows').innerHTML=`<div class="page-head"><div><span class="eyebrow">NO-CODE · GOBIERNO DEL SERVICIO</span><h1>Flujos y automatización</h1><p>Define qué ocurre desde la radicación hasta el cierre. Esta estructura será la base directa para funciones, reglas y tablas cuando conectemos Supabase.</p></div><button class="btn btn-primary" data-workflow-save>✓ Guardar borrador</button></div><div class="workflow-layout"><aside class="workflow-sidebar"><h3>Servicios</h3><p>Selecciona un servicio para diseñar su ciclo de vida.</p>${supported.map(s=>`<button class="workflow-service-button ${workflowState.service===s.id?'active':''}" data-workflow-service="${s.id}"><span>${s.icon}</span><div><strong>${s.title}</strong><small>${workflowTemplates[s.id]?.length||0} pasos</small></div></button>`).join('')}</aside><section class="workflow-canvas"><div class="workflow-canvas-head"><div><h2>${service.title}</h2><p>${flow.length} pasos · ${service.approval?'con aprobación':'sin aprobación obligatoria'} · SLA ${service.sla}</p></div><span class="pill green">Borrador avanzado</span></div><div class="workflow-flow">${flow.map((n,i)=>`${i?'<div class="workflow-connector"></div>':''}<div class="workflow-node ${n.type}"><span>${workflowNodeIcon(n.type)}</span><div><strong>${workflowNodeLabel(n.type)} · ${safe(n.title)}</strong><small>${safe(n.desc)}</small></div>${['start','end'].includes(n.type)?'<b></b>':`<button data-workflow-remove="${i}" title="Eliminar paso">×</button>`}</div>`).join('')}</div></section><aside class="workflow-rules"><h3>Constructor</h3><p>Añade piezas al flujo. Después, Supabase persistirá estas definiciones y ejecutará las reglas reales.</p><div class="builder-actions"><button data-workflow-add="task">＋ Tarea</button><button data-workflow-add="approval">＋ Aprobación</button><button data-workflow-add="decision">＋ Decisión</button><button data-workflow-add="task">＋ Notificación</button></div><div class="workflow-rule"><span>REGLA DE ENRUTAMIENTO</span><strong>Competencia + capacidad + agenda</strong><small>Penaliza sobrecarga y evita responsables incompatibles.</small></div><div class="workflow-rule"><span>REGLA SLA</span><strong>70% aviso · 90% escala · 100% incumplimiento</strong><small>La fase productiva utilizará calendario laboral y pausas válidas.</small></div><div class="workflow-rule"><span>TRAZABILIDAD</span><strong>Cada transición genera auditoría</strong><small>Actor, momento, estado anterior, estado nuevo y motivo.</small></div><div class="workflow-ready"><strong>✓ Arquitectura preparada</strong><p>El constructor ya modela las entidades que necesitaremos persistir: workflow, step, transition, condition, approval y action.</p></div></aside></div>`;
}

function publicMessages(t){return (t.messages||[]).filter(m=>m.visibility!=='internal'||currentRole!=='requester');}
function renderTicketDrawerV5(){
  const t=tickets.find(x=>x.id===ticketDrawerState.id);if(!t)return;ensureTicketModel(t);t.unread=false;saveTickets();
  const s=serviceById(t.service),p=personById(t.assignee),h=slaHealth(t);
  const tabs=[['overview','Resumen'],['activity','Actividad'],['attachments','Adjuntos'],['sla','SLA'],['approval','Aprobación'],['related','Relacionados'],['resolution','Resolución']];
  let content='';
  if(ticketDrawerState.tab==='overview'){
    const detailEntries=Object.entries(t.details||{}).filter(([k,v])=>v!==''&&v!=null&&!['title','requester','priority','scheduledDate','scheduledStart','scheduledEnd'].includes(k));
    content=`<div class="ticket-360-hero"><div><span>ESTADO DEL SERVICIO</span><strong>${h.label}</strong><p>${h.detail}</p></div><div class="ticket-360-progress"><i class="${h.key}" style="width:${h.pct}%"></i></div></div><div class="detail-grid ticket-detail-grid"><div class="detail-box"><span>Responsable</span><strong>${p?.name||'Sin asignar'}</strong><small>${p?.role||'Pendiente de triage'}</small></div><div class="detail-box"><span>Vencimiento</span><strong>${safe(t.due)}</strong><small>SLA ${safe(t.sla)}</small></div><div class="detail-box"><span>Dependencia</span><strong>${safe(t.requester)}</strong></div><div class="detail-box"><span>Servicio</span><strong>${safe(s?.title||t.service)}</strong></div></div><div class="ticket-section"><h3>Descripción</h3><p>${safe(t.description)}</p></div>${detailEntries.length?`<div class="ticket-section"><h3>Información radicada</h3><div class="ticket-field-list">${detailEntries.map(([k,v])=>`<div><span>${safe(detailLabel(s,k))}</span><strong>${safe(v)}</strong></div>`).join('')}</div></div>`:''}<div class="ticket-route-card"><div><span>ENRUTAMIENTO</span><strong>${p?`${p.name} · ${matchCount(p,s)} competencias coincidentes`:'Cola del servicio'}</strong><small>Competencia, capacidad, reglas y agenda.</small></div><div><span>SEGUIMIENTO</span><strong>${t.requesterActionRequired?'Requiere respuesta del funcionario':'Sin acciones pendientes'}</strong><small>${publicMessages(t).length} eventos visibles en la conversación.</small></div></div>`;
  }else if(ticketDrawerState.tab==='activity'){
    content=`<div class="activity-head"><div><h3>Conversación y trazabilidad</h3><p>Las notas internas quedan separadas técnicamente del contenido público del solicitante.</p></div></div><div class="message-stream">${publicMessages(t).map(m=>`<div class="message-item ${m.visibility==='internal'?'internal':''} ${m.kind==='system'?'system':''}"><div class="message-head"><strong>${safe(m.author)}</strong><span>${safe(m.at)}</span></div><p>${safe(m.text)}</p><span class="message-visibility">${m.visibility==='internal'?'SOLO EQUIPO':'VISIBLE AL FUNCIONARIO'}</span></div>`).join('')}</div><div class="comment-box pro-comment"><div class="comment-mode"><label><input type="radio" name="commentMode" value="public" checked> ${currentRole==='requester'?'Responder a la Mesa':'Respuesta al funcionario'}</label>${currentRole!=='requester'?'<label><input type="radio" name="commentMode" value="internal"> Nota interna</label>':''}</div><textarea id="ticketCommentText" placeholder="Escribe una actualización clara..."></textarea><div class="comment-actions"><span>${currentRole==='requester'?'Tu respuesta quedará asociada a este radicado.':'Las notas internas nunca se muestran al solicitante.'}</span><button class="btn btn-primary compact" data-ticket-comment="${t.id}">Publicar actualización</button></div></div>`;
  }else if(ticketDrawerState.tab==='attachments'){
    content=`<div class="activity-head"><div><h3>Documentos y evidencias</h3><p>En producción se conectará con Storage, permisos y control de versiones.</p></div></div><div class="attachment-grid">${(t.attachments||[]).map(a=>`<div class="attachment-card"><span>▧</span><div><strong>${safe(a.name)}</strong><small>${safe(a.type)} · ${safe(a.size)}</small></div><b>⋯</b></div>`).join('')||'<div class="request-empty"><strong>Sin adjuntos</strong><p>No se han agregado documentos a esta solicitud.</p></div>'}</div><button class="btn btn-secondary" style="margin-top:12px" data-attach-demo="${t.id}">＋ Adjuntar evidencia de demostración</button>`;
  }else if(ticketDrawerState.tab==='sla'){
    content=`<div class="sla-detail-card ${h.key}"><span>SEMÁFORO SLA</span><strong>${h.label}</strong><p>${h.detail}. Objetivo: ${safe(s?.sla||t.sla)}.</p><div class="sla-detail-track"><i style="width:${h.pct}%"></i></div><div class="sla-detail-meta"><div><span>Inicio</span><strong>${safe(t.created)}</strong></div><div><span>Objetivo</span><strong>${safe(t.due)}</strong></div><div><span>Prioridad</span><strong>${safe(t.priority)}</strong></div></div></div><div class="ticket-section"><h3>Política de escalamiento</h3><div class="rule-list"><div><span>70%</span><div><strong>Advertencia preventiva</strong><p>Notifica responsable y resalta la solicitud.</p></div></div><div><span>90%</span><div><strong>Escalamiento</strong><p>Eleva al líder y recomienda redistribución.</p></div></div><div><span>100%</span><div><strong>Incumplimiento</strong><p>Registra evento, causa y acción de mejora.</p></div></div></div></div>`;
  }else if(ticketDrawerState.tab==='approval'){
    const ap=t.approval||(s?.approval?{required:true,owner:approvalOwnerByService[s.id]||'Aprobador configurado',status:t.status==='En aprobación'?'Pendiente':'Aprobada'}:{required:false,status:'No aplica'});
    content=ap.required?`<div class="approval-flow"><div class="approval-icon">✓</div><span>FLUJO DE APROBACIÓN</span><h3>${safe(ap.status)}</h3><p>Responsable: <strong>${safe(ap.owner)}</strong></p><div class="approval-steps"><div class="done"><i>1</i><div><strong>Radicación</strong><small>Solicitud completa</small></div></div><div class="${ap.status==='Pendiente'?'active':'done'}"><i>2</i><div><strong>Aprobación</strong><small>${safe(ap.owner)}</small></div></div><div><i>3</i><div><strong>Ejecución</strong><small>Continúa después de aprobar</small></div></div></div>${currentRole!=='requester'&&ap.status==='Pendiente'?`<div class="approval-actions"><button class="btn btn-primary" data-approve-ticket="${t.id}">✓ Aprobar</button><button class="btn btn-secondary">Solicitar ajuste</button></div>`:''}</div>`:`<div class="request-empty"><strong>No requiere aprobación</strong><p>Este servicio puede pasar directamente a ejecución según sus reglas actuales.</p></div>`;
  }else if(ticketDrawerState.tab==='related'){
    const assets=assetsData.filter(a=>a.tickets.includes(t.id));const incident=continuityData.incidents.find(i=>t.service==='internet'&&i.id==='INC-2026-021');
    content=`<div class="activity-head"><div><h3>Contexto relacionado</h3><p>Tickets, activos, incidentes y elementos de configuración conectados.</p></div></div><div class="related-list">${assets.map(a=>`<button class="related-item" data-view-link="assets"><strong>▧ ${a.id} · ${a.name}</strong><small>${a.location} · ${a.state}</small></button>`).join('')}${incident?`<div class="related-item"><strong>△ ${incident.id} · ${incident.title}</strong><small>${incident.state} · ${incident.linked} solicitudes asociadas</small></div>`:''}${!assets.length&&!incident?'<div class="request-empty"><strong>Sin relaciones registradas</strong><p>Este caso todavía no está asociado a activos o incidentes.</p></div>':''}</div>`;
  }else{
    content=t.status==='Resuelto'||t.resolution?`<div class="resolution-card"><h3>Solución registrada</h3><p>${safe(t.resolution?.summary||'La solicitud fue marcada como resuelta por el equipo gestor.')}</p><div class="resolution-actions">${currentRole==='requester'?'<button class="btn btn-primary" data-confirm-resolution>✓ Confirmar solución</button><button class="btn btn-secondary" data-reopen-ticket>Reabrir solicitud</button>':''}</div>${currentRole==='requester'?`<div class="ticket-section"><h3>¿Cómo fue tu experiencia?</h3><div class="csat-row">${[1,2,3,4,5].map(n=>`<button class="${t.resolution?.csat===n?'selected':''}" data-csat="${n}" title="${n} de 5">${['','😞','😕','😐','🙂','😍'][n]}</button>`).join('')}</div></div>`:''}</div>`:`<div class="request-empty"><strong>Aún no existe una resolución</strong><p>La solución, evidencia y confirmación aparecerán aquí al finalizar el caso.</p></div>`;
  }
  $('#ticketDrawer').innerHTML=`<div class="drawer-head ticket-360-head"><div class="drawer-head-top"><div><span class="eyebrow">${t.id}</span><h2>${safe(t.title)}</h2><p>${safe(s?.title||'Servicio')} · ${safe(t.requester)}</p></div><button class="close-btn" data-action="close-ticket-drawer">×</button></div><div class="ticket-360-chips">${statusPill(t.status)}${priorityPill(t.priority)}${slaBadge(t)}</div><div class="ticket-tabs">${tabs.map(([id,l])=>`<button class="${ticketDrawerState.tab===id?'active':''}" data-ticket-tab="${id}">${l}</button>`).join('')}</div></div><div class="ticket-360-body">${content}${currentRole!=='requester'&&ticketDrawerState.tab==='overview'?`<div class="ticket-actionbar"><button class="btn btn-soft" data-ticket-status="En gestión" data-ticket-id="${t.id}">Tomar caso</button><button class="btn btn-secondary" data-ticket-status="En espera" data-ticket-id="${t.id}">Poner en espera</button><button class="btn btn-primary" data-ticket-status="Resuelto" data-ticket-id="${t.id}">Resolver</button></div>`:''}</div>`;
}

function addTicketCommentV5(id){
  const t=tickets.find(x=>x.id===id),text=$('#ticketCommentText')?.value.trim();if(!t||!text)return;
  ensureTicketModel(t);const visibility=$('input[name="commentMode"]:checked')?.value||'public';
  const author=currentRole==='requester'?'Juan Pérez':personById(t.assignee)?.name||'Mesa de Ayuda TIC · Gestor';
  t.messages.push({kind:'comment',visibility,author,text,at:'Ahora'});t.audit.push({action:visibility==='internal'?'Nota interna agregada':'Respuesta publicada',actor:author,at:'Ahora'});
  if(currentRole==='requester'){t.requesterActionRequired=false;}
  if(currentRole!=='requester'&&visibility==='public'){t.unread=true;addNotification({ticket:t.id,title:`Nueva respuesta en ${t.id}`,text,type:'info'});}
  saveTickets();showToast(visibility==='internal'?'Nota interna guardada':'Actualización publicada',visibility==='internal'?'Solo el equipo gestor puede verla.':'La conversación fue actualizada.');renderTicketDrawerV5();
}

const submitRequestV4=submitRequest;
submitRequest=function(){
  const s=serviceById(wizard.service),candidates=rankCandidates(s);let p=personById(wizard.assignee);if(!p&&wizard.assignee==='auto')p=candidates[0];
  const nextNum=Math.max(148,...tickets.map(t=>Number(String(t.id).match(/(\d+)$/)?.[1]||0)))+1,id=`MA-2026-${String(nextNum).padStart(4,'0')}`;
  const approvalRequired=!!s.approval,status=approvalRequired?'En aprobación':wizard.details.scheduledDate?'Programado':'Nuevo';
  const newT=ensureTicketModel({id,service:s.id,title:wizard.details.title||s.title,requester:wizard.details.requester||'Secretaría General',assignee:p?.id||'',priority:wizard.details.priority||'Media',status,created:'20 Ago · ahora',due:s.sla==='Inmediato'?'Inmediato':s.sla==='Agenda'?'Según agenda':'Según SLA',sla:s.sla,description:wizard.details.f2||wizard.details.f1||wizard.details.f0||wizard.details.title||'Solicitud registrada desde el portal.',details:{...wizard.details},timeline:[],messages:[{kind:'system',visibility:'public',author:'Mesa de Ayuda TIC',text:'Solicitud radicada correctamente.',at:'20 Ago · ahora'},{kind:'system',visibility:'public',author:'Mesa de Ayuda TIC',text:p?`Enrutada a ${p.name} por competencia y capacidad.`:'Enviada a la cola del servicio.',at:'20 Ago · ahora'}],attachments:[],watchers:['Solicitante',p?.name].filter(Boolean),requesterActionRequired:false,unread:false,approval:approvalRequired?{required:true,status:'Pendiente',owner:approvalOwnerByService[s.id]||'Aprobador del servicio'}:null,audit:[{action:'Solicitud registrada',actor:'Juan Pérez',at:'20 Ago · ahora'}]});
  tickets.unshift(newT);saveTickets();addNotification({ticket:id,type:'success',title:'Solicitud radicada',text:`${id} quedó registrada${p?` y enrutada a ${p.name}`:''}.`});closeRequestModal();showToast('Radicación completada',`${id} quedó registrada con trazabilidad completa.`);setView('my-tickets');
};

const renderWizardSelfHelpV4=renderWizardSelfHelp;
renderWizardSelfHelp=function(body,foot,s){
  renderWizardSelfHelpV4(body,foot,s);
  const related=knowledgeArticles.filter(a=>a.service===s.id).slice(0,2);if(!related.length)return;
  body.insertAdjacentHTML('beforeend',`<div class="context-knowledge"><div class="context-knowledge-head"><strong>Respuestas relacionadas</strong><span>BASE DE CONOCIMIENTO</span></div><div class="context-knowledge-list">${related.map(a=>`<button type="button" data-wizard-knowledge="${a.id}"><span>${a.icon}</span><div><strong>${a.title}</strong><small>${a.summary}</small></div><b>›</b></button>`).join('')}</div></div>`);
};

const buildWizardQuestionsV4=buildWizardQuestions;
buildWizardQuestions=function(s){
  const qs=buildWizardQuestionsV4(s);
  if(s.id==='correo'&&wizard.details.f0==='Crear cuenta')qs.push({key:'conditional_account_owner',label:'Nombre del funcionario que requiere la cuenta',type:'text',placeholder:'Nombre completo'});
  if(s.id==='internet'&&Number(wizard.details.f3||0)>=5)qs.push({key:'conditional_scope',label:'¿La falla afecta a toda la dependencia?',type:'select',options:['Sí','No','No estoy seguro']});
  if(s.id==='publicaciones'&&wizard.details.f0==='Varios canales')qs.push({key:'conditional_channels',label:'Indica los canales prioritarios',type:'textarea',placeholder:'Ej. Facebook, Instagram y sitio web'});
  if(s.id==='desarrollo'&&wizard.details.f0==='Nueva aplicación')qs.push({key:'conditional_owner',label:'¿Quién será el responsable funcional de validar la solución?',type:'text',placeholder:'Nombre / dependencia'});
  return qs;
};

const renderCommandPaletteV4=renderCommandPalette;
const commandEntriesV4=commandEntries;
commandEntries=function(query=''){
  const q=query.toLowerCase().trim();const base=commandEntriesV4(query);
  const extra=[
    ...knowledgeArticles.filter(a=>!q||[a.title,a.category].join(' ').toLowerCase().includes(q)).slice(0,4).map(a=>({kind:'knowledge',icon:'◈',title:a.title,sub:`Conocimiento · ${a.category}`,knowledge:a.id})),
    ...assetsData.filter(a=>!q||[a.id,a.name,a.user,a.department].join(' ').toLowerCase().includes(q)).slice(0,3).map(a=>({kind:'asset',icon:'▧',title:`${a.id} · ${a.name}`,sub:`Activo · ${a.department}`,asset:a.id}))
  ];
  return [...base,...extra].slice(0,14);
};
renderCommandPalette=function(q=''){
  const entries=commandEntries(q);const root=$('#commandResults');if(!root)return;
  root.innerHTML=entries.map(x=>{
    if(x.kind==='knowledge')return `<button class="command-item" data-command-knowledge="${x.knowledge}"><span class="command-item-icon">${x.icon}</span><div><strong>${safe(x.title)}</strong><small>${safe(x.sub)}</small></div><kbd>↵</kbd></button>`;
    if(x.kind==='asset')return `<button class="command-item" data-command-asset="${x.asset}"><span class="command-item-icon">${x.icon}</span><div><strong>${safe(x.title)}</strong><small>${safe(x.sub)}</small></div><kbd>↵</kbd></button>`;
    const attr=x.kind==='action'?`data-command-action="${x.action}"`:x.kind==='view'?`data-command-view="${x.view}"`:x.kind==='service'?`data-command-service="${x.service}"`:`data-command-ticket="${x.ticket}"`;
    return `<button class="command-item" ${attr}><span class="command-item-icon">${x.icon}</span><div><strong>${safe(x.title)}</strong><small>${safe(x.sub)}</small></div><kbd>↵</kbd></button>`;
  }).join('')||'<div class="command-empty">No encontramos resultados.</div>';
};
const renderViewV4=renderView;
renderView=function(view){
  const map={home:renderHomeV5,'new-request':renderNewRequest,'my-tickets':renderMyTicketsV5,notifications:renderNotifications,knowledge:renderKnowledge,status:renderStatus,calendar:renderCalendar,ops:renderOps,continuity:renderContinuity,team:renderTeam,assets:renderAssets,catalog:renderCatalog,reports:renderReports,workflows:renderWorkflows,admin:renderAdmin};
  (map[view]||renderHomeV5)();
};

const setRoleV4=setRole;
setRole=function(role){
  setRoleV4(role);
  const restricted=['ops','continuity','team','assets','reports','workflows','admin'];
  const active=$('.view.active')?.id.replace('view-','');if(role==='requester'&&restricted.includes(active))setView('home');
};

openTicket=function(id,tab='overview'){
  const t=tickets.find(x=>x.id===id);if(!t)return;ensureTicketModel(t);t.unread=false;ticketDrawerState={id,tab};saveTickets();renderTicketDrawerV5();$('#ticketDrawerBackdrop').hidden=false;document.body.style.overflow='hidden';
};
renderTicketDrawer=renderTicketDrawerV5;
addTicketComment=addTicketCommentV5;

function applyAccessibility(action){
  if(action==='up')accessibilityState.scale=Math.min(118,accessibilityState.scale+6);
  if(action==='down')accessibilityState.scale=Math.max(88,accessibilityState.scale-6);
  if(action==='contrast')accessibilityState.contrast=!accessibilityState.contrast;
  document.documentElement.style.setProperty('--mesa-font-scale',`${accessibilityState.scale}%`);document.body.classList.toggle('high-contrast',accessibilityState.contrast);showToast('Accesibilidad',`Texto ${accessibilityState.scale}%${accessibilityState.contrast?' · alto contraste activo':''}.`);
}

function addWorkflowNode(type){
  const flow=workflowTemplates[workflowState.service]||(workflowTemplates[workflowState.service]=[]);const idx=Math.max(1,flow.length-1);const node={type,title:type==='approval'?'Nueva aprobación':type==='decision'?'Nueva condición':'Nueva tarea',desc:'Configura responsable, condición y acción en la fase de administración.'};flow.splice(idx,0,node);saveWorkflows();renderWorkflows();showToast('Flujo actualizado','Se agregó un nuevo paso al borrador.');
}
function removeWorkflowNode(index){const flow=workflowTemplates[workflowState.service];if(!flow||index<=0||index>=flow.length-1)return;flow.splice(index,1);saveWorkflows();renderWorkflows();}

function createContinuityDemo(type){
  const map={incidents:['INC','Incidente mayor en evaluación'],problems:['PRB','Nuevo problema para análisis de causa raíz'],changes:['CHG','Cambio tecnológico pendiente de evaluación']};const [prefix,title]=map[type]||map.incidents;const arr=continuityData[type]||continuityData.incidents;arr.unshift({id:`${prefix}-2026-${String(22+arr.length).padStart(3,'0')}`,title,state:type==='changes'?'Borrador':'Nuevo',owner:'Por asignar',impact:'Por definir',risk:'Media',linked:0,started:'Ahora'});renderContinuity();showToast('Registro creado','Se creó un registro de demostración con trazabilidad inicial.');
}

// Interacciones v0.5

document.addEventListener('click',e=>{
  const myf=e.target.closest('[data-my-filter]');if(myf){myTicketsState.filter=myf.dataset.myFilter;renderMyTicketsV5();return;}
  const notif=e.target.closest('[data-notification]');if(notif){const n=mesaNotifications.find(x=>x.id===notif.dataset.notification);if(n){n.read=true;saveNotifications();if(n.ticket)openTicket(n.ticket);else renderNotifications();}return;}
  if(e.target.closest('[data-notification-read-all]')){mesaNotifications.forEach(n=>n.read=true);saveNotifications();renderNotifications();return;}
  const k=e.target.closest('[data-knowledge]');if(k){knowledgeState.selected=k.dataset.knowledge;setView('knowledge');return;}
  const kc=e.target.closest('[data-knowledge-category]');if(kc){knowledgeState.category=kc.dataset.knowledgeCategory;renderKnowledge();return;}
  const wh=e.target.closest('[data-wizard-knowledge]');if(wh){closeRequestModal();knowledgeState.selected=wh.dataset.wizardKnowledge;setView('knowledge');return;}
  const ah=e.target.closest('[data-article-helpful]');if(ah){showToast('Gracias por tu respuesta',ah.dataset.helpful==='yes'?'Marcamos este contenido como útil.':'La señalamos para revisión y mejora.');return;}
  const ct=e.target.closest('[data-continuity-tab]');if(ct){continuityState.tab=ct.dataset.continuityTab;renderContinuity();return;}
  const cn=e.target.closest('[data-continuity-new]');if(cn){createContinuityDemo(cn.dataset.continuityNew);return;}
  const asset=e.target.closest('[data-asset]');if(asset){assetState.selected=asset.dataset.asset;renderAssets();return;}
  if(e.target.closest('[data-asset-new]')){showToast('Activo en borrador','El formulario de alta quedará conectado a inventario y responsables en la fase productiva.');return;}
  const ws=e.target.closest('[data-workflow-service]');if(ws){workflowState.service=ws.dataset.workflowService;if(!workflowTemplates[workflowState.service])workflowTemplates[workflowState.service]=JSON.parse(JSON.stringify(baseWorkflowTemplates.publicaciones));renderWorkflows();return;}
  const wa=e.target.closest('[data-workflow-add]');if(wa){addWorkflowNode(wa.dataset.workflowAdd);return;}
  const wr=e.target.closest('[data-workflow-remove]');if(wr){removeWorkflowNode(Number(wr.dataset.workflowRemove));return;}
  if(e.target.closest('[data-workflow-save]')){saveWorkflows();showToast('Borrador guardado','La configuración local del flujo fue actualizada.');return;}
  const acc=e.target.closest('[data-a11y]');if(acc){applyAccessibility(acc.dataset.a11y);return;}
  const ck=e.target.closest('[data-command-knowledge]');if(ck){closeCommandPalette();knowledgeState.selected=ck.dataset.commandKnowledge;setView('knowledge');return;}
  const ca=e.target.closest('[data-command-asset]');if(ca){closeCommandPalette();assetState.selected=ca.dataset.commandAsset;setView('assets');return;}
  const attach=e.target.closest('[data-attach-demo]');if(attach){const t=tickets.find(x=>x.id===attach.dataset.attachDemo);if(t){ensureTicketModel(t);t.attachments.push({name:`evidencia_${t.id}.png`,type:'Imagen',size:'842 KB'});saveTickets();renderTicketDrawerV5();showToast('Evidencia agregada','Adjunto de demostración asociado al radicado.');}return;}
  const csat=e.target.closest('[data-csat]');if(csat&&ticketDrawerState.id){const t=tickets.find(x=>x.id===ticketDrawerState.id);ensureTicketModel(t);t.resolution=t.resolution||{summary:'Solicitud resuelta.',confirmed:false,csat:null};t.resolution.csat=Number(csat.dataset.csat);saveTickets();renderTicketDrawerV5();showToast('Valoración registrada','Gracias por evaluar el servicio.');return;}
  if(e.target.closest('[data-confirm-resolution]')&&ticketDrawerState.id){const t=tickets.find(x=>x.id===ticketDrawerState.id);ensureTicketModel(t);t.status='Cerrado';t.resolution=t.resolution||{};t.resolution.confirmed=true;saveTickets();renderTicketDrawerV5();showToast('Solución confirmada','La solicitud quedó cerrada por confirmación del funcionario.');return;}
  if(e.target.closest('[data-reopen-ticket]')&&ticketDrawerState.id){const t=tickets.find(x=>x.id===ticketDrawerState.id);ensureTicketModel(t);t.status='En gestión';t.requesterActionRequired=false;t.messages.push({kind:'system',visibility:'public',author:'Mesa de Ayuda TIC',text:'El funcionario reabrió la solicitud porque requiere atención adicional.',at:'Ahora'});saveTickets();renderTicketDrawerV5();showToast('Solicitud reabierta','El caso volvió a la cola del equipo gestor.');return;}
},true);

document.addEventListener('input',e=>{
  if(e.target.id==='myTicketSearch'){myTicketsState.query=e.target.value;renderMyTicketsV5();setTimeout(()=>{const el=$('#myTicketSearch');if(el){el.focus();el.setSelectionRange(el.value.length,el.value.length);}},0);}
  if(e.target.id==='knowledgeSearch'){knowledgeState.query=e.target.value;renderKnowledge();setTimeout(()=>{const el=$('#knowledgeSearch');if(el){el.focus();el.setSelectionRange(el.value.length,el.value.length);}},0);}
  if(e.target.id==='assetSearch'){assetState.query=e.target.value;renderAssets();setTimeout(()=>{const el=$('#assetSearch');if(el){el.focus();el.setSelectionRange(el.value.length,el.value.length);}},0);}
});
document.addEventListener('change',e=>{if(e.target.id==='assetTypeFilter'){assetState.type=e.target.value;renderAssets();}});

// Breadcrumb ampliado.
const setViewV4=setView;
setView=function(view){
  $$('.view').forEach(v=>v.classList.remove('active'));const target=$(`#view-${view}`);if(!target)return;target.classList.add('active');$$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===view));
  const names={home:'Inicio','new-request':'Nueva solicitud','my-tickets':'Mis solicitudes',notifications:'Actualizaciones',knowledge:'Centro de conocimiento',status:'Estado de servicios',calendar:'Agenda y disponibilidad',ops:'Centro de operaciones',continuity:'Incidentes, problemas y cambios',team:'Equipo y capacidad',assets:'Activos y CMDB',catalog:'Catálogo de servicios',reports:'Indicadores',workflows:'Flujos y automatización',admin:'Configuración'};$('#breadcrumb').textContent=`Mesa de Ayuda TIC / ${names[view]||'Inicio'}`;renderView(view);if(innerWidth<860)$('#sidebar').classList.remove('open');
};

updateBadges();
renderHomeV5();

// Analítica y administración evolucionadas para v0.5.
renderReports=function(){
  const active=tickets.filter(t=>!['Resuelto','Cerrado','Cancelado'].includes(t.status)).length;
  const resolved=tickets.filter(t=>['Resuelto','Cerrado'].includes(t.status)).length;
  const internalNotes=tickets.reduce((n,t)=>n+(t.messages||[]).filter(m=>m.visibility==='internal').length,0);
  const csats=tickets.map(t=>t.resolution?.csat).filter(Boolean);const csat=csats.length?(csats.reduce((a,b)=>a+b,0)/csats.length).toFixed(1):'4.7';
  $('#view-reports').innerHTML=`<div class="page-head"><div><span class="eyebrow">SERVICE INTELLIGENCE · EXPERIENCIA + OPERACIÓN</span><h1>Indicadores de servicio</h1><p>No mide únicamente tickets. Combina demanda, SLA, autoservicio, experiencia del funcionario, capacidad, conocimiento y calidad de resolución.</p></div><button class="btn btn-secondary">Exportar informe</button></div><div class="grid grid-4"><div class="card metric-card"><div class="metric-label">Cumplimiento SLA</div><div class="metric-value">94%</div><div class="metric-foot"><span class="trend-up">↑ 3%</span> mensual</div></div><div class="card metric-card"><div class="metric-label">Autoservicio estimado</div><div class="metric-value">31%</div><div class="metric-foot">Necesidades resueltas sin ticket</div></div><div class="card metric-card"><div class="metric-label">Experiencia / CSAT</div><div class="metric-value">${csat}/5</div><div class="metric-foot">Percepción posterior al cierre</div></div><div class="card metric-card"><div class="metric-label">Reaperturas</div><div class="metric-value">3.1%</div><div class="metric-foot">Calidad de resolución</div></div></div><div class="grid grid-2" style="margin-top:16px"><div class="card chart-card"><h3>Salud de la operación</h3><p>Indicadores que ayudan a prevenir acumulación y reprocesos.</p><div class="ticket-field-list" style="margin-top:12px"><div><span>Casos activos</span><strong>${active}</strong></div><div><span>Resueltos / cerrados</span><strong>${resolved}</strong></div><div><span>Casos en riesgo SLA</span><strong>${tickets.filter(t=>['risk','critical'].includes(slaHealth(t).key)).length}</strong></div><div><span>Notas internas registradas</span><strong>${internalNotes}</strong></div><div><span>Servicios con degradación</span><strong>${serviceStatusData.filter(s=>s.state!=='operational').length}</strong></div></div></div><div class="card chart-card"><h3>Conocimiento y autoservicio</h3><p>El objetivo es evitar tickets repetitivos sin ocultar el acceso al soporte.</p><div class="ticket-field-list" style="margin-top:12px"><div><span>Artículos publicados</span><strong>${knowledgeArticles.length}</strong></div><div><span>Utilidad promedio</span><strong>${Math.round(knowledgeArticles.reduce((a,k)=>a+k.helpful,0)/knowledgeArticles.length)}%</strong></div><div><span>Artículo más consultado</span><strong>${knowledgeArticles.slice().sort((a,b)=>b.views-a.views)[0].id}</strong></div><div><span>Catálogo con conocimiento contextual</span><strong>Activo</strong></div><div><span>Conversaciones buscables</span><strong>Activo</strong></div></div></div></div><div class="card chart-card" style="margin-top:16px"><h3>Carga operacional del equipo</h3><p>La recomendación de asignación utiliza esta capacidad junto con competencias y agenda.</p><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px;padding-top:10px">${team.map(p=>`<div><div style="display:flex;justify-content:space-between;font-size:8px;margin-bottom:5px"><span>${p.name.split(' ')[0]}</span><strong>${p.load}%</strong></div><div class="progress" style="height:9px"><span style="width:${p.load}%;background:${loadColor(p.load)}"></span></div></div>`).join('')}</div></div>`;
};

renderAdmin=function(){
  const capabilities=[
    ['Portal de autoservicio','Avanzado','Radicación guiada, catálogo, conocimiento y seguimiento.'],
    ['Catálogo / formularios','Avanzado','Campos por servicio y condiciones dinámicas.'],
    ['Workflows no-code','Avanzado','Modelo visual listo para persistencia.'],
    ['SLA y escalamiento','Avanzado','Semáforo, riesgo y reglas de escalamiento.'],
    ['Incidente / problema / cambio','Avanzado','Continuidad ITSM y relaciones.'],
    ['Activos / CMDB','Avanzado','Contexto de hardware, software e infraestructura.'],
    ['Conocimiento','Avanzado','Autoservicio contextual y feedback.'],
    ['Notificaciones','Prototipo completo','Centro interno; falta conectar correo/canales.'],
    ['Identidad y permisos','Pendiente backend','Supabase Auth + RLS será el último paso.'],
    ['Archivos reales','Pendiente backend','Storage, metadatos y permisos.'],
    ['Auditoría persistente','Pendiente backend','Modelo definido; falta persistencia inalterable.'],
    ['Tiempo real','Pendiente backend','Realtime para colas, respuestas y agenda.']
  ];
  $('#view-admin').innerHTML=`<div class="page-head"><div><span class="eyebrow">GOBIERNO DE Mesa de Ayuda TIC</span><h1>Preparación para producción</h1><p>Esta vista distingue claramente lo que ya está resuelto a nivel funcional de lo que deliberadamente se deja para la última fase de Supabase.</p></div></div><div class="status-summary"><div><span class="eyebrow">MADUREZ PRE-BACKEND</span><h2>Arquitectura funcional avanzada</h2><p>El objetivo es que Supabase agregue identidad, persistencia, permisos, archivos y tiempo real sin rehacer la experiencia.</p></div><span class="status-big-icon">✓</span></div><div class="card" style="margin-top:14px;overflow:hidden"><div class="continuity-row header" style="grid-template-columns:220px 150px 1fr"><span>Capacidad</span><span>Estado</span><span>Observación</span></div>${capabilities.map(([c,state,d])=>`<div class="continuity-row" style="grid-template-columns:220px 150px 1fr"><strong>${c}</strong><span class="pill ${state.startsWith('Pendiente')?'amber':'green'}">${state}</span><span>${d}</span></div>`).join('')}</div><div class="section-head"><div><h2>Configuraciones maestras</h2><p>Entidades que luego se convertirán directamente en tablas y políticas.</p></div></div><div class="settings-grid">${[['◇','Catálogo de servicios','Categorías, formularios, visibilidad por rol, SLA y aprobación.'],['⌘','Flujos y automatización','Pasos, condiciones, transiciones, aprobaciones y acciones.'],['◉','Personas y competencias','Roles, habilidades, horarios, capacidad y delegaciones.'],['▦','Calendario institucional','Jornadas, festivos, ausencias, bloqueos y recurrencias.'],['△','Continuidad ITSM','Incidentes, problemas, cambios, riesgo y causa raíz.'],['▧','Activos y CMDB','Activos, relaciones, criticidad, usuarios y garantías.'],['◈','Gobierno del conocimiento','Propietarios, revisión, versiones, audiencia y utilidad.'],['✓','Seguridad / acceso futuro','Auth, RLS, Storage, Realtime y auditoría con Supabase.']].map(([i,t,d])=>`<div class="card setting-card"><div class="setting-icon">${i}</div><div><h3>${t}</h3><p>${d}</p></div><button class="btn btn-secondary compact">Configurar</button></div>`).join('')}</div>`;
};
