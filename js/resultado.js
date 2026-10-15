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

    // Imagem do tênis ou placeholder neutro caso não tenha
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

      <p class="result-description">${shoe.descricao_match}</p>

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
}

document.addEventListener("DOMContentLoaded", renderResults);
