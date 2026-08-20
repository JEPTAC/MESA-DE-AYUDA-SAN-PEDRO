(function(){
  const $$ = (s,ctx=document)=>Array.from(ctx.querySelectorAll(s));
  const $ = (s,ctx=document)=>ctx.querySelector(s);

  function applyScreenClass(){
    const w = window.innerWidth;
    document.body.dataset.screen = w < 420 ? 'xs' : w < 640 ? 'sm' : w < 980 ? 'md' : w < 1280 ? 'lg' : 'xl';
  }

  function attachMotion(scope=document){
    const targets = $$([
      '.hero','.metric-card','.service-card','.ticket-table-card','.card-pad','.calendar-kpi','.team-card','.chart-card','.scheduler-finder','.scheduler-main','.workflow-studio','.settings-card','.admin-card','.knowledge-card','.status-card'
    ].join(','), scope).filter(el=>!el.dataset.motionBound);
    targets.forEach((el,i)=>{
      el.dataset.motionBound = '1';
      el.classList.add('motion-item');
      el.style.transitionDelay = `${Math.min(i*45, 220)}ms`;
      observer.observe(el);
    });
  }

  function decorateHero(){
    const hero = $('.hero');
    if(!hero || $('.hero-ribbon', hero)) return;

    const ribbon = document.createElement('div');
    ribbon.className = 'hero-ribbon';
    const items = [
      ['⚡','Portal guiado'],
      ['◌','SLA en vivo'],
      ['◎','Conocimiento contextual'],
      ['▦','Agenda inteligente']
    ];
    ribbon.innerHTML = items.map(([icon,label])=>`<span class="ribbon-pill"><span>${icon}</span><span>${label}</span></span>`).join('');
    const actions = $('.hero-actions', hero);
    if(actions) actions.insertAdjacentElement('afterend', ribbon);

    const strip = document.createElement('div');
    strip.className = 'experience-marquee';
    const chips = [
      'Diseño claro y rápido','Mesa de servicios multidependencia','Radicación por pasos','Calendario visual','Prioridades claras','Experiencia responsive','Centro de conocimiento','Workflows configurables','Catálogo vivo','Auditoría del sistema'
    ];
    const full = chips.concat(chips);
    strip.innerHTML = `<div class="experience-track">${full.map(t=>`<span class="experience-chip">✦ ${t}</span>`).join('')}</div>`;
    hero.insertAdjacentElement('afterend', strip);
  }

  function decorateButtons(scope=document){
    $$('button, .btn, .nav-item, .service-card', scope).forEach(btn=>{
      if(btn.dataset.v07Aligned) return;
      btn.dataset.v07Aligned = '1';
      btn.style.justifyContent = btn.classList.contains('nav-item') || btn.classList.contains('service-card') ? '' : 'center';
    });
  }

  function decorateCharts(scope=document){
    $$('.bar', scope).forEach((bar, i)=>{
      if(bar.dataset.animated) return;
      bar.dataset.animated = '1';
      bar.style.animationDelay = `${i * 80}ms`;
    });
  }

  function elevateActiveNav(){
    const active = $('.nav-item.active');
    $$('.nav-item').forEach(item=>item.removeAttribute('data-current'));
    if(active) active.setAttribute('data-current','true');
  }

  function attachRipple(scope=document){
    $$('button.btn, .icon-btn, .nav-item, .service-card, .scheduler-tool, .zoom-btn', scope).forEach(el=>{
      if(el.dataset.rippleBound) return;
      el.dataset.rippleBound = '1';
      el.addEventListener('pointerdown', e=>{
        const rect = el.getBoundingClientRect();
        const span = document.createElement('span');
        span.className = 'ripple-dot';
        span.style.cssText = `position:absolute;left:${e.clientX-rect.left}px;top:${e.clientY-rect.top}px;width:8px;height:8px;border-radius:999px;background:rgba(255,255,255,.55);transform:translate(-50%,-50%) scale(1);pointer-events:none;opacity:.8;animation:rippleFade .65s ease-out forwards;`;
        if(getComputedStyle(el).position === 'static') el.style.position = 'relative';
        el.style.overflow = 'hidden';
        el.appendChild(span);
        setTimeout(()=>span.remove(),700);
      });
    });
  }

  function ensureRippleStyle(){
    if($('#v07-ripple-style')) return;
    const style = document.createElement('style');
    style.id = 'v07-ripple-style';
    style.textContent = '@keyframes rippleFade{from{opacity:.55;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-50%) scale(18)}}';
    document.head.appendChild(style);
  }



  const svgIcons = {
    home:'<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-5h5v5"/></svg>',
    plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    tickets:'<svg viewBox="0 0 24 24"><path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    bell:'<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>',
    book:'<svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5A2.5 2.5 0 0 1 20 21.5v-16Z"/></svg>',
    pulse:'<svg viewBox="0 0 24 24"><path d="M3 12h4l2.2-5 4.3 10 2.2-5H21"/></svg>',
    calendar:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    ops:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 9h10M7 13h6M7 17h8"/></svg>',
    warning:'<svg viewBox="0 0 24 24"><path d="m12 4 9 16H3L12 4Z"/><path d="M12 9v5M12 17.5v.5"/></svg>',
    team:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 20c.5-4 2.5-6 5.5-6s5 2 5.5 6M14 15c3-.4 5.3 1.4 6 4"/></svg>',
    asset:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    catalog:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>',
    report:'<svg viewBox="0 0 24 24"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>',
    workflow:'<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8.5 6h7M7.2 8.2l3.7 7.2M16.8 8.2l-3.7 7.2"/></svg>',
    settings:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 10h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>',
    communication:'<svg viewBox="0 0 24 24"><path d="M4 11v2a2 2 0 0 0 2 2h2l4 4v-4h3a5 5 0 0 0 5-5V6a2 2 0 0 0-2-2H8a4 4 0 0 0-4 4v3Z"/></svg>',
    mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
    globe:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg>',
    app:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 9h8M8 13h5M8 17h3"/></svg>'
  };

  function installSvgIcons(){
    const map={
      home:'home','new-request':'plus','my-tickets':'tickets','notifications':'bell','knowledge':'book','status':'pulse','calendar':'calendar',
      ops:'ops','continuity':'warning','team':'team','assets':'asset','catalog':'catalog','reports':'report','workflows':'workflow','admin':'settings'
    };
    $$('.nav-item').forEach(item=>{
      const icon=$('.nav-icon',item); const key=map[item.dataset.view];
      if(icon && key && !icon.dataset.svgIcon){icon.innerHTML=svgIcons[key];icon.dataset.svgIcon='1';}
    });
    $$('.service-card').forEach(card=>{
      const icon=$('.service-icon',card); if(!icon || icon.dataset.svgIcon) return;
      const id=card.dataset.service||'';
      const key=/correo/.test(id)?'mail':/internet|web/.test(id)?'globe':/public|cubr|revision/.test(id)?'communication':/desarrollo|aplic/.test(id)?'app':'catalog';
      icon.innerHTML=svgIcons[key];icon.dataset.svgIcon='1';
    });
  }

  function installMobileNavigation(){
    if($('.mobile-dock')) return;
    const dock=document.createElement('nav');
    dock.className='mobile-dock';
    dock.setAttribute('aria-label','Navegación rápida');
    const items=[['home','home','Inicio'],['my-tickets','tickets','Solicitudes'],['new','plus','Radicar'],['calendar','calendar','Agenda'],['notifications','bell','Novedades']];
    dock.innerHTML=items.map(([view,icon,label])=>`<button type="button" ${view==='new'?'class="dock-create" data-action="open-new-request"':`data-view-link="${view}"`}><span>${svgIcons[icon]}</span><span>${label}</span></button>`).join('');
    document.body.appendChild(dock);
    dock.addEventListener('click',e=>{
      const b=e.target.closest('button'); if(!b) return;
      if(b.dataset.viewLink){
        const target=$(`.nav-item[data-view="${b.dataset.viewLink}"]`);
        target?.click();
      } else if(b.dataset.action==='open-new-request'){
        $('[data-action="open-new-request"]:not(.dock-create)')?.click();
      }
      setTimeout(syncMobileDock,40);
    });
    syncMobileDock();
  }

  function syncMobileDock(){
    const active=$('.nav-item.active')?.dataset.view;
    $$('.mobile-dock button').forEach(b=>b.classList.toggle('active',b.dataset.viewLink===active));
  }

  function installSidebarScrim(){
    if($('.sidebar-scrim')) return;
    const scrim=document.createElement('div');scrim.className='sidebar-scrim';document.body.appendChild(scrim);
    const side=$('#sidebar');
    const sync=()=>scrim.classList.toggle('visible',side?.classList.contains('open')&&innerWidth<981);
    $('#menuToggle')?.addEventListener('click',()=>setTimeout(sync,0));
    scrim.addEventListener('click',()=>{side?.classList.remove('open');sync();});
    window.addEventListener('resize',sync,{passive:true});
  }

  function enhanceView(){
    applyScreenClass();
    decorateHero();
    installSvgIcons();
    installMobileNavigation();
    installSidebarScrim();
    syncMobileDock();
    decorateButtons();
    decorateCharts();
    elevateActiveNav();
    attachMotion();
    attachRipple();
  }

  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});

  document.addEventListener('DOMContentLoaded', ()=>{
    ensureRippleStyle();
    enhanceView();

    const mo = new MutationObserver(()=>enhanceView());
    mo.observe(document.body,{childList:true, subtree:true});

    window.addEventListener('resize', applyScreenClass, {passive:true});
    document.addEventListener('click', e=>{
      const nav = e.target.closest('[data-view],[data-view-link],.nav-item');
      if(nav) requestAnimationFrame(enhanceView);
    });
  });
})();
