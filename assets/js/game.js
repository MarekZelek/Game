let attempts = 5
let elemAttempts = document.querySelector('.game-attempts')
let elemCategory = document.querySelector('.game-category')
let elemSentence = document.querySelector('.game-sentence')
let elemLetters = document.querySelector('.game-letters')
let elemStart = document.querySelector('.game-start')

let currentCategory = null;
let currentSentence = null;
let currentSentenceLetters = null;

const alphabet = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "q", "r", "s", "ś", "t", "u", "v", "w", "x", "y", "z", "ź", "ż"];

let generateLetterButtons = () => {
    alphabet.forEach((letter) => {
        const button = document.createElement('button')
        button.classList.add('game-letter')
        button.innerText = letter
        button.addEventListener('click', (e) => {
            let letter = e.target.innerText;
            e.target.disabled = true
            checkLetterInSentence(letter)
        })
        elemLetters.appendChild(button)
    })
}


let checkLetterInSentence = (letter) => {
    if (currentSentence.includes(letter)) {
        for (let i = 0; i < currentSentence.length; i++) {
            if (currentSentence[i] === letter) {
                elemSentence.querySelectorAll('.game-sentence-box')[i].innerText = letter
            }
        }

        currentSentenceLetters = currentSentenceLetters.replace(new RegExp(letter, "g"), "");

        if (currentSentenceLetters.length === 0) {
            Win()
        }
    } else {
        attempts--;
        showAttempts()
        if (attempts === 0) {
            gameOver()
        }
    }
}

let disableLetters = () => {
    let letters = elemLetters.querySelectorAll('.game-letter')
    letters.forEach((letter) => {
        letter.disabled = true
    })
}

let enableLetters = () => {
    let letters = elemLetters.querySelectorAll('.game-letter')
    letters.forEach((letter) => {
        letter.disabled = false
    })
}

let showAttempts = () => {
    elemAttempts.innerHTML = attempts
}

let showCategory = () => {
    elemAttempts.innerHTML = currentCategory
}

let gameOver = () => {
    disableLetters()
    alert('Przegrałeś, spróbuj jeszcze raz.')
}

let Win = () => {
    disableLetters()
    alert('Wygrałeś Hurra!')
}

let randomSentence = () => {
    elemSentence.innerHTML = ""
    let randomArrayIndex = Math.floor(Math.random() * phrases.length)
    let randomPhrase = phrases[randomArrayIndex];
    currentCategory = randomPhrase.category
    showCategory()
    currentSentence = randomPhrase.slogan.toUpperCase()
    currentSentenceLetters = currentSentence.replace(/\s/g, '')

    let letters = currentSentence.split('')

    letters.forEach((letter) => {
        let div = document.createElement('div')
        div.classList.add('game-sentence-box')
        if (letter === " ") {
            div.classList.add('game-sentence-box-space')
        }
        elemSentence.appendChild(div)
    })

}


let startGame = () => {
    attempts = 5
    showAttempts()
    enableLetters()
    randomSentence()
}

let initBoard = () => {
    generateLetterButtons()
    disableLetters()
}



initBoard()

elemStart.addEventListener('click', startGame)