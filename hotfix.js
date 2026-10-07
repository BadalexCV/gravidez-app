// Luma V4 hotfixes
try {
  state.timelineUntil = state.timelineUntil || todayIso();

  renderCalendarDay = function(d, currentMonth, events) {
    const iso = d.toISOString().slice(0,10);
    const other = d.getMonth() !== currentMonth;
    const today = iso === todayIso();
    const uniqueTypes = [...new Set(events.map(e=>e.type||'consulta'))];
    let fill = '';
    if (uniqueTypes.length === 1) {
      fill = `<div class="day-fill ${CAL_COLORS[uniqueTypes[0]]||'fill-lembrete'}">${events.slice(0,2).map(e=>`<div class="day-label">${fmtTime(e.appointment_time)} ${esc(e.title||TYPE_LABELS[e.type]||'')}</div>`).join('')}</div>`;
    } else if (uniqueTypes.length > 1) {
      const colorMap={consulta:'#fff0e3',analise:'#edf7eb',ecografia:'#ebf2fb',lembrete:'#eff0f2'};
      const step=100/uniqueTypes.length;
      const stops=uniqueTypes.map((t,i)=>`${colorMap[t]||'#eff0f2'} ${i*step}% ${(i+1)*step}%`).join(',');
      fill = `<div class="day-fill" style="background:linear-gradient(135deg,${stops})">${events.slice(0,2).map(e=>`<div class="day-label">${fmtTime(e.appointment_time)} ${esc(TYPE_LABELS[e.type]||e.title||'')}</div>`).join('')}</div>`;
    }
    return `<button class="day ${other?'other':''} ${today?'today':''}" data-day="${iso}"><div class="day-num">${d.getDate()}</div>${fill}</button>`;
  };

  const originalRenderTimeline = renderTimeline;
  renderTimeline = function() {
    let html = originalRenderTimeline();
    html = html.replace(`value="${todayIso()}"`, `value="${state.timelineUntil || todayIso()}"`);
    return html;
  };

  const originalBindViewActions = bindViewActions;
  bindViewActions = function() {
    originalBindViewActions();
    const old = document.getElementById('timelineUntil');
    if (old) {
      const fresh = old.cloneNode(true);
      fresh.value = state.timelineUntil || todayIso();
      old.replaceWith(fresh);
      fresh.addEventListener('change', e => {
        state.timelineUntil = e.target.value || todayIso();
        renderApp();
      });
    }
  };

  const originalExportPdf = exportPdf;
  exportPdf = async function() {
    const input = document.getElementById('timelineUntil');
    if (input?.value) state.timelineUntil = input.value;
    return originalExportPdf();
  };

  const originalDeleteRow = deleteRow;
  deleteRow = async function(table,id,okMsg='Eliminado',silent=false) {
    await originalDeleteRow(table,id,okMsg,silent);
    if (silent) await refreshAll();
  };
} catch (e) {
  console.warn('Luma hotfix not applied', e);
}
