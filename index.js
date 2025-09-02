/* global dscc */
(function () {
  const root = document.createElement('div');
  root.style.fontFamily = 'Inter,system-ui,Arial,sans-serif';
  document.body.appendChild(root);

  function render(table) {
    const rows = (table && table.rows) ? table.rows : [];
    const cards = rows.map(r => {
      // mapeia colunas: [imageUrl, adId, impressions, linkClicks]
      const img = r[0]?.formattedValue || r[0]?.rawValue || '';
      const ad  = r[1]?.formattedValue || r[1]?.rawValue || '';
      const imp = r[2]?.formattedValue || r[2]?.rawValue || 0;
      const clk = r[3]?.formattedValue || r[3]?.rawValue || 0;

      return `
        <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1);padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center;">
          <div style="width:100%;height:160px;border-radius:8px;border:1px solid #E5E7EB;
                      background-image:url('${img}');
                      background-size:cover;background-position:center;"></div>
          <div style="width:100%;text-align:left;display:flex;flex-direction:column;gap:4px;">
            <div style="font-weight:600;font-size:14px;">Ad ID: ${ad}</div>
            <div style="font-size:13px;">Impressões: ${imp}</div>
            <div style="font-size:13px;">Cliques: ${clk}</div>
          </div>
        </div>`;
    }).join('');

    root.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px;">
        ${cards}
      </div>`;
  }

  // API do Community Viz
  if (window.dscc && dscc.subscribeToData) {
    dscc.subscribeToData(
      msg => render((msg && msg.tables && msg.tables.DEFAULT) || { rows: [] }),
      { transform: dscc.tables.DEFAULT }
    );
  } else {
    // Fallback simples (dev/local) – evita erro se dscc não estiver pronto
    window.addEventListener('message', e => {
      const t = e.data && e.data.tables && e.data.tables.DEFAULT;
      if (t) render(t);
    });
  }
})();
