// Selecionando os elementos do HTML
const questaoElemento = document.getElementById('questao');
const opcaoElementos = Array.from(document.getElementsByClassName('opcao'));
const proximaBtn = document.getElementById('proxima-btn');
const pontosElemento = document.getElementById('pontos');
const errosElemento = document.getElementById('erros');

let perguntaAtual = 0; // Indice da pergunta atual
let pontuacao = 0; // Pontuação do jogador
let erros = 0; // Erros do jogador
let respostaEscolhida = false; // Se o jogador escolheu uma resposta

// Função para carregar a pergunta atual
function carregarPergunta() {
  const dadosPerguntaAtual = questoes[perguntaAtual]; // Pegando a pergunta atual
  questaoElemento.innerText = dadosPerguntaAtual.questao; // Colocando a pergunta no HTML

  // Colocar as opções da pergunta em cada button do HTML
  const opcoes = embaralharMatriz([...dadosPerguntaAtual.opcoes]); // Embaralhando as opções da pergunta

  opcaoElementos.forEach((opcao, indice) => {
    // Para cada opção
    opcao.innerText = opcoes[indice]; // Colocar o texto da opção no button
  });

  respostaEscolhida = false; // Resposta não escolhida
}

function embaralharMatriz(matriz) {
  // Função para embaralhar a matriz
  let indiceAtual = matriz.length; // Tamanho da matriz
  let valorTemporario; // Valor temporário
  let indiceAleatorio; // Indice aleatório

  while (0 !== indiceAtual) {
    // Enquanto o indice atual for diferente de 0
    indiceAleatorio = Math.floor(Math.random() * indiceAtual); // Indice aleatório
    indiceAtual -= 1; // Indice atual menos 1

    valorTemporario = matriz[indiceAtual]; // Valor temporário
    matriz[indiceAtual] = matriz[indiceAleatorio]; // Valor do indice atual recebe o valor do indice aleatório
    matriz[indiceAleatorio] = valorTemporario; // Valor do indice aleatório recebe o valor temporário
  }

  return matriz; // Retorna a matriz embaralhada
}

// Para cada opção
function verificarResposta(resposta) {
  if (respostaEscolhida) return; // Se a resposta já foi escolhida, retorna
  respostaEscolhida = true; // Resposta escolhida

  if (resposta.innerText === questoes[perguntaAtual].resposta) {
    // Se a resposta escolhida for igual a resposta da pergunta atual
    pontuacao++; // Pontuação mais 1
    pontosElemento.innerText = `Pontuação ${pontuacao}`; // Colocar a pontuação no HTML
    alert('Você acertou!'); // Alerta de acerto
  } else {
    erros += 1; // Erros mais 1
    errosElemento.innerText = `Erros ${erros}`; // Colocar os erros no HTML
    alert(
      `Você errou! A resposta correta é ${questoes[perguntaAtual].resposta}`,
    ); // Alerta de erro
  }
}

opcaoElementos.forEach((opcao) => {
  // Para cada opção
  opcao.addEventListener('click', () => {
    // Quando clicar na opção
    verificarResposta(opcao); // Verificar a resposta
  });
});

// Faça uma função para ir para a próxima pergunta, com evento de click no botão
proximaBtn.addEventListener('click', () => {
  // Quando clicar no botão
  perguntaAtual++; // Pergunta atual mais 1

  if (perguntaAtual === questoes.length) {
    // Se a pergunta atual for igual ao tamanho da matriz de perguntas
    alert(
      `Fim de jogo! Sua pontuação foi ${pontuacao} e seus erros foram ${erros}`,
    ); // Alerta de fim de jogo
    return window.location.assign('index.html'); // Redirecionar para a página inicial
  }

  carregarPergunta(); // Carregar a próxima pergunta
});

// Chamando a função para carregar a pergunta
carregarPergunta();
