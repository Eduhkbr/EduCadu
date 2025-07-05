# EduCadu: Aprender e Brincar

Bem-vindo ao EduCadu, um aplicativo web educacional interativo, projetado para ajudar crianças a aprender o alfabeto, números, cores e formas de uma maneira divertida e acessível. O projeto foi construído com tecnologias modernas e com um foco especial em acessibilidade e engajamento.

Este aplicativo é um **Progressive Web App (PWA)**, o que significa que pode ser "instalado" na tela inicial de celulares e computadores para uma experiência mais próxima a de um aplicativo nativo.

Atualmente disponível em: https://orangered-capybara-572155.hostingersite.com/

---

## 🚀 Funcionalidades Implementadas

O aplicativo já conta com um robusto conjunto de funcionalidades prontas para uso:

* **Internacionalização (i18n):** Suporte completo para **Português (pt-BR)** e **Inglês (en-US)**, com a capacidade de trocar o idioma em tempo real.
* **Acessibilidade:**
    * **Controle de Som:** A narração pode ser ativada ou desativada.
    * **Temas de Cores:** Inclui temas "Padrão", "Calmo" e "Alto Contraste" para diferentes necessidades visuais.
* **Narração Inteligente (Text-to-Speech):** Utiliza a API de fala do navegador para ler o conteúdo, com lógica aprimorada para frases gramaticalmente corretas em diferentes idiomas (ex: "A de Abelha" e "A is for an Animal").
* **Compatibilidade Mobile:** Todos os jogos são compatíveis com eventos de toque, funcionando perfeitamente em celulares e tablets.
* **Sistema de Recompensas (Gamificação):** As crianças ganham estrelas douradas ao completarem os jogos, incentivando o progresso e a aprendizagem.

---

## 🎮 Jogos e Atividades

Atualmente, o EduCadu oferece um sub-menu para cada categoria principal, permitindo que a criança escolha entre aprender ou jogar.

### 1. Modo de Aprendizagem (Flashcards)
Disponível para todas as categorias, este modo mostra um item de cada vez (uma letra, um número, etc.), exibe sua imagem e fala o seu nome. É ideal para o primeiro contato com o conteúdo.

### 2. Jogo da Memória (Categoria: Animais)
Um clássico jogo de encontrar os pares. A criança vira os cartões para encontrar os animais correspondentes, exercitando a memória e o reconhecimento visual.

### 3. Jogo de Arrastar e Soltar (Categoria: Alfabeto)
Neste jogo, uma letra é apresentada e a criança deve arrastá-la até a imagem correta entre três opções. Esta atividade reforça a associação entre a letra, seu som e uma palavra.

### 4. Jogo de Contar (Categoria: Números)
A tela exibe uma quantidade de objetos (bolas) e a criança deve contar e clicar no número correto entre as opções. Uma ótima maneira de praticar a contagem e o reconhecimento numérico.

---

## 📋 Planejamento e Próximos Passos

O projeto segue um plano de ação bem definido. Abaixo está o status atual e o que vem pela frente.

* ✅ **Fase 1: Fundação Técnica** - Completa.
* ✅ **Fase 2: Internacionalização** - Completa.
* 🌗 **Fase 3: Interatividade e Acessibilidade** - Em andamento.
* 🌗 **Fase 4: Lançamento** - Em andamento.

### Itens Pendentes:

* **Novos Jogos:**
    * **Cores:** Desenvolver um jogo de "estourar balões".
    * **Formas:** Criar um quebra-cabeças simples de encaixar.
* **Melhorias de Acessibilidade:**
    * Adicionar uma opção para "reduzir movimento" e simplificar as animações.
* **Preparação para Lançamento:**
    * Criar uma **Página Inicial (Landing Page)** para apresentar o aplicativo aos pais e educadores.

---

## 💻 Como Executar o Projeto Localmente

Para executar o EduCadu na sua máquina, siga estes passos:

1.  **Clone o repositório** 
2.  **Instale as dependências** (é necessário ter o Node.js instalado):
    ```bash
    npm install
    ```
3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O aplicativo estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

4.  **Para gerar os arquivos de produção** (para enviar para a hospedagem):
    ```bash
    npm run build
    ```
    Os arquivos prontos para o deploy estarão na pasta `dist`.