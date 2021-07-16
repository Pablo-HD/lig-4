//tela inicial
const modalinicial = document.getElementById('selectplayer');

//definição de nome dos players
let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');


const botaojogar = document.getElementById('playnow')


//chama a função de iniciar o jogo no botão de jogar
botaojogar.addEventListener('click', function () {
    inicia()
})




//entra na tela do jogo e define o nome dos players
const inicia = () => {
    btnClickSound();
    player1 = player1.value
    if (player1 === "") {
        player1 = 'Player 1'
    }
    player2 = player2.value
    if (player2 === "") {
        player2 = 'Player 2'
    }
    modalinicial.style.display = 'none'
}




//detecta a div que recebe o jogo
const game = document.getElementById('content');





//cria as barras
for (i = 1; i <= 7; i++) {
    let col = document.createElement('div');
    col.className = 'colum'
    col.id = `col${i}`
    game.appendChild(col)
}





//cria o "mapa"
let map = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];




//variavel que define o player atual
let clickCount = 0;




//função que captura o click e solta as bolinhas
const click = (e) => {
    let here = e.currentTarget;
    if (here.childElementCount < 6) {
        if (clickCount === 0) {
            let ballR = document.createElement("div");
            ballR.classList.add('ballR');
            ballR.classList.add('dropDown')
            here.appendChild(ballR);
            setTimeout(function () {
                ballR.classList.remove('dropDown');
            }, 500);

            let childCount = here.childElementCount;
            // o childCount nunca será 0, pois quando clicar já terá pelo menos 1 bolinha
            if (here.id === "col1") {
                let where = 6 - childCount;
                map[where][0] = 1;
            } else if (here.id === "col2") {
                let where = 6 - childCount;
                map[where][1] = 1;
            } else if (here.id === "col3") {
                let where = 6 - childCount;
                map[where][2] = 1;
            } else if (here.id === "col4") {
                let where = 6 - childCount;
                map[where][3] = 1;
            } else if (here.id === "col5") {
                let where = 6 - childCount;
                map[where][4] = 1;
            } else if (here.id === "col6") {
                let where = 6 - childCount;
                map[where][5] = 1;
            } else if (here.id === "col7") {
                let where = 6 - childCount;
                map[where][6] = 1;
            }

            clickCount = 1;
            player2Click()


        } else if (clickCount === 1) {
            let ballB = document.createElement("div");
            ballB.classList.add('ballB');
            ballB.classList.add('dropDown')
            here.appendChild(ballB);
            setTimeout(function () {
                ballB.classList.remove('dropDown');
            }, 500);

            let childCount = here.childElementCount;
            if (here.id === "col1") {
                let where = 6 - childCount;
                map[where][0] = 2;
            } else if (here.id === "col2") {
                let where = 6 - childCount;
                map[where][1] = 2;
            } else if (here.id === "col3") {
                let where = 6 - childCount;
                map[where][2] = 2;
            } else if (here.id === "col4") {
                let where = 6 - childCount;
                map[where][3] = 2;
            } else if (here.id === "col5") {
                let where = 6 - childCount;
                map[where][4] = 2;
            } else if (here.id === "col6") {
                let where = 6 - childCount;
                map[where][5] = 2;
            } else if (here.id === "col7") {
                let where = 6 - childCount;
                map[where][6] = 2;
            }

            clickCount = 0;
            player1Click()

        }
    }
    horizontal()
    vertical()
    diagonalSup()
    diagonalInf()
    empate()
}



//adiciona listener de click em cada coluna
const coluns = document.querySelectorAll(".colum");
for (let i = 0; i < coluns.length; i++) {
    coluns[i].addEventListener("click", click);
}



//aciona o modal de vitória
const modal = (winner) => {
    let modal = document.querySelector("#modal")
    let whoWins = document.querySelector("#whoWins");

    modal.style.display = "block"
    if (winner === 1) {
        winner = player1;
        whoWins.className = "red";
    } else if (winner === 2) {
        winner = player2;
        whoWins.className = "blue";

    }
    // console.log(winner)
    whoWins.innerHTML = `${winner} ganhou!`;
    victorySound();
}




//aciona o modal de empate
const modalempate = () => {
    let modal = document.querySelector("#modal")
    let whoWins = document.querySelector("#whoWins");
    modal.style.display = "block"
    modal.style.backgroundImage = "url('./src/Imagens/empate.gif')"
    modal.style.backgroundSize = "300px"
    modal.style.backgroundPosition = "bottom"
    whoWins.innerHTML = 'Empatou!';
    desappointedSound();
}


//Resetar o game
document.getElementById("restartgame").onclick = () => {
    window.location.reload()
}



//efeitos sonoros do jogo


//seleciona o audio do código
let audio = document.querySelector("#sound");
let backgroundSong = document.querySelector("#backgroundSong")

//cria uma funçao de audio para cada situaçao do game
const btnClickSound = () => {
    audio.src = "./src/sounds/btnClick.mp3";
    audio.currentTime = 0.6;
    audio.volume = 0.5;
    audio.play();
}

const player1Click = () => {
    audio.src = "./src/sounds/player1Click.m4a";
    audio.volume = 0.5;
    audio.play();
}

const player2Click = () => {
    audio.src = "./src/sounds/player2Click.m4a";
    audio.volume = 0.5;
    audio.play();
}

const victorySound = () => {
    audio.src = "./src/sounds/victorySound.mp3";
    audio.currentTime = 9;
    audio.volume = 0.5;
    backgroundSong.pause();
    audio.play();
}
const desappointedSound = () => {
    audio.src = "./src/sounds/desappointed.mp3";
    audio.currentTime = 0.1;
    audio.volume = 0.5;
    backgroundSong.pause();
    audio.play();
}

document.body.onload = () => {
    backgroundSong.src = "./src/sounds/backgroundSong.mp3";
    backgroundSong.currentTime = 0.5;
    backgroundSong.volume = 0.02;
    backgroundSong.play();
}




//verificar a vitoria

//verificação de 4 bolinhas iguais na vertical
const vertical = () => {
    for (let i = 0; i < map.length - 3; i++) {
        for (let j = 0; j < map[0].length; j++) {

            if (map[i][j] === map[i + 1][j] &&
                map[i][j] === map[i + 2][j] &&
                map[i][j] === map[i + 3][j] &&
                map[i][j] !== 0) {

                modal(map[i][j]);
                // console.log(`${map[i][j]} ganhou vertical`)
            }
        }
    }
}


//verificação de 4 bolinhas iguais na horizontal
const horizontal = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {

            if (map[i][j] === map[i][j + 1] &&
                map[i][j] === map[i][j + 2] &&
                map[i][j] === map[i][j + 3] &&
                map[i][j] !== 0) {
                modal(map[i][j]);
                // console.log(`${map[i][j]} ganhou horizontal`)
            }

        }
    }
}


//verificação de 4 bolinhas iguais na diagonal superior
const diagonalSup = () => {
    for (let i = 2; i < map.length; i++) {
        for (let j = 0; j < map[0].length - 1; j++) {
            if (map[i][j] !== 0 &&
                map[i][j] === map[i - 1][j + 1] &&
                map[i][j] === map[i - 2][j + 2] &&
                map[i][j] === map[i - 3][j + 3]
            ) {
                modal(map[i][j]);
                // console.log(`${map[i][j]} ganhou na diagonal sup`)
            }
        }
    }
}



//verificação de 4 bolinhas iguais na diagonal inferior
const diagonalInf = () => {
    for (let i = 0; i < map.length - 3; i++) {
        for (let j = 0; j < map[0].length - 1; j++) {
            if (map[i][j] !== 0 &&
                map[i][j] === map[i + 1][j + 1] &&
                map[i][j] === map[i + 2][j + 2] &&
                map[i][j] === map[i + 3][j + 3]
            ) {
                modal(map[i][j]);
                // console.log(`${map[i][j]} ganhou na diagonal inf`)
            }
        }
    }
}


// verificação de empate
const empate = () => {
    if (col1.childElementCount === 6 &&
        col2.childElementCount === 6 &&
        col3.childElementCount === 6 &&
        col4.childElementCount === 6 &&
        col5.childElementCount === 6 &&
        col6.childElementCount === 6 &&
        col7.childElementCount === 6) {
        if (!horizontal() &&
            !vertical() &&
            !diagonalInf() &&
            !diagonalSup()) {
            //CHAMAR ATIVAÇÃO DO MODAL DE EMAPATE AQUI!!!
            modalempate()
        }
    }

}