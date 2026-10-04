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
moveCounterText.textContent = 'move:';
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

const modalWin = document.createElement('dialog');
modalWin.classList.add('modal-win', 'modal');
document.body.append(modalWin);

const modalWinTitle = document.createElement('h1');
modalWinTitle.classList.add('modal-win-title');
modalWinTitle.textContent = 'Congratulations! You won!';
modalWin.append(modalWinTitle);

const modalMoveContainer = document.createElement('div');
modalMoveContainer.classList.add('modal-move-container');
modalWin.append(modalMoveContainer);

const modalMoveText = document.createElement('div');
modalMoveText.classList.add('modal-move-text');
modalMoveText.textContent = 'move:';

modalMoveContainer.append(modalMoveText);

const modalMoveCount = document.createElement('div');
modalMoveCount.classList.add('modal-move-count');

modalMoveContainer.append(modalMoveCount);

const modalBtnContainer = document.createElement('div');
modalBtnContainer.classList.add('modal-btn-container');
modalWin.append(modalBtnContainer);

const modalBtnClose = document.createElement('button');
modalBtnClose.classList.add('modal-btn-close', 'btn');
modalBtnClose.textContent = 'Close';
modalBtnContainer.append(modalBtnClose);

const modalBtnNewGame = document.createElement('button');
modalBtnNewGame.classList.add('modal-btn-new-game', 'btn');
modalBtnNewGame.textContent = 'New game';
modalBtnContainer.append(modalBtnNewGame);

const modalLeaderboard = document.createElement('dialog');
modalLeaderboard.classList.add('modal-leaderboard', 'modal');
document.body.append(modalLeaderboard);

const modalLeaderboardBtnClose = document.createElement('button');
modalLeaderboardBtnClose.classList.add('modal-leaderboard-btn-close', 'btn');
modalLeaderboardBtnClose.textContent = 'Close';
modalLeaderboard.append(modalLeaderboardBtnClose);

modalLeaderboardBtnClose.addEventListener('click', () => {
    modalLeaderboard.close();
})

btnLeaderboard.addEventListener('click', () => {
    modalLeaderboard.showModal()
})

modalLeaderboard.addEventListener('click', (event) => {
    if (event.target === modalLeaderboard || event.target.closest('.modal-leaderboard-btn-close')) {
        modalLeaderboard.close();
    }
})


modalWin.addEventListener('click', (event) => {
    if (event.target === modalWin || event.target.closest('.modal-btn-close')) {
        modalWin.close();
    }
})




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
let timer = null;


function saveFirstCard(CardClickedNow) {
    if (firstCard === null) {
        firstCard = CardClickedNow

    }
}
function saveSecondCard(CardClickedNow) {
    if (secondCard === null) {
        secondCard = CardClickedNow
    }
}
start()

function showCard() {
    cardsContainer.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.card');

        if (!clickedCard) {
            return
        }

        if (clickedCard.classList.contains("matched")) {
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
        moveCounter++
        moveCounterCount.textContent = moveCounter
        modalMoveCount.textContent = moveCounter


        if (firstCard.dataset.name === secondCard.dataset.name) {

            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            firstCard = null
            secondCard = null
            pairsCounter++;
            foundPairsCount.textContent = pairsCounter

            if (pairsCounter === 8) {
                modalWin.showModal();
            }
        }
        else {
            inputLocked = true
            timer = setTimeout(() => {
                firstCard.textContent = '❓❓❓';
                secondCard.textContent = '❓❓❓';

                firstCard = null
                secondCard = null
                timer = null;
                inputLocked = false
            }, 700)

        }

    })
}


function start() {
    clearTimeout(timer);
    cardsContainer.replaceChildren();

    doubleArrayOfCards.sort(() => Math.random() - 0.5);
    createCards()


    firstCard = null
    secondCard = null
    inputLocked = false

    timer = null

    pairsCounter = 0;
    foundPairsCount.textContent = pairsCounter

    moveCounter = 0
    moveCounterCount.textContent = moveCounter

}


modalBtnNewGame.addEventListener('click', () => {
    modalWin.close();
    start()
})

btnStart.addEventListener('click', () => {
    start()
})

showCard()

