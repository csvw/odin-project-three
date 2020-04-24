let gameContainer = document.getElementById('gameContainer');
let mainContainer = document.getElementById('mainContainer');
gameContainer.classList.add('flex-center');

function welcomeSequence() {
    welcome();
}

function welcome() {
    let welcome = generateH1("Welcome!");
    fadeTransition(welcome, leadInOne);
}

function leadInOne() {
    let leadIn = generateH1("The game you are about to play is the most elaborate, difficult, and intellectually sophisticated game that has ever been invented.");
    fadeTransition(leadIn, leadInTwo);
}

function leadInTwo() {
    let leadIn = generateH1("After thousands of years of development, we at the Matchless Makers Institue of Game Design are proud to present...");
    fadeTransition(leadIn, leadInThree);
}

function leadInThree() {
    let leadIn = generateH1("... the exquisite, the exceptional, the extreme, the extroardinary, the extravehicular, and the extravagentely extraneous...");
    fadeTransition(leadIn, leadInFour);
}

function leadInFour() {
    let leadIn = generateH1("Rock, Paper, Scissors");
    fadeTransition(leadIn, welcome);
}

function fadeTransition(elem, nextFunc) {
    elem.classList.add('fade-in');
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
