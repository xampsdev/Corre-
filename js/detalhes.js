const DOM = {
  content: document.getElementById("details-content"),
};

async function loadShoeDetails() {
  const params = new URLSearchParams(window.location.search);
  const shoeId = params.get("id");

  if (!shoeId) {
    renderError("Nenhum identificador de tênis fornecido na URL.");
    return;
  }

  try {
    const pathsToTry = [
      "../json/shoes.json",
      "./json/shoes.json",
      "json/shoes.json",
    ];

    let shoes = null;
    for (const path of pathsToTry) {
      try {
        const res = await fetch(path);
        if (res.ok) {
          shoes = await res.json();
          break;
        }
      } catch {
        // Tenta próximo caminho
      }
    }

    if (!shoes) throw new Error("Não foi possível carregar shoes.json");

    const shoe = shoes.find((item) => item.id === shoeId);

    if (!shoe) {
      renderError(
        `O modelo com identificador "${shoeId}" não foi encontrado em nosso banco de dados.`,
      );
      return;
    }

    renderShoe(shoe);
  } catch (err) {
    console.error("Falha ao obter detalhes do calçado:", err);
    renderError("Ocorreu uma falha ao consultar as especificações técnicas.");
  }
}

function renderShoe(shoe) {
  const imageSrc = shoe.imagem || "../assets/shoes/placeholder.png";
  const precoFormatado = shoe.preco_sugerido
    ? `R$ ${shoe.preco_sugerido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
    : "PREÇO NÃO INFORMADO";

  const terrenosStr = Array.isArray(shoe.terrenos)
    ? shoe.terrenos.join(" • ")
    : "-";
  const distanciasStr = Array.isArray(shoe.distancias)
    ? shoe.distancias.join(" • ")
    : "-";
  const ritmosStr = Array.isArray(shoe.ritmos) ? shoe.ritmos.join(" • ") : "-";
  const tagsHtml = Array.isArray(shoe.tags)
    ? shoe.tags.map((tag) => `<span class="tag-badge">#${tag}</span>`).join("")
    : "";

  DOM.content.innerHTML = `
    <!-- Coluna Visual -->
    <div class="details-visual-col">
      <img 
        src="${imageSrc}" 
        alt="${shoe.marca} ${shoe.nome}" 
        class="details-image"
        onerror="this.style.opacity='0.2'"
      />
    </div>

    <!-- Coluna Técnica -->
    <div class="details-info-col">
      <header class="details-meta-header">
        <span class="details-brand-badge">${shoe.marca}</span>
        <h1 class="details-title">${shoe.nome}</h1>
        <span class="details-price-badge">${precoFormatado}</span>
      </header>

      <section class="details-description-block">
        <span class="details-section-label">ANÁLISE DE PRODUTO</span>
        <p class="details-description">${shoe.descricao_match}</p>
      </section>

      <!-- Grade de Especificações Técnicas -->
      <section class="specs-technical-grid" aria-label="Especificações Técnicas">
        <div class="spec-cell">
          <span class="spec-cell-label">PESO (MASCULINO)</span>
          <span class="spec-cell-value">${shoe.peso_g}g</span>
          <span class="spec-cell-sub">Tam. ${shoe.tamanho_referencia}</span>
        </div>

        <div class="spec-cell">
          <span class="spec-cell-label">DROP DA ENTRESSOLA</span>
          <span class="spec-cell-value">${shoe.drop_mm} mm</span>
          <span class="spec-cell-sub">Offset calcanhar/antepé</span>
        </div>

        <div class="spec-cell">
          <span class="spec-cell-label">PLACA PROPULSORA</span>
          <span class="spec-cell-value">${shoe.placa}</span>
          <span class="spec-cell-sub">Tecnologia de rigidez</span>
        </div>

        <div class="spec-cell">
          <span class="spec-cell-label">AMORTECIMENTO</span>
          <span class="spec-cell-value">${shoe.amortecimento}</span>
          <span class="spec-cell-sub">Densidade do composto</span>
        </div>

        <div class="spec-cell">
          <span class="spec-cell-label">ESTABILIDADE</span>
          <span class="spec-cell-value">${shoe.estabilidade}</span>
          <span class="spec-cell-sub">Suporte biomecânico</span>
        </div>

        <div class="spec-cell">
          <span class="spec-cell-label">TERRENOS</span>
          <span class="spec-cell-value" style="font-size: var(--fs-body);">${terrenosStr}</span>
          <span class="spec-cell-sub">Superfícies recomendadas</span>
        </div>

        <div class="spec-cell">
          <span class="spec-cell-label">DISTÂNCIAS</span>
          <span class="spec-cell-value" style="font-size: var(--fs-body);">${distanciasStr}</span>
          <span class="spec-cell-sub">Quilometragens ideais</span>
        </div>

        <div class="spec-cell">
          <span class="spec-cell-label">RITMOS (PACE)</span>
          <span class="spec-cell-value" style="font-size: var(--fs-body);">${ritmosStr}</span>
          <span class="spec-cell-sub">Faixas de intensidade</span>
        </div>
      </section>

      <!-- Tags do Modelo -->
      <footer class="details-tags-group">
        ${tagsHtml}
      </footer>
    </div>
  `;
}

function renderError(message) {
  DOM.content.innerHTML = `
    <div class="details-description-block" style="border-color: var(--error);">
      <h2 class="details-title" style="color: var(--error); font-size: var(--fs-title);">ERRO NA CONSULTA</h2>
      <p class="details-description">${message}</p>
      <a href="resultado.html" class="btn-back" style="margin-top: var(--space-4);">Voltar para Resultados</a>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", loadShoeDetails);
