const html = document.querySelector('html');
const btFoco = document.querySelector('.app__card-button--foco');
const btCurto = document.querySelector('.app__card-button--curto');
const btLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const inputMusicaFoco = document.querySelector('#alternar-musica');
const btStartPause = document.querySelector('#start-pause');
const musica = new Audio('../sons/luna-rise-part-one.mp3');
const somPlay = new Audio('../sons/play.wav');
const somPause = new Audio('../sons/pause.mp3');
const somEnd = new Audio('../sons/beep.mp3');
const btIniciarOuPausar = document.querySelector('#start-pause span');
const iconIniciarOuPausar = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

inputMusicaFoco.addEventListener('change',() =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});

btFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    btFoco.classList.add('active');
});
btCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    btCurto.classList.add('active');
});
btLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    btLongo.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto){
    contexto.classList.remove('active')
    });
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = ` Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = ` Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = ` Hora de voltar a superfície<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        //somEnd.play();
        alert('Tempo finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') === 'foco';
        if (focoAtivo){
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

btStartPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        zerar();
        btIniciarOuPausar.textContent = 'Voltar';
        iconIniciarOuPausar.setAttribute('src','../imagens/play_arrow.png');
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    somPlay.play();
    iconIniciarOuPausar.setAttribute('src','../imagens/pause.png');
    btIniciarOuPausar.textContent = 'Pausar';
}

function zerar(){
    somPause.play();
    clearInterval(intervaloId);
    intervaloId = null;
    iconIniciarOuPausar.setAttribute('src','../imagens/play_arrow.png');
    btIniciarOuPausar.textContent = 'Começar';
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();