# CORRE+ — Design System

> **Performance Intelligence**
>
> Sistema web de recomendação de tênis para corrida, caminhada, trilha e terrenos híbridos.

---

## 1. Identidade do Projeto

**Nome:** CORRE+

**Conceito:** Performance Intelligence

**Objetivo:**

O CORRE+ é uma aplicação web que utiliza dados do corredor e características técnicas dos tênis para encontrar modelos compatíveis com seu perfil, objetivo e ambiente de uso.

A interface deve transmitir a sensação de um sistema técnico de análise de performance, combinando:

- tecnologia;
- corrida;
- precisão;
- dados;
- performance;
- biomecânica;
- inteligência.

O projeto não deve parecer uma loja virtual tradicional.

A experiência deve lembrar uma ferramenta de análise esportiva ou um laboratório de performance.

---

# 2. Direção Visual

## Estética

A identidade visual combina:

- Modern Minimalism;
- Technical Brutalism;
- Glassmorphism moderado;
- interfaces esportivas de alta performance;
- dashboards técnicos;
- elementos inspirados em HUDs e sistemas de telemetria.

A aparência deve ser:

**Técnica + Esportiva + Futurista + Premium + Minimalista**

Evitar:

- aparência de e-commerce;
- excesso de elementos decorativos;
- excesso de gradientes;
- excesso de animações;
- interfaces excessivamente arredondadas;
- sombras pesadas;
- excesso de cores.

---

# 3. Tema

O CORRE+ utiliza exclusivamente uma interface em **Dark Mode**.

A cor de fundo deve permanecer predominantemente escura.

As cores de destaque são:

- Cyber Lime;
- Electric Cyan.

Essas cores devem ser utilizadas para criar hierarquia visual e destacar informações importantes.

---

# 4. Paleta de Cores

## Background

```text
#131313
Uso:

fundo principal;
áreas gerais da página.
Surface
#1A1A1A

Uso:

cards;
containers;
áreas elevadas;
componentes secundários.
Surface Elevated
#2A2A2A

Uso:

cards destacados;
elementos ativos;
áreas de maior hierarquia.
Surface Highest
#353534

Uso:

elementos de maior contraste;
estados ativos;
áreas internas de componentes.
Cyber Lime
#D2F000

Cor primária da interface.

Uso:

CTA principal;
ações importantes;
indicadores positivos;
Match Score;
elementos selecionados;
destaques de performance;
estados ativos.

Não utilizar Cyber Lime em grandes áreas sem necessidade.

Electric Cyan
#00EEFC

Cor secundária.

Uso:

informações técnicas;
especificações;
dados;
labels;
elementos informativos;
detalhes de telemetria;
elementos secundários.
Texto Primário
#E5E2E1

Uso:

títulos;
textos principais;
informações importantes.
Texto Secundário
#C6C9AB

Uso:

descrições;
textos auxiliares;
informações secundárias.
Border
#454932

Uso:

bordas;
divisórias;
containers;
elementos estruturais.
Error
#FFB4AB

Uso:

erros;
incompatibilidades;
motivos de descarte;
estados críticos.
5. Hierarquia de Cores

Prioridade visual:

1. Cyber Lime
2. Electric Cyan
3. Branco / Texto Primário
4. Texto Secundário
5. Tons de Surface
6. Bordas

Cyber Lime representa:

ação, recomendação, compatibilidade e performance.

Electric Cyan representa:

informação, tecnologia, dados e especificações.

Vermelho representa:

incompatibilidade, erro ou descarte.

6. Tipografia

O projeto utiliza três famílias tipográficas.

Headings

Archivo Narrow

Uso:

logo;
títulos;
headings;
hero;
títulos de seção.

Características:

forte;
condensada;
esportiva;
impacto visual.

Títulos principais devem preferencialmente utilizar:

text-transform: uppercase;
font-weight: 700;
Body

Geist

Uso:

parágrafos;
descrições;
textos gerais;
instruções;
conteúdo informativo.

Priorizar legibilidade.

Dados

JetBrains Mono

Uso:

números;
métricas;
especificações;
labels técnicos;
preços;
porcentagens;
distância;
drop;
peso;
indicadores.

Exemplos:

DROP
08 MM

PESO
278 G

MATCH
92%

DISTÂNCIA
21 KM
7. Formas

A linguagem visual utiliza formas predominantemente quadradas.

Border Radius

Prioridade:

0px

ou valores muito pequenos quando necessários.

Evitar:

border-radius: 20px;
border-radius: 30px;
border-radius: 50%;

em cards e componentes convencionais.

Elementos circulares podem ser utilizados somente quando tiverem função visual ou técnica específica.

Exemplos:

indicadores;
sensores;
ícones;
elementos de loading;
gráficos.
8. Bordas

Utilizar bordas finas.

Padrão:

1px solid

As bordas devem ser discretas.

Evitar contornos excessivamente fortes.

Cards ativos podem utilizar:

border-color: #D2F000;

ou:

border-color: #00EEFC;

dependendo da função do componente.

9. Glow

Glow deve ser utilizado com moderação.

O objetivo é criar sensação de tecnologia e energia.

Exemplo:

box-shadow: 0 0 20px rgba(210, 240, 0, 0.15);

Não utilizar glow em todos os elementos.

Priorizar:

Top Pick;
CTA principal;
elementos selecionados;
indicadores importantes.
10. Grid de Fundo

O projeto pode utilizar uma grade técnica extremamente discreta.

Configuração:

32px × 32px

Opacidade aproximada:

2% — 5%

A grade deve ficar em segundo plano.

Nunca deve competir com o conteúdo.

11. Espaçamento

O sistema utiliza uma base de:

4px

Priorizar múltiplos de:

4px
8px
16px
24px
32px
48px
64px

Exemplos:

Padding pequeno: 8px
Padding padrão: 16px
Gap padrão: 16px
Gap grande: 32px
Seção: 64px
12. Layout
Mobile First

O projeto deve ser desenvolvido inicialmente considerando telas pequenas.

O layout deve funcionar corretamente em:

320px
375px
390px
414px

e expandir para:

768px+
1024px+
1440px+
13. Margens
Mobile
20px
Desktop
40px
14. Container

O conteúdo principal deve possuir largura máxima para evitar linhas excessivamente longas em telas grandes.

Referência:

max-width: 1440px;
margin: 0 auto;
15. Navbar

A Navbar deve ser:

simples;
técnica;
discreta;
responsiva.

Elementos atuais:

CORRE+
GitHub
Sobre
Como funciona

No mobile, os elementos podem ser reorganizados ou transformados em menu conforme necessidade.

A Navbar pode utilizar:

backdrop-filter: blur(...);

com fundo escuro semitransparente.

16. Home

A Home deve apresentar imediatamente:

identidade do CORRE+;
proposta de valor;
conceito do sistema;
CTA principal.
Hero

Título principal:

ENCONTRE O TÊNIS IDEAL PARA SUA CORRIDA

Subheadline:

Nossa análise combina biomecânica, terreno, distância e desempenho para recomendar os modelos mais compatíveis com o seu perfil.

CTA:

DESCUBRA SEU TÊNIS IDEAL

O Hero deve possuir:

título forte;
texto curto;
CTA;
imagem de tênis;
composição técnica;
espaço visual.
17. Seção Sobre

A seção "Sobre" deve explicar brevemente:

o que é o CORRE+;
qual problema resolve;
por que foi criado;
como utiliza dados para recomendar tênis.

Não deve parecer uma página institucional extensa.

Priorizar textos curtos e objetivos.

18. Seção Como Encontramos Seu Tênis Ideal

Essa seção explica o funcionamento do sistema.

A ideia é mostrar o processo de maneira visual.

Fluxo:

SEU PERFIL
     ↓
OBJETIVO
     ↓
TERRENO
     ↓
DISTÂNCIA
     ↓
CARACTERÍSTICAS DO TÊNIS
     ↓
ANÁLISE
     ↓
RECOMENDAÇÃO

Pode utilizar cards ou etapas numeradas.

Exemplo:

01
SEU PERFIL

02
SEU TERRENO

03
SEU OBJETIVO

04
ANÁLISE

05
SEUS TÊNIS IDEAIS
19. CTA

O principal CTA deve utilizar Cyber Lime.

Características:

fundo Cyber Lime;
texto escuro;
bordas discretamente quadradas;
tipografia JetBrains Mono;
letras maiúsculas;
peso elevado.

Exemplo:

DESCUBRA SEU TÊNIS IDEAL →
20. Botões
Primary
background: #D2F000
color: #191E00

Uso:

iniciar quiz;
confirmar;
avançar;
ações principais.
Secondary

Fundo transparente.

border: 1px solid #00EEFC;
color: #00EEFC;

Uso:

ações secundárias;
voltar;
informações;
navegação.
21. Quiz

O quiz deve utilizar formulário multi-step.

Cada etapa deve apresentar uma ou duas perguntas.

Exemplo:

PASSO 02 DE 05

QUAL É O TERRENO PRINCIPAL
DA SUA CORRIDA?

[ ASFALTO ]

[ TRILHA ]

[ HÍBRIDO ]
Progress Bar

Altura:

4px

Fundo:

#353534

Preenchimento:

Cyber Lime

ou gradiente:

Electric Cyan → Cyber Lime
22. Opções do Quiz

Cards de seleção devem possuir:

Estado normal
background: #1A1A1A;
border: 1px solid #454932;
Hover

Destacar borda.

Selecionado
border-color: #D2F000;

Pode utilizar glow discreto.

23. Pular Perguntas

O usuário pode pular perguntas opcionais.

O botão deve ser visualmente secundário:

PULAR ESTA ETAPA

O terreno é obrigatório por ser um filtro eliminatório crítico.

24. Resultados

A página de resultados é a principal vitrine do projeto.

Estrutura:

SEUS TÊNIS IDEAIS

[ TOP 1 ]
[ TOP 2 ]
[ TOP 3 ]

-------------------------

MODELOS POPULARES
NÃO RECOMENDADOS PARA VOCÊ

[ DESCARTADO ]
[ DESCARTADO ]
[ DESCARTADO ]
25. Shoe Card

Cada tênis deve apresentar:

imagem;
marca;
modelo;
categoria;
Match;
preço;
drop;
peso;
stack;
placa;
terreno;
justificativa.

Exemplo:

ASICS

NOVABLAST

92% MATCH

R$ 899

DROP       08 MM
PESO       255 G
STACK      41 MM
PLACA      NÃO

POR QUE RECOMENDAMOS
Modelo responsivo e versátil,
adequado ao seu ritmo e distância.
26. Match Score

O indicador deve mostrar claramente a compatibilidade.

Exemplo:

92% MATCH

Referência visual:

85% — 100%
Alta compatibilidade

60% — 84%
Compatibilidade moderada

Abaixo de 60%
Baixa compatibilidade

A cor deve refletir o nível de compatibilidade.

27. Recomendação Principal

O Top 1 deve possuir maior destaque visual.

Pode utilizar:

TOP PICK

ou:

MELHOR MATCH

O destaque pode utilizar:

Cyber Lime;
borda mais evidente;
glow discreto;
posição prioritária.
28. Modelos Descartados

Modelos populares que não passaram pelos filtros eliminatórios podem aparecer na seção:

MODELOS POPULARES
NÃO RECOMENDADOS PARA VOCÊ

Esses cards devem possuir aparência visualmente secundária.

Exemplo:

NIKE VAPORFLY

X DESCARTADO

Modelo de competição com placa de carbono.
Incompatível com seu objetivo de treino diário.

O motivo do descarte deve ser explícito.

29. Justificativa das Recomendações

A recomendação deve ser explicável.

O usuário precisa entender:

POR QUE ESTE TÊNIS?

A resposta deve utilizar os dados fornecidos pelo usuário e os atributos do tênis.

Exemplo:

Recomendamos este modelo porque possui
8 mm de drop, amortecimento elevado e
boa adequação para sua distância de 21 km.
30. IA

A IA não deve controlar o algoritmo principal de recomendação.

O algoritmo principal é:

DETERMINÍSTICO

A IA deve ser utilizada inicialmente para:

gerar justificativas;
explicar recomendações;
interpretar perguntas específicas;
auxiliar em futuras buscas semânticas.

A IA nunca deve inventar especificações técnicas.

31. Algoritmo

O sistema deve separar:

Hard Constraints

Filtros eliminatórios.

Exemplos:

Terreno
Orçamento
Compatibilidade crítica de pisada
Disponibilidade
Soft Constraints

Pontuação de afinidade.

Referência inicial:

Distância: 30%
Ritmo + Experiência: 25%
Peso corporal: 25%
Preferência de drop: 20%

Total:

100%
32. Dados dos Tênis

Os dados iniciais podem ser armazenados localmente em:

data/tenis.json

O JSON deve conter somente dados estruturados.

Exemplo:

{
  "id": "asics-superblast-2",
  "marca": "ASICS",
  "modelo": "Superblast 2",
  "categoria": "rodagem_performance",
  "terrenos": ["asfalto", "esteira"],
  "drop_mm": 8,
  "peso_g": 249,
  "stack_mm": 45,
  "pisada": "neutra",
  "placa": false,
  "distancias": ["5k", "10k", "21k", "42k"],
  "nivel": ["intermediario", "avancado"],
  "preco_atual": 1299
}
33. Responsividade

Todos os componentes devem funcionar em:

Mobile
Tablet
Desktop

Nunca criar uma versão desktop que simplesmente "quebra" no mobile.

Priorizar:

flexbox;
CSS Grid;
unidades relativas;
media queries;
imagens responsivas.
34. Performance

A Home deve carregar rapidamente.

Prioridades:

HTML simples;
CSS organizado;
JavaScript somente quando necessário;
imagens otimizadas;
evitar bibliotecas desnecessárias;
evitar animações pesadas;
evitar requisições antes do início do quiz.

Objetivo:

Primeira renderização extremamente rápida.
35. Animações

As animações devem ser discretas.

Permitido:

fade-in;
hover;
transições;
progress bar;
pequenos efeitos de scan;
glow sutil.

Evitar:

animações contínuas excessivas;
parallax pesado;
vídeos de fundo;
efeitos que prejudiquem performance.
36. Acessibilidade

O projeto deve seguir boas práticas de acessibilidade.

Priorizar:

HTML semântico;
contraste adequado;
navegação por teclado;
:focus-visible;
labels associados aos inputs;
alt em imagens;
botões semanticamente corretos;
textos legíveis.

Não utilizar cor como único indicador de informação.

37. Estrutura CSS

O CSS deve ser modularizado.

Estrutura:

css/
│
├── main.css
├── reset.css
├── tokens.css
├── base.css
├── layout.css
│
├── componentes/
│   ├── buttons.css
│   ├── navbar.css
│   └── footer.css
│
└── pages/
    └── home.css
38. Responsabilidade dos Arquivos
reset.css

Normalização dos estilos padrão do navegador.

tokens.css

Variáveis:

cores;
fontes;
espaçamentos;
tamanhos;
breakpoints;
bordas.
base.css

Estilos globais:

html;
body;
links;
imagens;
tipografia global;
elementos básicos.
layout.css

Estrutura:

containers;
grids;
seções;
espaçamentos estruturais.
componentes/

Componentes reutilizáveis:

buttons.css
navbar.css
footer.css
pages/home.css

Somente estilos específicos da Home.

Exemplos:

hero
about
how-it-works
home sections
39. JavaScript

O JavaScript deve seguir separação de responsabilidades.

Evitar colocar todo o código em um único arquivo gigante.

Estrutura futura:

js/
│
├── home.js
├── quiz.js
├── recomendador.js
├── ui.js
└── data.js

No MVP inicial, arquivos menores podem ser combinados enquanto a complexidade ainda for baixa.

40. Tecnologias
MVP
HTML5
CSS3
JavaScript
JSON
Git
GitHub
GitHub Pages

Não é obrigatório utilizar frameworks no primeiro estágio.

41. Stack Futura

Caso o projeto evolua:

Frontend:
React

Backend:
Node.js

Database:
PostgreSQL ou MongoDB

Automação:
GitHub Actions

Scraping:
Node.js ou Python

IA:
LLM + RAG / busca semântica

Deploy:
Vercel ou outra plataforma adequada

Essas tecnologias não fazem parte do MVP inicial.

42. Princípio de Desenvolvimento

O CORRE+ deve evoluir progressivamente.

Ordem de prioridade:

1. Interface
2. Responsividade
3. Dados
4. Quiz
5. Algoritmo
6. Resultados
7. Feedback
8. IA
9. Backend
10. Scraping

Não adicionar infraestrutura complexa antes de validar a experiência principal.

43. Regra Fundamental do Design

Cada elemento visual deve ter uma função.

O CORRE+ deve parecer:

uma ferramenta inteligente de análise de corrida.

Não deve parecer:

uma loja de tênis com elementos futuristas.

A estética tecnológica deve reforçar a função do produto, não apenas decorar a interface.

44. Princípios de UI

Sempre priorizar:

CLAREZA
PRECISÃO
HIERARQUIA
LEGIBILIDADE
PERFORMANCE
CONSISTÊNCIA

Antes de adicionar um elemento, verificar se ele melhora:

compreensão;
navegação;
decisão;
percepção de performance.

Se não melhorar nenhuma dessas áreas, provavelmente não deve existir.

45. Estado Atual do Projeto

O projeto está sendo desenvolvido inicialmente como uma aplicação frontend estática.

Stack atual:

HTML
CSS
JavaScript
JSON

Ambiente:

VS Code
Git
GitHub
GitHub Pages

O design inicial foi desenvolvido com auxílio do Google Stitch e está sendo adaptado manualmente para uma arquitetura frontend organizada.

O objetivo é utilizar o projeto também como demonstração prática de:

desenvolvimento frontend;
organização de código;
UX/UI;
JavaScript;
lógica de recomendação;
utilização responsável de IA;
resolução de problemas reais.
46. Regra para futuras alterações

Novos componentes devem respeitar este documento.

Antes de criar um novo estilo:

verificar se já existe um token;
verificar se já existe um componente reutilizável;
reutilizar as cores existentes;
reutilizar a tipografia definida;
respeitar o espaçamento;
manter o estilo técnico;
garantir responsividade;
evitar duplicação de CSS.

Não criar novas cores ou padrões visuais sem necessidade.

47. Regra para IA / Codex

Ao modificar o projeto, a IA deve:

respeitar este DESIGN.md;
preservar a identidade visual;
não substituir a arquitetura existente sem necessidade;
não criar dependências desnecessárias;
não introduzir frameworks sem solicitação;
manter HTML semântico;
manter CSS modular;
manter JavaScript organizado;
explicar alterações estruturais relevantes;
evitar reescrever arquivos inteiros quando uma alteração localizada for suficiente.
48. Identidade Visual Resumida
CORRE+

DARK
TECHNICAL
SPORT PERFORMANCE
DATA
BIOMECHANICS
PRECISION
MINIMALISM

CYBER LIME
+
ELECTRIC CYAN

ARCHIVO NARROW
+
GEIST
+
JETBRAINS MONO

SHARP EDGES
+
TECHNICAL GRID
+
SUBTLE GLOW
+
DATA-DRIVEN UI
Design Principle

CORRE+ transforma dados de corrida em decisões mais inteligentes sobre o tênis.

A interface deve comunicar isso visualmente antes mesmo do usuário iniciar o quiz.


### Importante para sua estrutura atual

Como você já tem:

```text
main.css
reset.css
tokens.css
base.css
layout.css
componentes/

eu faria apenas uma pequena adaptação na estrutura que você já criou:

css/
├── main.css
├── reset.css
├── tokens.css
├── base.css
├── layout.css
│
├── componentes/
│   ├── buttons.css
│   ├── navbar.css
│   └── footer.css
│
└── pages/
    └── home.css

E o main.css ficaria responsável por importar tudo:

@import url("reset.css");
@import url("tokens.css");
@import url("base.css");
@import url("layout.css");

@import url("componentes/buttons.css");
@import url("componentes/navbar.css");
@import url("componentes/footer.css");

@import url("pages/home.css");