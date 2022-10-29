const closeModal = document.querySelector(".close");
const modal = document.querySelector(".modal-rules");
const openRules = document.querySelector(".open-rules");
let board = document.querySelector(".cards-board");
let scoreBoard = document.querySelector(".number");

let score = localStorage.getItem("score") || 0;
scoreBoard.textContent = score;

function addChoiceListener() {
    const choices = document.querySelectorAll(".choices");
    choices.forEach(choice => {
        choice.addEventListener("click", e => optionSelected(choice));
    })
}

addChoiceListener();

let pentagon;
let mapOponnets = new Map();

function optionSelected(e) {
   let mySelection = e.cloneNode(true);
   mySelection.classList.remove("choices");
   mySelection.classList.remove(`${mySelection.dataset.choice}Position`);


   let rvlName = randomSelection();

   let rival = document.querySelector(`.choices.${rvlName}`).cloneNode(true);
   rival.classList.remove("choices");
   rival.classList.remove(`${rvlName}Position`);

   deletedPentagon()
   displayBattle(mySelection, rival);
}

function restartGame() {
    board.innerHTML = "";
    board.append(pentagon);
    addChoiceListener();
}

function displayBattle(me, rival) {
   
    let hero = me.dataset.choice;

    let heroDIV = `<div class="result-container">
    <p class="titleResult">YOU PICKED</p>
    <div class="result ${hero}" data-choice="${hero}"><img src="rock-paper-scissors-master/images/icon-${hero}.svg" alt="${hero}" width="100%" height="100%"></div>      
    </div>`;
    board.innerHTML = heroDIV;

    let villan = rival.dataset.choice;
    let villanDIV = `<div class="result-container">
    <p class="titleResult">THE HOUSE PICKED</p>
    <div class="result ${villan}" data-choice="${villan}"><img src="rock-paper-scissors-master/images/icon-${villan}.svg" alt="${villan}" width="100%" height="100%"></div>      
    </div>`;
    board.innerHTML += villanDIV;

    setTimeout(() => displayWinner(hero, villan), 600);
}

function setWaves(winner) {
    let champion = document.querySelector(`.${winner}`);
    champion.classList.add("winner");
}

function displayWinner(me, rival) {
    let Mebeats = mapOponnets.get(me);
    let Rivalbeats = mapOponnets.get(rival);

    let result;
    if(Mebeats[rival]) {
        result = "YOU WON";
        scoreBoard.textContent = ++score;
        localStorage.setItem("score", score);
        setWaves(me);
    } else if(Rivalbeats[me]) {
        result = "YOU LOST";
        scoreBoard.textContent = --score;
        localStorage.setItem("score", score);
        setWaves(rival);
    } else {
        result = "DRAW";
    }

    let playAgain = `<div class="play_again-container">
            <p class="play_again-header">${result}</p>
            <button class="playagain-restart">PLAY AGAIN</button>
        </div>`;

    let elements = document.getElementsByClassName("result-container");
    elements[0].insertAdjacentHTML("afterend", playAgain);

    setTimeout(() => {
        let play_container = document.querySelector(".play_again-container");
        play_container.classList.add("visible");
    }, 300);
    

    document.querySelector(".playagain-restart").addEventListener("click", restartGame);
}

function deletedPentagon() {
    pentagon = document.querySelector(".pentagon").cloneNode(true);
    board.innerHTML = "";
}

function randomSelection() {
    let names = ["spock", "paper", "rock", "lizard", "scissors"];
    let idx = Math.floor(Math.random() * 4);
    return names[idx];
}


let rock = {
    lizard: true,
    paper: false,
    spock: false,
    scissors: true
};

let lizard = {
    rock: false,
    paper: true,
    spock: true,
    scissors: false
};

let paper = {
    rock: true,
    paper: false,
    spock: true,
    scissors: false
};

let scissors = {
    lizard: true,
    paper: true,
    spock: false,
    rock: false
};

let spock = {
    lizard: false,
    paper: false,
    rock: true,
    scissors: true
};


mapOponnets.set("spock", spock);
mapOponnets.set("scissors", scissors);
mapOponnets.set("rock", rock);
mapOponnets.set("lizard", lizard);
mapOponnets.set("paper", paper);

openRules.addEventListener("click", () => {
    modal.classList.remove("closed");
})

closeModal.addEventListener("click", ()=> {
    modal.classList.add("closed");
});