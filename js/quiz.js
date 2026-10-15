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
  try {
    const res = await fetch("../json/quiz.json");
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    questions = await res.json();
    renderCurrentQuestion();
  } catch (error) {
    DOM.title.textContent = "Erro ao carregar perguntas da análise.";
    console.error(error);
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
    "Eliminando incompatibilidades e calculando Match Scores.";
  DOM.optionsGroup.innerHTML = "";

  try {
    const res = await fetch("../json/shoes.json");
    const shoes = await res.json();

    // RULE ENGINE DETERMINÍSTICA
    // 1. Filtragem de Incompatibilidade Crítica
    const compativeis = shoes.filter((shoe) => {
      // Se usuário corre em trilha e o tênis não atende trilha
      if (
        userAnswers.terreno === "trilha" &&
        !shoe.terrenos.includes("trilha")
      ) {
        return false;
      }
      return true;
    });

    // 2. Pontuação e Match Score (%)
    const scoredShoes = compativeis.map((shoe) => {
      let score = 50; // Base inicial

      // Terreno
      if (
        shoe.terrenos.includes(userAnswers.terreno) ||
        shoe.terrenos.includes("misto")
      )
        score += 15;

      // Distância Alvo
      if (shoe.distancias.includes(userAnswers.distancia)) score += 15;

      // Ritmo / Pace
      if (shoe.ritmos.includes(userAnswers.ritmo)) score += 10;

      // Amortecimento x Peso
      if (
        userAnswers.peso_corredor === "pesado" &&
        shoe.amortecimento === "maximo"
      )
        score += 5;
      if (userAnswers.peso_corredor === "leve" && shoe.peso_g < 260) score += 5;

      // Drop
      if (userAnswers.drop === "baixo" && shoe.drop_mm <= 4) score += 5;
      if (
        userAnswers.drop === "medio" &&
        shoe.drop_mm >= 5 &&
        shoe.drop_mm <= 8
      )
        score += 5;
      if (userAnswers.drop === "alto" && shoe.drop_mm > 8) score += 5;

      const matchPercent = Math.min(score, 98); // Teto realista determinístico

      return {
        ...shoe,
        matchScore: matchPercent,
      };
    });

    // 3. Ordenação decrescente de Match
    scoredShoes.sort((a, b) => b.matchScore - a.matchScore);

    // 4. Salva Top 3 e Perfil no sessionStorage
    const top3 = scoredShoes.slice(0, 3);
    sessionStorage.setItem("corre_user_profile", JSON.stringify(userAnswers));
    sessionStorage.setItem("corre_results", JSON.stringify(top3));

    // 5. Redirecionamento para a página de resultado
    window.location.href = "resultado.html";
  } catch (err) {
    console.error("Falha ao calcular compatibilidade:", err);
    DOM.title.textContent = "Erro ao processar recomendações.";
  }
}

document.addEventListener("DOMContentLoaded", loadData);
