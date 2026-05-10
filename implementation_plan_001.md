# Plano de Implementação: Simulador de Painel de Máquina (Atualizado)

Este documento detalha o plano de desenvolvimento para uma aplicação Web focada em simular o painel de operação de máquina, com base na imagem `Generated3.png` e, principalmente, no mapeamento detalhado em `PanelTable.txt`.

## User Review Required

> [!IMPORTANT]  
> A tabela de controles define uma grade exata de **6 linhas por 12 colunas** (72 posições, sendo algumas vazias). O layout será construído usando CSS Grid para espelhar exatamente essa disposição. 
> Usaremos **HTML, CSS e JavaScript (Vanilla)** com **Vite** para empacotamento, permitindo alta performance e um ambiente de desenvolvimento rápido.

## Open Questions

> [!WARNING]  
> 1. **Imagens da Máquina:** A interface precisa exibir o status visual da máquina através de imagens. Você já possui os arquivos de imagem das diferentes etapas do ciclo da máquina (ex: molde abrindo/fechando, injeção, etc.) ou devo usar *placeholders* (imagens geradas ou ícones) por enquanto?
> 2. **Lógica Completa vs Visual:** Devemos implementar a lógica de intertravamento de *todos* os botões (ex: a máquina não inicia se a porta de segurança estiver destravada e a emergência ativada) ou focar primeiro no feedback visual (luzes acendendo, botões movendo e painel de texto atualizando) para cada interação individual?

## Proposed Changes

A aplicação será estruturada em um projeto Vite (HTML/CSS/JS) com os seguintes componentes:

### 1. Inicialização do Projeto e Estrutura

Usaremos `npm create vite@latest . -- --template vanilla` para configurar o projeto.

#### [NEW] `index.html`
- **Container Principal (App):** Dividido em duas áreas.
  - **Área de Visualização (Status):** Contendo uma imagem representativa da máquina e um painel de "Log/Status Digital" que registrará as ações.
  - **Painel de Controle:** Um container `div` com CSS Grid (`grid-template-columns: repeat(12, 1fr)` e `grid-template-rows: repeat(6, 1fr)`) que abrigará os controles.

#### [NEW] `style.css`
- **Design System:** Definição de estilos para os variados tipos de botões descritos na tabela:
  - `3-position selector switch`, `2-position selector switch`, `12-position rotary selector switch` (chaves rotativas)
  - `Momentary push button` (botões de pressão)
  - `Illuminated push button` / `Pilot light indicator` (botões com luz embutida ou apenas luzes - cores: Blue, Green, White, Orange, Red)
  - `Emergency stop mushroom button` (botão de emergência grande e vermelho)
  - `Guarded toggle switch` (alavanca com guarda)

### 2. Renderização Dinâmica e Lógica do Painel

Em vez de criar os 72 botões manualmente no HTML, usaremos o JavaScript para ler os dados e gerar o painel, facilitando a manutenção.

#### [NEW] `src/panelData.js`
- Um array de objetos contendo os dados extraídos de `PanelTable.txt` (linha, coluna, rótulo, tipo de controle, cor).

#### [NEW] `src/main.js`
- **Renderização:** Função que itera sobre `panelData` e cria os elementos DOM correspondentes, posicionando-os no CSS Grid com `grid-area: row / col`.
- **Gerenciador de Estado:** Objeto de estado global (ex: `{ pumpMotor: false, emergency: false, cycle: 'manual' }`).
- **Event Listeners:** Atribuição de eventos de `click`, `mousedown`/`mouseup` (para botões momentâneos) aos elementos gerados.
- **Feedback de Status:** Função `logAction(message)` que atualiza o painel de texto digital e muda a imagem da máquina dependendo do botão pressionado.

### 3. Detalhamento Visual (Aesthetics)

- **Fundo:** Textura de metal escuro ou cinza industrial para o painel.
- **Botões:** Sombras 3D (`box-shadow` e `inset`) para simular profundidade.
- **Luzes (Illuminated / Pilot):** Uso de `filter: drop-shadow(...)` e mudança de `background-color` para simular o efeito de luz acesa/apagada quando clicado ou ativado via lógica.

## Verification Plan

### Testes Manuais
1. **Layout e Responsividade:** Iniciar o servidor com `npm run dev` e verificar se a grade 6x12 está perfeitamente alinhada e se as posições vazias (Blank/dummy) estão de fato vazias.
2. **Interatividade Visual:** Clicar em chaves seletoras para verificar a animação de rotação/mudança de estado; clicar em botões iluminados e ver se a luz "acende"; pressionar o botão de emergência e garantir que se destaque.
3. **Log de Status:** Validar se a cada clique em um controle ativo, o "Display de Status" exibe a ação correspondente (ex: "METAL LADLE FORWARD pressionado").
