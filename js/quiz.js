/**
 * CORRE+ — Quiz & Rule Engine
 * Gerencia o fluxo de perguntas, coleta os inputs do usuário,
 * elimina modelos incompatíveis e calcula o Match Score com justificativas determinísticas.
 */

const DOM = {
  stepCounter: document.getElementById("quiz-step-counter"),
  progressBar: document.getElementById("quiz-progress-bar"),
  numberBadge: document.getElementById("question-number-badge"),
  title: document.getElementById("question-title"),
  subtitle: document.getElementById("question-subtitle"),
  optionsGroup: document.getElementById("quiz-options-group"),
  btnPrev: document.getElementById("btn-quiz-prev"),
};

let questions = [];
let currentStep = 0;
const userAnswers = {};

async function loadData() {
  const pathsToTry = [
    "../json/quiz.json",
    "./json/quiz.json",
    "json/quiz.json",
    "../data/quiz.json",
    "./data/quiz.json",
  ];

  let loaded = false;

  for (const path of pathsToTry) {
    try {
      const res = await fetch(path);
      if (res.ok) {
        questions = await res.json();
        loaded = true;
        break;
      }
    } catch {
      // Tenta o próximo caminho
    }
  }

  if (loaded && questions.length > 0) {
    renderCurrentQuestion();
  } else {
    DOM.title.textContent = "Erro ao carregar perguntas da análise.";
    DOM.subtitle.textContent =
      "Certifique-se de que o arquivo quiz-questions.json está na pasta json/ e use o Live Server.";
  }
}

function renderCurrentQuestion() {
  const q = questions[currentStep];
  const total = questions.length;

  DOM.stepCounter.textContent = `ETAPA ${String(currentStep + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  DOM.progressBar.style.width = `${((currentStep + 1) / total) * 100}%`;
  DOM.numberBadge.textContent = q.numero;
  DOM.title.textContent = q.titulo;
  DOM.subtitle.textContent = q.descricao;

  DOM.btnPrev.disabled = currentStep === 0;
  DOM.optionsGroup.innerHTML = "";

  q.opcoes.forEach((opcao) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option-button";
    btn.innerHTML = `
      <span>${opcao.label}</span>
      <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
    `;
    btn.addEventListener("click", () => handleSelection(q.id, opcao.valor));
    DOM.optionsGroup.appendChild(btn);
  });
}

function handleSelection(questionId, value) {
  userAnswers[questionId] = value;
  currentStep++;

  if (currentStep < questions.length) {
    renderCurrentQuestion();
  } else {
    finishQuizAndCalculate();
  }
}

DOM.btnPrev.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    renderCurrentQuestion();
  }
});

async function finishQuizAndCalculate() {
  DOM.title.textContent = "Processando compatibilidade determinística...";
  DOM.subtitle.textContent =
    "Eliminando incompatibilidades financeiras e calculando Match Scores.";
  DOM.optionsGroup.innerHTML = "";
  DOM.btnPrev.disabled = true;

  try {
    const pathsToTry = [
      "../json/shoes.json",
      "./json/shoes.json",
      "json/shoes.json",
      "../data/shoes.json",
      "./data/shoes.json",
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
        // Tenta o próximo caminho
      }
    }

    if (!shoes || shoes.length === 0) {
      throw new Error("Não foi possível carregar o arquivo shoes.json");
    }

    // 1. FILTRAGEM DETERMINÍSTICA E REGISTRO DE DESCARTE (ZONA DE DESCARTE)
    const descartados = [];
    const compativeis = [];

    shoes.forEach((shoe) => {
      const terrenos = Array.isArray(shoe.terrenos) ? shoe.terrenos : [];
      const temPlaca = shoe.placa === "carbono";
      const preco = shoe.preco_sugerido || 0;

      // Descarte 1: Terreno Incompatível
      if (userAnswers.terreno === "trilha" && !terrenos.includes("trilha")) {
        descartados.push({
          nome: `${shoe.marca} ${shoe.nome}`,
          motivo:
            "Incompatível com terreno de trilha (falta de solado tratorado e proteção para cascalho/terra).",
        });
        return;
      }

      // Descarte 2: Placa de Carbono para Iniciantes ou Ritmo Leve
      if (
        temPlaca &&
        (userAnswers.experiencia === "iniciante" ||
          userAnswers.ritmo === "leve")
      ) {
        descartados.push({
          nome: `${shoe.marca} ${shoe.nome}`,
          motivo:
            "Placa de carbono descartada por rigidez excessiva e risco de sobrecarga em treinos regenerativos ou corredores iniciantes.",
        });
        return;
      }

      // Descarte 3: Orçamento Ultrapassado
      if (userAnswers.orcamento === "baixo" && preco > 750) {
        descartados.push({
          nome: `${shoe.marca} ${shoe.nome}`,
          motivo: `Preço sugerido (R$ ${preco}) ultrapassa substancialmente o teto de investimento de custo-benefício (até R$ 650).`,
        });
        return;
      }

      // Passou nos filtros críticos
      compativeis.push(shoe);
    });

    const baseCalculo = compativeis.length > 0 ? compativeis : shoes;

    // 2. RULE ENGINE DETERMINÍSTICA AVANÇADA COM JUSTIFICATIVAS DINÂMICAS
    const scoredShoes = baseCalculo.map((shoe) => {
      let score = 50;
      const motivos = [];

      const terrenos = Array.isArray(shoe.terrenos) ? shoe.terrenos : [];
      const distancias = Array.isArray(shoe.distancias) ? shoe.distancias : [];
      const ritmos = Array.isArray(shoe.ritmos) ? shoe.ritmos : [];
      const preco = shoe.preco_sugerido || 0;

      // A) TERRENO
      if (terrenos.includes(userAnswers.terreno)) {
        score += 20;
        motivos.push(
          `Composto de sola 100% otimizado para ${userAnswers.terreno}`,
        );
      } else if (terrenos.includes("misto")) {
        score += 10;
        motivos.push(
          "Solado versátil com boa aderência em diferentes superfícies",
        );
      } else {
        score -= 25;
      }

      // B) DISTÂNCIA
      if (distancias.includes(userAnswers.distancia)) {
        score += 20;
        motivos.push(
          `Volume de entressola calibrado para distâncias de ${userAnswers.distancia}`,
        );
      }

      // C) RITMO / PACE
      if (ritmos.includes(userAnswers.ritmo)) {
        score += 20;
        if (userAnswers.ritmo === "rapido") {
          motivos.push(
            "Geometria dinâmica projetada para respostas rápidas e alta cadência",
          );
        } else if (userAnswers.ritmo === "leve") {
          motivos.push(
            "Foco em absorção contínua de impacto para rodagens confortáveis",
          );
        } else {
          motivos.push(
            "Equilíbrio sólido entre estabilidade e retorno de energia para ritmo moderado",
          );
        }
      } else {
        score -= 15;
      }

      // D) BIOMECÂNICA: PESO DO CORREDOR
      if (userAnswers.peso_corredor === "pesado") {
        if (shoe.amortecimento === "maximo") {
          score += 15;
          motivos.push(
            "Amortecimento maximalista essencial para proteção articular sob maior peso corporal",
          );
        }
        if (shoe.amortecimento === "medio") score -= 10;
      } else if (userAnswers.peso_corredor === "leve") {
        if ((shoe.peso_g || 0) <= 235) {
          score += 15;
          motivos.push(
            `Construção ultraleve (${shoe.peso_g}g) que favorece a biomecânica de corredores leves`,
          );
        }
        if ((shoe.peso_g || 0) > 290) score -= 10;
      }

      // E) PROPÓSITO: PLACA DE PROPULSÃO x NÍVEL
      const temPlaca = shoe.placa === "carbono";
      if (
        userAnswers.ritmo === "rapido" &&
        userAnswers.experiencia === "avancado" &&
        temPlaca
      ) {
        score += 15;
        motivos.push(
          "Placa rígida de carbono ativada com eficiência pelo perfil veloz e experiente",
        );
      }
      if (
        (userAnswers.ritmo === "leve" ||
          userAnswers.experiencia === "iniciante") &&
        !temPlaca
      ) {
        motivos.push(
          "Estrutura sem placa rígida, ideal para não sobrecarregar músculos e tendões",
        );
      }

      // F) PREFERÊNCIA DE DROP
      const drop = shoe.drop_mm || 0;
      if (userAnswers.drop === "baixo" && drop <= 5) {
        score += 10;
        motivos.push(
          `Drop baixo (${drop}mm) alinhado à aterrissagem pelo antepé`,
        );
      } else if (userAnswers.drop === "medio" && drop >= 6 && drop <= 8) {
        score += 10;
        motivos.push(
          `Drop intermediário (${drop}mm) versátil para transições naturais`,
        );
      } else if (userAnswers.drop === "alto" && drop >= 9) {
        score += 10;
        motivos.push(
          `Drop alto (${drop}mm) que reduz a exigência sobre a panturrilha e tendão de Aquiles`,
        );
      }

      // G) PONTUAÇÃO DE ORÇAMENTO (CUSTO-BENEFÍCIO)
      if (userAnswers.orcamento === "baixo") {
        if (preco <= 650) {
          score += 20;
          motivos.push(
            `Excelente relação custo-benefício dentro da sua faixa de até R$ 650 (R$ ${preco})`,
          );
        }
      } else if (userAnswers.orcamento === "medio") {
        if (preco > 650 && preco <= 1350) {
          score += 15;
          motivos.push(
            `Faixa de investimento perfeitamente alinhada ao segmento Super Trainer (R$ ${preco})`,
          );
        }
      } else if (userAnswers.orcamento === "alto") {
        if (temPlaca || preco > 1350) {
          score += 15;
          motivos.push(
            "Tecnologias de ponta e espumas premium de nível de competição",
          );
        }
      }

      const matchPercent = Math.max(60, Math.min(score, 98));
      const justificativaFinal = motivos.slice(0, 3).join(". ") + ".";

      return {
        ...shoe,
        matchScore: matchPercent,
        justificativaDinamica: justificativaFinal,
      };
    });

    // 3. ORDENAÇÃO DECRESCENTE POR COMPATIBILIDADE
    scoredShoes.sort((a, b) => b.matchScore - a.matchScore);

    // 4. PERSISTÊNCIA NO SESSIONSTORAGE
    const top3 = scoredShoes.slice(0, 3);
    sessionStorage.setItem("corre_user_profile", JSON.stringify(userAnswers));
    sessionStorage.setItem("corre_results", JSON.stringify(top3));
    sessionStorage.setItem(
      "corre_discarded",
      JSON.stringify(descartados.slice(0, 6)),
    );

    // 5. REDIRECIONAMENTO
    window.location.href = "resultado.html";
  } catch (err) {
    console.error("Falha ao calcular compatibilidade:", err);
    DOM.title.textContent = "Erro ao processar recomendações.";
    DOM.subtitle.textContent = `Detalhe: ${err.message}. Verifique o console do desenvolvedor.`;
  }
}

document.addEventListener("DOMContentLoaded", loadData);
