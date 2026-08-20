(function(){
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));

  const icons={
    home:'<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/></svg>',
    'new-request':'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    'my-tickets':'<svg viewBox="0 0 24 24"><rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    notifications:'<svg viewBox="0 0 24 24"><path d="M6.5 9a5.5 5.5 0 0 1 11 0c0 6 2.5 6 2.5 7.5H4c0-1.5 2.5-1.5 2.5-7.5Z"/><path d="M10 20h4"/></svg>',
    knowledge:'<svg viewBox="0 0 24 24"><path d="M4.5 5.5c3-1.5 5.5-1.3 7.5.3v14c-2-1.6-4.5-1.8-7.5-.3Z"/><path d="M19.5 5.5c-3-1.5-5.5-1.3-7.5.3v14c2-1.6 4.5-1.8 7.5-.3Z"/></svg>',
    status:'<svg viewBox="0 0 24 24"><path d="M3 12h4l2-4 4 8 2-4h6"/></svg>',
    calendar:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M7.5 3v4M16.5 3v4M3.5 9h17"/></svg>',
    ops:'<svg viewBox="0 0 24 24"><rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M7 9h10M7 13h6M7 17h8"/></svg>',
    continuity:'<svg viewBox="0 0 24 24"><path d="M12 3 2.8 19h18.4Z"/><path d="M12 9v4M12 16.5v.1"/></svg>',
    team:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 20c.4-4 2.4-6 5.5-6s5.1 2 5.5 6M14.5 15.5c3.2 0 5.1 1.5 5.5 4.5"/></svg>',
    assets:'<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="11" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    catalog:'<svg viewBox="0 0 24 24"><path d="m12 3 8 4.5-8 4.5-8-4.5Z"/><path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5"/></svg>',
    reports:'<svg viewBox="0 0 24 24"><path d="M5 19V9M12 19V5M19 19v-7"/></svg>',
    workflows:'<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8.5 6h7M7.5 8l3.2 7.5M16.5 8l-3.2 7.5"/></svg>',
    admin:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1A7 7 0 0 0 14.8 6L14.5 3h-5L9.2 6a7 7 0 0 0-1.7 1.1l-2.4-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1A7 7 0 0 0 9.2 18l.3 3h5l.3-3a7 7 0 0 0 1.7-1.1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z"/></svg>'
  };

  function installIcons(){
    $$('.nav-item[data-view]').forEach(btn=>{
      const key=btn.dataset.view,box=$('.nav-icon',btn);
      if(box&&icons[key]) box.innerHTML=icons[key];
    });
  }

  function ensureMobileDock(){
    if($('.mobile-dock')) return;
    const dock=document.createElement('nav');
    dock.className='mobile-dock';
    dock.setAttribute('aria-label','Navegación rápida');
    const items=[
      ['home','Inicio'],['my-tickets','Solicitudes'],['new-request','Radicar'],['calendar','Agenda'],['notifications','Novedades']
    ];
    dock.innerHTML=items.map(([view,label])=>`<button type="button" data-mobile-view="${view}" class="${view==='new-request'?'radicar':''}">${icons[view]||''}<span>${label}</span></button>`).join('');
    document.body.appendChild(dock);
    dock.addEventListener('click',e=>{
      const btn=e.target.closest('[data-mobile-view]');if(!btn)return;
      if(btn.dataset.mobileView==='new-request'){
        if(typeof openRequestModal==='function') openRequestModal();
      }else if(typeof setView==='function') setView(btn.dataset.mobileView);
      syncMobileDock();
    });
  }

  function syncMobileDock(){
    const active=$('.nav-item.active[data-view]')?.dataset.view||'home';
    $$('.mobile-dock [data-mobile-view]').forEach(b=>b.classList.toggle('active',b.dataset.mobileView===active));
  }

  function installMobileBrand(){
    if($('.topbar-mini-brand')) return;
    const top=$('.topbar');if(!top)return;
    const brand=document.createElement('div');
    brand.className='topbar-mini-brand';
    brand.innerHTML='<img src="assets/logo-san-pedro-crop.png" alt=""><strong>Mesa de Ayuda TIC</strong>';
    const menu=$('#menuToggle');
    if(menu) menu.insertAdjacentElement('afterend',brand);
  }

  function ensureActiveViewContent(){
    const active=$('.view.active');
    if(!active)return;
    if(active.children.length===0 && typeof renderView==='function'){
      const name=active.id.replace('view-','');
      try{renderView(name);}catch(err){console.error('No fue posible reconstruir la vista',name,err);}
    }
  }

  function addCalendarHeaderAccent(){
    const cal=$('#view-calendar .calendar-page-head');
    if(!cal||$('.calendar-brand-chip',cal))return;
    const chip=document.createElement('div');
    chip.className='calendar-brand-chip';
    chip.innerHTML='<span>Agenda visual</span><strong>Disponibilidad + carga + reserva</strong>';
    const actions=$('.calendar-head-actions',cal);
    if(actions) actions.insertAdjacentElement('beforebegin',chip);
  }

  function enhanceCurrentView(){
    ensureActiveViewContent();
    addCalendarHeaderAccent();
    syncMobileDock();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    installIcons();
    ensureMobileDock();
    installMobileBrand();
    setTimeout(enhanceCurrentView,50);

    document.addEventListener('click',e=>{
      if(e.target.closest('[data-view],[data-view-link],.nav-item,[data-calendar-view],[data-calendar-nav]')){
        setTimeout(enhanceCurrentView,30);
      }
    });

    window.addEventListener('resize',()=>{
      if(innerWidth>=980) $('#sidebar')?.classList.remove('open');
    },{passive:true});
  });
})();
