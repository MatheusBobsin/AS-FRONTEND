const inputTarefa = document.getElementById('inputTarefa');
const selectPrioridade = document.getElementById('selectPrioridade');
const mensagemErro = document.getElementById('mensagemErro');
const listaPendentes = document.getElementById('listaPendentes');
const listaConcluidas = document.getElementById('listaConcluidas');
const contadorPendentes = document.getElementById('contadorPendentes');
const contadorConcluidas = document.getElementById('contadorConcluidas');

let numeroPendentes = 0;
let numeroConcluidas = 0;

function moverParaHistorico(texto, prioridade) {
    const tempoAtual = new Date();
    const dataFormatada = tempoAtual.toLocaleDateString('pt-BR');
    const horarioFormatado = tempoAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let corDaBordaHistorico = "";
    if (prioridade === "alta") {
        corDaBordaHistorico = "border-red-500/40";
    } else if (prioridade === "media") {
        corDaBordaHistorico = "border-yellow-500/40";
    } else {
        corDaBordaHistorico = "border-green-500/40";
    }

    const cardHistorico = document.createElement('div');
    cardHistorico.className = "p-3 bg-neutral-950 border rounded-lg text-xs " + corDaBordaHistorico;

    cardHistorico.innerHTML = `
        <div class="flex justify-between items-center mb-1.5">
            <p class="font-medium text-neutral-500 line-through text-sm tracking-wide">${texto}</p>
            <span class="text-[9px] bg-neutral-900 text-neutral-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">${prioridade}</span>
        </div>
        <p class="text-neutral-600 font-medium text-[10px]">Concluído em ${dataFormatada} às ${horarioFormatado}</p>
    `;

    listaConcluidas.insertBefore(cardHistorico, listaConcluidas.firstChild);

    numeroConcluidas = numeroConcluidas + 1;
    contadorConcluidas.textContent = numeroConcluidas;
}

function criarNovaTarefa() {
    const textoTarefa = inputTarefa.value.trim();
    const prioridadeSelecionada = selectPrioridade.value;

    if (textoTarefa === "") {
        mensagemErro.classList.remove('hidden');
        return;
    }

    mensagemErro.classList.add('hidden');

    let corDoCard = "";
    if (prioridadeSelecionada === "alta") {
        corDoCard = "border border-red-500 bg-neutral-950";
    } else if (prioridadeSelecionada === "media") {
        corDoCard = "border border-yellow-500 bg-neutral-950";
    } else {
        corDoCard = "border border-green-500 bg-neutral-950";
    }

    const card = document.createElement('div');
    card.className = "p-3 rounded-lg shadow-sm flex justify-between items-center " + corDoCard;

    card.innerHTML = `
        <div class="pr-2">
            <p class="font-semibold text-neutral-100 text-sm tracking-wide">${textoTarefa}</p>
            <span class="text-[9px] text-purple-400 uppercase font-black tracking-widest mt-0.5 block">Prioridade ${prioridadeSelecionada}</span>
        </div>
        <div class="flex gap-1.5 content-center items-center">
            <button class="botao-concluir bg-purple-600 hover:bg-purple-700 text-white font-bold px-2.5 py-1 rounded text-[11px] cursor-pointer transition-colors">Concluir</button>
            <button class="botao-excluir bg-neutral-800 hover:bg-neutral-700 text-neutral-400 border border-neutral-800 font-bold px-2.5 py-1 rounded text-[11px] cursor-pointer transition-colors">Excluir</button>
        </div>
    `;

    const botaoExcluir = card.querySelector('.botao-excluir');
    botaoExcluir.onclick = function() {
        card.remove();
        numeroPendentes = numeroPendentes - 1;
        contadorPendentes.textContent = numeroPendentes;
    };

    const botaoConcluir = card.querySelector('.botao-concluir');
    botaoConcluir.onclick = function() {
        card.remove();
        numeroPendentes = numeroPendentes - 1;
        contadorPendentes.textContent = numeroPendentes;
        moverParaHistorico(textoTarefa, prioridadeSelecionada);
    };

    listaPendentes.appendChild(card);

    numeroPendentes = numeroPendentes + 1;
    contadorPendentes.textContent = numeroPendentes;

    inputTarefa.value = "";
}
