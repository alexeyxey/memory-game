const header = document.createElement('header');
header.classList.add('header');
document.body.append(header)

const btnStart = document.createElement('button');
btnStart.textContent = "Новая игра";
btnStart.classList.add('header-btn', 'header-new-game');
header.append(btnStart)

const btnLeaderboard = document.createElement('button');
btnLeaderboard.textContent = "Таблица лидеров";
btnLeaderboard.classList.add('header-btn', 'header-leaderboard');
header.append(btnLeaderboard)

const cardsContainer = document.createElement('div');
cardsContainer.classList.add('cards-container');
document.body.append(cardsContainer)

const counterContainer = document.createElement('div');
counterContainer.classList.add('counter-container');
document.body.append(counterContainer)

const moveCounterContainer = document.createElement('div');
moveCounterContainer.classList.add('move-counter-container');
counterContainer.append(moveCounterContainer)

const moveCounterText = document.createElement('div');
moveCounterText.classList.add('move-counter-text');
moveCounterText.textContent = 'move counter:';
moveCounterContainer.append(moveCounterText)

const moveCounterCount = document.createElement('div');
moveCounterCount.classList.add('move-counter-count');
moveCounterCount.textContent = ' 0';
moveCounterContainer.append(moveCounterCount)

const foundPairsContainer = document.createElement('div');
foundPairsContainer.classList.add('found-pairs-container');
counterContainer.append(foundPairsContainer)

const foundPairsText = document.createElement('div');
foundPairsText.classList.add('found-pairs-text');
foundPairsText.textContent = 'found pairs: ';
foundPairsContainer.append(foundPairsText)

const foundPairsCount = document.createElement('div');
foundPairsCount.classList.add('found-pairs-count');
foundPairsCount.textContent = '0';
foundPairsContainer.append(foundPairsCount)

const emodjOfCards = ['🐱', '🐶', '🦊', '🐼', '🐸', '🦁', '🐵', '🐯'];

const doubleArrayOfCards = emodjOfCards.concat(emodjOfCards);
doubleArrayOfCards.sort(() => Math.random() - 0.5);
console.log(doubleArrayOfCards)

function createCards() {
    for (let i = 0; doubleArrayOfCards.length > i; i++) {
        const card = document.createElement('button');
        card.classList.add('card');
        cardsContainer.append(card)
        card.textContent = '❓❓❓';
        card.dataset.name = doubleArrayOfCards[i];
    }
}

let firstCard = null;
let secondCard = null
let inputLocked = false;
let pairsCounter = 0;
let moveCounter = 0;

function saveFirstCard(CardClickedNow) {
    if (firstCard === null) {
        firstCard = CardClickedNow
    }
}
function saveSecondCard(CardClickedNow) {
    if (secondCard === null) {
        secondCard = CardClickedNow
        console.log(secondCard)
    }
}

function showCard() {
    cardsContainer.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.card');

        if (!clickedCard) {
            return
        }

        if (inputLocked) {
            return
        }


        if (firstCard === null) {
            saveFirstCard(clickedCard)
            clickedCard.textContent = clickedCard.dataset.name;
            return;
        }

        if (clickedCard === firstCard) {
            return
        }

        saveSecondCard(clickedCard)
        clickedCard.textContent = clickedCard.dataset.name;

        if (firstCard.dataset.name === secondCard.dataset.name) {
            console.log(true)
            firstCard = null
            secondCard = null
            pairsCounter++;
            foundPairsCount.textContent = pairsCounter
        }
        else {
            inputLocked = true
            setTimeout(() => {
                firstCard.textContent = '❓❓❓';
                secondCard.textContent = '❓❓❓';

                firstCard = null
                secondCard = null

                inputLocked = false
            }, 700)
            moveCounter++
            moveCounterCount.textContent = moveCounter
        }

    })
}



createCards()
showCard()
const cards = document.querySelectorAll('.card');


