const quizData = [
  {
    pergunta: "Qual é o seu foco principal no momento?",
    opcoes: [
      { texto: "Provas de Velocidade / 5k / 10k", perfil: "velocidade" },
      { texto: "Longões e Meia Maratona / Maratona", perfil: "amortecimento" },
      { texto: "Rodagens diárias e treinos leves", perfil: "treino" },
      { texto: "Trilhas e terrenos mistos", perfil: "trail" },
    ],
  },
  {
    pergunta: "Como você prefere a sensação do amortecimento?",
    opcoes: [
      {
        texto: "Firme e responsivo (mais retorno de energia)",
        perfil: "velocidade",
      },
      {
        texto: "Super macio (máximo conforto para as articulações)",
        perfil: "amortecimento",
      },
      { texto: "Equilibrado (versátil para tudo)", perfil: "treino" },
      { texto: "Estável com foco em suporte", perfil: "trail" },
    ],
  },
];

let currentQuestion = 0;
let userAnswers = { velocidade: 0, amortecimento: 0, treino: 0, trail: 0 };

const questionTitle = document.getElementById("question-title");
const optionsGrid = document.getElementById("options-grid");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const resultDescription = document.getElementById("result-description");

function loadQuestion() {
  resetState();
  const currentQuizData = quizData[currentQuestion];

  questionTitle.innerText = currentQuizData.pergunta;
  progressText.innerText = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;

  // Atualiza barra de progresso
  const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;
  progressFill.style.width = `${progressPercentage}%`;

  currentQuizData.opcoes.forEach((opcao) => {
    const button = document.createElement("button");
    button.innerText = opcao.texto;
    button.classList.add("quiz-option-btn");
    button.onclick = () => selectOption(opcao.perfil);
    optionsGrid.appendChild(button);
  });
}

function resetState() {
  optionsGrid.innerHTML = "";
}

function selectOption(perfil) {
  userAnswers[perfil]++;
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  progressText.parentElement.style.display = "none";

  // Acha qual perfil teve mais votos
  const bestProfile = Object.keys(userAnswers).reduce((a, b) =>
    userAnswers[a] > userAnswers[b] ? a : b,
  );

  const recommendations = {
    velocidade:
      "O seu estilo pede tênis com placas de fibra ou espumas altamente responsivas (Ex: Linha de Performance/Fast).",
    amortecimento:
      "O seu estilo pede tênis com alto volume de espuma, focado em absorção de impacto e conforto em longas distâncias.",
    treino:
      "O seu estilo pede um tênis coringa, durável e versátil para encarar qualquer tipo de rodagem na semana.",
    trail:
      "O seu estilo pede tênis com solado tratorado e maior aderência para encarar terra, lama e pedras.",
  };

  resultDescription.innerText = recommendations[bestProfile];
}

// Inicia o quiz ao carregar a página
loadQuestion();
