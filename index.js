/* global dscc */
(function () {
  // cria um contêiner raiz 1x
  const root = document.createElement('div');
  root.style.fontFamily = 'Inter,system-ui,Arial,sans-serif';
  document.body.appendChild(root);

  function drawViz(vizData) {
    // Limpa a tela a cada atualização
    root.innerHTML = '';

    // Tabela no formato objectTransform
    const rows = vizData?.tables?.DEFAULT || [];

    // Cada linha: [imageUrl, adId, impressions, linkClicks]
    const cardsHtml = rows.map(r => {
      const img = r['imageUrl']?.formattedValue ?? r['imageUrl']?.rawValue ?? '';
      const ad  = r['adId']?.formattedValue    ?? r['adId']?.rawValue    ?? '';
      const imp = r['impressions']?.formattedValue ?? r['impressions']?.rawValue ?? 0;
      const clk = r['linkClicks']?.formattedValue  ?? r['linkClicks']?.rawValue  ?? 0;

      return `
        <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center;">
          <div style="width:100%;height:160px;border-radius:8px;border:1px solid #E5E7EB;
                      background-image:url('${img}');
                      background-size:cover;background-position:center;background-repeat:no-repeat;"></div>
          <div style="width:100%;text-align:left;display:flex;flex-direction:column;gap:4px;">
            <div style="font-weight:600;font-size:14px;">Ad ID: ${ad}</div>
            <div style="font-size:13px;">Impressões: ${imp}</div>
            <div style="font-size:13px;">Cliques: ${clk}</div>
          </div>
        </div>`;
    }).join('');

    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px;';
    grid.innerHTML = cardsHtml;
    root.appendChild(grid);
  }

  // Assina dados, estilos e resize
  dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
})();
