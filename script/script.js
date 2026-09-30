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



for (let i = 0; i < 16; i++) {
    const card = document.createElement('button');
    card.classList.add('card');
    cardsContainer.append(card)
    card.textContent = '???';


}