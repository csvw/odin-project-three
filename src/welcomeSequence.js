import { Game } from "./game.js";

let gameContainer = document.getElementById('gameContainer');
let mainContainer = document.getElementById('mainContainer');
let currentLead = null;
gameContainer.classList.add('flex-center');

let leadIns = [
    "Welcome!",
    "The game you are about to play is the most elaborate, difficult, and intellectually sophisticated game that has ever been invented.",
    "After thousands of years of development, we at the Matchless Makers Institue of Game Design are proud to present...",
    "... the extravagant, the exceptional, the extreme, the extraordinary, the extravehicular, and the exquisitely extraneous...",
    "Rock, Paper, Scissors"
]

let instructions = "(Click to continue the intro sequence. Press any key to skip.)";
let instructionPara = document.createElement('p');
let instructionText = document.createTextNode(instructions);
gameContainer.appendChild(instructionPara);
instructionPara.appendChild(instructionText);
instructionPara.classList.add('instructions');

let leadIndex = 0;

function welcomeSequence() {

    leadIn();
}

function leadIn() {
    let lead = generateH1(leadIns[leadIndex]);
    currentLead = lead;
    leadIndex += 1;
    if(leadIndex < leadIns.length) {
        fadeTransition(lead, leadIn)
    } else {
        fadeTransition(lead, gameStart);
    }
}

function gameStart() {
    let game = new Game();
    mainContainer.onkeypress = null;
    gameContainer.removeChild(instructionPara);
}

function fadeTransition(elem, nextFunc) {
    elem.classList.add('fade-in');
    document.onkeypress = function() {
        elem.classList.remove('fade-in');
        elem.classList.add('fade-out');
        elem.addEventListener('animationend', (e) => {
            gameContainer.onclick = null;
            gameContainer.removeChild(elem);
            gameStart();
        })
    }
    mainContainer.onclick = function() {
        elem.classList.remove('fade-in');
        elem.classList.add('fade-out');
        elem.addEventListener('animationend', (e) => {
            gameContainer.removeChild(elem);
            nextFunc();
        })
    };
}

function generateH1(text) {
    let h1 = document.createElement('h1');
    let textNode = document.createTextNode(text);
    gameContainer.appendChild(h1);
    h1.appendChild(textNode);
    h1.classList.add('big-text');
    return h1;
}

export { welcomeSequence };
