let blame = [
    (choice) => `That was a bad decision. You should have known that the computer would choose ${choice}.`,
    (choice) => `I don't know why you picked that. I never would have picked that.`,
    (choice) => `This is a time for reflection and healing. But I know that if you keep trying, one day, you will almost be as wise as I am.`,
    (choice) => `It was obvious the computer was going to choose ${choice}.`,
    (choice) => `You are losing to a dumb computer.`
]

let doubt = [
    (choice) => `You are not following my advice. I always give very good advice. I give the best advice.`,
    (choice) => `I'm not sure what you had in mind when you picked that.`
]

let credit = [
    (choice) => `You see? I am an excellent advisor. Your victory is the proof.`,
    (choice) => `Ah, you are very clever. I was just testing you, you see. I of course knew that the computer was going to pick ${choice}.`,
    (choice) => `You would not have known to pick that if I had not narrowed down the options for you.`,
    (choice) => `My advice is impeccable.`,
    (choice) => `Even though you did not do what I told you to, I know that my advice played a decisive role in your victory.`,
    (choice) => `You should have followed my advice. Nevertheless, what you picked was my second choice.`
]

class Game {
    constructor() {
        this.computerChoiceText = 'rock';
        this.playerChoiceText = 'rock';
        this.cumulativeScore = 0;
        this.timeout = null;
        this.randomChoice();
        this.gameContainer = document.getElementById('gameContainer');
        this.mainContainer = document.getElementById('mainContainer');
        this.initGameHeader();
        this.initGameBoard();
        this.initBindings();
        this.initButtons();
        this.initScoreBoard();
        this.initAdvisor();
    }

    initGameHeader() {
        this.gameHeader = document.getElementById('gameHeader');
        this.gameHeader.classList.remove('hidden');
    } 
    
    initGameBoard() {
        this.gameBoard = document.getElementById('gameBoard');
        this.gameBoard.classList.remove('hidden');
        this.gameBoard.classList.add('gameBoard');
        this.player = document.getElementById('humanPlayer');
        this.computer = document.getElementById('computerPlayer');
        this.player.classList.remove('hidden');
        this.computer.classList.remove('hidden');
        this.computerChoice = document.getElementById('computerChoice');
        this.displayComputerChoice('?');
    }

    initBindings() {
        this.rockRound = this.rockRound.bind(this);
        this.paperRound = this.paperRound.bind(this);
        this.scissorsRound = this.scissorsRound.bind(this);
        this.getRoundResults = this.getRoundResults.bind(this);
        this.victory = this.victory.bind(this);
        this.tie = this.tie.bind(this);
        this.loss = this.loss.bind(this);
        this.getWrongChoice = this.getWrongChoice.bind(this);
        this.setAdviceText = this.setAdviceText.bind(this);
        this.updateAdvisor = this.updateAdvisor.bind(this);
        this.randomAdvice = this.randomAdvice.bind(this);
        this.randomChoice = this.randomChoice.bind(this);
        this.updatetheWar = this.updateTheWar.bind(this);
        this.setHiddenChoice = this.setHiddenChoice.bind(this);
        this.setElementColorClass = this.setElementColorClass.bind(this);
    }

    initButtons() {
        this.rock = document.getElementById('rock');
        this.paper = document.getElementById('paper');
        this.scissors = document.getElementById('scissors');
        this.rock.onclick = this.rockRound;
        this.paper.onclick = this.paperRound;
        this.scissors.onclick = this.scissorsRound;
    }

    initScoreBoard() {
        this.scoreBoard = document.getElementById('scoreBoard');
        this.scoreBoard.classList.remove('hidden');
        this.scoreBoard.classList.add('flex-center-row');
        this.victoryStatus = document.getElementById('victoryStatus');
        this.score = document.getElementById('score');
        this.theWar = document.getElementById('theWar');
        this.victoryStatus.innerText = "Make a Move!";
        this.score.innerText = "Score: " + this.cumulativeScore;
        this.theWar.innerText = "Tied!";
    }

    initAdvisor() {
        this.advisor = document.getElementById('advisor');
        this.advisor.classList.remove('hidden');
        this.advisor.classList.add('flex-center');
        this.advice = document.getElementById('advice');
        this.advice.classList.add('gold');
        this.advice.classList.add('advice');
        this.adviceText = document.createTextNode(`I am your advisor. You may trust me. Choose ${this.getWrongChoice(this.computerChoiceText)}.`);
        this.advice.appendChild(this.adviceText);
    }

    rockRound() {
        this.playerChoiceText = 'rock';
        this.getRoundResults();
    }

    paperRound() {
        this.playerChoiceText = 'paper';
        this.getRoundResults();
    }

    scissorsRound() {
        this.playerChoiceText = 'scissors';
        this.getRoundResults();
    }

    getRoundResults() {
        window.clearTimeout(this.timeout);
        this.displayComputerChoice(this.computerChoiceText);
        if(this.playerChoiceText == this.getWrongChoice(this.computerChoiceText)) {
            this.randomChoice();
            this.loss();
        } else if(this.computerChoiceText == this.playerChoiceText) {
            this.randomChoice();
            this.tie();
        } else {
            this.randomChoice();
            this.victory();
        }
        this.updateTheWar();
    }

    updateTheWar() {
        if(this.cumulativeScore > 0) {
            this.theWar.innerText = "Winning!";
            this.setElementColorClass(this.theWar, 'green');
        }else if(this.cumulativeScore < 0) {
            this.theWar.innerText = "Losing!";
            this.setElementColorClass(this.theWar, 'red');
        } else {
            this.theWar.innerText = "Tied!";
            this.setElementColorClass(this.theWar, 'white');
        }
    }

    setAdviceText(text) {
        this.adviceText.textContent = text;
    }

    randomAdvice(adviceList) {
        let r = Math.random();
        let probabilityProgress = 0;
        let currentResult = 1;
        let selectionMade = false;
        let pJump = 1. / adviceList.length;
        while(!selectionMade) {
            if(probabilityProgress < r && pJump * currentResult > r) {
                currentResult -= 1;
                selectionMade = true;
            } else {
                currentResult += 1;
            }
        }
        return adviceList[currentResult](this.computerChoiceText);
    }

    setElementColorClass(elem, colClass) {
        let colors = ['red', 'green', 'white'];
        for(let i = 0; i < colors.length; i++) {
            if(colors[i] == colClass) {
                elem.classList.add(colors[i]);
            } else {
                elem.classList.remove(colors[i]);
            }
        }
    }

    updateAdvisor(adviceList) {
        this.setAdviceText(
            this.randomAdvice(adviceList)
        );
        let text = this.getWrongChoice(this.computerChoiceText);
        let resetAdvice = () => { 
            this.setAdviceText(`I am your advisor. You may trust me. Choose ${text}.`);
            this.displayComputerChoice('?');
        }
        this.timeout = setTimeout(resetAdvice, 3000 + 50 * this.adviceText.textContent.length);
    }

    blameThePlayer() {
        this.updateAdvisor(blame);
    }
    
    takeAllTheCredit() {
        this.updateAdvisor(credit);
    }

    doubtThePlayer() {
        this.updateAdvisor(doubt);
    }

    updateScore() {
        this.score.innerText = "Score: " + this.cumulativeScore;
    }

    loss() {
        this.cumulativeScore -= 1;
        this.updateScore();
        this.blameThePlayer();
        this.victoryStatus.innerText = "Defeat!";
        this.setElementColorClass(this.victoryStatus, 'red');

    }

    victory() {
        this.cumulativeScore += 1;
        this.updateScore();
        this.takeAllTheCredit();
        this.victoryStatus.innerText = "Victory!";
        this.setElementColorClass(this.victoryStatus, 'green');
    }

    tie() {
        this.doubtThePlayer();
        this.victoryStatus.innerText = "A Tie!";
        this.setElementColorClass(this.victoryStatus, 'white');
    }

    setHiddenChoice(choice) {
        this.computerChoiceText = choice;
    }

    randomChoice() {
        let r = Math.random();
        if(r < 0.333) {
            this.setHiddenChoice('rock');
        } else if(r < 0.666) {
            this.setHiddenChoice('paper');
        } else {
            this.setHiddenChoice('scissors');
        }
    }

    getWrongChoice(choice) {
        switch(choice) {
            case 'rock':
                return 'scissors';
            case 'paper':
                return 'rock';
            case 'scissors':
                return 'paper';
        }
    }

    displayComputerChoice(choice) {
        while (this.computerChoice.firstChild) {
            this.computerChoice.removeChild(this.computerChoice.firstChild);
        }
        if(choice == 'rock' || choice == 'scissors' || choice == 'paper') {
            let rps = document.createElement('div');
            rps.classList.add(choice);
            rps.classList.add('display-computer-choice');
            this.computerChoice.appendChild(rps);
        }
        else {
            let questionMark = document.createElement('h1');
            let questionMarkText = document.createTextNode('?');
            this.computerChoice.appendChild(questionMark);
            questionMark.appendChild(questionMarkText);
            questionMark.classList.add('questionMark');
        }
    }
}

export { Game };
