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
  $('#breadcrumb').textContent=`Mesa 360 / ${names[view]||'Inicio'}`;
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
   MESA 360 v0.4 · SERVICE DESK INSTITUCIONAL
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
    ['No compartas tu contraseña','La Mesa 360 nunca te pedirá escribir la contraseña dentro de la solicitud.']
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
  body.innerHTML=`<div class="guided-intro"><span class="guided-kicker">RADICACIÓN ASISTIDA</span><h3>¿Qué necesitas gestionar?</h3><p>No necesitas conocer el nombre técnico del servicio. Elige la opción que más se parezca a tu necesidad y MESA 360 te llevará por el camino correcto.</p></div><div class="guided-family-grid">${guidedFamilies.map(f=>`<button type="button" class="guided-family-card" data-guide-family="${f.id}"><span class="guided-family-icon">${f.icon}</span><div><h4>${f.title}</h4><p>${f.desc}</p><small>${f.services.length} servicios disponibles</small></div><span class="guided-arrow">›</span></button>`).join('')}</div><div class="guided-help-strip"><span>?</span><div><strong>¿No sabes cuál elegir?</strong><small>Usa el buscador superior o selecciona la categoría más cercana. Podrás volver atrás sin perder información.</small></div></div>`;
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
  body.innerHTML=`<div class="guided-intro compact"><span class="guided-kicker">PROGRAMACIÓN INTELIGENTE</span><h3>${selected?'Espacio seleccionado':'Escoge un espacio disponible'}</h3><p>MESA 360 cruza la competencia requerida con agenda y carga. ${s.id==='cubrimientos'?'Para cubrimientos, la fecha del evento tiene prioridad.':'Puedes reservar ahora o dejar que el equipo gestione el horario según el SLA.'}</p></div>${selected?`<div class="selected-slot-hero"><div class="avatar">${personById(wizard.assignee)?.initials||'✓'}</div><div><span>ESPACIO RESERVADO</span><strong>${personById(wizard.assignee)?.name||'Responsable'} · ${formatTime(wizard.details.scheduledStart)}–${formatTime(wizard.details.scheduledEnd)}</strong><small>${wizard.details.scheduledDate} · ${minutesLabel(timeToMin(wizard.details.scheduledEnd)-timeToMin(wizard.details.scheduledStart))}</small></div><button data-guide-clear-slot type="button">Cambiar</button></div>`:''}<div class="guided-slot-grid">${suggestions.map((x,i)=>`<button type="button" class="guided-slot-card ${i===0?'recommended':''}" data-guide-slot="${x.person.id}|${x.date}|${x.start}|${x.end}">${i===0?'<em>MEJOR OPCIÓN</em>':''}<div class="guided-slot-time"><strong>${formatTime(x.start)}</strong><span>${formatTime(x.end)}</span></div><div class="guided-slot-person"><div class="avatar">${x.person.initials}</div><div><strong>${x.person.name}</strong><small>${x.person.role} · ${x.person.load}% ocupado</small></div></div></button>`).join('')||'<div class="guided-no-slots">No encontramos un bloque continuo con esa duración en la fecha indicada. Puedes continuar sin reservar y el equipo propondrá un horario.</div>'}</div>`;
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
  body.innerHTML=`<div class="guided-intro compact"><span class="guided-kicker">ENRUTAMIENTO POR COMPETENCIA + CAPACIDAD</span><h3>${choose?'Responsable recomendado':'MESA 360 asignará el responsable'}</h3><p>${choose?'Puedes conservar la recomendación o escoger otro funcionario compatible.':'Por seguridad y consistencia operativa, este servicio se enruta automáticamente al perfil competente.'}</p></div><div class="routing-explain"><span>AI</span><div><strong>¿Por qué esta recomendación?</strong><p>Se ponderan competencias del servicio, carga estimada y disponibilidad próxima. En la versión con Supabase se agregarán turnos, ausencias y reglas de escalamiento.</p></div></div><div class="guided-routing-list">${candidates.map((p,i)=>`<button type="button" class="guided-routing-card ${wizard.assignee===p.id?'selected':''} ${i===0?'recommended':''}" ${choose?`data-guide-assignee="${p.id}"`:i===0?'data-guide-assignee-auto="1"':'disabled'}><div class="avatar">${p.initials}</div><div class="guided-routing-main"><div><strong>${p.name}</strong>${i===0?'<em>RECOMENDADO</em>':''}</div><span>${p.role}</span><small>${routingReason(p,s,i)}</small></div><div class="guided-routing-cap"><b>${p.load}%</b><span>ocupado</span><i><u style="width:${p.load}%;background:${loadColor(p.load)}"></u></i></div></button>`).join('')}</div>`;
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
  showToast('Espacio preseleccionado',`${p.name} · ${formatTime(start)} a ${formatTime(end)}. MESA 360 conservará esta reserva mientras completas la solicitud.`);
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
  if(e.target.closest('[data-guide-solved]')){closeRequestModal();showToast('Listo','No fue necesario radicar una solicitud. Si vuelve a ocurrir, MESA 360 conserva el servicio para una nueva radicación.');return;}
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
