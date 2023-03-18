const choice = document.querySelector('.choices');
const result = document.getElementById('result');
const getComputerChoice = result.querySelector('p span');
const modal = document.querySelector('.modal');
const getTextGameStatus = result.querySelector('.text-win');
const score = document.getElementById('score');
const restartButton = document.getElementById('restart');
const figures = modal.querySelector('i');

const choiceSymbol = [
    ['rock', 'scissors'],
    ['scissors', 'paper'],
    ['paper', 'rock']
]
const gameStatus = {
    'WIN': 'You Win',
    'LOSE': 'You Lose',
    'DRAW': 'Draw hehe!'
}
const colorStatus = {
    draw: {
        textColor: "#FFFFFF", // màu chữ cho kết quả hoà (màu trắng)
        bgColor: "#808080" // màu nền cho kết quả hoà (màu xám)
    },
    win: {
        textColor: "#FFFFFF", // màu chữ cho kết quả thắng (màu trắng)
        bgColor: "#008000" // màu nền cho kết quả thắng (màu xanh lá cây)
    },
    lose: {
        textColor: "#FFFFFF", // màu chữ cho kết quả thua (màu trắng)
        bgColor: "#FF0000" // màu nền cho kết quả thua (màu đỏ)
    }
};

const countingPoint = {
    'user': 0,
    'computer': 0,
}

const FiguresIcon = {
    'rock': 'fas fa-hand-rock fa-10x',
    'paper': 'fas fa-hand-paper fa-10x',
    'scissors': 'fas fa-hand-scissors fa-10x',
}
let userChoice = '';
function UserChoice(e) {
    userChoice = e.target.id;
    WhoWins(userChoice, RandomComputerChoice());
}

function RandomComputerChoice() {
    return choiceSymbol[Math.floor(Math.random() * 3)][0];
}

function WhoWins(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        SetResult(computerChoice, gameStatus.DRAW, colorStatus.draw.textColor, colorStatus.draw.bgColor);
        SetPoint(Object.keys(gameStatus)[2]);
    } else if (choiceSymbol.find(el => el[0] === userChoice && el[1] === computerChoice)) {
        SetResult(computerChoice, gameStatus.WIN, colorStatus.win.textColor, colorStatus.win.bgColor);
        SetPoint(Object.keys(gameStatus)[0]);
    } else {
        SetResult(computerChoice, gameStatus.LOSE, colorStatus.lose.textColor, colorStatus.lose.bgColor);
        SetPoint(Object.keys(gameStatus)[1]);
    }
    modal.style.display = 'block';
    figures.className = FiguresIcon[userChoice];
}
function SetResult(computerChoice, gameStatus, textColor, backgroundColor) {
    const computerChoiceDisplay = computerChoice[0].toUpperCase() + computerChoice.slice(1, computerChoice.length);
    getComputerChoice.textContent = computerChoiceDisplay;
    getTextGameStatus.textContent = gameStatus;
    getTextGameStatus.style.color = textColor;
    result.style.backgroundColor = backgroundColor;
}
function SetPoint(gameStatus) {
    if (gameStatus === 'WIN') {
        countingPoint['user'] += 1;
        console.log(countingPoint['user']);
        score.children[0].querySelector('span').textContent = countingPoint['user']
    }
    if (gameStatus === 'LOSE') {
        countingPoint['computer'] += 1;
        console.log(countingPoint['computer']);
        score.children[1].querySelector('span').textContent = countingPoint['computer'];
    }
    if (gameStatus === 'DRAW') {
        countingPoint['user'] += 1;
        countingPoint['computer'] += 1;
        console.log(countingPoint['user']);
        console.log(countingPoint['computer']);
        score.children[0].querySelector('span').textContent = countingPoint['user'];
        score.children[1].querySelector('span').textContent = countingPoint['computer'];
    }
    console.log(countingPoint);
}
function RestartGames(){
    score.children[0].querySelector('span').textContent = 0;
    score.children[1].querySelector('span').textContent = 0;
    countingPoint['user'] = 0;
    countingPoint['computer'] = 0;
}
(() => {
    choice.addEventListener('click', UserChoice);
    modal.addEventListener('click', (e) => {
        if (e.target.className == 'modal') {
            modal.style.display = 'none';
        }
    })
    restartButton.addEventListener('click', ()=>{
        RestartGames();
    })
})()