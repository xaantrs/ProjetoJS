const value = document.getElementById("value");
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
 
const updateValue = () => {
    value.innerHTML = "Gols " + count;
}
 
let count = 0;
let intervalId = 0;
 
plusButton.addEventListener('click', () => {
        count += 1;
        updateValue();
});
 
minusButton.addEventListener('click', () => {
        count -= 1;
        updateValue();
});
 
const valueAssist = document.getElementById("valueAssist");
const plusButtonAssist = document.getElementById("plusAssist");
const minusButtonAssist = document.getElementById("minusAssist");
 
 
const updateValueAssist = () => {
    valueAssist.innerHTML = countAssist +  " assistências";
}
 
let countAssist = 0;
let intervalIdAssist = 0;
 
plusButtonAssist.addEventListener('click', () => {
        countAssist += 1;
        updateValueAssist();
});
 
minusButtonAssist.addEventListener('click', () => {
        countAssist -= 1;
        updateValueAssist();
});
 
 // Função para cadastrar um novo jogador na lista
function cadastrarJogador() {
    const nomeInput = document.getElementById('nome');
    const timeInput = document.getElementById('time');
    const golsInput = document.getElementById('gols');
    const assistenciasInput = document.getElementById('assistencias');
    const fotoInput = document.getElementById('foto');
 
    // Verifica se todos os campos estão preenchidos
    if (nomeInput.value && timeInput.value && fotoInput.value) {
        // Cria um objeto representando o novo jogador
        const jogador = {
            nome: nomeInput.value,
            time: timeInput.value,
            gols: parseInt(golsInput.value),
            assistencias: parseInt(assistenciasInput.value),
            foto: fotoInput.value
        };
 
        // Adiciona o jogador ao array de jogadores
        const jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
        jogadores.push(jogador);
        localStorage.setItem('jogadores', JSON.stringify(jogadores));
 
        // Redireciona para o "index.html" com os dados dos jogadores
        window.location.href = `/index.html?jogadores=${encodeURIComponent(JSON.stringify(jogadores))}`;
    } else {
        // Caso algum campo esteja vazio, exibe um alerta
        alert('Por favor, preencha todos os campos.');
    }
}
 
// Função para ler os dados dos jogadores da URL
function getJogadoresFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const jogadoresJSON = urlParams.get('jogadores');
    return jogadoresJSON ? JSON.parse(decodeURIComponent(jogadoresJSON)) : [];
}
 
// Função para exibir os jogadores na lista
function exibirJogadoresNaLista() {
    const jogadores = getJogadoresFromURL();
    const listaJogadores = document.getElementById('lista-jogadores');
 
    // Limpa a lista
    listaJogadores.innerHTML = '';
 
    // Adiciona cada jogador à lista
    jogadores.forEach(jogador => {
        const listItem = document.createElement('li');
        listItem.textContent = `${jogador.nome} - ${jogador.time}`;
        listaJogadores.appendChild(listItem);
    });
}