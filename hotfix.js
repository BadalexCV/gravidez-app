// Luma V4.2 — UI refinements requested by Bruno
(() => {
  try {
    state.timelineUntil = state.timelineUntil || todayIso();

    const css = `
      .compact-brand img{width:44px!important;height:44px!important;border-radius:14px!important}
      .compact-brand>div{display:none!important}
      .bottom-nav.bottom-nav-4{grid-template-columns:repeat(4,1fr)!important}
      @media(max-width:720px){.bottom-nav.bottom-nav-4{grid-template-columns:repeat(4,1fr)!important}}
      .home-view{gap:16px}
      .home-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:12px}
      .home-title{margin:.2rem 0 0;font-size:1.8rem}
      .compact-btn{padding:10px 14px!important;border-radius:16px!important}
      .home-stats{grid-template-columns:repeat(3,minmax(0,1fr))!important}
      .home-stats .stat{min-height:96px}
      .small-value{font-size:1rem!important;line-height:1.35}
      .phase-card{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:flex-start;padding:20px}
      .phase-mark{width:48px;height:48px;border-radius:16px;background:var(--soft);display:grid;place-items:center;font-size:1.5rem}
      .phase-text{font-size:1rem;line-height:1.55;margin:.35rem 0}
      .quick-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
      .quick-card{border:1px solid var(--line);background:var(--card);border-radius:22px;padding:16px;display:flex;flex-direction:column;gap:10px;align-items:flex-start;color:var(--text);box-shadow:var(--shadow)}
      .quick-card span{font-size:1.35rem}
      @media(max-width:680px){
        .home-stats{grid-template-columns:repeat(3,1fr)!important;gap:8px}
        .home-stats .stat{padding:11px;min-height:88px}
        .home-stats .value{font-size:1.02rem}
        .quick-grid{grid-template-columns:repeat(3,1fr);gap:8px}
        .quick-card{padding:12px;font-size:.8rem}
        .phase-card{grid-template-columns:1fr}.phase-mark{display:none}
      }
      .elegant-calendar{padding:16px 14px 14px!important}
      .compact-calendar-head{margin-bottom:10px!important}
      .calendar-nav-row{display:grid;grid-template-columns:auto minmax(0,1fr) 88px auto;gap:8px;align-items:center;margin-bottom:16px}
      .calendar-select{border:1px solid var(--line);background:#fff;border-radius:14px;padding:10px 12px;color:var(--text);text-transform:capitalize;width:100%}
      .year-select{min-width:82px}
      .month-arrow{width:38px;height:38px;border-radius:13px;border:1px solid var(--line);background:#fff;font-size:1.5rem;color:var(--text)}
      .calendar-grid-compact{gap:5px!important}
      .elegant-day{aspect-ratio:1/1!important;min-height:auto!important;border:none!important;background:transparent!important;border-radius:16px!important;padding:5px!important;align-items:center!important;justify-content:flex-start!important;gap:4px!important}
      .elegant-day.today{outline:none!important;background:#3f372f!important;color:#fff!important}
      .elegant-day.other{opacity:.25!important}
      .elegant-day .day-num{font-size:.9rem;line-height:1;display:block;margin-top:3px}
      .day-dots{display:flex;gap:3px;min-height:5px;justify-content:center}
      .day-dots i{display:block;width:4px;height:4px;border-radius:999px;background:currentColor;opacity:.72}
      .today-link{display:block;margin:12px auto 0;border:none;background:transparent;color:var(--muted);font-weight:700;padding:6px 10px}
      .charts-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
      @media(max-width:720px){.charts-grid{grid-template-columns:1fr}}
      .chart-card{padding:16px}.trend-chart{width:100%;height:auto;margin-top:8px;overflow:visible}
      .chart-axis{stroke:#dfd4c8;stroke-width:1}.chart-line{fill:none;stroke:#8f9b7c;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}.chart-point{fill:#5f6952;stroke:#fff;stroke-width:2}
      .chart-labels{display:flex;justify-content:space-between;color:var(--muted);font-size:.78rem;margin-top:-2px}.chart-empty{padding:18px}
      .overview-modal-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
      .more-menu-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
      .more-menu-card{border:1px solid var(--line);background:#fff;border-radius:20px;padding:16px;display:flex;gap:12px;align-items:center;text-align:left;color:var(--text)}
      .more-menu-card>span{font-size:1.35rem;width:30px;text-align:center}.more-menu-card strong{display:block}.more-menu-card small{display:block;color:var(--muted);margin-top:3px}
      @media(max-width:520px){.more-menu-grid{grid-template-columns:1fr}.overview-modal-grid{grid-template-columns:1fr}}
    `;
    let style = document.getElementById('luma-v42-style');
    if(!style){ style=document.createElement('style'); style.id='luma-v42-style'; document.head.appendChild(style); }
    style.textContent = css;

    shell = function(viewHtml){
      const displayName = state.member?.display_name || state.user?.email?.split('@')[0] || 'U';
      const moreActive = ['records','shopping','timeline'].includes(state.currentView);
      return `
      <header class="topbar">
        <div class="title-wrap compact-brand"><img src="icons/icon.svg" alt="Luma" /></div>
        <div class="top-actions">
          <span class="sync-dot" title="Sincronizado"></span>
          <button id="overviewBtn" class="icon-btn" aria-label="Visão geral">◎</button>
          <button id="quickAddBtn" class="icon-btn" aria-label="Adicionar">＋</button>
          <button id="profileBtn" class="avatar-btn">${esc(initials(displayName))}</button>
        </div>
      </header>
      <main class="content">${viewHtml}</main>
      <nav class="bottom-nav bottom-nav-4">
        ${navBtn('home','⌂','Início')}
        ${navBtn('agenda','□','Compromissos')}
        ${navBtn('ultrasounds','▧','Eco')}
        <button id="moreNavBtn" class="${moreActive?'active':''}"><span class="nav-icon">•••</span><span>Mais</span></button>
      </nav>`;
    };

    pregnancyPhaseInfo = function(){
      const raw = weekStringFromPregnancy(state.pregnancy);
      const week = Number(String(raw).split('+')[0]);
      if(!Number.isFinite(week)) return {title:'A acompanhar', text:'À medida que forem sendo adicionados dados, esta área acompanha a fase atual da gravidez.'};
      if(week <= 5) return {title:`Semana ${week}`, text:'É uma fase muito inicial. As principais estruturas começam a formar-se e cada gravidez pode evoluir a um ritmo ligeiramente diferente.'};
      if(week <= 7) return {title:`Semana ${week}`, text:'Por volta desta fase, o embrião cresce rapidamente e começam a definir-se estruturas dos membros, face e órgãos principais. A atividade cardíaca pode já ser observada em ecografia.'};
      if(week <= 9) return {title:`Semana ${week}`, text:'O corpo ganha uma forma cada vez mais definida, com braços e pernas em desenvolvimento e crescimento rápido das estruturas principais.'};
      if(week <= 12) return {title:`Semana ${week}`, text:'A fase fetal aproxima-se ou já começou. Os órgãos continuam a desenvolver-se e os movimentos tornam-se mais coordenados, embora ainda não sejam sentidos.'};
      if(week <= 16) return {title:`Semana ${week}`, text:'O crescimento acelera, os ossos e músculos continuam a desenvolver-se e os traços do rosto ficam mais definidos.'};
      if(week <= 20) return {title:`Semana ${week}`, text:'O bebé continua a crescer e os movimentos podem começar a ser sentidos. É também uma fase habitual para avaliação detalhada da anatomia fetal.'};
      if(week <= 24) return {title:`Semana ${week}`, text:'O sistema nervoso, os sentidos e os pulmões continuam a amadurecer, enquanto o bebé ganha tamanho e força.'};
      if(week <= 28) return {title:`Semana ${week}`, text:'Há crescimento cerebral e pulmonar importante e começa uma fase de maior ganho de peso e maturação.'};
      if(week <= 32) return {title:`Semana ${week}`, text:'O bebé ganha gordura corporal e peso, enquanto cérebro, pulmões e outros sistemas continuam a amadurecer.'};
      if(week <= 36) return {title:`Semana ${week}`, text:'A fase é sobretudo de crescimento, ganho de peso e preparação dos órgãos para o nascimento.'};
      return {title:`Semana ${week}`, text:'A gravidez está na fase final. O bebé continua a ganhar peso e a completar a maturação antes do nascimento.'};
    };

    renderHome = function(){
      const due = state.pregnancy?.due_date || calcDueDateFromLmp(state.pregnancy?.lmp);
      const next = nextAppointment();
      const phase = pregnancyPhaseInfo();
      return `<section class="view home-view">
        <div class="home-heading"><div><p class="eyebrow">Hoje</p><h1 class="home-title">${esc(phase.title)}</h1></div><button class="btn ghost compact-btn" id="homeOverviewBtn">Visão geral</button></div>
        <div class="stats home-stats">
          <div class="stat"><div class="muted small">Idade gestacional</div><div class="value">${esc(weekStringFromPregnancy(state.pregnancy))}</div></div>
          <div class="stat"><div class="muted small">DPP</div><div class="value">${esc(fmtDate(due))}</div></div>
          <div class="stat"><div class="muted small">Próximo compromisso</div><div class="value small-value">${next?esc(`${fmtDate(next.appointment_date)} · ${fmtTime(next.appointment_time)}`):'—'}</div></div>
        </div>
        <div class="card phase-card"><div class="phase-mark">◌</div><div><p class="eyebrow">Como está nesta fase</p><h2>${esc(phase.title)}</h2><p class="phase-text">${esc(phase.text)}</p><p class="field-hint">Informação geral de acompanhamento; não substitui a avaliação do obstetra.</p></div></div>
        ${next?`<div class="card next-card"><div class="item-head"><div><p class="eyebrow">Próximo</p><h2>${esc(next.title||TYPE_LABELS[next.type]||'Compromisso')}</h2><p class="muted">${fmtDate(next.appointment_date)} · ${fmtTime(next.appointment_time)}${next.location?' · '+esc(next.location):''}</p></div><button class="btn secondary compact-btn" data-edit-appointment="${next.id}">Ver</button></div></div>`:''}
        <div class="quick-grid">
          <button class="quick-card" data-quick-type="appointment"><span>＋</span><strong>Compromisso</strong></button>
          <button class="quick-card" data-quick-type="ultrasound"><span>▧</span><strong>Ecografia</strong></button>
          <button class="quick-card" data-quick-type="record"><span>≡</span><strong>Registo</strong></button>
        </div>
      </section>`;
    };

    renderAgenda = function(){
      const base = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth(), 1);
      const start = new Date(base); start.setDate(1 - ((base.getDay()+6)%7));
      const days=[]; for(let i=0;i<42;i++){ const d=new Date(start); d.setDate(start.getDate()+i); days.push(d); }
      const eventsByDate = {};
      for(const a of state.appointments){ (eventsByDate[a.appointment_date] ||= []).push(a); }
      const month=state.calendarDate.getMonth(), year=state.calendarDate.getFullYear();
      const years=[]; for(let y=year-3;y<=year+5;y++) years.push(y);
      return `<section class="view">
        <div class="calendar-wrap elegant-calendar">
          <div class="calendar-head compact-calendar-head"><div><p class="eyebrow">Agenda</p><h2>Calendário</h2></div><button class="btn" id="newAppointmentBtn">Novo</button></div>
          <div class="calendar-nav-row">
            <button class="month-arrow" id="prevMonthBtn">‹</button>
            <select class="calendar-select" id="calendarMonthSelect">${Array.from({length:12},(_,i)=>`<option value="${i}" ${i===month?'selected':''}>${new Date(2026,i,1).toLocaleDateString('pt-PT',{month:'long'})}</option>`).join('')}</select>
            <select class="calendar-select year-select" id="calendarYearSelect">${years.map(y=>`<option value="${y}" ${y===year?'selected':''}>${y}</option>`).join('')}</select>
            <button class="month-arrow" id="nextMonthBtn">›</button>
          </div>
          <div class="calendar-grid calendar-grid-compact">${['S','T','Q','Q','S','S','D'].map(x=>`<div class="calendar-weekday">${x}</div>`).join('')}${days.map(d=>renderCalendarDay(d,month,eventsByDate[d.toISOString().slice(0,10)]||[])).join('')}</div>
          <button class="today-link" id="todayBtn">Ir para hoje</button>
        </div>
        <div class="list agenda-list">${state.appointments.length?state.appointments.map(a=>appointmentCard(a)).join(''):'<div class="note-box">Ainda não tens compromissos.</div>'}</div>
      </section>`;
    };

    renderCalendarDay = function(d,currentMonth,events){
      const iso=d.toISOString().slice(0,10), other=d.getMonth()!==currentMonth, today=iso===todayIso();
      return `<button class="day elegant-day ${other?'other':''} ${today?'today':''}" data-day="${iso}"><span class="day-num">${d.getDate()}</span>${events.length?`<span class="day-dots">${events.slice(0,3).map(()=>'<i></i>').join('')}</span>`:''}</button>`;
    };

    renderRecordCharts = function(){
      const numeric=state.records.map(r=>({...r,n:Number(String(r.value??'').replace(',','.'))})).filter(r=>r.value!==null&&r.value!==''&&Number.isFinite(r.n));
      const groups={}; for(const r of numeric){ const key=`${r.type||'registo'}|${r.unit||''}`; (groups[key] ||= []).push(r); }
      const charts=Object.values(groups).filter(g=>g.length>=2).slice(0,3);
      if(!charts.length) return `<div class="card chart-empty"><p class="eyebrow">Evolução</p><h2>Gráficos</h2><p class="muted">Os gráficos aparecem automaticamente quando existirem pelo menos dois registos numéricos do mesmo tipo.</p></div>`;
      return `<div class="charts-grid">${charts.map(g=>recordChart(g)).join('')}</div>`;
    };
    recordChart = function(rows){
      rows=[...rows].sort((a,b)=>a.record_date.localeCompare(b.record_date)); const values=rows.map(r=>r.n), min=Math.min(...values), max=Math.max(...values), span=(max-min)||1;
      const w=320,h=130,pad=18,pts=rows.map((r,i)=>{const x=pad+(i/(rows.length-1||1))*(w-pad*2),y=h-pad-((r.n-min)/span)*(h-pad*2);return[x,y]});
      const poly=pts.map(p=>p.join(',')).join(' '), label=rows[rows.length-1].type||rows[rows.length-1].title||'Registo', unit=rows[rows.length-1].unit||'';
      return `<div class="card chart-card"><div class="item-head"><div><p class="eyebrow">Evolução</p><h2>${esc(label)}</h2></div><strong>${esc(values[values.length-1])} ${esc(unit)}</strong></div><svg viewBox="0 0 ${w} ${h}" class="trend-chart"><line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" class="chart-axis"/><polyline points="${poly}" class="chart-line"/>${pts.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="4" class="chart-point"><title>${fmtDate(rows[i].record_date)}: ${rows[i].n} ${esc(unit)}</title></circle>`).join('')}</svg><div class="chart-labels"><span>${fmtDate(rows[0].record_date)}</span><span>${fmtDate(rows[rows.length-1].record_date)}</span></div></div>`;
    };
    renderRecords = function(){ return `<section class="view"><div class="item-head"><div><p class="eyebrow">Registos</p><h2>Análises, peso, tensões e notas</h2></div><button class="btn" id="newRecordBtn">Novo registo</button></div>${renderRecordCharts()}<div class="list">${state.records.length?state.records.map(recordCard).join(''):'<div class="note-box">Ainda não tens registos.</div>'}</div></section>`; };

    openOverview = function(){
      openModal({eyebrow:'Visão geral',title:'Acompanhamento',html:`<div class="overview-modal-grid"><div class="kpi"><div class="muted small">DUM</div><strong>${fmtDate(state.pregnancy?.lmp)}</strong></div><div class="kpi"><div class="muted small">DPP</div><strong>${fmtDate(state.pregnancy?.due_date||calcDueDateFromLmp(state.pregnancy?.lmp))}</strong></div><div class="kpi"><div class="muted small">Clínica</div><strong>${esc(state.pregnancy?.clinic||'—')}</strong></div><div class="kpi"><div class="muted small">Médico/a</div><strong>${esc(state.pregnancy?.doctor||'—')}</strong></div></div><div><div class="muted small">Código de ligação</div><div class="code-box">${esc(state.pregnancy?.join_code||'—')}</div></div><button class="btn secondary full" type="button" id="editOverviewBtn">Editar dados</button>`,onSubmit:async()=>{},afterOpen(){document.getElementById('editOverviewBtn').onclick=()=>{closeModal();openPregnancyEdit();}}});
    };
    openMoreMenu = function(){
      openModal({eyebrow:'Mais',title:'Outras áreas',html:`<div class="more-menu-grid"><button type="button" class="more-menu-card" data-more-view="records"><span>≡</span><div><strong>Registos</strong><small>Análises, peso e gráficos</small></div></button><button type="button" class="more-menu-card" data-more-view="shopping"><span>🛒</span><div><strong>Compras</strong><small>Lista e orçamento</small></div></button><button type="button" class="more-menu-card" data-more-view="timeline"><span>◌</span><div><strong>Timeline</strong><small>Histórico e PDF</small></div></button><button type="button" class="more-menu-card" id="moreProfileBtn"><span>☺</span><div><strong>Perfil</strong><small>Acessos e notificações</small></div></button></div>`,onSubmit:async()=>{},afterOpen(){modalForm.querySelectorAll('[data-more-view]').forEach(b=>b.onclick=()=>{state.currentView=b.dataset.moreView;closeModal();renderApp()});document.getElementById('moreProfileBtn').onclick=()=>{closeModal();openProfile()}}});
    };

    const baseBind = bindViewActions;
    bindViewActions = function(){
      baseBind();
      document.getElementById('homeOverviewBtn')?.addEventListener('click',openOverview);
      document.getElementById('calendarMonthSelect')?.addEventListener('change',e=>{state.calendarDate=new Date(state.calendarDate.getFullYear(),Number(e.target.value),1);renderApp()});
      document.getElementById('calendarYearSelect')?.addEventListener('change',e=>{state.calendarDate=new Date(Number(e.target.value),state.calendarDate.getMonth(),1);renderApp()});
      const old=document.getElementById('timelineUntil');
      if(old){ const fresh=old.cloneNode(true); fresh.value=state.timelineUntil||todayIso(); old.replaceWith(fresh); fresh.addEventListener('change',e=>{state.timelineUntil=e.target.value||todayIso();renderApp()}); }
    };

    renderApp = function(){
      let html='';
      if(state.currentView==='home') html=renderHome();
      if(state.currentView==='agenda') html=renderAgenda();
      if(state.currentView==='ultrasounds') html=renderUltrasounds();
      if(state.currentView==='records') html=renderRecords();
      if(state.currentView==='shopping') html=renderShopping();
      if(state.currentView==='timeline') html=renderTimeline();
      app.innerHTML=shell(html);
      app.querySelectorAll('[data-nav]').forEach(btn=>btn.onclick=()=>{state.currentView=btn.dataset.nav;renderApp()});
      document.getElementById('profileBtn').onclick=openProfile;
      document.getElementById('quickAddBtn').onclick=openQuickAdd;
      document.getElementById('overviewBtn').onclick=openOverview;
      document.getElementById('moreNavBtn').onclick=openMoreMenu;
      bindViewActions();
    };

    const originalExportPdf = exportPdf;
    exportPdf = async function(){ const input=document.getElementById('timelineUntil'); if(input?.value) state.timelineUntil=input.value; return originalExportPdf(); };
    const originalDeleteRow = deleteRow;
    deleteRow = async function(table,id,okMsg='Eliminado',silent=false){ await originalDeleteRow(table,id,okMsg,silent); if(silent) await refreshAll(); };

    setTimeout(()=>{ if(state?.user && state?.pregnancy) renderApp(); },80);
  } catch(e){ console.warn('Luma V4.2 hotfix not applied',e); }
})();

// Luma V4.3 — ecografia visual com miniatura e preview
(() => {
  try {
    const photoCss = `
      .eco-card-visual{padding:0!important;overflow:hidden}
      .eco-thumb-button{display:block;width:100%;border:0;background:#eee7df;padding:0;position:relative;aspect-ratio:16/9;overflow:hidden;text-align:left}
      .eco-thumb-button img{width:100%;height:100%;object-fit:cover;display:block}
      .eco-thumb-loading,.eco-thumb-empty{width:100%;height:100%;display:grid;place-items:center;color:var(--muted);background:linear-gradient(145deg,#f2ebe4,#e9ded4);font-weight:700}
      .eco-thumb-empty{font-weight:500}
      .eco-card-body{padding:16px}
      .eco-preview-img{width:100%;max-height:72vh;object-fit:contain;border-radius:22px;background:#171411;display:block}
      .eco-image-meta{margin-top:10px;color:var(--muted);font-size:.9rem}
      .eco-current-image{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px solid var(--line);border-radius:18px;background:#fbf6f0}
      .eco-current-image span:first-child{font-size:1.25rem}
    `;
    const s=document.createElement('style'); s.id='luma-v43-eco-style'; s.textContent=photoCss; document.head.appendChild(s);

    firstEcoPath = function(media){
      if(!media) return '';
      if(Array.isArray(media)) return media.find(Boolean) || '';
      if(typeof media === 'object') return media.path || media.url || '';
      const raw=String(media).trim();
      if(!raw) return '';
      if(raw.startsWith('[')){
        try { const arr=JSON.parse(raw); if(Array.isArray(arr)) return arr.find(Boolean)||''; } catch {}
      }
      return raw.split(/\r?\n/).map(x=>x.trim()).find(Boolean) || raw;
    };

    ultrasoundCard = function(u){
      const data=u.baby_data||{};
      const insights=getReferenceInsights(u.gestational_age,data);
      const path=firstEcoPath(u.media_path);
      const photo = path
        ? `<button type="button" class="eco-thumb-button" data-eco-path="${esc(path)}" data-eco-title="${esc(u.title||'Ecografia')}"><div class="eco-thumb-loading">A carregar imagem…</div></button>`
        : `<div class="eco-thumb-button"><div class="eco-thumb-empty">Sem imagem associada</div></div>`;
      return `<div class="item-card eco-card-visual">
        ${photo}
        <div class="eco-card-body">
          <div class="item-head">
            <div><h2>${esc(u.title||'Ecografia')}</h2><p class="muted">${fmtDate(u.exam_date)} · ${esc(u.gestational_age||'—')} semanas${u.clinic?' · '+esc(u.clinic):''}</p></div>
            <div class="item-actions"><button class="icon-btn" data-edit-ultrasound="${u.id}">✎</button><button class="icon-btn" data-delete-ultrasound="${u.id}">🗑</button></div>
          </div>
          <div class="chips">
            ${data.crl_mm?`<span class="chip">CRL ${esc(data.crl_mm)} mm</span>`:''}
            ${data.fhr_bpm?`<span class="chip">FCF ${esc(data.fhr_bpm)} bpm</span>`:''}
            ${data.bpd_mm?`<span class="chip">BPD ${esc(data.bpd_mm)} mm</span>`:''}
            ${data.efw_g?`<span class="chip">Peso est. ${esc(data.efw_g)} g</span>`:''}
          </div>
          ${insights.length?`<div class="chips">${insights.map(i=>`<span class="chip ${i.state==='ok'?'ok':'warn'}">${esc(i.label)} · ${esc(i.text)}</span>`).join('')}</div>`:''}
          ${u.notes?`<p>${esc(u.notes)}</p>`:''}
          <p class="field-hint">Comparação meramente informativa; a interpretação clínica cabe ao/à obstetra ou ecografista.</p>
        </div>
      </div>`;
    };

    renderUltrasounds = function(){
      return `<section class="view">
        <div class="item-head"><div><p class="eyebrow">Ecografias</p><h2>Imagens, medições e evolução</h2></div><button class="btn" id="newUltrasoundBtn">Nova ecografia</button></div>
        <div class="list">${state.ultrasounds.length?state.ultrasounds.map(u=>ultrasoundCard(u)).join(''):'<div class="note-box">Ainda não tens ecografias registadas.</div>'}</div>
      </section>`;
    };

    openEcoPreview = function(url,title){
      openModal({
        eyebrow:'Ecografia',
        title:title||'Imagem',
        html:`<img class="eco-preview-img" src="${esc(url)}" alt="${esc(title||'Ecografia')}" /><p class="eco-image-meta">Toca fora ou no × para fechar.</p>`,
        onSubmit:async()=>{}
      });
    };

    loadUltrasoundImages = async function(){
      const nodes=[...document.querySelectorAll('[data-eco-path]')];
      await Promise.all(nodes.map(async el=>{
        if(el.dataset.loaded==='1') return;
        const path=el.dataset.ecoPath;
        try{
          const {data,error}=await state.client.storage.from('pregnancy-files').createSignedUrl(path,3600);
          if(error) throw error;
          const url=data?.signedUrl;
          if(!url) throw new Error('Sem URL');
          el.innerHTML=`<img src="${esc(url)}" alt="${esc(el.dataset.ecoTitle||'Ecografia')}" loading="lazy" />`;
          el.dataset.loaded='1';
          el.onclick=()=>openEcoPreview(url,el.dataset.ecoTitle||'Ecografia');
        }catch(err){
          console.warn('Falha ao carregar imagem da ecografia',err);
          el.innerHTML='<div class="eco-thumb-empty">Não foi possível carregar a imagem</div>';
        }
      }));
    };

    openUltrasoundModal = function(item={}){
      const data=item.baby_data||{};
      const hasImage=!!firstEcoPath(item.media_path);
      openModal({
        eyebrow:item.id?'Editar ecografia':'Nova ecografia',
        title:item.id?'Editar ecografia':'Nova ecografia',
        html:`
          <div><label>Título</label><input class="input" name="title" value="${esc(item.title||'Ecografia')}" required /></div>
          <div class="grid-2"><div><label>Data</label><input class="input" type="date" name="exam_date" value="${esc(item.exam_date||todayIso())}" required /></div><div><label>Idade gestacional</label><input class="input" name="gestational_age" value="${esc(item.gestational_age||'')}" placeholder="Ex.: 12+4" /></div></div>
          <div class="grid-2"><div><label>Clínica</label><input class="input" name="clinic" value="${esc(item.clinic||'')}" /></div><div><label>Médico/a</label><input class="input" name="doctor" value="${esc(item.doctor||'')}" /></div></div>
          <div class="grid-2"><div><label>CRL (mm)</label><input class="input" type="number" step="0.1" name="crl_mm" value="${esc(data.crl_mm||'')}" /></div><div><label>FCF (bpm)</label><input class="input" type="number" step="1" name="fhr_bpm" value="${esc(data.fhr_bpm||'')}" /></div></div>
          <div class="grid-2"><div><label>BPD (mm)</label><input class="input" type="number" step="0.1" name="bpd_mm" value="${esc(data.bpd_mm||'')}" /></div><div><label>Peso estimado (g)</label><input class="input" type="number" step="1" name="efw_g" value="${esc(data.efw_g||'')}" /></div></div>
          ${hasImage?'<div class="eco-current-image"><span>▧</span><div><strong>Imagem guardada</strong><div class="field-hint">Escolhe uma nova imagem apenas se quiseres substituí-la.</div></div></div>':''}
          <div><label>Imagem da ecografia</label><input class="input" type="file" name="media_file" accept="image/*" /></div>
          <div><label>Notas</label><textarea class="textarea" name="notes">${esc(item.notes||'')}</textarea></div>
          <button class="btn full">Guardar</button>
          ${item.id?'<button class="btn danger full" type="button" id="deleteInlineUltrasound">Eliminar</button>':''}
        `,
        onSubmit:async fd=>{
          const baby_data={
            crl_mm:numOrNull(fd.get('crl_mm')),
            fhr_bpm:numOrNull(fd.get('fhr_bpm')),
            bpd_mm:numOrNull(fd.get('bpd_mm')),
            efw_g:numOrNull(fd.get('efw_g'))
          };
          const row={
            pregnancy_id:state.pregnancy.id,
            title:fd.get('title'),
            exam_date:fd.get('exam_date'),
            gestational_age:fd.get('gestational_age')||null,
            clinic:fd.get('clinic')||null,
            doctor:fd.get('doctor')||null,
            notes:fd.get('notes')||null,
            baby_data
          };
          const file=modalForm.querySelector('[name="media_file"]')?.files?.[0];
          if(file){
            const safe=(file.name||'eco.jpg').replace(/[^a-zA-Z0-9._-]+/g,'-');
            const path=`${state.pregnancy.id}/eco-${crypto.randomUUID()}-${safe}`;
            const up=await state.client.storage.from('pregnancy-files').upload(path,file,{contentType:file.type||'image/jpeg',upsert:false});
            if(up.error) throw up.error;
            row.media_path=path;
          }
          const res=item.id
            ? await state.client.from('ultrasounds').update(row).eq('id',item.id)
            : await state.client.from('ultrasounds').insert(row);
          if(res.error) throw res.error;
        },
        afterOpen(){
          if(item.id) document.getElementById('deleteInlineUltrasound').onclick=async()=>{await deleteRow('ultrasounds',item.id,'Ecografia eliminada',true);closeModal();};
        }
      });
    };

    const bindV42=bindViewActions;
    bindViewActions=function(){
      bindV42();
      if(state.currentView==='ultrasounds') setTimeout(loadUltrasoundImages,0);
    };

    setTimeout(()=>{ if(state?.user&&state?.pregnancy&&state.currentView==='ultrasounds') renderApp(); },100);
  } catch(e){ console.warn('Luma V4.3 eco hotfix not applied',e); }
})();

// Luma V5 — minimal UI + light/dark/system appearance
(() => {
  try {
    const V5_THEME_KEY='luma-theme';
    const systemDark=()=>window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    getThemePreference=()=>localStorage.getItem(V5_THEME_KEY)||'system';
    effectiveTheme=(pref=getThemePreference())=>pref==='system'?(systemDark()?'dark':'light'):pref;
    applyLumaTheme=(pref=getThemePreference())=>{
      localStorage.setItem(V5_THEME_KEY,pref);
      const mode=effectiveTheme(pref);
      document.documentElement.dataset.theme=mode;
      document.documentElement.dataset.themePreference=pref;
      const meta=document.querySelector('meta[name="theme-color"]');
      if(meta) meta.setAttribute('content',mode==='dark'?'#171411':'#f7f2ec');
    };
    applyLumaTheme();
    if(window.matchMedia){
      const mq=window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change',()=>{if(getThemePreference()==='system') applyLumaTheme('system');});
    }

    const css=`
      :root{
        --bg:#f7f2ec!important;
        --surface:#fbf7f2!important;
        --card:#fffdf9!important;
        --line:#e9e0d7!important;
        --text:#2d2926!important;
        --muted:#877d75!important;
        --primary:#2e2925!important;
        --accent:#c98267!important;
        --accent-soft:#f2ddd4!important;
        --green:#8da17e!important;
        --blue:#8da8c4!important;
        --orange:#dca06f!important;
        --soft:#f1e9e1!important;
        --danger:#b96b61!important;
        --shadow:0 5px 18px rgba(69,51,39,.045)!important;
        --nav:rgba(255,253,249,.94);
      }
      html[data-theme="dark"]{
        --bg:#171411!important;
        --surface:#1d1916!important;
        --card:#231e1a!important;
        --line:#39312b!important;
        --text:#f4eee8!important;
        --muted:#aaa097!important;
        --primary:#f1e7df!important;
        --accent:#de8f73!important;
        --accent-soft:#4a3027!important;
        --green:#9fb28e!important;
        --blue:#9eb6cf!important;
        --orange:#e0a774!important;
        --soft:#2b2521!important;
        --danger:#d27f73!important;
        --shadow:0 5px 22px rgba(0,0,0,.15)!important;
        --nav:rgba(29,25,22,.95);
      }
      html,body{background:var(--bg)!important;color:var(--text)!important}
      body{transition:background .18s ease,color .18s ease}
      #app{max-width:760px!important}
      .topbar{
        background:linear-gradient(var(--bg),color-mix(in srgb,var(--bg) 92%,transparent))!important;
        padding:16px 18px 8px!important;
      }
      .compact-brand img{
        width:40px!important;height:40px!important;border-radius:14px!important;
        background:transparent!important;border:0!important;box-shadow:none!important
      }
      .top-actions{gap:8px!important}
      .icon-btn,.avatar-btn{
        background:var(--card)!important;color:var(--text)!important;border:1px solid var(--line)!important;
        width:40px!important;height:40px!important;border-radius:14px!important;box-shadow:none!important
      }
      .sync-dot{width:8px!important;height:8px!important;box-shadow:0 0 0 4px color-mix(in srgb,var(--green) 22%,transparent)!important;background:var(--green)!important}
      .content{padding:8px 18px 8px!important}
      .view{gap:12px!important}
      .card,.item-card,.calendar-wrap,.stat,.kpi{
        background:var(--card)!important;color:var(--text)!important;border:1px solid var(--line)!important;
        box-shadow:var(--shadow)!important
      }
      .card,.item-card{border-radius:24px!important}
      .stat,.kpi{border-radius:18px!important}
      h1,h2,.brand-name,strong,label{color:var(--text)!important}
      .muted,.eyebrow,.field-hint,.calendar-weekday{color:var(--muted)!important}
      .eyebrow{font-size:.74rem!important;letter-spacing:.08em!important}
      .input,.select,.textarea,.calendar-select{
        background:var(--surface)!important;color:var(--text)!important;border:1px solid var(--line)!important;
        border-radius:16px!important
      }
      .btn{border-radius:17px!important;background:var(--text)!important;color:var(--bg)!important;box-shadow:none!important}
      .btn.secondary{background:var(--soft)!important;color:var(--text)!important}
      .btn.ghost{background:transparent!important;color:var(--text)!important;border:1px solid var(--line)!important}
      .btn.danger{background:color-mix(in srgb,var(--danger) 18%,var(--card))!important;color:var(--danger)!important}
      .bottom-nav{
        background:var(--nav)!important;border:1px solid var(--line)!important;box-shadow:0 8px 28px rgba(0,0,0,.08)!important;
        border-radius:22px!important;padding:6px!important;bottom:8px!important
      }
      .bottom-nav button{padding:8px 4px!important;border-radius:16px!important;color:var(--muted)!important}
      .bottom-nav button.active{background:transparent!important;color:var(--accent)!important;box-shadow:none!important}
      .bottom-nav .nav-icon{font-size:1.05rem!important}
      .modal-backdrop{background:rgba(0,0,0,.48)!important}
      .modal-sheet{
        background:var(--card)!important;color:var(--text)!important;border:1px solid var(--line)!important;
        border-radius:28px!important;box-shadow:0 24px 60px rgba(0,0,0,.24)!important
      }

      .v5-home{gap:14px!important}
      .v5-hero{
        text-align:center;padding:24px 16px 14px;display:flex;flex-direction:column;align-items:center
      }
      .v5-hero-logo{
        width:66px;height:66px;object-fit:contain;border-radius:22px;margin-bottom:16px;
        background:transparent
      }
      .v5-week{
        font-size:2.05rem;font-weight:780;letter-spacing:-.035em;line-height:1.05;margin:0;color:var(--text)
      }
      .v5-week-sub{margin:8px 0 0;color:var(--muted);font-size:.95rem}
      .v5-phase{
        padding:16px 17px!important;display:grid!important;grid-template-columns:38px 1fr!important;gap:12px!important;
        align-items:start!important
      }
      .v5-phase-icon{
        width:38px;height:38px;border-radius:13px;background:color-mix(in srgb,var(--green) 16%,var(--card));
        display:grid;place-items:center;font-size:1.2rem
      }
      .v5-phase h2{font-size:1rem!important;margin:1px 0 5px!important}
      .v5-phase p{margin:0!important;font-size:.91rem!important;line-height:1.45!important;color:var(--muted)!important}
      .v5-next{padding:16px 17px!important}
      .v5-next .next-date{font-size:.82rem;color:var(--accent);font-weight:750;margin-bottom:5px}
      .v5-next h2{font-size:1.04rem!important;margin:0!important}
      .v5-next p{font-size:.87rem!important;margin:5px 0 0!important}
      .v5-quick-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
      .v5-quick{
        min-height:82px;border:1px solid var(--line);background:var(--card);color:var(--text);border-radius:20px;
        padding:13px 10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;
        box-shadow:var(--shadow);font-weight:700;font-size:.8rem
      }
      .v5-quick span{font-size:1.18rem;color:var(--accent)}
      .v5-home-overview{display:flex;justify-content:center}
      .v5-home-overview button{font-size:.82rem!important;padding:9px 13px!important}

      .elegant-calendar{padding:15px!important}
      .calendar-nav-row{grid-template-columns:34px minmax(0,1fr) 82px 34px!important;gap:6px!important;margin-bottom:12px!important}
      .month-arrow{width:34px!important;height:34px!important;border-radius:12px!important;background:transparent!important;border:1px solid var(--line)!important;color:var(--text)!important}
      .calendar-select{padding:8px 10px!important;font-size:.88rem!important}
      .calendar-grid-compact{gap:2px!important}
      .elegant-day{
        border-radius:14px!important;padding:5px!important;color:var(--text)!important;min-height:44px!important
      }
      .elegant-day.today{background:var(--accent)!important;color:white!important}
      .day-dots i{background:currentColor!important;opacity:.6!important}
      .today-link{color:var(--muted)!important;font-size:.82rem!important}
      .agenda-list .item-card{padding:14px 15px!important}

      .eco-card-visual{border-radius:24px!important}
      .eco-thumb-button{background:var(--soft)!important}
      .eco-thumb-loading,.eco-thumb-empty{
        background:linear-gradient(145deg,var(--soft),var(--card))!important;color:var(--muted)!important
      }
      .eco-card-body{padding:15px 16px!important}
      .eco-current-image{background:var(--soft)!important;border-color:var(--line)!important}
      .chip{background:var(--soft)!important;border-color:var(--line)!important;color:var(--text)!important}
      .chip.ok{background:color-mix(in srgb,var(--green) 18%,var(--card))!important;color:var(--green)!important}
      .chip.warn{background:color-mix(in srgb,var(--orange) 18%,var(--card))!important;color:var(--orange)!important}
      .chip.info{background:color-mix(in srgb,var(--blue) 18%,var(--card))!important;color:var(--blue)!important}

      .charts-grid{gap:10px!important}
      .chart-card{padding:15px!important}
      .chart-axis{stroke:var(--line)!important}
      .chart-line{stroke:var(--accent)!important}
      .chart-point{fill:var(--accent)!important;stroke:var(--card)!important}
      .note-box{background:var(--soft)!important;border-color:var(--line)!important;color:var(--muted)!important}
      .code-box{background:var(--surface)!important;border-color:var(--line)!important;color:var(--text)!important}

      .more-menu-grid{gap:8px!important}
      .more-menu-card{
        background:var(--surface)!important;border:1px solid var(--line)!important;color:var(--text)!important;
        border-radius:18px!important;padding:14px!important
      }
      .more-menu-card>span{color:var(--accent)!important}
      .more-menu-card small{color:var(--muted)!important}
      .theme-options{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px}
      .theme-option{
        border:1px solid var(--line);background:var(--surface);color:var(--text);border-radius:17px;padding:13px 8px;
        display:flex;flex-direction:column;gap:5px;align-items:center;font-weight:700
      }
      .theme-option.active{border-color:var(--accent);background:var(--accent-soft);color:var(--text)}
      .theme-option span{font-size:1.2rem}
      .appearance-preview{
        border:1px solid var(--line);background:var(--soft);border-radius:20px;padding:16px;margin-bottom:12px
      }

      html[data-theme="dark"] .badge.consulta{background:#4a3425!important;color:#f0ad76!important}
      html[data-theme="dark"] .badge.analise{background:#273526!important;color:#a8c59c!important}
      html[data-theme="dark"] .badge.ecografia{background:#263440!important;color:#a8c6e0!important}
      html[data-theme="dark"] .badge.lembrete{background:#302d2b!important;color:#bbb2ab!important}
      html[data-theme="dark"] .badge.por_comprar{background:#362c25!important;color:#d6ae8b!important}
      html[data-theme="dark"] .badge.comprado{background:#293628!important;color:#a7c39e!important}

      @media(max-width:520px){
        .content{padding-left:14px!important;padding-right:14px!important}
        .v5-week{font-size:1.9rem}
        .v5-hero{padding-top:18px}
        .v5-hero-logo{width:58px;height:58px}
        .v5-quick-grid{gap:8px}
        .v5-quick{min-height:76px;padding:10px 6px}
      }
    `;
    let style=document.getElementById('luma-v5-style');
    if(!style){style=document.createElement('style');style.id='luma-v5-style';document.head.appendChild(style);}
    style.textContent=css;

    gestationalVerbose=function(){
      const raw=weekStringFromPregnancy(state.pregnancy);
      const parts=String(raw).split('+');
      const w=Number(parts[0]), d=Number(parts[1]||0);
      if(!Number.isFinite(w)) return 'Idade gestacional';
      return `${w} ${w===1?'semana':'semanas'} + ${d} ${d===1?'dia':'dias'}`;
    };

    renderHome=function(){
      const next=nextAppointment();
      const phase=pregnancyPhaseInfo();
      return `<section class="view v5-home">
        <div class="v5-hero">
          <img class="v5-hero-logo" src="icons/icon.svg" alt="Luma" />
          <h1 class="v5-week">${esc(gestationalVerbose())}</h1>
          <p class="v5-week-sub">Acompanhamento da gravidez</p>
        </div>

        <div class="card v5-phase">
          <div class="v5-phase-icon">🌱</div>
          <div>
            <h2>Como está nesta fase</h2>
            <p>${esc(phase.text)}</p>
          </div>
        </div>

        ${next?`<div class="card v5-next">
          <div class="item-head">
            <div>
              <div class="next-date">Próximo compromisso · ${fmtDate(next.appointment_date)} · ${fmtTime(next.appointment_time)}</div>
              <h2>${esc(next.title||TYPE_LABELS[next.type]||'Compromisso')}</h2>
              ${next.location?`<p class="muted">${esc(next.location)}</p>`:''}
            </div>
            <button class="btn secondary compact-btn" data-edit-appointment="${next.id}">Ver</button>
          </div>
        </div>`:'<div class="card v5-next"><div class="muted">Sem próximos compromissos.</div></div>'}

        <div class="v5-quick-grid">
          <button class="v5-quick" data-quick-type="appointment"><span>□</span>Compromisso</button>
          <button class="v5-quick" data-quick-type="ultrasound"><span>▧</span>Ecografia</button>
          <button class="v5-quick" data-quick-type="record"><span>≡</span>Registo</button>
        </div>

        <div class="v5-home-overview"><button class="btn ghost compact-btn" id="homeOverviewBtn">Visão geral</button></div>
      </section>`;
    };

    openAppearance=function(){
      const pref=getThemePreference();
      openModal({
        eyebrow:'Definições',
        title:'Aparência',
        html:`
          <div class="appearance-preview">
            <strong>Tema da aplicação</strong>
            <div class="field-hint">Podes escolher manualmente ou acompanhar o modo do telemóvel.</div>
          </div>
          <div class="theme-options">
            <button type="button" class="theme-option ${pref==='light'?'active':''}" data-theme-choice="light"><span>☀</span>Claro</button>
            <button type="button" class="theme-option ${pref==='dark'?'active':''}" data-theme-choice="dark"><span>◐</span>Escuro</button>
            <button type="button" class="theme-option ${pref==='system'?'active':''}" data-theme-choice="system"><span>◉</span>Automático</button>
          </div>
        `,
        onSubmit:async()=>{},
        afterOpen(){
          modalForm.querySelectorAll('[data-theme-choice]').forEach(btn=>{
            btn.onclick=()=>{
              applyLumaTheme(btn.dataset.themeChoice);
              modalForm.querySelectorAll('.theme-option').forEach(x=>x.classList.toggle('active',x===btn));
            };
          });
        }
      });
    };

    openMoreMenu=function(){
      openModal({
        eyebrow:'Mais',
        title:'Outras áreas',
        html:`<div class="more-menu-grid">
          <button type="button" class="more-menu-card" data-more-view="records"><span>≡</span><div><strong>Registos</strong><small>Análises, peso e gráficos</small></div></button>
          <button type="button" class="more-menu-card" data-more-view="shopping"><span>🛒</span><div><strong>Compras</strong><small>Lista e orçamento</small></div></button>
          <button type="button" class="more-menu-card" data-more-view="timeline"><span>◌</span><div><strong>Timeline</strong><small>Histórico e PDF</small></div></button>
          <button type="button" class="more-menu-card" id="moreOverviewBtn"><span>◎</span><div><strong>Visão geral</strong><small>DUM, DPP, clínica e código</small></div></button>
          <button type="button" class="more-menu-card" id="appearanceBtn"><span>◐</span><div><strong>Aparência</strong><small>Claro, escuro ou automático</small></div></button>
          <button type="button" class="more-menu-card" id="moreProfileBtn"><span>☺</span><div><strong>Perfil</strong><small>Acessos e notificações</small></div></button>
        </div>`,
        onSubmit:async()=>{},
        afterOpen(){
          modalForm.querySelectorAll('[data-more-view]').forEach(b=>b.onclick=()=>{state.currentView=b.dataset.moreView;closeModal();renderApp();});
          document.getElementById('moreOverviewBtn').onclick=()=>{closeModal();openOverview();};
          document.getElementById('appearanceBtn').onclick=()=>{closeModal();openAppearance();};
          document.getElementById('moreProfileBtn').onclick=()=>{closeModal();openProfile();};
        }
      });
    };

    shell=function(viewHtml){
      const displayName=state.member?.display_name||state.user?.email?.split('@')[0]||'U';
      const moreActive=['records','shopping','timeline'].includes(state.currentView);
      return `
      <header class="topbar">
        <div class="title-wrap compact-brand"><img src="icons/icon.svg" alt="Luma" /></div>
        <div class="top-actions">
          <span class="sync-dot" title="Sincronizado"></span>
          <button id="quickAddBtn" class="icon-btn" aria-label="Adicionar">＋</button>
          <button id="profileBtn" class="avatar-btn">${esc(initials(displayName))}</button>
        </div>
      </header>
      <main class="content">${viewHtml}</main>
      <nav class="bottom-nav bottom-nav-4">
        ${navBtn('home','⌂','Início')}
        ${navBtn('agenda','□','Compromissos')}
        ${navBtn('ultrasounds','▧','Eco')}
        <button id="moreNavBtn" class="${moreActive?'active':''}"><span class="nav-icon">•••</span><span>Mais</span></button>
      </nav>`;
    };

    const bindPrev=bindViewActions;
    bindViewActions=function(){
      bindPrev();
      document.getElementById('homeOverviewBtn')?.addEventListener('click',openOverview);
    };

    renderApp=function(){
      applyLumaTheme(getThemePreference());
      let html='';
      if(state.currentView==='home') html=renderHome();
      if(state.currentView==='agenda') html=renderAgenda();
      if(state.currentView==='ultrasounds') html=renderUltrasounds();
      if(state.currentView==='records') html=renderRecords();
      if(state.currentView==='shopping') html=renderShopping();
      if(state.currentView==='timeline') html=renderTimeline();
      app.innerHTML=shell(html);
      app.querySelectorAll('[data-nav]').forEach(btn=>btn.onclick=()=>{state.currentView=btn.dataset.nav;renderApp();});
      document.getElementById('profileBtn').onclick=openProfile;
      document.getElementById('quickAddBtn').onclick=openQuickAdd;
      document.getElementById('moreNavBtn').onclick=openMoreMenu;
      bindViewActions();
    };

    setTimeout(()=>{if(state?.user&&state?.pregnancy)renderApp();},120);
  } catch(e){ console.warn('Luma V5 not applied',e); }
})();