let randomNumber = parseInt((Math.random()*21)+1);

const submit = document.querySelector('#submit')
const userInput = document.querySelector('.guessField')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHigh = document.querySelector('.lowOrHigh')
const startOver = document.querySelector('.wrapper')

const p = document.createElement('p')

let prevGuess = []
let numGuess = 1;
let playGame = true;

if(playGame){
    submit.addEventListener('click',function(e){
        e.preventDefault()
        const guess = parseInt(userInput.value)
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number')
    }else if (guess<1) {
        alert('Please enter a number greater than 0')
    } else if(guess>21){
        alert('Please enter a number from 1 to 20')
    }else{
        prevGuess.push(guess)
        if(numGuess===3 && guess != randomNumber){
            displayGuess(guess)
            displayMessage(`Game Over. The right answer was <span> ${randomNumber} </span>`)
            endGame()
        }else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if (guess === randomNumber) {
        displayMessage(`You guessed it right :) , It was <span>${guess}</span>`);
        endGame()
    } else if(guess>randomNumber){
        displayMessage(`The number you guessed is too high`);
    } else{
        displayMessage(`The number you guessed is too low`);
    }
}

function displayGuess(guess){
    userInput.value = '';
    guessSlot.innerHTML += `  ${guess}  | `;
    numGuess++;
    remaining.innerHTML = `${4 - numGuess} `;
}

function displayMessage(message){
    lowOrHigh.innerHTML = `<h4>${message}</h4>`;
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', function(e){
        randomNumber = parseInt((Math.random()*21)+1);
        prevGuess = []
        numGuess = 1
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${4 - numGuess} `;
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame = true;
    })
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML = '<button id="newGame"> Start Again </button>';
    startOver.appendChild(p)
    playGame = false;
    newGame()
}
