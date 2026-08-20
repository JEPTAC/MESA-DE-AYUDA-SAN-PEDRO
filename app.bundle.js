const services = [
  { id:'publicaciones', category:'Comunicaciones', icon:'✦', tone:'#eaf2ff', color:'#1557c0', title:'Solicitar publicación', desc:'Piezas, copys, publicación en web, redes sociales o canales institucionales.', sla:'1–3 días', skills:['Diseño','Redes sociales','Web'], approval:true,
    fields:[['Canal requerido','select',['Redes sociales','Sitio web','Cartelera interna','Prensa / boletín','Varios canales']],['Fecha ideal de publicación','date'],['Objetivo y mensaje principal','textarea'],['¿Cuenta con insumos?','select',['Sí, completos','Parciales','No']],['Enlace o ubicación de archivos','text']] },
  { id:'cubrimientos', category:'Comunicaciones', icon:'◉', tone:'#f1edff', color:'#7053c6', title:'Solicitar cubrimiento', desc:'Fotografía, video, transmisión, acompañamiento o registro de eventos institucionales.', sla:'Agenda', skills:['Foto/Video','Protocolo','Redes sociales'], approval:false,
    fields:[['Tipo de cubrimiento','select',['Fotografía','Video','Foto + video','Transmisión en vivo','Acompañamiento de comunicaciones']],['Fecha del evento','date'],['Hora de inicio','time'],['Hora estimada de finalización','time'],['Lugar','text'],['Descripción del evento','textarea']] },
  { id:'desarrollo', category:'Desarrollo y datos', icon:'⌘', tone:'#e8f8fb', color:'#087e98', title:'Aplicaciones y automatizaciones', desc:'Crear, mejorar o automatizar aplicaciones, formularios, procesos y herramientas internas.', sla:'Evaluación', skills:['Desarrollo','Procesos','Datos'], approval:true,
    fields:[['Tipo de necesidad','select',['Nueva aplicación','Nueva funcionalidad','Automatización','Formulario digital','Integración','Dashboard / reporte']],['Problema que se quiere resolver','textarea'],['Usuarios o dependencias involucradas','text'],['Fecha objetivo','date'],['Impacto esperado','select',['Bajo','Medio','Alto','Crítico']] ] },
  { id:'revision', category:'Calidad digital', icon:'✓', tone:'#e9f8f2', color:'#0e9f6e', title:'Revisión y validación', desc:'Revisar piezas, documentos, páginas, formularios, aplicaciones o contenidos antes de publicar.', sla:'4–24 h', skills:['QA','Web','Comunicaciones'], approval:false,
    fields:[['Elemento a revisar','select',['Pieza gráfica','Documento','Página web','Formulario','Aplicación','Publicación']],['Enlace o archivo','text'],['Qué debe validarse','textarea'],['Fecha límite','date']] },
  { id:'correo', category:'Soporte TIC', icon:'@', tone:'#fff6dd', color:'#bd7500', title:'Correo institucional', desc:'Acceso, bloqueo, creación, contraseña, configuración, envío/recepción y listas de correo.', sla:'2–8 h', skills:['Correo','Microsoft 365','Soporte'], approval:false,
    fields:[['Tipo de problema','select',['No puedo ingresar','Olvidé contraseña','No envía','No recibe','Crear cuenta','Configurar dispositivo','Lista / grupo','Otro']],['Cuenta afectada','email'],['Descripción','textarea']] },
  { id:'equipos', category:'Soporte TIC', icon:'▣', tone:'#eef2f6', color:'#516174', title:'Equipo o periférico', desc:'Computador, impresora, escáner, proyector, periféricos o mantenimiento preventivo.', sla:'4–24 h', skills:['Hardware','Soporte'], approval:false,
    fields:[['Equipo','select',['Computador','Portátil','Impresora','Escáner','Proyector','Teclado / mouse','Otro']],['Activo / placa (si aplica)','text'],['Síntoma o falla','textarea'],['¿Impide trabajar?','select',['Sí','Parcialmente','No']] ] },
  { id:'internet', category:'Soporte TIC', icon:'⌁', tone:'#e8f8fb', color:'#087e98', title:'Internet y conectividad', desc:'Wi‑Fi, red cableada, VPN, acceso a servicios, puntos de red e intermitencias.', sla:'1–6 h', skills:['Redes de datos','Infraestructura'], approval:false,
    fields:[['Tipo de conexión','select',['Wi‑Fi','Cableada','VPN','Acceso a sistema','Punto de red']],['Ubicación','text'],['Descripción de la falla','textarea'],['¿A cuántas personas afecta?','number']] },
  { id:'accesos', category:'Identidad y acceso', icon:'◇', tone:'#fff0f0', color:'#c03c3c', title:'Usuarios, accesos y permisos', desc:'Altas, bajas, permisos, bloqueos y accesos a sistemas o recursos institucionales.', sla:'2–24 h', skills:['Identidad','Seguridad','Soporte'], approval:true,
    fields:[['Solicitud','select',['Crear usuario','Modificar permisos','Retirar acceso','Desbloquear','Acceso a carpeta','Acceso a aplicación']],['Usuario involucrado','text'],['Sistema / recurso','text'],['Justificación','textarea']] },
  { id:'web', category:'Comunicaciones', icon:'◫', tone:'#eaf2ff', color:'#1557c0', title:'Sitio web institucional', desc:'Actualizar páginas, publicar información, corregir enlaces, crear secciones o formularios web.', sla:'4–48 h', skills:['Web','Contenido','Accesibilidad'], approval:false,
    fields:[['Tipo de cambio','select',['Actualizar contenido','Crear sección','Corregir error','Publicar archivo','Crear formulario','Enlace roto']],['URL o sección','text'],['Detalle del cambio','textarea'],['Fecha requerida','date']] },
  { id:'datos', category:'Desarrollo y datos', icon:'▥', tone:'#f1edff', color:'#7053c6', title:'Datos e informes', desc:'Extracciones, consolidaciones, tableros, indicadores, depuración y análisis de información.', sla:'1–5 días', skills:['Datos','BI','Procesos'], approval:false,
    fields:[['Producto esperado','select',['Base consolidada','Indicador','Dashboard','Informe','Cruce de datos','Depuración']],['Fuentes de información','text'],['Descripción del requerimiento','textarea'],['Fecha de corte','date']] },
  { id:'seguridad', category:'Seguridad digital', icon:'△', tone:'#fff0f0', color:'#c03c3c', title:'Incidente de seguridad', desc:'Phishing, malware, cuenta comprometida, pérdida de equipo o comportamiento sospechoso.', sla:'Inmediato', skills:['Seguridad','Infraestructura'], approval:false, critical:true,
    fields:[['Tipo de incidente','select',['Correo sospechoso / phishing','Cuenta comprometida','Malware','Pérdida de equipo','Acceso no autorizado','Otro']],['Qué ocurrió','textarea'],['Hora aproximada','time'],['¿El equipo sigue conectado?','select',['Sí','No','No aplica']] ] },
  { id:'capacitacion', category:'Acompañamiento', icon:'◎', tone:'#e9f8f2', color:'#0e9f6e', title:'Capacitación o acompañamiento', desc:'Solicitar orientación, capacitación o asistencia para herramientas digitales y procesos.', sla:'Agenda', skills:['Capacitación','Soporte'], approval:false,
    fields:[['Tema','text'],['Número aproximado de asistentes','number'],['Modalidad','select',['Presencial','Virtual','Indiferente']],['Fecha preferida','date'],['Necesidad específica','textarea']] }
];

const team = [
  {id:'ana',name:'Ana López',initials:'AL',role:'Comunicaciones',skills:['Diseño','Redes sociales','Foto/Video','Contenido'],load:58,status:'Disponible',slots:['Hoy 2:30 p. m.','Mañana 9:00 a. m.']},
  {id:'carlos',name:'Carlos Rojas',initials:'CR',role:'TIC · Soporte',skills:['Soporte','Correo','Microsoft 365','Hardware'],load:72,status:'Ocupado',slots:['Hoy 4:00 p. m.','Mañana 8:00 a. m.']},
  {id:'juan',name:'Juan Pérez',initials:'JP',role:'TIC · Desarrollo',skills:['Desarrollo','Web','Datos','Procesos','QA'],load:64,status:'Disponible',slots:['Hoy 3:30 p. m.','Mañana 10:30 a. m.']},
  {id:'diana',name:'Diana Gómez',initials:'DG',role:'TIC · Infraestructura',skills:['Redes de datos','Infraestructura','Seguridad','Identidad'],load:41,status:'Disponible',slots:['Hoy 11:30 a. m.','Hoy 2:00 p. m.']},
  {id:'sofia',name:'Sofía Martínez',initials:'SM',role:'Comunicaciones',skills:['Foto/Video','Protocolo','Redes sociales'],load:86,status:'Alta carga',slots:['Mañana 11:00 a. m.','Viernes 8:30 a. m.']},
  {id:'mateo',name:'Mateo Valencia',initials:'MV',role:'Datos y calidad',skills:['Datos','BI','QA','Accesibilidad'],load:33,status:'Disponible',slots:['Hoy 1:45 p. m.','Hoy 4:30 p. m.']}
];

// Agenda operativa simulada. En la fase Supabase se reemplaza por tablas de disponibilidad, bloqueos y reservas.
const workWindows = [['08:00','12:00'],['13:00','17:00']];
const scheduleEvents = [
  {id:'ev01',person:'ana',date:'2026-08-19',start:'08:30',end:'10:00',title:'Diseño campaña de salud',type:'internal',service:'publicaciones',ticket:'MA-2026-0148'},
  {id:'ev02',person:'ana',date:'2026-08-19',start:'14:00',end:'15:00',title:'Comité de comunicaciones',type:'meeting'},
  {id:'ev03',person:'carlos',date:'2026-08-19',start:'08:00',end:'09:30',title:'Soporte correo · Planeación',type:'support',ticket:'MA-2026-0147'},
  {id:'ev04',person:'carlos',date:'2026-08-19',start:'10:30',end:'12:00',title:'Mantenimiento equipos',type:'support'},
  {id:'ev05',person:'juan',date:'2026-08-19',start:'09:00',end:'11:30',title:'Formulario emergencias',type:'development',ticket:'MA-2026-0145'},
  {id:'ev06',person:'juan',date:'2026-08-19',start:'13:30',end:'14:30',title:'Revisión con Gestión del Riesgo',type:'meeting'},
  {id:'ev07',person:'diana',date:'2026-08-19',start:'08:00',end:'09:00',title:'Revisión red segundo piso',type:'support',ticket:'MA-2026-0144'},
  {id:'ev08',person:'diana',date:'2026-08-19',start:'15:00',end:'16:00',title:'Inventario de red',type:'internal'},
  {id:'ev09',person:'sofia',date:'2026-08-19',start:'08:00',end:'11:00',title:'Cubrimiento institucional',type:'coverage'},
  {id:'ev10',person:'sofia',date:'2026-08-19',start:'14:00',end:'16:30',title:'Edición y publicación',type:'coverage'},
  {id:'ev11',person:'mateo',date:'2026-08-19',start:'10:00',end:'11:00',title:'Validación formulario',type:'review'},
  {id:'ev12',person:'mateo',date:'2026-08-19',start:'14:30',end:'15:30',title:'Tablero de indicadores',type:'development'},

  {id:'ev13',person:'ana',date:'2026-08-20',start:'09:00',end:'10:30',title:'Pieza rendición de cuentas',type:'internal'},
  {id:'ev14',person:'ana',date:'2026-08-20',start:'15:00',end:'16:00',title:'Revisión de contenidos',type:'review'},
  {id:'ev15',person:'carlos',date:'2026-08-20',start:'08:30',end:'10:00',title:'Configuración de correos',type:'support'},
  {id:'ev16',person:'juan',date:'2026-08-20',start:'10:00',end:'12:00',title:'Desarrollo módulo interno',type:'development'},
  {id:'ev17',person:'diana',date:'2026-08-20',start:'13:00',end:'14:30',title:'Punto de red · Hacienda',type:'support'},
  {id:'ev18',person:'sofia',date:'2026-08-20',start:'09:00',end:'11:30',title:'Consejo de Gobierno',type:'coverage',ticket:'MA-2026-0146'},
  {id:'ev19',person:'mateo',date:'2026-08-20',start:'08:00',end:'09:30',title:'Depuración base',type:'development'},

  {id:'ev20',person:'ana',date:'2026-08-21',start:'10:00',end:'11:00',title:'Planeación parrilla',type:'meeting'},
  {id:'ev21',person:'carlos',date:'2026-08-21',start:'13:00',end:'14:00',title:'Soporte impresoras',type:'support'},
  {id:'ev22',person:'juan',date:'2026-08-21',start:'08:00',end:'10:00',title:'QA portal institucional',type:'review'},
  {id:'ev23',person:'diana',date:'2026-08-21',start:'09:30',end:'11:00',title:'Seguridad perimetral',type:'support'},
  {id:'ev24',person:'sofia',date:'2026-08-21',start:'08:30',end:'10:00',title:'Registro fotográfico',type:'coverage'},
  {id:'ev25',person:'mateo',date:'2026-08-21',start:'14:00',end:'16:00',title:'Informe de calidad',type:'development'},

  {id:'ev26',person:'ana',date:'2026-08-17',start:'09:00',end:'11:00',title:'Contenido institucional',type:'internal'},
  {id:'ev27',person:'carlos',date:'2026-08-17',start:'14:00',end:'15:30',title:'Soporte general',type:'support'},
  {id:'ev28',person:'sofia',date:'2026-08-17',start:'08:00',end:'12:00',title:'Cubrimiento externo',type:'coverage'},
  {id:'ev29',person:'juan',date:'2026-08-18',start:'08:30',end:'11:00',title:'Automatización interna',type:'development'},
  {id:'ev30',person:'diana',date:'2026-08-18',start:'13:00',end:'15:00',title:'Revisión infraestructura',type:'support'},
  {id:'ev31',person:'mateo',date:'2026-08-18',start:'09:00',end:'10:30',title:'Control de calidad',type:'review'}
];

const sampleTickets = [
  {id:'MA-2026-0148',service:'publicaciones',title:'Publicación jornada de vacunación',requester:'Secretaría de Salud',assignee:'ana',priority:'Media',status:'En gestión',created:'19 Ago · 8:18',due:'Hoy 3:00 p. m.',sla:'4 h 12 min',description:'Diseñar y publicar pieza para redes sociales y sitio web con información de la jornada de vacunación.',timeline:[['Solicitud creada','19 Ago · 8:18'],['Asignada automáticamente a Ana López','19 Ago · 8:19'],['Insumos validados','19 Ago · 8:47']]},
  {id:'MA-2026-0147',service:'correo',title:'No permite iniciar sesión en correo',requester:'Planeación',assignee:'carlos',priority:'Alta',status:'En espera',created:'19 Ago · 7:42',due:'Hoy 12:00 p. m.',sla:'1 h 06 min',description:'La cuenta institucional solicita autenticación y vuelve a la pantalla de inicio.',timeline:[['Solicitud creada','19 Ago · 7:42'],['Carlos Rojas tomó el caso','19 Ago · 7:50'],['En espera de validación del usuario','19 Ago · 8:12']]},
  {id:'MA-2026-0146',service:'cubrimientos',title:'Cubrimiento Consejo de Gobierno',requester:'Despacho del Alcalde',assignee:'sofia',priority:'Alta',status:'Programado',created:'18 Ago · 4:25',due:'20 Ago · 9:00 a. m.',sla:'Agenda',description:'Registro fotográfico y clips cortos para redes del Consejo de Gobierno.',timeline:[['Solicitud creada','18 Ago · 4:25'],['Sofía Martínez reservó agenda','18 Ago · 4:41']]},
  {id:'MA-2026-0145',service:'desarrollo',title:'Formulario de reporte de emergencias',requester:'Gestión del Riesgo',assignee:'juan',priority:'Alta',status:'En gestión',created:'18 Ago · 2:10',due:'22 Ago',sla:'2 d 5 h',description:'Crear formulario interno que permita reportar afectaciones con fotos y ubicación.',timeline:[['Solicitud creada','18 Ago · 2:10'],['Aprobada por Secretaría General','18 Ago · 3:02'],['Juan Pérez inició análisis','18 Ago · 3:15']]},
  {id:'MA-2026-0144',service:'internet',title:'Intermitencia Wi‑Fi segundo piso',requester:'Hacienda',assignee:'diana',priority:'Alta',status:'Nuevo',created:'18 Ago · 11:30',due:'Hoy 11:00 a. m.',sla:'38 min',description:'La conexión se cae cada pocos minutos para varios funcionarios.',timeline:[['Solicitud creada','18 Ago · 11:30'],['Enrutada al grupo Infraestructura','18 Ago · 11:31']]},
  {id:'MA-2026-0143',service:'revision',title:'Revisión formulario rendición de cuentas',requester:'Control Interno',assignee:'mateo',priority:'Media',status:'Resuelto',created:'18 Ago · 9:13',due:'18 Ago · 4:00 p. m.',sla:'Cumplido',description:'Validar campos, redacción, enlaces y experiencia móvil.',timeline:[['Solicitud creada','18 Ago · 9:13'],['Mateo Valencia inició revisión','18 Ago · 9:40'],['Revisión finalizada','18 Ago · 2:16']]}
];

let tickets = JSON.parse(localStorage.getItem('mesa360_tickets') || 'null') || sampleTickets;
let currentRole = 'requester';
let wizard = {step:1, service:null, details:{}, assignee:'auto'};
let calendarState = { date:'2026-08-19', view:'day', team:'all', service:'all', duration:60, availableOnly:false, zoom:160, snap:30, focusMode:false, density:'spacious', showFree:true, scrollLeft:null };

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const serviceById = id => services.find(s=>s.id===id);
const personById = id => team.find(p=>p.id===id);
const safe = str => String(str ?? '').replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

function saveTickets(){ localStorage.setItem('mesa360_tickets', JSON.stringify(tickets)); updateBadges(); }
function updateBadges(){ $('#myTicketsBadge').textContent = Math.min(tickets.length,99); }
function toneIcon(service){ return `<div class="service-icon" style="background:${service.tone};color:${service.color}">${service.icon}</div>`; }
function statusPill(status){ const map={'Nuevo':'blue','En gestión':'blue','En espera':'amber','Programado':'purple','Resuelto':'green','Cerrado':'gray','Cancelado':'red'}; return `<span class="pill ${map[status]||'gray'}"><span class="dot"></span>${safe(status)}</span>`; }
function priorityPill(priority){ const map={Crítica:'red',Alta:'amber',Media:'blue',Baja:'gray'}; return `<span class="pill ${map[priority]||'gray'}">${safe(priority)}</span>`; }
function loadColor(load){ return load>=85?'#d14343':load>=70?'#d98b00':'#1557c0'; }

function setView(view){
  $$('.view').forEach(v=>v.classList.remove('active')); const target=$(`#view-${view}`); if(target) target.classList.add('active');
  $$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===view));
  const names={home:'Inicio','new-request':'Nueva solicitud','my-tickets':'Mis solicitudes',calendar:'Agenda y disponibilidad',ops:'Centro de operaciones',team:'Equipo y capacidad',catalog:'Catálogo de servicios',reports:'Indicadores',admin:'Configuración'};
  $('#breadcrumb').textContent=`Mesa de Ayuda TIC / ${names[view]||'Inicio'}`;
  renderView(view);
  if(innerWidth<860) $('#sidebar').classList.remove('open');
}
function renderView(view){ const fn={home:renderHome,'new-request':renderNewRequest,'my-tickets':renderMyTickets,calendar:renderCalendar,ops:renderOps,team:renderTeam,catalog:renderCatalog,reports:renderReports,admin:renderAdmin}[view]; fn?.(); }

function renderHome(){
  const open=tickets.filter(t=>!['Resuelto','Cerrado','Cancelado'].includes(t.status)).length;
  const urgent=tickets.filter(t=>['Alta','Crítica'].includes(t.priority)&&!['Resuelto','Cerrado'].includes(t.status)).length;
  const free=team.filter(p=>p.load<70).length;
  $('#view-home').innerHTML=`
    <div class="hero">
      <div class="hero-grid">
        <div>
          <span class="eyebrow" style="color:#bcd5ff">SERVICIOS INTERNOS · ALCALDÍA</span>
          <h1>¿Qué necesitas gestionar hoy?</h1>
          <p>Solicita soporte, publicaciones, cubrimientos, desarrollos, revisiones y servicios digitales desde un solo lugar. La mesa asigna cada caso según competencia, carga y disponibilidad.</p>
          <div class="hero-actions"><button class="btn btn-primary" data-action="open-new-request">＋ Crear una solicitud</button><button class="btn btn-secondary" data-view-link="catalog">Explorar servicios</button></div>
        </div>
        <div class="availability-panel">
          <h3>Disponibilidad del equipo · hoy</h3>
          ${team.slice().sort((a,b)=>a.load-b.load).slice(0,3).map(p=>`<div class="avail-item"><div class="avatar">${p.initials}</div><div><strong>${p.name}</strong><span>${p.role} · ${p.load}% ocupado</span></div><span class="pill ${p.load<70?'green':p.load<85?'amber':'red'}">${p.load<70?'Disponible':p.load<85?'Ocupado':'Alta carga'}</span></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="grid grid-4" style="margin-top:16px">
      <div class="card metric-card"><div class="metric-label">Solicitudes abiertas</div><div class="metric-value">${open}</div><div class="metric-foot"><span class="trend-up">●</span> En seguimiento activo</div></div>
      <div class="card metric-card"><div class="metric-label">Prioridad alta</div><div class="metric-value">${urgent}</div><div class="metric-foot">Casos que requieren atención</div></div>
      <div class="card metric-card"><div class="metric-label">Equipo disponible</div><div class="metric-value">${free}/${team.length}</div><div class="metric-foot">Por debajo del 70% de carga</div></div>
      <div class="card metric-card"><div class="metric-label">Cumplimiento SLA</div><div class="metric-value">94%</div><div class="metric-foot"><span class="trend-up">↑ 3%</span> frente a la semana anterior</div></div>
    </div>
    <div class="section-head"><div><h2>Servicios más usados</h2><p>Selecciona una categoría para iniciar una solicitud con el formulario correcto.</p></div><button class="link-btn" data-view-link="catalog">Ver catálogo completo →</button></div>
    <div class="service-grid">${services.slice(0,8).map(serviceCard).join('')}</div>
    <div class="section-head"><div><h2>Actividad reciente</h2><p>Tus solicitudes y los casos que requieren seguimiento.</p></div><button class="link-btn" data-view-link="my-tickets">Ver todas →</button></div>
    <div class="quick-layout">
      <div class="card ticket-table-card">${ticketTable(tickets.slice(0,5))}</div>
      <div class="card card-pad"><h3 style="margin:0;font-size:13px">Capacidad del equipo</h3><p style="font-size:9px;color:var(--muted);margin:4px 0 8px">Carga estimada según agenda y solicitudes activas.</p><div class="capacity-list">${team.slice(0,4).map(capacityItem).join('')}</div><button class="btn btn-soft" style="width:100%;margin-top:7px" data-view-link="team">Ver disponibilidad completa</button></div>
    </div>`;
}
function serviceCard(s){ return `<button class="service-card" data-service="${s.id}">${toneIcon(s)}<h3>${s.title}</h3><p>${s.desc}</p><div class="service-meta"><span>${s.category}</span><span>${s.sla}</span></div></button>`; }
function capacityItem(p){ return `<div class="capacity-item"><div class="capacity-top"><div class="capacity-person"><div class="avatar">${p.initials}</div><div><strong>${p.name}</strong><small>${p.role}</small></div></div><div class="capacity-number" style="color:${loadColor(p.load)}">${p.load}%</div></div><div class="progress"><span style="width:${p.load}%;background:${loadColor(p.load)}"></span></div></div>`; }
function ticketTable(items){ return `<div class="table-toolbar"><h3>Solicitudes</h3><div class="toolbar-actions"><select class="mini-select"><option>Todos los estados</option><option>Nuevos</option><option>En gestión</option></select></div></div><div class="table-wrap"><table><thead><tr><th>Solicitud</th><th>Servicio</th><th>Estado</th><th>Prioridad</th><th>Responsable</th><th>SLA</th></tr></thead><tbody>${items.map(t=>{const s=serviceById(t.service),p=personById(t.assignee);return `<tr class="ticket-row" data-ticket="${t.id}"><td><div class="ticket-title">${safe(t.title)}</div><div class="ticket-sub">${t.id} · ${safe(t.requester)}</div></td><td>${safe(s?.title||t.service)}</td><td>${statusPill(t.status)}</td><td>${priorityPill(t.priority)}</td><td>${p?`<div class="assignee"><div class="avatar">${p.initials}</div>${p.name}</div>`:'Sin asignar'}</td><td><span class="sla-time ${String(t.sla).includes('min')?'warning':''}">${safe(t.sla)}</span></td></tr>`}).join('')}</tbody></table></div>`; }

function renderNewRequest(){ $('#view-new-request').innerHTML=`<div class="page-head"><div><span class="eyebrow">CATÁLOGO DE SERVICIOS</span><h1>¿Qué necesitas solicitar?</h1><p>Elige el servicio. El formulario cambia según la necesidad y la plataforma propondrá el responsable con mejor combinación de habilidad, carga y disponibilidad.</p></div></div><div class="service-grid">${services.map(serviceCard).join('')}</div>`; }
function renderMyTickets(){
  $('#view-my-tickets').innerHTML=`<div class="page-head"><div><span class="eyebrow">TRAZABILIDAD</span><h1>Mis solicitudes</h1><p>Consulta el estado, responsable, tiempos de servicio y conversación de cada caso.</p></div><button class="btn btn-primary" data-action="open-new-request">＋ Nueva solicitud</button></div><div class="card ticket-table-card">${ticketTable(tickets)}</div>`;
}
function renderCalendar(){
  const date = parseLocalDate(calendarState.date);
  const qualified = calendarQualifiedTeam();
  const visible = qualified.filter(p=>calendarState.team==='all' || calendarTeamGroup(p)===calendarState.team);
  const dayEvents = scheduleEvents.filter(e=>e.date===calendarState.date && visible.some(p=>p.id===e.person));
  const suggestions = findBestSlots(calendarState.date, calendarState.duration, calendarState.service, visible).slice(0,6);
  const freeHours = visible.reduce((sum,p)=>sum + freeMinutesForDay(p.id,calendarState.date)/60,0);
  const now = new Date();
  const nowMinutes = now.getHours()*60 + now.getMinutes();
  const selectedIsToday = toISO(now)===calendarState.date;
  const occupiedNow = selectedIsToday ? dayEvents.filter(e=>timeToMin(e.start)<=nowMinutes && timeToMin(e.end)>nowMinutes).length : 0;
  const todayFree = selectedIsToday ? visible.length-occupiedNow : visible.filter(p=>freeMinutesForDay(p.id,calendarState.date)>0).length;

  $('#view-calendar').innerHTML=`
    <div class="calendar-page-head">
      <div>
        <span class="eyebrow">PLANIFICADOR VISUAL DE RECURSOS</span>
        <h1>Agenda y disponibilidad</h1>
        <p>Explora la agenda como una línea de tiempo: amplía el zoom, arrastra horizontalmente para moverte, filtra por servicio y reserva directamente sobre los espacios libres.</p>
      </div>
      <div class="calendar-head-actions">
        <button class="btn btn-secondary compact" data-calendar-nav="today">Hoy</button>
        <div class="calendar-nav-group"><button class="icon-btn calendar-arrow" data-calendar-nav="prev" aria-label="Anterior">‹</button><button class="date-display" data-calendar-open-date>${formatLongDate(date)}</button><button class="icon-btn calendar-arrow" data-calendar-nav="next" aria-label="Siguiente">›</button></div>
        <input class="calendar-native-date" id="calendarNativeDate" type="date" value="${calendarState.date}" aria-label="Seleccionar fecha">
      </div>
    </div>

    <div class="calendar-kpis">
      <div class="calendar-kpi"><span class="kpi-icon available">✓</span><div><small>${selectedIsToday?'Disponibles ahora':'Con disponibilidad'}</small><strong>${Math.max(0,todayFree)} de ${visible.length}</strong><span>${selectedIsToday?`${occupiedNow} con actividad en curso`:'Según la agenda del día'}</span></div></div>
      <div class="calendar-kpi"><span class="kpi-icon hours">◷</span><div><small>Capacidad libre del día</small><strong>${freeHours.toFixed(1)} h</strong><span>Entre el equipo visible</span></div></div>
      <div class="calendar-kpi"><span class="kpi-icon next">↗</span><div><small>Próximo espacio</small><strong>${suggestions[0]?`${formatTime(suggestions[0].start)} · ${suggestions[0].person.name.split(' ')[0]}`:'Sin espacio'}</strong><span>${suggestions[0]?suggestions[0].person.role:'Prueba otra fecha'}</span></div></div>
      <div class="calendar-kpi"><span class="kpi-icon warning">!</span><div><small>Alta carga</small><strong>${visible.filter(p=>p.load>=85).length}</strong><span>Evitar sobreasignación</span></div></div>
    </div>

    <div class="scheduler-layout ${calendarState.focusMode?'focus-mode':''}">
      <aside class="card scheduler-finder">
        <div class="finder-title"><span class="finder-mark">⌕</span><div><h3>Buscar un espacio</h3><p>Filtra y encuentra la mejor combinación.</p></div></div>
        <label>¿Qué necesitas?</label>
        <select class="finder-control" id="calendarServiceFilter">
          <option value="all">Cualquier servicio</option>
          ${services.map(s=>`<option value="${s.id}" ${calendarState.service===s.id?'selected':''}>${s.title}</option>`).join('')}
        </select>
        <div class="finder-row"><div><label>Duración</label><select class="finder-control" id="calendarDuration"><option value="30" ${calendarState.duration===30?'selected':''}>30 min</option><option value="60" ${calendarState.duration===60?'selected':''}>1 hora</option><option value="90" ${calendarState.duration===90?'selected':''}>1 h 30</option><option value="120" ${calendarState.duration===120?'selected':''}>2 horas</option><option value="180" ${calendarState.duration===180?'selected':''}>3 horas</option></select></div><div><label>Equipo</label><select class="finder-control" id="calendarTeamFilter"><option value="all">Todos</option><option value="Comunicaciones" ${calendarState.team==='Comunicaciones'?'selected':''}>Comunicaciones</option><option value="TIC" ${calendarState.team==='TIC'?'selected':''}>TIC</option><option value="Datos" ${calendarState.team==='Datos'?'selected':''}>Datos / calidad</option></select></div></div>
        <label class="finder-check"><input type="checkbox" id="calendarAvailableOnly" ${calendarState.availableOnly?'checked':''}> Mostrar únicamente personas con espacio disponible</label>
        <div class="finder-divider"></div>
        <div class="finder-subhead"><div><strong>Mejores opciones</strong><span>${formatShortDate(date)}</span></div><span class="pill green">${suggestions.length} opciones</span></div>
        <div class="slot-suggestions">
          ${suggestions.length?suggestions.map((x,i)=>slotSuggestion(x,i)).join(''):`<div class="finder-empty"><span>◌</span><strong>No hay bloques con esa duración</strong><p>Prueba otra fecha, reduce la duración o amplía el equipo.</p></div>`}
        </div>
        <button class="btn btn-primary finder-create" data-action="open-new-request">＋ Crear solicitud sin reservar</button>
      </aside>

      <section class="card scheduler-main density-${calendarState.density}">
        <div class="scheduler-toolbar scheduler-toolbar-primary">
          <div class="view-segment"><button class="${calendarState.view==='day'?'active':''}" data-calendar-view="day">Día</button><button class="${calendarState.view==='week'?'active':''}" data-calendar-view="week">Semana</button></div>
          <div class="scheduler-context"><span class="status-dot-live"></span><strong>${formatLongDate(date)}</strong><span>Jornada 8:00–12:00 · 1:00–5:00</span></div>
          <button class="scheduler-tool ${calendarState.focusMode?'active':''}" data-calendar-focus title="Oculta el buscador y amplía el cronograma">${calendarState.focusMode?'⊞':'⊟'} ${calendarState.focusMode?'Mostrar buscador':'Vista amplia'}</button>
        </div>
        <div class="scheduler-commandbar">
          ${calendarState.view==='day'?`
            <div class="zoom-cluster" aria-label="Controles de zoom">
              <button class="zoom-btn" data-calendar-zoom="-15" title="Alejar">−</button>
              <div class="zoom-readout"><span>ZOOM</span><strong>${Math.round(calendarState.zoom/1.6)}%</strong></div>
              <input id="calendarZoom" class="zoom-range" type="range" min="70" max="230" step="5" value="${calendarState.zoom}" aria-label="Zoom del cronograma">
              <button class="zoom-btn" data-calendar-zoom="15" title="Acercar">＋</button>
            </div>
            <button class="scheduler-tool" data-calendar-fit title="Encajar toda la jornada">↔ Encajar día</button>
            <button class="scheduler-tool" data-calendar-now title="Centrar la hora actual">◎ Ahora</button>
            <label class="scheduler-inline-select"><span>Cuadrícula</span><select id="calendarSnap"><option value="15" ${calendarState.snap===15?'selected':''}>15 min</option><option value="30" ${calendarState.snap===30?'selected':''}>30 min</option><option value="60" ${calendarState.snap===60?'selected':''}>60 min</option></select></label>
            <label class="scheduler-inline-select"><span>Filas</span><select id="calendarDensity"><option value="spacious" ${calendarState.density==='spacious'?'selected':''}>Amplias</option><option value="compact" ${calendarState.density==='compact'?'selected':''}>Compactas</option></select></label>
            <button class="scheduler-tool ${calendarState.showFree?'active':''}" data-calendar-free-toggle>${calendarState.showFree?'✓':'○'} Espacios libres</button>
          `:''}
          <div class="calendar-legend"><span><i class="legend-swatch free"></i>Libre</span><span><i class="legend-swatch busy"></i>Soporte / trabajo</span><span><i class="legend-swatch coverage"></i>Cubrimiento</span><span><i class="legend-swatch meeting"></i>Reunión</span></div>
        </div>
        ${calendarState.view==='day'?renderDayScheduler(visible,calendarState.date):renderWeekScheduler(visible,date)}
        ${calendarState.view==='day'?`<div class="scheduler-help"><span>✋ Arrastra el fondo para moverte</span><span>⇧ + rueda: desplazamiento horizontal</span><span>Ctrl + rueda: zoom</span><span>+ / −: zoom · 0: encajar · N: ahora · F: ampliar</span><span>Haz clic en un bloque verde para reservar</span></div>`:''}
      </section>
    </div>`;
  requestAnimationFrame(restoreCalendarViewport);
}

function renderDayScheduler(people,date){
  const timelineStart=8*60, timelineEnd=17*60, totalMinutes=timelineEnd-timelineStart;
  const hourWidth=calendarState.zoom, timelineWidth=(totalMinutes/60)*hourWidth;
  const ticks=[]; for(let h=8;h<=17;h++)ticks.push(h);
  const minor=[];
  for(let m=timelineStart;m<=timelineEnd;m+=calendarState.snap){
    if(m%60!==0) minor.push(m);
  }
  const now=new Date();
  const showNow=toISO(now)===date && now.getHours()*60+now.getMinutes()>=timelineStart && now.getHours()*60+now.getMinutes()<=timelineEnd;
  const nowMinute=now.getHours()*60+now.getMinutes();
  const px = minute => ((minute-timelineStart)/60)*hourWidth;
  const visiblePeople=people.filter(p=>!calendarState.availableOnly || freeMinutesForDay(p.id,date)>=calendarState.duration);
  const rows=visiblePeople.map(p=>{
    const evs=scheduleEvents.filter(e=>e.person===p.id&&e.date===date);
    const free=getFreeWindows(p.id,date,calendarState.duration);
    return `<div class="resource-row" style="--timeline-width:${timelineWidth}px">
      <div class="resource-person sticky-resource"><div class="avatar resource-avatar">${p.initials}</div><div class="resource-copy"><strong>${p.name}</strong><span>${p.role}</span><div class="resource-meta"><span class="resource-load ${p.load>=85?'danger':p.load>=70?'warn':'ok'}">${p.load}% ocupado</span><span>${free.length?`${free.length} espacios`:'Sin espacio'}</span></div></div></div>
      <div class="resource-timeline" style="width:${timelineWidth}px">
        <div class="lunch-band" style="left:${px(12*60)}px;width:${hourWidth}px"><span>12:00–1:00 · Almuerzo</span></div>
        ${minor.map(m=>`<div class="minor-time-line" style="left:${px(m)}px"></div>`).join('')}
        ${ticks.map(h=>`<div class="hour-line" style="left:${px(h*60)}px"></div>`).join('')}
        ${showNow?`<div class="now-line" style="left:${px(nowMinute)}px"><span>Ahora</span></div>`:''}
        ${calendarState.showFree?free.map(f=>{const left=px(timeToMin(f.start)),width=((timeToMin(f.end)-timeToMin(f.start))/60)*hourWidth;return `<button class="free-window" data-quick-slot="${p.id}|${date}|${f.start}|${f.end}" style="left:${left}px;width:${width}px" title="Libre ${formatTime(f.start)} – ${formatTime(f.end)}"><strong>LIBRE</strong><span>${width>120?`${formatTime(f.start)}–${formatTime(f.end)}`:'Reservar'}</span></button>`}).join(''):''}
        ${evs.map(e=>{const left=px(timeToMin(e.start)),width=((timeToMin(e.end)-timeToMin(e.start))/60)*hourWidth;return `<button class="schedule-event ${e.type}" data-schedule-event="${e.id}" style="left:${Math.max(0,left)}px;width:${Math.max(48,width)}px" title="${safe(e.title)} · ${formatTime(e.start)}–${formatTime(e.end)}"><strong>${safe(e.title)}</strong><span>${formatTime(e.start)}–${formatTime(e.end)}</span></button>`}).join('')}
      </div>
      <div class="resource-next sticky-availability"><span>Próximo libre</span><strong>${free[0]?`${formatTime(free[0].start)}–${formatTime(free[0].end)}`:'—'}</strong><button ${free[0]?'':'disabled'} data-quick-slot="${free[0]?`${p.id}|${date}|${free[0].start}|${free[0].end}`:''}">Reservar</button></div>
    </div>`;
  }).join('');
  const ruler=`<div class="timeline-ruler" style="width:${timelineWidth}px">${minor.map(m=>`<div class="ruler-minor" style="left:${px(m)}px"></div>`).join('')}${ticks.map(h=>`<div class="ruler-hour" style="left:${px(h*60)}px"><strong>${formatTime(`${String(h).padStart(2,'0')}:00`)}</strong>${h<17?'<span>hora</span>':''}</div>`).join('')}${showNow?`<div class="ruler-now" style="left:${px(nowMinute)}px"></div>`:''}</div>`;
  return `<div class="scheduler-scroll" id="resourceScroll" data-calendar-pan>
    <div class="resource-header" style="--timeline-width:${timelineWidth}px"><div class="resource-header-person sticky-resource">Funcionario / carga</div>${ruler}<div class="resource-header-next sticky-availability">Disponibilidad</div></div>
    <div class="resource-board">${rows||'<div class="scheduler-empty">No hay funcionarios disponibles con los filtros actuales.</div>'}</div>
  </div>`;
}


function captureCalendarScroll(){ const el=$('#resourceScroll'); if(el) calendarState.scrollLeft=el.scrollLeft; }
function setCalendarZoom(value){
  const old=calendarState.zoom; captureCalendarScroll();
  calendarState.zoom=Math.max(70,Math.min(230,Number(value)));
  if(calendarState.scrollLeft!=null) calendarState.scrollLeft=calendarState.scrollLeft*(calendarState.zoom/old);
  renderCalendar();
}
function fitCalendarDay(){
  const el=$('#resourceScroll');
  const available=(el?.clientWidth||1100)-280-185-8;
  calendarState.scrollLeft=0;
  calendarState.zoom=Math.max(70,Math.min(230,Math.floor(available/9)));
  renderCalendar();
}
function centerCalendarMinute(minute){
  const el=$('#resourceScroll'); if(!el)return;
  const x=((minute-8*60)/60)*calendarState.zoom;
  const stickyLeft=280, stickyRight=185;
  const viewport=Math.max(300,el.clientWidth-stickyLeft-stickyRight);
  el.scrollTo({left:Math.max(0,x-viewport/2),behavior:'smooth'});
  calendarState.scrollLeft=Math.max(0,x-viewport/2);
}
function centerCalendarNow(){
  const now=new Date();
  const target=toISO(now)===calendarState.date ? now.getHours()*60+now.getMinutes() : 10*60;
  centerCalendarMinute(Math.max(8*60,Math.min(17*60,target)));
}
function restoreCalendarViewport(){
  const el=$('#resourceScroll'); if(!el)return;
  initCalendarPan();
  if(calendarState.scrollLeft!=null){ el.scrollLeft=calendarState.scrollLeft; return; }
  const now=new Date();
  if(toISO(now)===calendarState.date) centerCalendarNow();
}
function initCalendarPan(){
  const el=$('#resourceScroll'); if(!el||el.dataset.panReady)return; el.dataset.panReady='1';
  let dragging=false,startX=0,startScroll=0;
  el.addEventListener('pointerdown',e=>{
    if(e.button!==0 || e.target.closest('button,input,select,label')) return;
    dragging=true; startX=e.clientX; startScroll=el.scrollLeft; el.classList.add('is-panning'); el.setPointerCapture?.(e.pointerId);
  });
  el.addEventListener('pointermove',e=>{ if(!dragging)return; el.scrollLeft=startScroll-(e.clientX-startX); calendarState.scrollLeft=el.scrollLeft; });
  const end=e=>{ if(!dragging)return; dragging=false; el.classList.remove('is-panning'); el.releasePointerCapture?.(e.pointerId); };
  el.addEventListener('pointerup',end); el.addEventListener('pointercancel',end);
  el.addEventListener('scroll',()=>{calendarState.scrollLeft=el.scrollLeft},{passive:true});
  el.addEventListener('wheel',e=>{
    if(e.ctrlKey||e.metaKey){e.preventDefault(); setCalendarZoom(calendarState.zoom+(e.deltaY<0?10:-10));}
    else if(e.shiftKey){e.preventDefault(); el.scrollLeft+=e.deltaY; calendarState.scrollLeft=el.scrollLeft;}
  },{passive:false});
}

function renderWeekScheduler(people,anchor){
  const monday=startOfWeek(anchor); const days=Array.from({length:5},(_,i)=>addDays(monday,i));
  return `<div class="week-board"><div class="week-head"><div>Funcionario</div>${days.map(d=>`<button class="week-day-head ${toISO(d)===calendarState.date?'active':''}" data-calendar-date="${toISO(d)}"><span>${['LUN','MAR','MIÉ','JUE','VIE'][days.indexOf(d)]}</span><strong>${d.getDate()}</strong><small>${monthShort(d)}</small></button>`).join('')}</div>${people.map(p=>`<div class="week-row"><div class="week-person"><div class="avatar resource-avatar">${p.initials}</div><div><strong>${p.name}</strong><span>${p.role}</span></div></div>${days.map(d=>{const iso=toISO(d),free=freeMinutesForDay(p.id,iso),pct=Math.max(0,Math.round((1-free/(8*60))*100)),wins=getFreeWindows(p.id,iso,calendarState.duration);return `<button class="week-cell ${pct>=85?'heavy':pct>=65?'medium':'light'}" data-calendar-date="${iso}"><div class="week-cell-top"><strong>${pct}%</strong><span>${wins.length} espacios</span></div><div class="week-capacity"><i style="width:${pct}%"></i></div><small>${wins[0]?`Libre ${formatTime(wins[0].start)}`:'Agenda completa'}</small></button>`}).join('')}</div>`).join('')}</div>`;
}

function slotSuggestion(x,index){ return `<button class="slot-suggestion ${index===0?'best':''}" data-quick-slot="${x.person.id}|${x.date}|${x.start}|${x.end}"><div class="slot-timebox"><strong>${formatTime(x.start)}</strong><span>${minutesLabel(calendarState.duration)}</span></div><div class="slot-person"><div class="avatar">${x.person.initials}</div><div><strong>${x.person.name}</strong><span>${x.person.role} · ${x.person.load}% ocupado</span></div></div><span class="slot-arrow">›</span>${index===0?'<em>MEJOR OPCIÓN</em>':''}</button>`; }
function calendarQualifiedTeam(){ const s=serviceById(calendarState.service); if(!s)return team; const matched=team.filter(p=>serviceCompatible(p,s)); return matched.length?matched:team; }
function calendarTeamGroup(p){ if(p.role.startsWith('Comunicaciones'))return 'Comunicaciones'; if(p.role.startsWith('Datos'))return 'Datos'; return 'TIC'; }
function timeToMin(v){ const [h,m]=v.split(':').map(Number); return h*60+m; }
function minToTime(v){ const h=Math.floor(v/60),m=v%60; return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; }
function formatTime(v){ const [h,m]=v.split(':').map(Number); const ap=h>=12?'p. m.':'a. m.'; const hh=h%12||12; return `${hh}:${String(m).padStart(2,'0')} ${ap}`; }
function minutesLabel(m){ return m<60?`${m} min`:m===60?'1 h':m%60?`${Math.floor(m/60)} h ${m%60} min`:`${m/60} h`; }
function parseLocalDate(iso){ const [y,m,d]=iso.split('-').map(Number); return new Date(y,m-1,d); }
function toISO(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function addDays(d,n){ const x=new Date(d);x.setDate(x.getDate()+n);return x; }
function startOfWeek(d){ const x=new Date(d),day=x.getDay(),delta=day===0?-6:1-day;x.setDate(x.getDate()+delta);return x; }
function monthShort(d){ return ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][d.getMonth()]; }
function formatShortDate(d){ return `${d.getDate()} ${monthShort(d)} ${d.getFullYear()}`; }
function formatLongDate(d){ return `${['domingo','lunes','martes','miércoles','jueves','viernes','sábado'][d.getDay()]}, ${d.getDate()} de ${['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'][d.getMonth()]}`; }
function getFreeWindows(personId,date,minDuration=30){
  const evs=scheduleEvents.filter(e=>e.person===personId&&e.date===date).map(e=>[timeToMin(e.start),timeToMin(e.end)]).sort((a,b)=>a[0]-b[0]);
  const windows=[];
  workWindows.forEach(([ws,we])=>{ let cursor=timeToMin(ws),end=timeToMin(we); evs.forEach(([s,e])=>{ if(e<=cursor||s>=end)return; if(s>cursor&&s-cursor>=minDuration)windows.push({start:minToTime(cursor),end:minToTime(Math.min(s,end))}); cursor=Math.max(cursor,e); }); if(end-cursor>=minDuration)windows.push({start:minToTime(cursor),end:minToTime(end)}); });
  return windows;
}
function freeMinutesForDay(personId,date){ return getFreeWindows(personId,date,1).reduce((s,w)=>s+timeToMin(w.end)-timeToMin(w.start),0); }
function findBestSlots(date,duration,serviceId,people){
  const s=serviceById(serviceId); const base=(people?.length?people:team).filter(p=>!s||serviceCompatible(p,s));
  const byPerson=base.map(p=>{ const slots=[]; getFreeWindows(p.id,date,duration).forEach(w=>{ for(let cursor=timeToMin(w.start);cursor+duration<=timeToMin(w.end)&&slots.length<3;cursor+=30){ slots.push({person:p,date,start:minToTime(cursor),end:minToTime(cursor+duration),score:(s?matchCount(p,s)*35:20)+(100-p.load)*.7-(cursor-8*60)*.015}); }}); return slots.sort((a,b)=>b.score-a.score||timeToMin(a.start)-timeToMin(b.start)); });
  const first=byPerson.map(x=>x[0]).filter(Boolean).sort((a,b)=>b.score-a.score||timeToMin(a.start)-timeToMin(b.start));
  const rest=byPerson.flatMap(x=>x.slice(1)).sort((a,b)=>b.score-a.score||timeToMin(a.start)-timeToMin(b.start));
  return [...first,...rest];
}
function reserveQuickSlot(payload){
  if(!payload)return; const [personId,date,start,end]=payload.split('|'),p=personById(personId),s=serviceById(calendarState.service);
  wizard={step:s?2:1,service:s?.id||null,details:{requester:'Secretaría General',priority:'Media',scheduledDate:date,scheduledStart:start,scheduledEnd:end},assignee:personId};
  $('#requestModalBackdrop').hidden=false;document.body.style.overflow='hidden';renderWizard();showToast('Espacio seleccionado',`${p.name} · ${formatTime(start)} a ${formatTime(end)}. Completa los detalles para crear la solicitud.`);
}
function calendarNavigate(dir){ const d=parseLocalDate(calendarState.date); if(dir==='today')calendarState.date='2026-08-19'; else calendarState.date=toISO(addDays(d,dir==='prev'?(calendarState.view==='week'?-7:-1):(calendarState.view==='week'?7:1))); calendarState.scrollLeft=null; renderCalendar(); }

function renderOps(){
  const columns=[['Nuevo',['Nuevo']],['En gestión',['En gestión']],['En espera / Programado',['En espera','Programado']],['Resuelto',['Resuelto']]];
  $('#view-ops').innerHTML=`<div class="page-head"><div><span class="eyebrow">OPERACIÓN</span><h1>Centro de operaciones</h1><p>Bandeja unificada para triage, asignación, seguimiento de SLA y balanceo de carga entre TIC y Comunicaciones.</p></div><div><button class="btn btn-secondary">Filtros</button> <button class="btn btn-primary">Asignación inteligente</button></div></div><div class="ops-layout"><div class="queue-board">${columns.map(([name,statuses])=>{const list=tickets.filter(t=>statuses.includes(t.status));return `<div class="queue-col"><div class="queue-col-head"><strong>${name}</strong><span class="queue-count">${list.length}</span></div>${list.map(kanbanTicket).join('')||'<div class="empty-state"><p>Sin casos</p></div>'}</div>`}).join('')}</div><div class="card right-rail"><h3>Próximos espacios disponibles</h3>${team.slice().sort((a,b)=>a.load-b.load).slice(0,5).map(p=>`<div class="slot"><div class="capacity-person"><div class="avatar">${p.initials}</div><div><strong>${p.name}</strong><small>${p.role}</small></div></div><div style="text-align:right"><div class="slot-time">${p.slots[0].split(' ').slice(1).join(' ')}</div><small>${p.load}% ocupado</small></div></div>`).join('')}<button class="btn btn-soft" style="width:100%;margin-top:12px" data-view-link="calendar">Abrir agenda</button></div></div>`;
}
function kanbanTicket(t){ const s=serviceById(t.service),p=personById(t.assignee); return `<div class="kanban-ticket" data-ticket="${t.id}"><div class="kanban-top"><span class="kanban-code">${t.id}</span>${priorityPill(t.priority)}</div><h4>${safe(t.title)}</h4><div style="font-size:8px;color:var(--muted);margin-bottom:8px">${safe(s?.title||'Servicio')}</div><div class="kanban-foot"><div class="assignee">${p?`<div class="avatar">${p.initials}</div><span>${p.name.split(' ')[0]}</span>`:'Sin asignar'}</div><span class="sla-time ${String(t.sla).includes('min')?'danger':''}" style="font-size:8px">${safe(t.sla)}</span></div></div>`; }
function renderTeam(){
  $('#view-team').innerHTML=`<div class="page-head"><div><span class="eyebrow">CAPACIDAD Y HABILIDADES</span><h1>Equipo y disponibilidad</h1><p>La carga combina tickets activos, agenda reservada y capacidad diaria. Sirve como base para sugerir el responsable más adecuado y evitar sobreasignación.</p></div><button class="btn btn-secondary">Configurar capacidad</button></div><div class="grid grid-4" style="margin-bottom:16px"><div class="card metric-card"><div class="metric-label">Capacidad promedio</div><div class="metric-value">59%</div><div class="metric-foot">Carga consolidada del equipo</div></div><div class="card metric-card"><div class="metric-label">Disponibles ahora</div><div class="metric-value">4</div><div class="metric-foot">Con capacidad inferior al 70%</div></div><div class="card metric-card"><div class="metric-label">Alta carga</div><div class="metric-value">1</div><div class="metric-foot">Requiere redistribución</div></div><div class="card metric-card"><div class="metric-label">Habilidades cubiertas</div><div class="metric-value">17</div><div class="metric-foot">Competencias configuradas</div></div></div><div class="team-grid">${team.map(p=>`<div class="card team-card"><div class="person-head"><div class="avatar">${p.initials}</div><div><h3>${p.name}</h3><p>${p.role}</p></div><span class="pill ${p.load<70?'green':p.load<85?'amber':'red'} person-status">${p.status}</span></div><div class="skills">${p.skills.map(x=>`<span class="skill">${x}</span>`).join('')}</div><div class="capacity-bar"><div><small>Carga estimada · ${p.load}%</small><div class="progress" style="margin-top:5px"><span style="width:${p.load}%;background:${loadColor(p.load)}"></span></div></div><strong style="font-size:11px;color:${loadColor(p.load)}">${100-p.load}% libre</strong></div><div class="next-slots">${p.slots.map(s=>`<span class="next-slot">${s}</span>`).join('')}</div></div>`).join('')}</div>`;
}
function renderCatalog(category='Todos'){
  const cats=['Todos',...new Set(services.map(s=>s.category))]; const shown=category==='Todos'?services:services.filter(s=>s.category===category);
  $('#view-catalog').innerHTML=`<div class="page-head"><div><span class="eyebrow">PORTAL DE AUTOSERVICIO</span><h1>Catálogo de servicios</h1><p>Servicios estandarizados con formulario, responsable, prioridad, aprobación y nivel de servicio definidos por tipo de necesidad.</p></div></div><div class="catalog-wrap"><div class="card category-panel">${cats.map(c=>`<button class="category-item ${c===category?'active':''}" data-category="${c}">◇ ${c}</button>`).join('')}</div><div class="catalog-content"><div class="catalog-banner"><h2>${category==='Todos'?'Todos los servicios':category}</h2><p>${shown.length} servicios disponibles · formularios adaptados y trazabilidad centralizada.</p></div><div class="service-grid" style="grid-template-columns:repeat(3,1fr)">${shown.map(serviceCard).join('')}</div></div></div>`;
}
function renderReports(){
  const vals=[14,19,17,26,22,31,24];
  $('#view-reports').innerHTML=`<div class="page-head"><div><span class="eyebrow">ANALÍTICA DE SERVICIO</span><h1>Indicadores de la mesa</h1><p>Mide demanda, tiempos de respuesta, cumplimiento de SLA y distribución de la carga para tomar decisiones de capacidad.</p></div><button class="btn btn-secondary">Exportar informe</button></div><div class="grid grid-4"><div class="card metric-card"><div class="metric-label">SLA cumplido</div><div class="metric-value">94%</div><div class="metric-foot"><span class="trend-up">↑ 3%</span> mensual</div></div><div class="card metric-card"><div class="metric-label">Primera respuesta</div><div class="metric-value">18 min</div><div class="metric-foot">Promedio general</div></div><div class="card metric-card"><div class="metric-label">Resolución promedio</div><div class="metric-value">6.4 h</div><div class="metric-foot">Casos cerrados</div></div><div class="card metric-card"><div class="metric-label">Reaperturas</div><div class="metric-value">3.1%</div><div class="metric-foot">Calidad de resolución</div></div></div><div class="grid grid-2" style="margin-top:16px"><div class="card chart-card"><h3>Solicitudes recibidas</h3><p>Volumen diario de los últimos 7 días hábiles.</p><div class="bar-chart">${vals.map((v,i)=>`<div class="bar-col"><div class="bar" style="height:${v*4}px"></div><span>${['L','M','X','J','V','L','M'][i]}</span></div>`).join('')}</div></div><div class="card chart-card"><h3>Distribución por estado</h3><p>Composición actual de la cola de servicio.</p><div class="donut-wrap"><div class="donut"><div class="donut-center">${tickets.length}<br><small>casos</small></div></div><div class="legend"><div class="legend-item"><span class="legend-dot"></span><span>En gestión</span><strong>62%</strong></div><div class="legend-item"><span class="legend-dot"></span><span>Resueltos</span><strong>18%</strong></div><div class="legend-item"><span class="legend-dot"></span><span>En espera</span><strong>12%</strong></div><div class="legend-item"><span class="legend-dot"></span><span>Nuevos</span><strong>8%</strong></div></div></div></div></div><div class="card chart-card" style="margin-top:16px"><h3>Carga por funcionario</h3><p>Porcentaje estimado de ocupación operacional.</p><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px;padding-top:10px">${team.map(p=>`<div><div style="display:flex;justify-content:space-between;font-size:8px;margin-bottom:5px"><span>${p.name.split(' ')[0]}</span><strong>${p.load}%</strong></div><div class="progress" style="height:9px"><span style="width:${p.load}%;background:${loadColor(p.load)}"></span></div></div>`).join('')}</div></div>`;
}
function renderAdmin(){
  $('#view-admin').innerHTML=`<div class="page-head"><div><span class="eyebrow">ADMINISTRACIÓN</span><h1>Configuración de la mesa</h1><p>En esta primera versión los datos son locales. La estructura queda preparada para conectar autenticación, base de datos, archivos y tiempo real con Supabase más adelante.</p></div></div><div class="settings-grid">${[
    ['◇','Catálogo de servicios','Crear categorías, formularios, SLAs, aprobaciones y reglas por servicio.'],['◉','Equipo y habilidades','Definir funcionarios, roles, habilidades, capacidad diaria y horarios.'],['⌁','Reglas de enrutamiento','Asignar por servicio, habilidad, dependencia, disponibilidad y balanceo de carga.'],['▦','Calendarios y horarios','Configurar jornada laboral, festivos, bloqueos, ausencias y reservas.'],['✓','SLA y escalamiento','Tiempos de primera respuesta, resolución, alertas y escalamiento automático.'],['♢','Notificaciones','Plantillas para correo, avisos internos y recordatorios de vencimiento.'],['▥','Dependencias','Secretarías, oficinas, sedes, responsables y niveles de aprobación.'],['⚙','Integraciones futuras','Supabase, correo institucional, sitio web, almacenamiento y directorio de usuarios.']
  ].map(([i,t,d])=>`<div class="card setting-card"><div class="setting-icon">${i}</div><div><h3>${t}</h3><p>${d}</p></div><button class="btn btn-secondary compact">Configurar</button></div>`).join('')}</div>`;
}

function openRequestModal(serviceId=null){
  wizard={step:1,service:serviceId,details:{},assignee:'auto'}; if(serviceId) wizard.step=2;
  $('#requestModalBackdrop').hidden=false; document.body.style.overflow='hidden'; renderWizard();
}
function closeRequestModal(){ $('#requestModalBackdrop').hidden=true; document.body.style.overflow=''; }
function renderWizard(){
  $$('.step').forEach(s=>{const n=Number(s.dataset.step);s.classList.toggle('active',n===wizard.step);s.classList.toggle('done',n<wizard.step)});
  const body=$('#requestWizard'),foot=$('#requestWizardFooter');
  if(wizard.step===1){ body.innerHTML=`<div style="margin-bottom:12px"><h3 style="font-size:13px;margin:0 0 4px">Selecciona el servicio</h3><p style="font-size:9px;color:var(--muted);margin:0">Esto determina el formulario, el SLA y el equipo responsable.</p></div><div class="wizard-service-grid">${services.map(s=>`<button class="wizard-service ${wizard.service===s.id?'selected':''}" data-wizard-service="${s.id}">${toneIcon(s)}<h4>${s.title}</h4><p>${s.desc}</p></button>`).join('')}</div>`; foot.innerHTML=`<button class="btn btn-secondary" data-action="close-request-modal">Cancelar</button><button class="btn btn-primary" data-wizard-next ${wizard.service?'':'disabled'}>Continuar →</button>`; }
  if(wizard.step===2){ const s=serviceById(wizard.service); body.innerHTML=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">${toneIcon(s)}<div><h3 style="font-size:13px;margin:0 0 3px">${s.title}</h3><p style="font-size:9px;color:var(--muted);margin:0">Completa la información mínima para evitar devoluciones o reprocesos.</p></div></div>${wizard.details.scheduledDate?`<div class="wizard-slot-banner"><div><span>ESPACIO PRESELECCIONADO</span><strong>${personById(wizard.assignee)?.name||'Responsable'} · ${formatTime(wizard.details.scheduledStart)}–${formatTime(wizard.details.scheduledEnd)}</strong><small>${wizard.details.scheduledDate}</small></div><button type="button" data-view-link="calendar">Cambiar horario</button></div>`:''}<div class="form-grid"><div class="form-group full"><label>Asunto de la solicitud *</label><input class="form-control" name="title" value="${safe(wizard.details.title||'')}" placeholder="Describe en una frase lo que necesitas"></div><div class="form-group"><label>Dependencia solicitante *</label><select class="form-control" name="requester"><option>Secretaría General</option><option>Despacho del Alcalde</option><option>Planeación</option><option>Hacienda</option><option>Gestión del Riesgo</option><option>Control Interno</option><option>Desarrollo Social</option></select></div><div class="form-group"><label>Prioridad</label><select class="form-control" name="priority"><option>Media</option><option>Alta</option><option>Baja</option>${s.critical?'<option selected>Crítica</option>':''}</select></div>${s.fields.map(([label,type,opts],i)=>fieldHtml(label,type,opts,`f${i}`)).join('')}</div>`; foot.innerHTML=`<button class="btn btn-secondary" data-wizard-back>← Atrás</button><button class="btn btn-primary" data-wizard-next>Revisar asignación →</button>`; }
  if(wizard.step===3){ captureDetails(); const s=serviceById(wizard.service), candidates=rankCandidates(s); const recommended=candidates[0]; if(wizard.assignee==='auto') wizard.assignee=recommended?.id||''; body.innerHTML=`<div class="assignment-summary"><div class="routing-card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><div><h3>Responsable sugerido</h3><span style="font-size:8px;color:var(--muted)">Basado en habilidades + capacidad disponible.</span></div><span class="pill green">Asignación inteligente</span></div>${candidates.slice(0,4).map((p,i)=>`<label class="routing-person ${i===0?'recommended':''}"><input type="radio" name="assignee" value="${p.id}" ${wizard.assignee===p.id?'checked':''}><div class="avatar">${p.initials}</div><div class="routing-copy"><strong>${p.name} ${i===0?'<span class="pill blue" style="margin-left:4px">Recomendado</span>':''}</strong><small>${p.role} · coincide en ${matchCount(p,s)} competencias · próximo: ${p.slots[0]}</small></div><div class="routing-load"><small>${p.load}% ocupado</small><div class="progress"><span style="width:${p.load}%;background:${loadColor(p.load)}"></span></div></div></label>`).join('')}</div><div class="summary-box"><span class="eyebrow">RESUMEN</span><div class="summary-row"><span>Servicio</span><strong>${s.title}</strong></div><div class="summary-row"><span>Asunto</span><strong>${safe(wizard.details.title||'Sin asunto')}</strong></div><div class="summary-row"><span>Prioridad</span><strong>${safe(wizard.details.priority||'Media')}</strong></div><div class="summary-row"><span>SLA objetivo</span><strong>${s.sla}</strong></div><div class="summary-row"><span>Aprobación</span><strong>${s.approval?'Requerida según regla':'No requerida'}</strong></div><div class="summary-row"><span>Responsable</span><strong id="summaryAssignee">${personById(wizard.assignee)?.name||'Por definir'}</strong></div>${wizard.details.scheduledDate?`<div class="summary-row scheduled-summary"><span>Espacio reservado</span><strong>${wizard.details.scheduledDate} · ${formatTime(wizard.details.scheduledStart)}–${formatTime(wizard.details.scheduledEnd)}</strong></div>`:''}</div></div>`; foot.innerHTML=`<button class="btn btn-secondary" data-wizard-back>← Editar detalles</button><button class="btn btn-primary" data-wizard-submit>✓ Crear solicitud</button>`; }
}
function fieldHtml(label,type,opts,name){ const required=label.includes('Descripción')||label.includes('Problema')?'*':''; if(type==='textarea')return `<div class="form-group full"><label>${label} ${required}</label><textarea class="form-control" name="${name}" placeholder="Escribe la información necesaria"></textarea></div>`; if(type==='select')return `<div class="form-group"><label>${label}</label><select class="form-control" name="${name}">${opts.map(o=>`<option>${o}</option>`).join('')}</select></div>`; return `<div class="form-group"><label>${label}</label><input class="form-control" type="${type}" name="${name}"></div>`; }
function captureDetails(){ $$('#requestWizard .form-control').forEach(el=>wizard.details[el.name]=el.value); }
const serviceTeamRules={
  publicaciones:['Comunicaciones'],cubrimientos:['Comunicaciones'],
  desarrollo:['TIC','Datos'],revision:['Comunicaciones','TIC','Datos'],
  correo:['TIC'],equipos:['TIC'],internet:['TIC'],accesos:['TIC'],
  web:['Comunicaciones','TIC'],datos:['Datos','TIC'],seguridad:['TIC'],capacitacion:['TIC']
};
function matchCount(p,s){ return s.skills.filter(k=>p.skills.includes(k)).length; }
function serviceCompatible(p,s){ if(!s)return true; const groups=serviceTeamRules[s.id]||[]; return (!groups.length||groups.includes(calendarTeamGroup(p))) && matchCount(p,s)>0; }
function rankCandidates(s){ const valid=team.filter(p=>serviceCompatible(p,s)); const pool=valid.length?valid:team; return pool.map(p=>({...p,score:matchCount(p,s)*30+(100-p.load)*.7})).sort((a,b)=>b.score-a.score); }
function submitRequest(){ const s=serviceById(wizard.service), p=personById(wizard.assignee); const nextNum = Math.max(148, ...tickets.map(t => Number(String(t.id).match(/(\d+)$/)?.[1] || 0))) + 1; const id=`MA-2026-${String(nextNum).padStart(4,'0')}`; const newT={id,service:s.id,title:wizard.details.title||s.title,requester:wizard.details.requester||'Secretaría General',assignee:p?.id||'',priority:wizard.details.priority||'Media',status:s.id==='cubrimientos'?'Programado':'Nuevo',created:'19 Ago · ahora',due:s.sla==='Inmediato'?'Inmediato':s.sla==='Agenda'?'Según agenda':'Según SLA',sla:s.sla,description:wizard.details.f2||wizard.details.f1||wizard.details.f0||'Solicitud registrada desde el portal.',timeline:[['Solicitud creada','19 Ago · ahora'],[p?`Asignada a ${p.name}`:'Pendiente de asignación','19 Ago · ahora']]}; tickets.unshift(newT);saveTickets();closeRequestModal();showToast('Solicitud creada',`${id} fue registrada y asignada a ${p?.name||'la cola correspondiente'}.`);setView('my-tickets'); }

function openTicket(id){ const t=tickets.find(x=>x.id===id); if(!t)return; const s=serviceById(t.service),p=personById(t.assignee); $('#ticketDrawer').innerHTML=`<div class="drawer-head"><div class="drawer-head-top"><div><span class="eyebrow">${t.id}</span><h2>${safe(t.title)}</h2><p>${safe(s?.title||'Servicio')} · Solicitado por ${safe(t.requester)}</p></div><button class="close-btn" data-action="close-ticket-drawer">×</button></div><div style="display:flex;gap:7px;margin-top:12px">${statusPill(t.status)}${priorityPill(t.priority)}<span class="pill gray">SLA: ${safe(t.sla)}</span></div></div><div class="drawer-body"><div class="detail-grid"><div class="detail-box"><span>Responsable</span><strong>${p?.name||'Sin asignar'}</strong></div><div class="detail-box"><span>Vencimiento</span><strong>${safe(t.due)}</strong></div><div class="detail-box"><span>Creada</span><strong>${safe(t.created)}</strong></div><div class="detail-box"><span>Dependencia</span><strong>${safe(t.requester)}</strong></div></div><h3 style="font-size:11px">Descripción</h3><p style="font-size:9px;line-height:1.6;color:#617085">${safe(t.description)}</p><h3 style="font-size:11px;margin-top:20px">Actividad</h3><div class="timeline">${(t.timeline||[]).map(([a,d])=>`<div class="timeline-item"><strong>${safe(a)}</strong><p>${safe(d)}</p></div>`).join('')}</div><div class="comment-box"><textarea placeholder="Escribe un comentario o actualización..."></textarea><div class="comment-actions"><button class="btn btn-secondary compact">Adjuntar</button><button class="btn btn-primary compact">Comentar</button></div></div>${currentRole!=='requester'?`<div style="display:flex;gap:8px;margin-top:14px"><button class="btn btn-soft" data-ticket-status="En gestión" data-ticket-id="${t.id}">Tomar caso</button><button class="btn btn-secondary" data-ticket-status="En espera" data-ticket-id="${t.id}">Poner en espera</button><button class="btn btn-primary" data-ticket-status="Resuelto" data-ticket-id="${t.id}">Resolver</button></div>`:''}</div>`; $('#ticketDrawerBackdrop').hidden=false; document.body.style.overflow='hidden'; }
function closeTicketDrawer(){ $('#ticketDrawerBackdrop').hidden=true;document.body.style.overflow=''; }
function changeTicketStatus(id,status){ const t=tickets.find(x=>x.id===id); if(!t)return; t.status=status; t.timeline=t.timeline||[]; t.timeline.push([`Estado cambiado a ${status}`,'19 Ago · ahora']);saveTickets();showToast('Estado actualizado',`${id} ahora está ${status.toLowerCase()}.`);closeTicketDrawer();renderView($('.view.active').id.replace('view-','')); }
function showToast(title,msg){ const el=document.createElement('div');el.className='toast success';el.innerHTML=`<div><strong>${title}</strong><span>${msg}</span></div>`;$('#toastStack').appendChild(el);setTimeout(()=>el.remove(),3600); }
function setRole(role){ currentRole=role; $('#profileRole').textContent={requester:'Funcionario',agent:'Gestor de servicio',admin:'Administrador'}[role]; $$('.admin-nav').forEach(x=>x.style.display=role==='requester'?'none':''); $$('.admin-only').forEach(x=>x.style.display=role==='admin'?'':'none'); if(role==='requester' && ['ops','team','reports','admin'].includes($('.view.active')?.id.replace('view-',''))) setView('home'); showToast('Vista actualizada',`Ahora estás viendo la experiencia de ${$('#profileRole').textContent.toLowerCase()}.`); }

function globalSearch(q){ q=q.trim().toLowerCase(); if(!q)return; const ticket=tickets.find(t=>[t.id,t.title,t.requester,serviceById(t.service)?.title].some(v=>String(v).toLowerCase().includes(q))); if(ticket){openTicket(ticket.id);return;} const service=services.find(s=>[s.title,s.desc,s.category].some(v=>v.toLowerCase().includes(q))); if(service){openRequestModal(service.id);return;} showToast('Sin coincidencias','No encontramos una solicitud o servicio con ese criterio.'); }

document.addEventListener('click',e=>{
  const nav=e.target.closest('[data-view]'); if(nav) setView(nav.dataset.view);
  const viewLink=e.target.closest('[data-view-link]'); if(viewLink) setView(viewLink.dataset.viewLink);
  const action=e.target.closest('[data-action]')?.dataset.action;
  if(action==='open-new-request') openRequestModal(); if(action==='close-request-modal') closeRequestModal(); if(action==='close-ticket-drawer') closeTicketDrawer();
  const service=e.target.closest('[data-service]'); if(service) openRequestModal(service.dataset.service);
  const wservice=e.target.closest('[data-wizard-service]'); if(wservice){wizard.service=wservice.dataset.wizardService;renderWizard();}
  if(e.target.closest('[data-wizard-next]')){ if(wizard.step===1&&!wizard.service)return; if(wizard.step===2)captureDetails(); wizard.step=Math.min(3,wizard.step+1);renderWizard(); }
  if(e.target.closest('[data-wizard-back]')){wizard.step=Math.max(1,wizard.step-1);renderWizard();}
  if(e.target.closest('[data-wizard-submit]')) submitRequest();
  const ticket=e.target.closest('[data-ticket]'); if(ticket) openTicket(ticket.dataset.ticket);
  const status=e.target.closest('[data-ticket-status]'); if(status) changeTicketStatus(status.dataset.ticketId,status.dataset.ticketStatus);
  const cat=e.target.closest('[data-category]'); if(cat) renderCatalog(cat.dataset.category);
  const calNav=e.target.closest('[data-calendar-nav]'); if(calNav) calendarNavigate(calNav.dataset.calendarNav);
  const calView=e.target.closest('[data-calendar-view]'); if(calView){calendarState.view=calView.dataset.calendarView;calendarState.scrollLeft=null;renderCalendar();}
  const calDate=e.target.closest('[data-calendar-date]'); if(calDate){calendarState.date=calDate.dataset.calendarDate;calendarState.view='day';calendarState.scrollLeft=null;renderCalendar();}
  const openDate=e.target.closest('[data-calendar-open-date]'); if(openDate){const input=$('#calendarNativeDate'); if(input?.showPicker)input.showPicker(); else input?.click();}
  const quickSlot=e.target.closest('[data-quick-slot]'); if(quickSlot) reserveQuickSlot(quickSlot.dataset.quickSlot);
  const scheduleEvent=e.target.closest('[data-schedule-event]'); if(scheduleEvent){const ev=scheduleEvents.find(x=>x.id===scheduleEvent.dataset.scheduleEvent);if(ev?.ticket)openTicket(ev.ticket);else if(ev)showToast(ev.title,`${personById(ev.person)?.name||''} · ${formatTime(ev.start)} a ${formatTime(ev.end)}.`);}
  const zoom=e.target.closest('[data-calendar-zoom]'); if(zoom) setCalendarZoom(calendarState.zoom+Number(zoom.dataset.calendarZoom));
  if(e.target.closest('[data-calendar-fit]')) fitCalendarDay();
  if(e.target.closest('[data-calendar-now]')) centerCalendarNow();
  if(e.target.closest('[data-calendar-focus]')){captureCalendarScroll();calendarState.focusMode=!calendarState.focusMode;renderCalendar();}
  if(e.target.closest('[data-calendar-free-toggle]')){captureCalendarScroll();calendarState.showFree=!calendarState.showFree;renderCalendar();}
});
document.addEventListener('change',e=>{
  if(e.target.name==='assignee'){wizard.assignee=e.target.value;$('#summaryAssignee').textContent=personById(wizard.assignee)?.name||'Por definir';}
  if(e.target.id==='roleSelect')setRole(e.target.value);
  if(e.target.id==='calendarServiceFilter'){calendarState.service=e.target.value;renderCalendar();}
  if(e.target.id==='calendarDuration'){calendarState.duration=Number(e.target.value);renderCalendar();}
  if(e.target.id==='calendarTeamFilter'){calendarState.team=e.target.value;renderCalendar();}
  if(e.target.id==='calendarAvailableOnly'){calendarState.availableOnly=e.target.checked;renderCalendar();}
  if(e.target.id==='calendarNativeDate'){calendarState.date=e.target.value;calendarState.scrollLeft=null;renderCalendar();}
  if(e.target.id==='calendarZoom')setCalendarZoom(e.target.value);
  if(e.target.id==='calendarSnap'){captureCalendarScroll();calendarState.snap=Number(e.target.value);renderCalendar();}
  if(e.target.id==='calendarDensity'){captureCalendarScroll();calendarState.density=e.target.value;renderCalendar();}
});
$('#menuToggle').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
$('#requestModalBackdrop').addEventListener('click',e=>{if(e.target.id==='requestModalBackdrop')closeRequestModal()});
$('#ticketDrawerBackdrop').addEventListener('click',e=>{if(e.target.id==='ticketDrawerBackdrop')closeTicketDrawer()});
$('#globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter')globalSearch(e.target.value)});
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#globalSearch').focus();return;}
  if(e.key==='Escape'){closeRequestModal();closeTicketDrawer();}
  const field=e.target?.matches?.('input,textarea,select,[contenteditable=\"true\"]');
  const calendarActive=$('#view-calendar')?.classList.contains('active');
  if(field||!calendarActive||calendarState.view!=='day')return;
  if(e.key==='+'||e.key==='='){e.preventDefault();setCalendarZoom(calendarState.zoom+15);}
  if(e.key==='-'){e.preventDefault();setCalendarZoom(calendarState.zoom-15);}
  if(e.key==='0'){e.preventDefault();fitCalendarDay();}
  if(e.key.toLowerCase()==='n'){e.preventDefault();centerCalendarNow();}
  if(e.key.toLowerCase()==='f'){e.preventDefault();captureCalendarScroll();calendarState.focusMode=!calendarState.focusMode;renderCalendar();}
});

/* =========================================================
   Mesa de Ayuda TIC v0.4 · SERVICE DESK INSTITUCIONAL
   Radicación guiada, Command Center, SLA, Operación PRO y ficha 360
   ========================================================= */

const guidedFamilies = [
  {id:'comunicaciones',icon:'✦',title:'Comunicación institucional',desc:'Publicaciones, cubrimientos, sitio web y validaciones.',services:['publicaciones','cubrimientos','web','revision']},
  {id:'soporte',icon:'⌁',title:'Soporte tecnológico',desc:'Correo, equipos, conectividad, accesos y seguridad.',services:['correo','equipos','internet','accesos','seguridad']},
  {id:'soluciones',icon:'⌘',title:'Soluciones y automatización',desc:'Aplicaciones, automatizaciones, formularios, datos y tableros.',services:['desarrollo','datos']},
  {id:'acompanamiento',icon:'◎',title:'Acompañamiento',desc:'Capacitaciones y asistencia para herramientas o procesos.',services:['capacitacion']}
];
const dependencyOptions = ['Secretaría General','Despacho del Alcalde','Planeación','Hacienda','Gobierno','Gestión del Riesgo','Control Interno','Desarrollo Social','Infraestructura','UMATA','Comisaría de Familia','Otra dependencia'];
const selfHelpGuides = {
  correo:[
    ['Verifica tu conexión','Confirma que otras páginas o aplicaciones tengan acceso a internet.'],
    ['Prueba en el navegador','Ingresa desde la versión web del correo para descartar un problema del dispositivo.'],
    ['No compartas tu contraseña','La Mesa de Ayuda TIC nunca te pedirá escribir la contraseña dentro de la solicitud.']
  ],
  internet:[
    ['Identifica el alcance','Confirma si falla solo tu equipo o también otros funcionarios de la misma zona.'],
    ['Revisa la conexión física','Si usas cable de red, verifica que esté conectado. No desconectes equipos de red institucionales.'],
    ['Registra la ubicación','Indicar piso, oficina o dependencia acelera el diagnóstico.']
  ],
  equipos:[
    ['Reinicio seguro','Si es posible, guarda tu trabajo y reinicia el equipo una sola vez.'],
    ['Anota el mensaje','Si aparece un error, copia el texto o toma una captura para adjuntarla después.'],
    ['No desarmes el equipo','Evita manipular componentes o conexiones internas.']
  ],
  accesos:[
    ['Confirma el usuario','Verifica que estés usando la cuenta institucional correcta.'],
    ['Diferencia acceso y contraseña','Si puedes entrar al sistema pero no a una opción específica, probablemente sea un permiso.'],
    ['Justificación mínima','Los permisos nuevos requieren indicar para qué función institucional se necesitan.']
  ]
};
const approvalOwnerByService = {
  publicaciones:'Coordinación de Comunicaciones',
  desarrollo:'Líder TIC / Secretaría General',
  accesos:'Líder TIC y responsable del recurso'
};
const scheduleServiceIds = new Set(['cubrimientos','capacitacion','publicaciones','revision']);
const selectableAssigneeIds = new Set(['publicaciones','cubrimientos','revision','desarrollo','datos','capacitacion','web']);
let opsState = {filter:'now'};
let ticketDrawerState = {id:null,tab:'overview'};
let draggedScheduleId = null;

function freshWizard(serviceId=null,prefill={}){
  const family=serviceId ? guidedFamilies.find(f=>f.services.includes(serviceId))?.id||null : null;
  const {assignee='auto',...details}=prefill;
  return {
    stage: serviceId ? (selfHelpGuides[serviceId]?'selfhelp':'questions') : 'family',
    family,
    service:serviceId,
    questionIndex:0,
    details,
    assignee,
    error:'',
    selfHelpDone:false
  };
}

function statusPill(status){
  const map={'Nuevo':'blue','En gestión':'blue','En espera':'amber','Programado':'purple','En aprobación':'amber','Bloqueado':'red','Resuelto':'green','Cerrado':'gray','Cancelado':'red'};
  return `<span class="pill ${map[status]||'gray'}"><span class="dot"></span>${safe(status)}</span>`;
}

function familyForService(serviceId){ return guidedFamilies.find(f=>f.services.includes(serviceId)); }
function canScheduleService(s){ return !!s && (s.sla==='Agenda'||scheduleServiceIds.has(s.id)); }
function canChooseAssignee(s){ return !!s && selectableAssigneeIds.has(s.id); }
function wizardMacroStep(){
  if(['family','service'].includes(wizard.stage))return 1;
  if(['selfhelp','questions'].includes(wizard.stage))return 2;
  if(['schedule','assignment'].includes(wizard.stage))return 3;
  return 4;
}
function updateWizardChrome(){
  const macro=wizardMacroStep();
  $$('.step').forEach(s=>{const n=Number(s.dataset.step);s.classList.toggle('active',n===macro);s.classList.toggle('done',n<macro)});
  const service=serviceById(wizard.service);
  $('#requestModalTitle').textContent=service?.title || (wizard.family?guidedFamilies.find(f=>f.id===wizard.family)?.title:'Radicar una solicitud');
}
function openRequestModal(serviceId=null){
  wizard=freshWizard(serviceId);
  $('#requestModalBackdrop').hidden=false;
  document.body.style.overflow='hidden';
  renderWizard();
}
function closeRequestModal(){ $('#requestModalBackdrop').hidden=true; document.body.style.overflow=''; }
function setWizardStage(stage){ wizard.stage=stage; wizard.error=''; renderWizard(); }

function questionHelper(label,service){
  const l=label.toLowerCase();
  if(l.includes('dependencia'))return 'Esto permite entregar trazabilidad por área y dirigir aprobaciones cuando correspondan.';
  if(l.includes('asunto'))return 'Usa una frase corta y concreta; será el título visible de la solicitud.';
  if(l.includes('prioridad'))return 'La prioridad debe representar impacto operativo, no preferencia personal.';
  if(l.includes('fecha'))return 'La agenda utilizará esta fecha para sugerir espacios compatibles.';
  if(l.includes('lugar')||l.includes('ubicación'))return 'Entre más precisa sea la ubicación, menos reprocesos tendrá el equipo.';
  if(l.includes('descripción')||l.includes('problema')||l.includes('qué ocurrió'))return 'Cuéntanos qué necesitas, qué esperabas que ocurriera y qué sucede actualmente.';
  if(service?.id==='seguridad')return 'No incluyas contraseñas, códigos de verificación ni información sensible innecesaria.';
  return 'Esta información ayuda a asignar correctamente el caso desde el primer momento.';
}
function isQuestionRequired(q){
  if(['requester','title','priority'].includes(q.key))return true;
  return !/(Enlace|Activo|placa|Hora aproximada|si aplica)/i.test(q.label);
}
function buildWizardQuestions(s){
  const priorityOptions=s.critical?['Crítica']:['Baja','Media','Alta','Crítica'];
  const base=[
    {key:'requester',label:'¿Desde qué dependencia estás radicando?',type:'select',options:dependencyOptions},
    {key:'title',label:'Resume en una frase lo que necesitas',type:'text',placeholder:'Ej. Cubrimiento fotográfico para jornada institucional'},
    {key:'priority',label:'¿Qué nivel de impacto tiene esta solicitud?',type:'select',options:priorityOptions}
  ];
  const custom=s.fields.map(([label,type,opts],i)=>({key:`f${i}`,label,type,options:opts||[],placeholder:type==='textarea'?'Describe la necesidad con el contexto suficiente':''}));
  return [...base,...custom];
}
function priorityDescription(value){
  return {Baja:'Puede programarse sin afectar la operación.',Media:'Necesidad normal dentro del servicio.',Alta:'Afecta una actividad importante o tiene fecha próxima.',Crítica:'Detiene operación, afecta seguridad o requiere atención inmediata.'}[value]||'';
}
function questionControl(q,s){
  const value=wizard.details[q.key]??(q.key==='requester'?'Secretaría General':q.key==='priority'?(s.critical?'Crítica':'Media'):'');
  if(wizard.details[q.key]==null && value!=='') wizard.details[q.key]=value;
  if(q.type==='select'){
    return `<div class="guided-choice-grid ${q.key==='priority'?'priority-choices':''}">${q.options.map(o=>`<button type="button" class="guided-choice ${String(value)===String(o)?'selected':''}" data-guide-answer="${safe(o)}" data-guide-key="${q.key}"><span class="choice-radio"></span><div><strong>${safe(o)}</strong>${q.key==='priority'?`<small>${priorityDescription(o)}</small>`:''}</div></button>`).join('')}</div>`;
  }
  if(q.type==='textarea')return `<textarea class="guided-control guided-textarea" data-guide-field="${q.key}" placeholder="${safe(q.placeholder||'Escribe aquí...')}">${safe(value)}</textarea>`;
  return `<input class="guided-control" data-guide-field="${q.key}" type="${q.type}" value="${safe(value)}" placeholder="${safe(q.placeholder||'')}">`;
}
function renderWizardFamily(body,foot){
  body.innerHTML=`<div class="guided-intro"><span class="guided-kicker">RADICACIÓN ASISTIDA</span><h3>¿Qué necesitas gestionar?</h3><p>No necesitas conocer el nombre técnico del servicio. Elige la opción que más se parezca a tu necesidad y Mesa de Ayuda TIC te llevará por el camino correcto.</p></div><div class="guided-family-grid">${guidedFamilies.map(f=>`<button type="button" class="guided-family-card" data-guide-family="${f.id}"><span class="guided-family-icon">${f.icon}</span><div><h4>${f.title}</h4><p>${f.desc}</p><small>${f.services.length} servicios disponibles</small></div><span class="guided-arrow">›</span></button>`).join('')}</div><div class="guided-help-strip"><span>?</span><div><strong>¿No sabes cuál elegir?</strong><small>Usa el buscador superior o selecciona la categoría más cercana. Podrás volver atrás sin perder información.</small></div></div>`;
  foot.innerHTML=`<button class="btn btn-secondary" data-action="close-request-modal">Cancelar</button><span class="guided-footer-note">La radicación aún no se ha creado</span>`;
}
function renderWizardService(body,foot){
  const family=guidedFamilies.find(f=>f.id===wizard.family);
  const list=family.services.map(serviceById).filter(Boolean);
  body.innerHTML=`<div class="guided-intro compact"><button class="guided-back-link" type="button" data-guide-back>← Cambiar categoría</button><span class="guided-kicker">${family.icon} ${family.title.toUpperCase()}</span><h3>¿Cuál de estas opciones describe mejor tu necesidad?</h3><p>Al elegirla, las siguientes preguntas se adaptarán automáticamente al servicio.</p></div><div class="guided-service-list">${list.map(s=>`<button type="button" class="guided-service-row" data-guide-service="${s.id}">${toneIcon(s)}<div><h4>${s.title}</h4><p>${s.desc}</p><span>${s.sla==='Agenda'?'Se programa en agenda':`SLA ${s.sla}`}${s.approval?' · requiere aprobación':''}</span></div><b>›</b></button>`).join('')}</div>`;
  foot.innerHTML=`<button class="btn btn-secondary" data-guide-back>← Atrás</button><span class="guided-footer-note">Selecciona un servicio para continuar</span>`;
}
function renderWizardSelfHelp(body,foot,s){
  const guide=selfHelpGuides[s.id]||[];
  body.innerHTML=`<div class="guided-intro"><span class="guided-kicker">COMPROBACIÓN RÁPIDA</span><h3>Antes de radicar, revisa estas ${guide.length} cosas</h3><p>Puede resolver casos sencillos inmediatamente y, si el problema continúa, conservarás el camino de radicación.</p></div><div class="selfhelp-list">${guide.map(([t,d],i)=>`<div class="selfhelp-item"><span>${i+1}</span><div><strong>${t}</strong><p>${d}</p></div></div>`).join('')}</div><div class="selfhelp-security">✓ Nunca escribas contraseñas, códigos MFA o información confidencial en la descripción.</div>`;
  foot.innerHTML=`<button class="btn btn-secondary" data-guide-back>← Cambiar servicio</button><div class="footer-actions"><button class="btn btn-soft" data-guide-solved>Se solucionó</button><button class="btn btn-primary" data-guide-selfhelp-continue>Sigue fallando · Radicar →</button></div>`;
}
function renderWizardQuestion(body,foot,s){
  const questions=buildWizardQuestions(s); wizard.questionIndex=Math.max(0,Math.min(wizard.questionIndex,questions.length-1));
  const q=questions[wizard.questionIndex]; const pct=Math.round(((wizard.questionIndex+1)/questions.length)*100);
  body.innerHTML=`<div class="question-shell"><div class="question-progress"><div><span>PREGUNTA ${wizard.questionIndex+1} DE ${questions.length}</span><strong>${pct}%</strong></div><div class="question-progress-track"><i style="width:${pct}%"></i></div></div><div class="guided-question"><span class="guided-kicker">${s.category.toUpperCase()}</span><h3>${safe(q.label)} ${isQuestionRequired(q)?'<em>*</em>':''}</h3><p>${questionHelper(q.label,s)}</p>${questionControl(q,s)}${wizard.error?`<div class="guided-error">${safe(wizard.error)}</div>`:''}</div></div>`;
  foot.innerHTML=`<button class="btn btn-secondary" data-guide-back>← Atrás</button><div class="footer-actions"><span class="guided-footer-note">${wizard.questionIndex+1}/${questions.length}</span><button class="btn btn-primary" data-guide-question-next>${wizard.questionIndex===questions.length-1?'Continuar a programación →':'Continuar →'}</button></div>`;
  requestAnimationFrame(()=>$('#requestWizard [data-guide-field]')?.focus());
}
function preferredDateForService(s){
  const idx=s.fields.findIndex(([label,type])=>type==='date'||label.toLowerCase().includes('fecha'));
  const value=idx>=0?wizard.details[`f${idx}`]:'';
  return /^\d{4}-\d{2}-\d{2}$/.test(value||'')?value:calendarState.date;
}
function guidedDurationForService(s){
  if(s.id==='cubrimientos'){
    const start=wizard.details.f2,end=wizard.details.f3;
    if(/^\d\d:\d\d$/.test(start||'')&&/^\d\d:\d\d$/.test(end||'')){
      const d=timeToMin(end)-timeToMin(start); if(d>0&&d<=8*60)return d;
    }
  }
  return s.id==='capacitacion'?90:s.id==='publicaciones'?60:60;
}
function renderWizardSchedule(body,foot,s){
  const date=preferredDateForService(s),duration=guidedDurationForService(s);
  const qualified=rankCandidates(s);
  const suggestions=findBestSlots(date,duration,s.id,qualified).slice(0,6);
  const selected=wizard.details.scheduledDate;
  body.innerHTML=`<div class="guided-intro compact"><span class="guided-kicker">PROGRAMACIÓN INTELIGENTE</span><h3>${selected?'Espacio seleccionado':'Escoge un espacio disponible'}</h3><p>Mesa de Ayuda TIC cruza la competencia requerida con agenda y carga. ${s.id==='cubrimientos'?'Para cubrimientos, la fecha del evento tiene prioridad.':'Puedes reservar ahora o dejar que el equipo gestione el horario según el SLA.'}</p></div>${selected?`<div class="selected-slot-hero"><div class="avatar">${personById(wizard.assignee)?.initials||'✓'}</div><div><span>ESPACIO RESERVADO</span><strong>${personById(wizard.assignee)?.name||'Responsable'} · ${formatTime(wizard.details.scheduledStart)}–${formatTime(wizard.details.scheduledEnd)}</strong><small>${wizard.details.scheduledDate} · ${minutesLabel(timeToMin(wizard.details.scheduledEnd)-timeToMin(wizard.details.scheduledStart))}</small></div><button data-guide-clear-slot type="button">Cambiar</button></div>`:''}<div class="guided-slot-grid">${suggestions.map((x,i)=>`<button type="button" class="guided-slot-card ${i===0?'recommended':''}" data-guide-slot="${x.person.id}|${x.date}|${x.start}|${x.end}">${i===0?'<em>MEJOR OPCIÓN</em>':''}<div class="guided-slot-time"><strong>${formatTime(x.start)}</strong><span>${formatTime(x.end)}</span></div><div class="guided-slot-person"><div class="avatar">${x.person.initials}</div><div><strong>${x.person.name}</strong><small>${x.person.role} · ${x.person.load}% ocupado</small></div></div></button>`).join('')||'<div class="guided-no-slots">No encontramos un bloque continuo con esa duración en la fecha indicada. Puedes continuar sin reservar y el equipo propondrá un horario.</div>'}</div>`;
  foot.innerHTML=`<button class="btn btn-secondary" data-guide-back>← Editar información</button><div class="footer-actions"><button class="btn btn-soft" data-guide-skip-schedule>Gestionar horario después</button>${selected?'<button class="btn btn-primary" data-guide-to-assignment>Continuar →</button>':''}</div>`;
}
function routingReason(p,s,index){
  const skill=matchCount(p,s); const capacity=100-p.load;
  if(index===0)return `Mejor equilibrio: ${skill} competencias coincidentes y ${capacity}% de capacidad libre.`;
  return `${skill} competencias coincidentes · ${capacity}% de capacidad libre · próximo espacio ${p.slots[0]}.`;
}
function renderWizardAssignment(body,foot,s){
  const candidates=rankCandidates(s).slice(0,4),recommended=candidates[0];
  if(!wizard.assignee||wizard.assignee==='auto')wizard.assignee=recommended?.id||'';
  const choose=canChooseAssignee(s);
  body.innerHTML=`<div class="guided-intro compact"><span class="guided-kicker">ENRUTAMIENTO POR COMPETENCIA + CAPACIDAD</span><h3>${choose?'Responsable recomendado':'Mesa de Ayuda TIC asignará el responsable'}</h3><p>${choose?'Puedes conservar la recomendación o escoger otro funcionario compatible.':'Por seguridad y consistencia operativa, este servicio se enruta automáticamente al perfil competente.'}</p></div><div class="routing-explain"><span>AI</span><div><strong>¿Por qué esta recomendación?</strong><p>Se ponderan competencias del servicio, carga estimada y disponibilidad próxima. En la versión con Supabase se agregarán turnos, ausencias y reglas de escalamiento.</p></div></div><div class="guided-routing-list">${candidates.map((p,i)=>`<button type="button" class="guided-routing-card ${wizard.assignee===p.id?'selected':''} ${i===0?'recommended':''}" ${choose?`data-guide-assignee="${p.id}"`:i===0?'data-guide-assignee-auto="1"':'disabled'}><div class="avatar">${p.initials}</div><div class="guided-routing-main"><div><strong>${p.name}</strong>${i===0?'<em>RECOMENDADO</em>':''}</div><span>${p.role}</span><small>${routingReason(p,s,i)}</small></div><div class="guided-routing-cap"><b>${p.load}%</b><span>ocupado</span><i><u style="width:${p.load}%;background:${loadColor(p.load)}"></u></i></div></button>`).join('')}</div>`;
  foot.innerHTML=`<button class="btn btn-secondary" data-guide-back>← Atrás</button><button class="btn btn-primary" data-guide-review>Revisar solicitud →</button>`;
}
function detailLabel(s,key){
  if(key==='requester')return 'Dependencia'; if(key==='title')return 'Asunto'; if(key==='priority')return 'Prioridad';
  const m=String(key).match(/^f(\d+)$/); return m?s.fields[Number(m[1])]?.[0]||key:key;
}
function renderWizardReview(body,foot,s){
  const p=personById(wizard.assignee); const approval=s.approval?approvalOwnerByService[s.id]||'Responsable aprobador configurado':'No requiere aprobación';
  const detailEntries=Object.entries(wizard.details).filter(([k,v])=>v!==''&&v!=null&&!['scheduledDate','scheduledStart','scheduledEnd'].includes(k));
  body.innerHTML=`<div class="review-hero"><div class="review-check">✓</div><div><span>LISTA PARA RADICAR</span><h3>Revisa que todo esté correcto</h3><p>Después de crearla podrás consultar la trazabilidad completa desde “Mis solicitudes”.</p></div></div><div class="review-grid"><div class="review-panel"><h4>Información de la solicitud</h4>${detailEntries.map(([k,v])=>`<div class="review-line"><span>${safe(detailLabel(s,k))}</span><strong>${safe(v)}</strong></div>`).join('')}</div><div class="review-panel accent"><h4>Ruta de atención</h4><div class="review-route"><span>${toneIcon(s)}</span><div><small>SERVICIO</small><strong>${s.title}</strong></div></div><div class="review-route"><div class="avatar">${p?.initials||'—'}</div><div><small>RESPONSABLE</small><strong>${p?.name||'Cola del servicio'}</strong></div></div><div class="review-line"><span>SLA objetivo</span><strong>${s.sla}</strong></div><div class="review-line"><span>Aprobación</span><strong>${approval}</strong></div>${wizard.details.scheduledDate?`<div class="review-line"><span>Agenda</span><strong>${wizard.details.scheduledDate}<br>${formatTime(wizard.details.scheduledStart)}–${formatTime(wizard.details.scheduledEnd)}</strong></div>`:''}</div></div><div class="review-notice"><span>i</span><div><strong>Al radicar</strong><p>Se generará un número único, se registrará la ruta de asignación y comenzará el control de tiempos del servicio${s.approval?', una vez supere la aprobación correspondiente':''}.</p></div></div>`;
  foot.innerHTML=`<button class="btn btn-secondary" data-guide-back>← Ajustar</button><button class="btn btn-primary guided-submit" data-guide-submit>✓ Radicar solicitud</button>`;
}
function renderWizard(){
  updateWizardChrome();
  const body=$('#requestWizard'),foot=$('#requestWizardFooter'); if(!body||!foot)return;
  const s=serviceById(wizard.service);
  if(wizard.stage==='family')return renderWizardFamily(body,foot);
  if(wizard.stage==='service')return renderWizardService(body,foot);
  if(wizard.stage==='selfhelp')return renderWizardSelfHelp(body,foot,s);
  if(wizard.stage==='questions')return renderWizardQuestion(body,foot,s);
  if(wizard.stage==='schedule')return renderWizardSchedule(body,foot,s);
  if(wizard.stage==='assignment')return renderWizardAssignment(body,foot,s);
  return renderWizardReview(body,foot,s);
}
function captureGuidedCurrent(){
  const el=$('#requestWizard [data-guide-field]'); if(!el)return true;
  wizard.details[el.dataset.guideField]=el.value.trim();
  const s=serviceById(wizard.service),q=buildWizardQuestions(s)[wizard.questionIndex];
  if(isQuestionRequired(q)&&!wizard.details[q.key]){wizard.error='Este dato es necesario para continuar sin devoluciones.';renderWizard();return false;}
  wizard.error='';return true;
}
function guidedQuestionNext(){
  if(!captureGuidedCurrent())return;
  const s=serviceById(wizard.service),qs=buildWizardQuestions(s);
  if(wizard.questionIndex<qs.length-1){wizard.questionIndex++;renderWizard();return;}
  wizard.stage=canScheduleService(s)?'schedule':'assignment';renderWizard();
}
function guidedBack(){
  const s=serviceById(wizard.service);
  if(wizard.stage==='service'){wizard.stage='family';wizard.family=null;}
  else if(wizard.stage==='selfhelp'){wizard.stage='service';}
  else if(wizard.stage==='questions'){
    if(wizard.questionIndex>0)wizard.questionIndex--; else wizard.stage=selfHelpGuides[s?.id]?'selfhelp':'service';
  } else if(wizard.stage==='schedule'){wizard.stage='questions';wizard.questionIndex=Math.max(0,buildWizardQuestions(s).length-1);}
  else if(wizard.stage==='assignment'){wizard.stage=canScheduleService(s)?'schedule':'questions'; if(wizard.stage==='questions')wizard.questionIndex=Math.max(0,buildWizardQuestions(s).length-1);}
  else if(wizard.stage==='review'){wizard.stage='assignment';}
  wizard.error='';renderWizard();
}
function reserveQuickSlot(payload){
  if(!payload)return; const [personId,date,start,end]=payload.split('|'),p=personById(personId),s=serviceById(calendarState.service);
  wizard=freshWizard(s?.id||null,{requester:'Secretaría General',priority:'Media',scheduledDate:date,scheduledStart:start,scheduledEnd:end,assignee:personId});
  wizard.assignee=personId;
  if(s){wizard.stage=selfHelpGuides[s.id]?'selfhelp':'questions';} else wizard.stage='family';
  $('#requestModalBackdrop').hidden=false;document.body.style.overflow='hidden';renderWizard();
  showToast('Espacio preseleccionado',`${p.name} · ${formatTime(start)} a ${formatTime(end)}. Mesa de Ayuda TIC conservará esta reserva mientras completas la solicitud.`);
}
function scheduleTypeForService(id){return id==='cubrimientos'?'coverage':['correo','equipos','internet','accesos','seguridad'].includes(id)?'support':id==='desarrollo'||id==='datos'?'development':id==='revision'?'review':'internal';}
function submitRequest(){
  const s=serviceById(wizard.service),p=personById(wizard.assignee); if(!s)return;
  const nextNum=Math.max(148,...tickets.map(t=>Number(String(t.id).match(/(\d+)$/)?.[1]||0)))+1;
  const id=`MA-2026-${String(nextNum).padStart(4,'0')}`;
  const scheduled=!!wizard.details.scheduledDate;
  const status=s.approval?'En aprobación':scheduled?'Programado':'Nuevo';
  const timeline=[['Solicitud radicada mediante asistente guiado','19 Ago · ahora']];
  if(s.approval)timeline.push([`Enviada a aprobación · ${approvalOwnerByService[s.id]||'Aprobador del servicio'}`,'19 Ago · ahora']);
  timeline.push([p?`Enrutada a ${p.name} por competencia y capacidad`:'Enrutada a la cola correspondiente','19 Ago · ahora']);
  if(scheduled)timeline.push([`Agenda reservada · ${wizard.details.scheduledDate} ${formatTime(wizard.details.scheduledStart)}–${formatTime(wizard.details.scheduledEnd)}`,'19 Ago · ahora']);
  const newT={
    id,service:s.id,title:wizard.details.title||s.title,requester:wizard.details.requester||'Secretaría General',assignee:p?.id||'',priority:wizard.details.priority||(s.critical?'Crítica':'Media'),status,created:'19 Ago · ahora',due:s.sla==='Inmediato'?'Inmediato':s.sla==='Agenda'?'Según agenda':'Según SLA',sla:s.sla,
    description:(()=>{const i=s.fields.findIndex(([,type])=>type==='textarea');return (i>=0&&wizard.details[`f${i}`])||wizard.details.title||'Solicitud registrada desde el portal.';})(),details:{...wizard.details},approval:s.approval?{required:true,owner:approvalOwnerByService[s.id]||'Aprobador configurado',status:'Pendiente'}:{required:false,status:'No aplica'},timeline
  };
  tickets.unshift(newT);saveTickets();
  if(scheduled&&p){scheduleEvents.push({id:`ev-${id}`,person:p.id,date:wizard.details.scheduledDate,start:wizard.details.scheduledStart,end:wizard.details.scheduledEnd,title:newT.title,type:scheduleTypeForService(s.id),service:s.id,ticket:id});}
  closeRequestModal();showToast('Solicitud radicada',`${id} quedó registrada${s.approval?' y enviada a aprobación':''}.`);setView('my-tickets');
}

function slaHealth(t){
  if(['Resuelto','Cerrado'].includes(t.status))return {key:'met',label:'Cumplido',detail:'Objetivo atendido',pct:100};
  if(t.status==='En espera')return {key:'paused',label:'Pausado',detail:'Esperando información',pct:48};
  if(t.priority==='Crítica'||t.sla==='Inmediato')return {key:'critical',label:'Crítico',detail:'Atención inmediata',pct:92};
  const mins=String(t.sla).match(/(\d+)\s*min/i); if(mins&&Number(mins[1])<=60)return {key:'critical',label:'Crítico',detail:`${mins[1]} min restantes`,pct:90};
  if(t.priority==='Alta'||(mins&&Number(mins[1])<=120))return {key:'risk',label:'En riesgo',detail:'Requiere atención prioritaria',pct:74};
  if(t.status==='En aprobación')return {key:'approval',label:'En aprobación',detail:'Reloj controlado por flujo',pct:32};
  return {key:'ontime',label:'En tiempo',detail:'Dentro del objetivo',pct:42};
}
function slaBadge(t){const h=slaHealth(t);return `<span class="sla-health ${h.key}"><i></i>${h.label}</span>`;}
function opsFilterTickets(){
  return tickets.filter(t=>{
    const h=slaHealth(t);
    if(opsState.filter==='now')return !['Resuelto','Cerrado','Cancelado'].includes(t.status);
    if(opsState.filter==='risk')return ['risk','critical'].includes(h.key);
    if(opsState.filter==='unassigned')return !t.assignee&&!['Resuelto','Cerrado'].includes(t.status);
    if(opsState.filter==='scheduled')return t.status==='Programado';
    if(opsState.filter==='approvals')return t.status==='En aprobación'||t.approval?.status==='Pendiente';
    return true;
  });
}
function opsTicketRow(t){
  const s=serviceById(t.service),p=personById(t.assignee),h=slaHealth(t);
  return `<button class="ops-ticket-row" data-ticket="${t.id}"><div class="ops-ticket-main"><div class="ops-ticket-titleline"><span class="ops-code">${t.id}</span>${priorityPill(t.priority)}${slaBadge(t)}</div><strong>${safe(t.title)}</strong><small>${safe(t.requester)} · ${safe(s?.title||'Servicio')}</small></div><div class="ops-ticket-assignee">${p?`<div class="avatar">${p.initials}</div><div><strong>${p.name}</strong><small>${p.load}% ocupado</small></div>`:'<div><strong>Sin asignar</strong><small>Requiere triage</small></div>'}</div><div class="ops-sla-cell"><div class="ops-sla-top"><span>${h.detail}</span><b>${safe(t.sla)}</b></div><div class="ops-sla-progress"><i class="${h.key}" style="width:${h.pct}%"></i></div><small>${safe(t.due)}</small></div><span class="ops-row-arrow">›</span></button>`;
}
function renderOps(){
  const list=opsFilterTickets(),open=tickets.filter(t=>!['Resuelto','Cerrado','Cancelado'].includes(t.status)),risk=open.filter(t=>['risk','critical'].includes(slaHealth(t).key)),approvals=open.filter(t=>t.status==='En aprobación'),unassigned=open.filter(t=>!t.assignee);
  const filters=[['now','Ahora',open.length],['risk','En riesgo',risk.length],['approvals','Aprobaciones',approvals.length],['scheduled','Programados',open.filter(t=>t.status==='Programado').length],['unassigned','Sin asignar',unassigned.length],['all','Todos',tickets.length]];
  $('#view-ops').innerHTML=`<div class="ops-page-head"><div><span class="eyebrow">COMMAND CENTER · OPERACIÓN</span><h1>Centro de Operaciones</h1><p>Prioriza por riesgo, SLA, aprobación y capacidad. Cada caso conserva su contexto completo sin abandonar la consola.</p></div><div class="ops-head-actions"><button class="btn btn-secondary" data-command-open>⌕ Buscar</button><button class="btn btn-primary" data-action="open-new-request">＋ Radicar solicitud</button></div></div><div class="ops-kpis"><div><span>COLA ACTIVA</span><strong>${open.length}</strong><small>${open.filter(t=>t.status==='Nuevo').length} nuevos</small></div><div class="risk"><span>RIESGO SLA</span><strong>${risk.length}</strong><small>requieren foco</small></div><div class="approval"><span>APROBACIONES</span><strong>${approvals.length}</strong><small>pendientes</small></div><div><span>CAPACIDAD EQUIPO</span><strong>${Math.round(team.reduce((a,p)=>a+(100-p.load),0)/team.length)}%</strong><small>libre promedio</small></div></div><div class="ops-workspace"><section class="ops-queue"><div class="ops-filterbar">${filters.map(([id,label,count])=>`<button class="${opsState.filter===id?'active':''}" data-ops-filter="${id}">${label}<span>${count}</span></button>`).join('')}</div><div class="ops-queue-head"><div><strong>${filters.find(x=>x[0]===opsState.filter)?.[1]||'Solicitudes'}</strong><span>${list.length} resultados ordenados por prioridad operativa</span></div><button class="link-btn" data-view-link="calendar">Abrir planificador →</button></div><div class="ops-ticket-list">${list.map(opsTicketRow).join('')||'<div class="empty-state"><div class="empty-icon">✓</div><h3>No hay casos en esta bandeja</h3><p>La cola está al día con este criterio.</p></div>'}</div></section><aside class="ops-side"><div class="ops-side-head"><div><span>CAPACIDAD EN VIVO</span><strong>Equipo</strong></div><button data-view-link="team">Ver todo</button></div>${team.slice().sort((a,b)=>a.load-b.load).map(p=>`<div class="ops-person"><div class="avatar">${p.initials}</div><div class="ops-person-main"><strong>${p.name}</strong><span>${p.role}</span><i><u style="width:${p.load}%;background:${loadColor(p.load)}"></u></i></div><div class="ops-person-load"><b>${p.load}%</b><span>${p.slots[0]}</span></div></div>`).join('')}<div class="ops-side-rule"><span>⚡</span><div><strong>Asignación inteligente</strong><p>La recomendación evita perfiles incompatibles y penaliza la sobrecarga.</p></div></div></aside></div>`;
}

function renderTicketDrawer(){
  const t=tickets.find(x=>x.id===ticketDrawerState.id); if(!t)return;
  const s=serviceById(t.service),p=personById(t.assignee),h=slaHealth(t);
  const tabs=[['overview','Resumen'],['activity','Actividad'],['sla','SLA'],['approval','Aprobación']];
  let content='';
  if(ticketDrawerState.tab==='overview'){
    const detailEntries=Object.entries(t.details||{}).filter(([k,v])=>v!==''&&v!=null&&!['title','requester','priority','scheduledDate','scheduledStart','scheduledEnd'].includes(k));
    content=`<div class="ticket-360-hero"><div><span>ESTADO DEL SERVICIO</span><strong>${h.label}</strong><p>${h.detail}</p></div><div class="ticket-360-progress"><i class="${h.key}" style="width:${h.pct}%"></i></div></div><div class="detail-grid ticket-detail-grid"><div class="detail-box"><span>Responsable</span><strong>${p?.name||'Sin asignar'}</strong><small>${p?.role||'Pendiente de triage'}</small></div><div class="detail-box"><span>Vencimiento</span><strong>${safe(t.due)}</strong><small>SLA ${safe(t.sla)}</small></div><div class="detail-box"><span>Dependencia</span><strong>${safe(t.requester)}</strong></div><div class="detail-box"><span>Servicio</span><strong>${safe(s?.title||t.service)}</strong></div></div><div class="ticket-section"><h3>Descripción</h3><p>${safe(t.description)}</p></div>${detailEntries.length?`<div class="ticket-section"><h3>Información radicada</h3><div class="ticket-field-list">${detailEntries.map(([k,v])=>`<div><span>${safe(detailLabel(s,k))}</span><strong>${safe(v)}</strong></div>`).join('')}</div></div>`:''}<div class="ticket-route-card"><div><span>ENRUTAMIENTO</span><strong>${p?`${p.name} · ${matchCount(p,s)} competencias coincidentes`:'Cola del servicio'}</strong><small>Asignación basada en competencia, capacidad y reglas del servicio.</small></div>${t.details?.scheduledDate?`<div><span>AGENDA</span><strong>${t.details.scheduledDate} · ${formatTime(t.details.scheduledStart)}–${formatTime(t.details.scheduledEnd)}</strong><small>Reserva asociada a la solicitud.</small></div>`:''}</div>`;
  } else if(ticketDrawerState.tab==='activity'){
    content=`<div class="activity-head"><div><h3>Historial y conversación</h3><p>La trazabilidad diferencia mensajes al funcionario y notas internas.</p></div></div><div class="timeline ticket-timeline">${(t.timeline||[]).map(([a,d])=>`<div class="timeline-item"><strong>${safe(a)}</strong><p>${safe(d)}</p></div>`).join('')}</div><div class="comment-box pro-comment"><div class="comment-mode"><label><input type="radio" name="commentMode" value="public" checked> Respuesta al funcionario</label>${currentRole!=='requester'?'<label><input type="radio" name="commentMode" value="internal"> Nota interna</label>':''}</div><textarea id="ticketCommentText" placeholder="Escribe una actualización clara..."></textarea><div class="comment-actions"><span>Las notas internas solo las ve el equipo gestor.</span><button class="btn btn-primary compact" data-ticket-comment="${t.id}">Publicar actualización</button></div></div>`;
  } else if(ticketDrawerState.tab==='sla'){
    content=`<div class="sla-detail-card ${h.key}"><span>SEMÁFORO SLA</span><strong>${h.label}</strong><p>${h.detail}. Objetivo configurado para <b>${safe(s?.title||'este servicio')}</b>: ${safe(s?.sla||t.sla)}.</p><div class="sla-detail-track"><i style="width:${h.pct}%"></i></div><div class="sla-detail-meta"><div><span>Inicio</span><strong>${safe(t.created)}</strong></div><div><span>Objetivo</span><strong>${safe(t.due)}</strong></div><div><span>Prioridad</span><strong>${safe(t.priority)}</strong></div></div></div><div class="ticket-section"><h3>Reglas de escalamiento simuladas</h3><div class="rule-list"><div><span>70%</span><div><strong>Advertencia preventiva</strong><p>Notifica al responsable y resalta el caso en Operaciones.</p></div></div><div><span>90%</span><div><strong>Escalamiento</strong><p>Eleva el caso al líder del servicio y recomienda redistribución.</p></div></div><div><span>100%</span><div><strong>Incumplimiento</strong><p>Registra el evento y exige causa/cierre de mejora.</p></div></div></div></div>`;
  } else {
    const ap=t.approval||(s?.approval?{required:true,owner:approvalOwnerByService[s.id]||'Aprobador configurado',status:t.status==='En aprobación'?'Pendiente':'Aprobada'}:{required:false,status:'No aplica'});
    content=ap.required?`<div class="approval-flow"><div class="approval-icon">✓</div><span>FLUJO DE APROBACIÓN</span><h3>${safe(ap.status)}</h3><p>Responsable: <strong>${safe(ap.owner)}</strong></p><div class="approval-steps"><div class="done"><i>1</i><div><strong>Radicación</strong><small>Solicitud completa</small></div></div><div class="${ap.status==='Pendiente'?'active':'done'}"><i>2</i><div><strong>Validación / aprobación</strong><small>${safe(ap.owner)}</small></div></div><div><i>3</i><div><strong>Ejecución</strong><small>Se activa al aprobar</small></div></div></div>${currentRole!=='requester'&&ap.status==='Pendiente'?`<div class="approval-actions"><button class="btn btn-secondary" data-ticket-status="En espera" data-ticket-id="${t.id}">Solicitar ajuste</button><button class="btn btn-primary" data-approve-ticket="${t.id}">Aprobar</button></div>`:''}</div>`:`<div class="empty-state"><div class="empty-icon">✓</div><h3>Este servicio no requiere aprobación</h3><p>La solicitud puede pasar directamente a asignación y ejecución.</p></div>`;
  }
  $('#ticketDrawer').innerHTML=`<div class="drawer-head ticket-360-head"><div class="drawer-head-top"><div><span class="eyebrow">${t.id}</span><h2>${safe(t.title)}</h2><p>${safe(s?.title||'Servicio')} · ${safe(t.requester)}</p></div><button class="close-btn" data-action="close-ticket-drawer">×</button></div><div class="ticket-360-chips">${statusPill(t.status)}${priorityPill(t.priority)}${slaBadge(t)}</div><div class="ticket-tabs">${tabs.map(([id,label])=>`<button class="${ticketDrawerState.tab===id?'active':''}" data-ticket-tab="${id}">${label}</button>`).join('')}</div></div><div class="drawer-body ticket-360-body">${content}${currentRole!=='requester'&&ticketDrawerState.tab==='overview'?`<div class="ticket-actionbar"><button class="btn btn-soft" data-ticket-status="En gestión" data-ticket-id="${t.id}">Tomar caso</button><button class="btn btn-secondary" data-ticket-status="En espera" data-ticket-id="${t.id}">Poner en espera</button><button class="btn btn-primary" data-ticket-status="Resuelto" data-ticket-id="${t.id}">Resolver</button></div>`:''}</div>`;
}
function openTicket(id,tab='overview'){ if(!tickets.find(x=>x.id===id))return;ticketDrawerState={id,tab};renderTicketDrawer();$('#ticketDrawerBackdrop').hidden=false;document.body.style.overflow='hidden'; }
function closeTicketDrawer(){ $('#ticketDrawerBackdrop').hidden=true;document.body.style.overflow='';ticketDrawerState.id=null; }
function changeTicketStatus(id,status){
  const t=tickets.find(x=>x.id===id);if(!t)return;t.status=status;t.timeline=t.timeline||[];t.timeline.push([`Estado cambiado a ${status}`,'19 Ago · ahora']);saveTickets();showToast('Estado actualizado',`${id} ahora está ${status.toLowerCase()}.`);if(ticketDrawerState.id===id)renderTicketDrawer();const active=$('.view.active')?.id.replace('view-','');if(active)renderView(active);
}
function approveTicket(id){const t=tickets.find(x=>x.id===id);if(!t)return;t.status=t.details?.scheduledDate?'Programado':'Nuevo';t.approval={...(t.approval||{}),required:true,status:'Aprobada',owner:t.approval?.owner||approvalOwnerByService[t.service]};t.timeline=t.timeline||[];t.timeline.push(['Solicitud aprobada','19 Ago · ahora']);saveTickets();showToast('Solicitud aprobada',`${id} ya puede continuar a ejecución.`);renderTicketDrawer();}
function addTicketComment(id){
  const t=tickets.find(x=>x.id===id),text=$('#ticketCommentText')?.value.trim();if(!t||!text)return;
  const mode=$('input[name="commentMode"]:checked')?.value||'public';t.timeline=t.timeline||[];t.timeline.push([`${mode==='internal'?'Nota interna':'Respuesta al funcionario'} · ${text}`,'19 Ago · ahora']);saveTickets();renderTicketDrawer();showToast(mode==='internal'?'Nota interna registrada':'Actualización publicada','La trazabilidad del caso fue actualizada.');
}

function commandEntries(query=''){
  const q=query.trim().toLowerCase();
  const base=[
    {kind:'action',icon:'＋',title:'Radicar nueva solicitud',sub:'Asistente guiado paso a paso',action:'new'},
    {kind:'view',icon:'▦',title:'Abrir agenda y disponibilidad',sub:'Planificador visual de recursos',view:'calendar'},
    ...(currentRole!=='requester'?[{kind:'view',icon:'◫',title:'Abrir Centro de Operaciones',sub:'SLA, prioridades y capacidad',view:'ops'}]:[]),
    {kind:'view',icon:'◇',title:'Explorar catálogo de servicios',sub:'Todos los servicios institucionales',view:'catalog'}
  ];
  const sv=services.map(s=>({kind:'service',icon:s.icon,title:s.title,sub:`${s.category} · ${s.sla}`,service:s.id}));
  const tk=tickets.slice(0,20).map(t=>({kind:'ticket',icon:'▤',title:t.title,sub:`${t.id} · ${t.requester}`,ticket:t.id}));
  const all=[...base,...sv,...tk]; if(!q)return all.slice(0,10);
  return all.filter(x=>`${x.title} ${x.sub}`.toLowerCase().includes(q)).slice(0,12);
}
function renderCommandPalette(q=''){
  const items=commandEntries(q);$('#commandResults').innerHTML=items.length?items.map(x=>`<button class="command-item" ${x.kind==='action'?`data-command-action="${x.action}"`:x.kind==='view'?`data-command-view="${x.view}"`:x.kind==='service'?`data-command-service="${x.service}"`:`data-command-ticket="${x.ticket}"`}><span class="command-item-icon">${x.icon}</span><div><strong>${safe(x.title)}</strong><small>${safe(x.sub)}</small></div><kbd>↵</kbd></button>`).join(''):`<div class="command-empty"><span>⌕</span><strong>Sin coincidencias</strong><p>Prueba con “correo”, “cubrimiento”, una dependencia o el número MA-2026.</p></div>`;
}
function openCommandPalette(initial=''){closeRequestModal();$('#commandBackdrop').hidden=false;document.body.style.overflow='hidden';$('#commandInput').value=initial;renderCommandPalette(initial);requestAnimationFrame(()=>$('#commandInput').focus());}
function closeCommandPalette(){if(!$('#commandBackdrop'))return;$('#commandBackdrop').hidden=true;document.body.style.overflow='';}
function globalSearch(q){openCommandPalette(q||'');}

// Scheduler PRO 2.0: los agentes pueden mover bloques entre personas y horas.
function renderDayScheduler(people,date){
  const timelineStart=8*60,timelineEnd=17*60,totalMinutes=timelineEnd-timelineStart;
  const hourWidth=calendarState.zoom,timelineWidth=(totalMinutes/60)*hourWidth;
  const ticks=[];for(let h=8;h<=17;h++)ticks.push(h);
  const minor=[];for(let m=timelineStart;m<=timelineEnd;m+=calendarState.snap){if(m%60!==0)minor.push(m);}
  const now=new Date(),showNow=toISO(now)===date&&now.getHours()*60+now.getMinutes()>=timelineStart&&now.getHours()*60+now.getMinutes()<=timelineEnd,nowMinute=now.getHours()*60+now.getMinutes();
  const px=minute=>((minute-timelineStart)/60)*hourWidth;
  const visiblePeople=people.filter(p=>!calendarState.availableOnly||freeMinutesForDay(p.id,date)>=calendarState.duration);
  const rows=visiblePeople.map(p=>{
    const evs=scheduleEvents.filter(e=>e.person===p.id&&e.date===date),free=getFreeWindows(p.id,date,calendarState.duration);
    return `<div class="resource-row" style="--timeline-width:${timelineWidth}px"><div class="resource-person sticky-resource"><div class="avatar resource-avatar">${p.initials}</div><div class="resource-copy"><strong>${p.name}</strong><span>${p.role}</span><div class="resource-meta"><span class="resource-load ${p.load>=85?'danger':p.load>=70?'warn':'ok'}">${p.load}% ocupado</span><span>${free.length?`${free.length} espacios`:'Sin espacio'}</span></div></div></div><div class="resource-timeline ${currentRole!=='requester'?'editable-timeline':''}" data-calendar-drop-person="${p.id}" data-calendar-drop-date="${date}" style="width:${timelineWidth}px"><div class="lunch-band" style="left:${px(12*60)}px;width:${hourWidth}px"><span>12:00–1:00 · Almuerzo</span></div>${minor.map(m=>`<div class="minor-time-line" style="left:${px(m)}px"></div>`).join('')}${ticks.map(h=>`<div class="hour-line" style="left:${px(h*60)}px"></div>`).join('')}${showNow?`<div class="now-line" style="left:${px(nowMinute)}px"><span>Ahora</span></div>`:''}${calendarState.showFree?free.map(f=>{const left=px(timeToMin(f.start)),width=((timeToMin(f.end)-timeToMin(f.start))/60)*hourWidth;return `<button class="free-window" data-quick-slot="${p.id}|${date}|${f.start}|${f.end}" style="left:${left}px;width:${width}px" title="Libre ${formatTime(f.start)} – ${formatTime(f.end)}"><strong>LIBRE</strong><span>${width>120?`${formatTime(f.start)}–${formatTime(f.end)}`:'Reservar'}</span></button>`}).join(''):''}${evs.map(e=>{const left=px(timeToMin(e.start)),width=((timeToMin(e.end)-timeToMin(e.start))/60)*hourWidth;return `<button class="schedule-event ${e.type}" data-schedule-event="${e.id}" draggable="${currentRole!=='requester'?'true':'false'}" style="left:${Math.max(0,left)}px;width:${Math.max(48,width)}px" title="${safe(e.title)} · ${formatTime(e.start)}–${formatTime(e.end)}${currentRole!=='requester'?' · Arrastra para reprogramar':''}"><strong>${safe(e.title)}</strong><span>${formatTime(e.start)}–${formatTime(e.end)}</span>${currentRole!=='requester'?'<i class="event-drag-grip">⋮⋮</i>':''}</button>`}).join('')}</div><div class="resource-next sticky-availability"><span>Próximo libre</span><strong>${free[0]?`${formatTime(free[0].start)}–${formatTime(free[0].end)}`:'—'}</strong><button ${free[0]?'':'disabled'} data-quick-slot="${free[0]?`${p.id}|${date}|${free[0].start}|${free[0].end}`:''}">Reservar</button></div></div>`;
  }).join('');
  const ruler=`<div class="timeline-ruler" style="width:${timelineWidth}px">${minor.map(m=>`<div class="ruler-minor" style="left:${px(m)}px"></div>`).join('')}${ticks.map(h=>`<div class="ruler-hour" style="left:${px(h*60)}px"><strong>${formatTime(`${String(h).padStart(2,'0')}:00`)}</strong>${h<17?'<span>hora</span>':''}</div>`).join('')}${showNow?`<div class="ruler-now" style="left:${px(nowMinute)}px"></div>`:''}</div>`;
  return `<div class="scheduler-scroll" id="resourceScroll" data-calendar-pan><div class="resource-header" style="--timeline-width:${timelineWidth}px"><div class="resource-header-person sticky-resource">Funcionario / carga</div>${ruler}<div class="resource-header-next sticky-availability">Disponibilidad</div></div><div class="resource-board">${rows||'<div class="scheduler-empty">No hay funcionarios disponibles con los filtros actuales.</div>'}</div></div>`;
}
function workWindowContains(start,end){return workWindows.some(([a,b])=>timeToMin(a)<=start&&timeToMin(b)>=end);}
function scheduleConflict(eventId,person,date,start,end){return scheduleEvents.some(e=>e.id!==eventId&&e.person===person&&e.date===date&&timeToMin(e.start)<end&&timeToMin(e.end)>start);}
function moveScheduleEvent(eventId,person,date,startMinute){
  const ev=scheduleEvents.find(e=>e.id===eventId);if(!ev)return;
  const duration=timeToMin(ev.end)-timeToMin(ev.start),snap=calendarState.snap||30;
  let start=Math.round(startMinute/snap)*snap,end=start+duration;start=Math.max(8*60,Math.min(17*60-duration,start));end=start+duration;
  if(!workWindowContains(start,end)){showToast('Horario no disponible','El bloque debe quedar completamente dentro de la jornada laboral y no atravesar el almuerzo.');return;}
  if(scheduleConflict(ev.id,person,date,start,end)){showToast('Conflicto de agenda','Ya existe otra actividad que se cruza con ese horario.');return;}
  ev.person=person;ev.date=date;ev.start=minToTime(start);ev.end=minToTime(end);
  const t=ev.ticket?tickets.find(x=>x.id===ev.ticket):null;if(t){t.assignee=person;t.details=t.details||{};t.details.scheduledDate=date;t.details.scheduledStart=ev.start;t.details.scheduledEnd=ev.end;t.timeline=t.timeline||[];t.timeline.push([`Agenda reprogramada a ${personById(person)?.name} · ${formatTime(ev.start)}–${formatTime(ev.end)}`,'19 Ago · ahora']);saveTickets();}
  showToast('Agenda actualizada',`${ev.title} · ${personById(person)?.name} · ${formatTime(ev.start)}–${formatTime(ev.end)}.`);renderCalendar();
}

// Interacciones v0.4, separadas de los manejadores de compatibilidad de versiones anteriores.
document.addEventListener('click',e=>{
  const family=e.target.closest('[data-guide-family]');if(family){wizard.family=family.dataset.guideFamily;wizard.stage='service';renderWizard();return;}
  const service=e.target.closest('[data-guide-service]');if(service){wizard.service=service.dataset.guideService;wizard.family=familyForService(wizard.service)?.id;wizard.stage=selfHelpGuides[wizard.service]?'selfhelp':'questions';wizard.questionIndex=0;renderWizard();return;}
  const answer=e.target.closest('[data-guide-answer]');if(answer){wizard.details[answer.dataset.guideKey]=answer.dataset.guideAnswer;wizard.error='';renderWizard();return;}
  if(e.target.closest('[data-guide-back]')){guidedBack();return;}
  if(e.target.closest('[data-guide-selfhelp-continue]')){wizard.selfHelpDone=true;wizard.stage='questions';wizard.questionIndex=0;renderWizard();return;}
  if(e.target.closest('[data-guide-solved]')){closeRequestModal();showToast('Listo','No fue necesario radicar una solicitud. Si vuelve a ocurrir, Mesa de Ayuda TIC conserva el servicio para una nueva radicación.');return;}
  if(e.target.closest('[data-guide-question-next]')){guidedQuestionNext();return;}
  const slot=e.target.closest('[data-guide-slot]');if(slot){const [person,date,start,end]=slot.dataset.guideSlot.split('|');wizard.assignee=person;Object.assign(wizard.details,{scheduledDate:date,scheduledStart:start,scheduledEnd:end});wizard.stage='assignment';renderWizard();return;}
  if(e.target.closest('[data-guide-clear-slot]')){delete wizard.details.scheduledDate;delete wizard.details.scheduledStart;delete wizard.details.scheduledEnd;wizard.assignee='auto';renderWizard();return;}
  if(e.target.closest('[data-guide-skip-schedule]')){delete wizard.details.scheduledDate;delete wizard.details.scheduledStart;delete wizard.details.scheduledEnd;wizard.stage='assignment';renderWizard();return;}
  if(e.target.closest('[data-guide-to-assignment]')){wizard.stage='assignment';renderWizard();return;}
  const assignee=e.target.closest('[data-guide-assignee]');if(assignee){wizard.assignee=assignee.dataset.guideAssignee;renderWizard();return;}
  if(e.target.closest('[data-guide-review]')){wizard.stage='review';renderWizard();return;}
  if(e.target.closest('[data-guide-submit]')){submitRequest();return;}
  const ops=e.target.closest('[data-ops-filter]');if(ops){opsState.filter=ops.dataset.opsFilter;renderOps();return;}
  const tab=e.target.closest('[data-ticket-tab]');if(tab&&ticketDrawerState.id){ticketDrawerState.tab=tab.dataset.ticketTab;renderTicketDrawer();return;}
  const comment=e.target.closest('[data-ticket-comment]');if(comment){addTicketComment(comment.dataset.ticketComment);return;}
  const approve=e.target.closest('[data-approve-ticket]');if(approve){approveTicket(approve.dataset.approveTicket);return;}
  if(e.target.closest('[data-command-open]')){openCommandPalette();return;}
  const ca=e.target.closest('[data-command-action]');if(ca){closeCommandPalette();if(ca.dataset.commandAction==='new')openRequestModal();return;}
  const cv=e.target.closest('[data-command-view]');if(cv){closeCommandPalette();setView(cv.dataset.commandView);return;}
  const cs=e.target.closest('[data-command-service]');if(cs){closeCommandPalette();openRequestModal(cs.dataset.commandService);return;}
  const ct=e.target.closest('[data-command-ticket]');if(ct){closeCommandPalette();openTicket(ct.dataset.commandTicket);return;}
});
document.addEventListener('input',e=>{
  if(e.target.matches('[data-guide-field]')){wizard.details[e.target.dataset.guideField]=e.target.value;wizard.error='';}
  if(e.target.id==='commandInput')renderCommandPalette(e.target.value);
});
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openCommandPalette();}
  if(e.key==='Escape'&&!$('#commandBackdrop')?.hidden){closeCommandPalette();}
  if(e.key==='Enter'&&e.target?.id==='commandInput'){const first=$('#commandResults .command-item');first?.click();}
  if(e.key==='Enter'&&e.target?.matches?.('[data-guide-field]')&&e.target.tagName!=='TEXTAREA'){e.preventDefault();guidedQuestionNext();}
},true);
$('#commandBackdrop')?.addEventListener('click',e=>{if(e.target.id==='commandBackdrop')closeCommandPalette();});
$('#globalSearch')?.addEventListener('click',()=>openCommandPalette($('#globalSearch').value||''));

document.addEventListener('dragstart',e=>{
  const ev=e.target.closest?.('.schedule-event[data-schedule-event]');if(!ev||currentRole==='requester')return;
  draggedScheduleId=ev.dataset.scheduleEvent;ev.classList.add('dragging-event');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',draggedScheduleId);
});
document.addEventListener('dragend',e=>{e.target.closest?.('.schedule-event')?.classList.remove('dragging-event');draggedScheduleId=null;$$('.editable-timeline').forEach(x=>x.classList.remove('drag-over'));});
document.addEventListener('dragover',e=>{const tl=e.target.closest?.('[data-calendar-drop-person]');if(!tl||currentRole==='requester')return;e.preventDefault();e.dataTransfer.dropEffect='move';$$('.editable-timeline').forEach(x=>x.classList.toggle('drag-over',x===tl));});
document.addEventListener('drop',e=>{
  const tl=e.target.closest?.('[data-calendar-drop-person]');if(!tl||currentRole==='requester')return;e.preventDefault();
  const id=draggedScheduleId||e.dataTransfer.getData('text/plain'),rect=tl.getBoundingClientRect(),minute=8*60+((e.clientX-rect.left)/calendarState.zoom)*60;
  $$('.editable-timeline').forEach(x=>x.classList.remove('drag-over'));moveScheduleEvent(id,tl.dataset.calendarDropPerson,tl.dataset.calendarDropDate,minute);draggedScheduleId=null;
});


setRole('requester');
renderHome();
updateBadges();
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
    <div class="admin360-head"><div><span class="eyebrow">CONTROL PLANE · PRE-SUPABASE</span><h1>Administración de la Mesa</h1><p>Diseña y gobierna el comportamiento de la Mesa sin tocar código. Los cambios se trabajan como borrador y solo afectan el portal cuando se publican.</p></div><div class="admin360-health"><span class="pulse"></span><div><small>CONFIGURACIÓN LOCAL</small><strong>Configuración avanzada</strong></div></div></div>
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
setView=function(view){$$('.view').forEach(v=>v.classList.remove('active'));const target=$(`#view-${view}`);if(!target)return;target.classList.add('active');$$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===view));const names={home:'Inicio','new-request':'Nueva solicitud','my-tickets':'Mis solicitudes',notifications:'Actualizaciones',knowledge:'Centro de conocimiento',status:'Estado de servicios',calendar:'Agenda y disponibilidad',ops:'Centro de operaciones',continuity:'Incidentes, problemas y cambios',team:'Equipo y capacidad',assets:'Activos y CMDB',catalog:'Catálogo multidependencia',reports:'Indicadores',workflows:'Diseñador de workflows',admin:'Administración'};$('#breadcrumb').textContent=`Mesa de Ayuda TIC / ${names[view]||'Inicio'}`;renderView(view);if(innerWidth<860)$('#sidebar').classList.remove('open');};

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
/* Mesa de Ayuda TIC · interface system */
(function(){
  const q=(s,c=document)=>c.querySelector(s);
  const qa=(s,c=document)=>Array.from(c.querySelectorAll(s));

  const glyphs={
    home:'<svg viewBox="0 0 24 24"><path d="M3 11.3 12 4l9 7.3"/><path d="M5.5 10.3V20h13v-9.7"/><path d="M9.5 20v-6h5v6"/></svg>',
    'new-request':'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    'my-tickets':'<svg viewBox="0 0 24 24"><rect x="5" y="3.5" width="14" height="17" rx="2.4"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    notifications:'<svg viewBox="0 0 24 24"><path d="M6.5 9a5.5 5.5 0 0 1 11 0c0 5.3 2.5 6 2.5 7.5H4c0-1.5 2.5-2.2 2.5-7.5Z"/><path d="M10 20h4"/></svg>',
    knowledge:'<svg viewBox="0 0 24 24"><path d="M4.5 5.4c3-1.4 5.4-1.2 7.5.5v14c-2.1-1.7-4.5-1.9-7.5-.5Z"/><path d="M19.5 5.4c-3-1.4-5.4-1.2-7.5.5v14c2.1-1.7 4.5-1.9 7.5-.5Z"/></svg>',
    status:'<svg viewBox="0 0 24 24"><path d="M3 12h4l2-4 4 8 2-4h6"/><circle cx="12" cy="12" r="9" opacity=".18"/></svg>',
    calendar:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M7.5 3v4M16.5 3v4M3.5 9h17"/><path d="M8 13h3M13 13h3M8 16h3"/></svg>',
    ops:'<svg viewBox="0 0 24 24"><rect x="3.5" y="4" width="17" height="16" rx="2.5"/><path d="M7 9h10M7 13h6M7 17h8"/></svg>',
    continuity:'<svg viewBox="0 0 24 24"><path d="M12 3 2.8 19h18.4Z"/><path d="M12 9v4M12 16.5v.1"/></svg>',
    team:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 20c.4-4 2.4-6 5.5-6s5.1 2 5.5 6M14.5 15.5c3.2 0 5.1 1.5 5.5 4.5"/></svg>',
    assets:'<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="11" rx="2.2"/><path d="M8 20h8M12 16v4"/></svg>',
    catalog:'<svg viewBox="0 0 24 24"><path d="m12 3 8 4.5-8 4.5-8-4.5Z"/><path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5"/></svg>',
    reports:'<svg viewBox="0 0 24 24"><path d="M5 19V9M12 19V5M19 19v-7"/><path d="M3 19h18"/></svg>',
    workflows:'<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8.5 6h7M7.5 8l3.2 7.5M16.5 8l-3.2 7.5"/></svg>',
    admin:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1A7 7 0 0 0 14.8 6L14.5 3h-5L9.2 6a7 7 0 0 0-1.7 1.1l-2.4-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1A7 7 0 0 0 9.2 18l.3 3h5l.3-3a7 7 0 0 0 1.7-1.1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z"/></svg>',
    publicaciones:'<svg viewBox="0 0 24 24"><path d="m4 13 12-6v10L4 12.8Z"/><path d="M16 9h2.2A1.8 1.8 0 0 1 20 10.8v2.4a1.8 1.8 0 0 1-1.8 1.8H16"/><path d="m6.5 14 1 5h3l-.8-6"/></svg>',
    cubrimientos:'<svg viewBox="0 0 24 24"><rect x="3" y="6.5" width="18" height="13" rx="2.7"/><path d="m8 6.5 1.2-2h5.6l1.2 2"/><circle cx="12" cy="13" r="3.5"/></svg>',
    desarrollo:'<svg viewBox="0 0 24 24"><path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5l-3 14"/></svg>',
    revision:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4M8 11l2 2 4-4"/></svg>',
    correo:'<svg viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4.5 7 7.5 6 7.5-6"/></svg>',
    equipos:'<svg viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="12" rx="2.2"/><path d="M8 20h8M12 16.5V20"/></svg>',
    internet:'<svg viewBox="0 0 24 24"><path d="M3 9.5a13.2 13.2 0 0 1 18 0M6.5 13a8.2 8.2 0 0 1 11 0M10 16.3a3.2 3.2 0 0 1 4 0"/><circle cx="12" cy="19" r="1"/></svg>',
    accesos:'<svg viewBox="0 0 24 24"><circle cx="8.5" cy="12" r="4"/><path d="M12.5 12H21M18 12v3M15 12v2"/></svg>',
    web:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3.5 12h17M12 3c2.4 2.5 3.5 5.5 3.5 9S14.4 18.5 12 21M12 3c-2.4 2.5-3.5 5.5-3.5 9S9.6 18.5 12 21"/></svg>',
    datos:'<svg viewBox="0 0 24 24"><path d="M5 19V11M12 19V5M19 19v-6"/><path d="M3 19h18"/></svg>',
    seguridad:'<svg viewBox="0 0 24 24"><path d="M12 3 19 6v5c0 4.5-2.5 7.5-7 10-4.5-2.5-7-5.5-7-10V6Z"/><path d="m9 12 2 2 4-4"/></svg>',
    capacitacion:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="12" rx="2.2"/><path d="M8 20h8M12 16v4M8 9h8M8 12h5"/></svg>'
  };

  const serviceTheme={
    publicaciones:['#e9f1ff','#1457c8','linear-gradient(90deg,#2369ff,#24a0ff)'],
    cubrimientos:['#f0ecff','#6f52d6','linear-gradient(90deg,#7557e8,#ab5af0)'],
    desarrollo:['#e7f8ff','#087ca2','linear-gradient(90deg,#08a5d1,#36c2e9)'],
    revision:['#e9f8f2','#0d8c64','linear-gradient(90deg,#14a978,#45c48b)'],
    correo:['#fff5de','#b87300','linear-gradient(90deg,#f0a31c,#ffc24a)'],
    equipos:['#eef3f8','#51677d','linear-gradient(90deg,#647b94,#90a5b9)'],
    internet:['#e6f7fb','#087b95','linear-gradient(90deg,#0b9abb,#34c5e1)'],
    accesos:['#fff0f1','#c44350','linear-gradient(90deg,#d85563,#ef7c83)'],
    web:['#eaf2ff','#1557c0','linear-gradient(90deg,#1d66f4,#4d8dfc)'],
    datos:['#f0edff','#7053c6','linear-gradient(90deg,#6655df,#9872ed)'],
    seguridad:['#fff0f0','#c03c3c','linear-gradient(90deg,#d84e58,#f17c66)'],
    capacitacion:['#e8f8f1','#0e8c67','linear-gradient(90deg,#10a979,#50c995)']
  };

  function iconFor(key){return glyphs[key]||glyphs.catalog}

  // Reconstruct service tiles with a recognisable icon vocabulary.
  toneIcon=function(service){
    const [bg,color]=serviceTheme[service.id]||['#edf4ff','#1557c0'];
    return `<div class="service-icon" style="background:${bg};color:${color}">${iconFor(service.id)}</div>`;
  };
  serviceCard=function(s){
    const theme=serviceTheme[s.id]||['#edf4ff','#1557c0','linear-gradient(90deg,#1d66f4,#36b9ef)'];
    return `<button class="service-card" style="--service-accent:${theme[2]}" data-service="${s.id}">${toneIcon(s)}<h3>${s.title}</h3><p>${s.desc}</p><div class="service-meta"><span>${s.category}</span><span>${s.sla}</span></div></button>`;
  };

  function installNavIcons(){
    qa('.nav-item[data-view]').forEach(btn=>{
      const box=q('.nav-icon',btn);if(box)box.innerHTML=iconFor(btn.dataset.view);
    });
  }

  function decorateKnowledge(){
    if(typeof knowledgeArticles==='undefined')return;
    qa('.knowledge-card[data-knowledge]').forEach(card=>{
      const a=knowledgeArticles.find(x=>x.id===card.dataset.knowledge);const slot=card.firstElementChild;
      if(a&&slot){slot.innerHTML=iconFor(a.service);slot.style.fontSize='0'}
    });
    qa('.mini-article[data-knowledge]').forEach(card=>{
      const a=knowledgeArticles.find(x=>x.id===card.dataset.knowledge);const slot=card.firstElementChild;
      if(a&&slot){slot.innerHTML=iconFor(a.service);slot.style.fontSize='0';const svg=q('svg',slot);if(svg){svg.style.width='20px';svg.style.height='20px';svg.style.fill='none';svg.style.stroke='currentColor';svg.style.strokeWidth='1.8'}}
    });
  }

  function decorateJourney(){
    const map=[glyphs['new-request'],glyphs.knowledge,glyphs.calendar];
    qa('.journey-action').forEach((el,i)=>{const span=el.firstElementChild;if(span&&map[i]){span.innerHTML=map[i];const svg=q('svg',span);if(svg){svg.style.width='22px';svg.style.height='22px';svg.style.fill='none';svg.style.stroke='currentColor';svg.style.strokeWidth='1.8'}}});
  }

  function ensureMobileDock(){
    if(q('.mobile-dock'))return;
    const dock=document.createElement('nav');dock.className='mobile-dock';dock.setAttribute('aria-label','Accesos rápidos');
    const items=[['home','Inicio'],['my-tickets','Solicitudes'],['new-request','Radicar'],['calendar','Agenda'],['notifications','Novedades']];
    dock.innerHTML=items.map(([view,label])=>`<button type="button" data-mobile-view="${view}" class="${view==='new-request'?'radicar':''}">${iconFor(view)}<span>${label}</span></button>`).join('');
    dock.addEventListener('click',e=>{const b=e.target.closest('[data-mobile-view]');if(!b)return;if(b.dataset.mobileView==='new-request')openRequestModal();else setView(b.dataset.mobileView);syncDock()});
    document.body.appendChild(dock);
  }

  function syncDock(){const active=q('.nav-item.active[data-view]')?.dataset.view||'home';qa('.mobile-dock [data-mobile-view]').forEach(b=>b.classList.toggle('active',b.dataset.mobileView===active))}

  function visualDecorate(){
    installNavIcons();decorateKnowledge();decorateJourney();syncDock();
    qa('.service-card').forEach(card=>{if(card.dataset.service&&serviceTheme[card.dataset.service])card.style.setProperty('--service-accent',serviceTheme[card.dataset.service][2])});
  }

  // Any renderer that changes a view gets the same visual language immediately.
  const baseRenderView=renderView;
  renderView=function(view){baseRenderView(view);requestAnimationFrame(visualDecorate)};

  const observer=new MutationObserver(()=>requestAnimationFrame(visualDecorate));

  document.addEventListener('DOMContentLoaded',()=>{
    installNavIcons();ensureMobileDock();
    const main=q('.main');if(main)observer.observe(main,{childList:true,subtree:true});
    visualDecorate();
    const active=q('.view.active')?.id.replace('view-','')||'home';renderView(active);
    window.addEventListener('resize',()=>{if(innerWidth>=980)q('#sidebar')?.classList.remove('open')},{passive:true});
  });
})();
