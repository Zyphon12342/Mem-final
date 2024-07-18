// controller.js

import { updateGrid, updateScore } from './view.js';
import { socket } from './main.js';
let lastClickTime = 0; 
export function initializeController() {
    document.getElementById("restartButton").addEventListener("click", () => {
        socket.emit('restartGame');
    });

    socket.on('gameState', (gameState) => {
        console.log('Received gameState:', gameState);
        updateGrid(gameState);
        updateScore(gameState.score);
    });

    socket.on('flipCard', (cardId) => {
        console.log('Flipping card:', cardId);
        setTimeout(() => {
            const cardElement = document.querySelector(`[data-id="${cardId}"]`);
            if (cardElement) {
                cardElement.classList.add('flipped');
            }
        }, 100);
    });

    socket.on('unflipCards', (cards) => {
        console.log('Unflipping cards:', cards);
        setTimeout(() => {
            cards.forEach(cardId => {
                const cardElement = document.querySelector(`[data-id="${cardId}"]`);
                if (cardElement) {
                    cardElement.classList.remove('flipped');
                }
            });
        }, 100); 
    });

    socket.on('gameEnd', (gameState) => {
        alert("Congratulations! You've matched all pairs!");
        updateGrid(gameState);
    });
}

export function handleCardClick(cardId) {
    const now = Date.now();
    if (now - lastClickTime <= 300) return;
    lastClickTime = now;
    socket.emit('flipCard', cardId);
}

export function handleHover(event) {
    const target = event.target;
    if (target.classList.contains("card-front")) {
        if (event.type === "mouseover") {
            target.style.backgroundColor = "lightblue";
        } else if (event.type === "mouseout") {
            target.style.backgroundColor = "";
        }
    }
}
