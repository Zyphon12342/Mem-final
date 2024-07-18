// view.js

import { createCard } from './model.js';
import { handleCardClick, handleHover } from './controller.js';

const Grid = document.getElementById("Grid");
const scoreElement = document.getElementById("score");

export function updateGrid(gameState) {
    Grid.innerHTML = '';
    gameState.cards.forEach(card => {
        const Card = createCard(card);
        Grid.appendChild(Card);
    });
}

export function updateScore(score) {
    scoreElement.textContent = `Score: ${score}`;
}

export function initializeView() {
    Grid.addEventListener("click", (event) => {
        const target = event.target.closest(".card");
        if (!target || target.classList.contains("flipped")) return;
        const cardId = parseInt(target.getAttribute("data-id"));
        console.log('Card clicked:', cardId);
        handleCardClick(cardId);
    });

    Grid.addEventListener("touchstart", (event) => {
        const target = event.target.closest(".card");
        if (!target || target.classList.contains("flipped")) return;
        const cardId = parseInt(target.getAttribute("data-id"));
        console.log('Card touched:', cardId);
        handleCardClick(cardId);
    });

    Grid.addEventListener("mouseover", handleHover);
    Grid.addEventListener("mouseout", handleHover);
}
