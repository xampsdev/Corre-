const DOM = {
  selectA: document.getElementById("select-shoe-a"),
  selectB: document.getElementById("select-shoe-b"),
  matrixWrapper: document.getElementById("compare-matrix-wrapper"),
};

let allShoes = [];

async function initCompare() {
  try {
    const pathsToTry = [
      "../json/shoes.json",
      "./data/shoes.json",
      "data/shoes.json",
    ];

    for (const path of pathsToTry) {
      try {
        const res = await fetch(path);
        if (res.ok) {
          allShoes = await res.json();
          break;
        }
      } catch {
        // Tenta o próximo
      }
    }

    if (!allShoes || allShoes.length === 0) {
      throw new Error("Não foi possível carregar os dados dos tênis.");
    }

    populateSelects();
    resolveInitialShoes();
    setupListeners();
  } catch (err) {
    console.error("Falha ao iniciar comparador:", err);
    DOM.matrixWrapper.innerHTML = `
      <div style="padding: var(--space-5); color: var(--error);">
        Erro ao carregar dados dos calçados para comparação.
      </div>
    `;
  }
}

function populateSelects() {
  DOM.selectA.innerHTML = "";
  DOM.selectB.innerHTML = "";

  allShoes.forEach((shoe) => {
    const optA = document.createElement("option");
    optA.value = shoe.id;
    optA.textContent = `${shoe.marca} - ${shoe.nome}`;

    const optB = document.createElement("option");
    optB.value = shoe.id;
    optB.textContent = `${shoe.marca} - ${shoe.nome}`;

    DOM.selectA.appendChild(optA);
    DOM.selectB.appendChild(optB);
  });
}

function resolveInitialShoes() {
  const params = new URLSearchParams(window.location.search);
  const idA = params.get("a") || (allShoes[0] ? allShoes[0].id : null);
  const idB = params.get("b") || (allShoes[1] ? allShoes[1].id : null);

  if (idA) DOM.selectA.value = idA;
  if (idB) DOM.selectB.value = idB;

  renderComparison();
}

function setupListeners() {
  DOM.selectA.addEventListener("change", () => {
    updateURLParams();
    renderComparison();
  });

  DOM.selectB.addEventListener("change", () => {
    updateURLParams();
    renderComparison();
  });
}

function updateURLParams() {
  const url = new URL(window.location);
  url.searchParams.set("a", DOM.selectA.value);
  url.searchParams.set("b", DOM.selectB.value);
  window.history.replaceState({}, "", url);
}

function renderComparison() {
  const shoeA = allShoes.find((s) => s.id === DOM.selectA.value);
  const shoeB = allShoes.find((s) => s.id === DOM.selectB.value);

  if (!shoeA || !shoeB) return;

  const imgA = shoeA.imagem || "../assets/shoes/placeholder.png";
  const imgB = shoeB.imagem || "../assets/shoes/placeholder.png";

  const precoA = shoeA.preco_sugerido
    ? `R$ ${shoeA.preco_sugerido.toLocaleString("pt-BR")}`
    : "-";
  const precoB = shoeB.preco_sugerido
    ? `R$ ${shoeB.preco_sugerido.toLocaleString("pt-BR")}`
    : "-";

  // Destaque visual: menor peso ganha a classe metric-highlight
  const aMaisLeve = (shoeA.peso_g || 0) < (shoeB.peso_g || 0);
  const bMaisLeve = (shoeB.peso_g || 0) < (shoeA.peso_g || 0);

  DOM.matrixWrapper.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>MÉTRICA</th>
          <th>
            <div class="compare-card-preview">
              <img src="${imgA}" alt="${shoeA.nome}" class="compare-shoe-img" onerror="this.style.opacity='0.2'">
              <div>
                <span class="compare-shoe-brand">${shoeA.marca}</span>
                <h2 class="compare-shoe-title">${shoeA.nome}</h2>
              </div>
            </div>
          </th>
          <th>
            <div class="compare-card-preview">
              <img src="${imgB}" alt="${shoeB.nome}" class="compare-shoe-img" onerror="this.style.opacity='0.2'">
              <div>
                <span class="compare-shoe-brand">${shoeB.marca}</span>
                <h2 class="compare-shoe-title">${shoeB.nome}</h2>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="metric-row-header">PESO (41 BR)</td>
          <td class="metric-cell ${aMaisLeve ? "metric-highlight" : ""}">${shoeA.peso_g}g ${aMaisLeve ? "★ (Mais leve)" : ""}</td>
          <td class="metric-cell ${bMaisLeve ? "metric-highlight" : ""}">${shoeB.peso_g}g ${bMaisLeve ? "★ (Mais leve)" : ""}</td>
        </tr>
        <tr>
          <td class="metric-row-header">DROP</td>
          <td class="metric-cell">${shoeA.drop_mm} mm</td>
          <td class="metric-cell">${shoeB.drop_mm} mm</td>
        </tr>
        <tr>
          <td class="metric-row-header">PLACA</td>
          <td class="metric-cell">${shoeA.placa.toUpperCase()}</td>
          <td class="metric-cell">${shoeB.placa.toUpperCase()}</td>
        </tr>
        <tr>
          <td class="metric-row-header">AMORTECIMENTO</td>
          <td class="metric-cell">${shoeA.amortecimento.toUpperCase()}</td>
          <td class="metric-cell">${shoeB.amortecimento.toUpperCase()}</td>
        </tr>
        <tr>
          <td class="metric-row-header">ESTABILIDADE</td>
          <td class="metric-cell">${shoeA.estabilidade.toUpperCase()}</td>
          <td class="metric-cell">${shoeB.estabilidade.toUpperCase()}</td>
        </tr>
        <tr>
          <td class="metric-row-header">TERRENOS</td>
          <td class="metric-cell" style="font-size: var(--fs-small);">${shoeA.terrenos.join(", ")}</td>
          <td class="metric-cell" style="font-size: var(--fs-small);">${shoeB.terrenos.join(", ")}</td>
        </tr>
        <tr>
          <td class="metric-row-header">RITMO INDICADO</td>
          <td class="metric-cell" style="font-size: var(--fs-small);">${shoeA.ritmos.join(", ")}</td>
          <td class="metric-cell" style="font-size: var(--fs-small);">${shoeB.ritmos.join(", ")}</td>
        </tr>
        <tr>
          <td class="metric-row-header">PREÇO SUGERIDO</td>
          <td class="metric-cell metric-highlight">${precoA}</td>
          <td class="metric-cell metric-highlight">${precoB}</td>
        </tr>
        <tr>
          <td class="metric-row-header">PROPOSTA</td>
          <td class="text-cell">${shoeA.descricao_match}</td>
          <td class="text-cell">${shoeB.descricao_match}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>AÇÕES</td>
          <td>
            <a href="detalhes.html?id=${shoeA.id}" class="btn-table-action">VER DETALHES</a>
          </td>
          <td>
            <a href="detalhes.html?id=${shoeB.id}" class="btn-table-action">VER DETALHES</a>
          </td>
        </tr>
      </tfoot>
    </table>
  `;
}

document.addEventListener("DOMContentLoaded", initCompare);
