/**
 * CORRE+ — Renderizador de Resultados
 * Apresenta o Top 3 de modelos recomendados, as justificativas personalizadas
 * e os modelos descartados pelos critérios determinísticos.
 */

const DOM = {
  grid: document.getElementById("results-grid"),
  title: document.getElementById("results-title"),
};

const CATEGORY_LABELS = {
  0: "MATCH PRINCIPAL",
  1: "ALTA COMPATIBILIDADE",
  2: "BOA COMPATIBILIDADE",
};

function renderResults() {
  const stored = sessionStorage.getItem("corre_results");

  if (!stored) {
    DOM.title.textContent = "NENHUMA ANÁLISE ENCONTRADA";
    DOM.grid.innerHTML = `
      <div class="result-card">
        <p class="result-description">
          Você ainda não realizou a análise de perfil ou os dados expiraram.
        </p>
        <a href="quiz.html" class="btn-card-details">FAZER ANÁLISE AGORA</a>
      </div>
    `;
    renderDiscardedSection();
    return;
  }

  let top3 = [];
  try {
    top3 = JSON.parse(stored);
  } catch (e) {
    console.error("Erro ao ler dados de sessão:", e);
    return;
  }

  DOM.grid.innerHTML = "";

  top3.forEach((shoe, index) => {
    const isFeatured = index === 0;
    const rankNumber = `#0${index + 1}`;
    const categoryLabel = CATEGORY_LABELS[index] || "COMPATÍVEL";

    const compareLink =
      isFeatured && top3[1]
        ? `comparacao.html?a=${shoe.id}&b=${top3[1].id}`
        : `comparacao.html?a=${top3[0].id}&b=${shoe.id}`;

    const imageSrc = shoe.imagem || "../assets/shoes/placeholder.png";

    const card = document.createElement("article");
    card.className = `result-card ${isFeatured ? "featured" : ""}`;

    card.innerHTML = `
      <header class="card-top-bar">
        <span class="result-rank">${rankNumber}</span>
        <div class="match-badge">
          <span class="match-badge-label">COMPATIBILIDADE</span>
          <strong class="match-badge-value">${shoe.matchScore}%</strong>
        </div>
      </header>

      <div class="shoe-image-wrapper">
        <img 
          src="${imageSrc}" 
          alt="${shoe.marca} ${shoe.nome}" 
          class="shoe-image" 
          loading="lazy"
          onerror="this.style.opacity='0.2'"
        />
      </div>

      <div class="card-info">
        <span class="result-category-label">${categoryLabel}</span>
        <h2 class="result-shoe-name">${shoe.marca} ${shoe.nome}</h2>
      </div>

      <div class="result-specs-strip">
        <span class="spec-item">PESO: <strong>${shoe.peso_g}g</strong></span>
        <span class="spec-item">DROP: <strong>${shoe.drop_mm}mm</strong></span>
        <span class="spec-item">PLACA: <strong>${shoe.placa.toUpperCase()}</strong></span>
      </div>

      <!-- Bloco de Justificativa Determinística -->
      <div class="result-reason-box">
        <span class="reason-label">
          <span class="material-symbols-outlined" aria-hidden="true">check_circle</span>
          POR QUE ESTE MODELO?
        </span>
        <p class="reason-text">${shoe.justificativaDinamica || shoe.descricao_match}</p>
      </div>

      <footer class="card-actions-group">
        <a href="detalhes.html?id=${shoe.id}" class="btn-card-details">
          VER DETALHES
          <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
        </a>
        <a href="${compareLink}" class="btn-card-compare">
          COMPARAR
          <span class="material-symbols-outlined" aria-hidden="true">compare_arrows</span>
        </a>
      </footer>
    `;

    DOM.grid.appendChild(card);
  });

  // Renderiza a Zona de Descarte abaixo do Top 3
  renderDiscardedSection();
}

function renderDiscardedSection() {
  const countEl = document.getElementById("discarded-count");
  const listEl = document.getElementById("discarded-list");
  const sectionEl = document.querySelector(".discarded-section");

  const storedDiscarded = sessionStorage.getItem("corre_discarded");
  if (!storedDiscarded || !listEl || !countEl) {
    if (sectionEl) sectionEl.style.display = "none";
    return;
  }

  let discarded = [];
  try {
    discarded = JSON.parse(storedDiscarded);
  } catch (e) {
    console.error("Erro ao ler descartados:", e);
    return;
  }

  if (discarded.length === 0) {
    if (sectionEl) sectionEl.style.display = "none";
    return;
  }

  countEl.textContent = discarded.length;
  listEl.innerHTML = "";

  discarded.forEach((item) => {
    const li = document.createElement("li");
    li.className = "discarded-item";
    li.innerHTML = `
      <strong class="discarded-shoe-name">${item.nome}</strong>
      <span class="discarded-reason">MOTIVO DO DESCARTE: ${item.motivo}</span>
    `;
    listEl.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", renderResults);
