export function createGameState(gridSize) {
    const squares = gridSize * gridSize;
    const half = Math.floor(squares / 2);
    const set = new Set();
    let i = 1;
    while (set.size !== half) {
      set.add(i++);
    }
    const numbers = [...set, ...set];
    shuffleArray(numbers);
    return {
      gridSize,
      cards: numbers.map((num, index) => ({ id: index, value: num, flipped: false })),
      firstCard: null,
      secondCard: null,
      firstCardValue: null,
      secondCardValue: null,
      score: 0,
      lastClickTime: 0
    };
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  export function flipCard(gameState, cardId, io) {
    const now = Date.now();
    gameState.lastClickTime = now;
  
    const card = gameState.cards.find(c => c.id === cardId);
    if (!card || card.flipped) return gameState;
  
    card.flipped = true;
    io.emit('flipCard', cardId); // Broadcast the flipped card to all clients
  
    if (!gameState.firstCard) {
      gameState.firstCard = card;
      gameState.firstCardValue = card.value;
    } else if (!gameState.secondCard) {
      gameState.secondCard = card;
      gameState.secondCardValue = card.value;
  
      if (gameState.firstCardValue === gameState.secondCardValue) {
        gameState.score++;
        gameState.firstCard = null;
        gameState.secondCard = null;
        if (gameState.score === (gameState.gridSize * gameState.gridSize) / 2) {
          setTimeout(() => io.emit('gameEnd', gameState), 100);
        }
      } else {
     
        setTimeout(() => {
          const firstCardId = gameState.firstCard.id;
          const secondCardId = gameState.secondCard.id;
          gameState.cards.find(c => c.id === firstCardId).flipped = false;
          gameState.cards.find(c => c.id === secondCardId).flipped = false;
          io.emit('unflipCards', [firstCardId, secondCardId]);
          gameState.firstCard = null;
          gameState.secondCard = null;
        }, 200); 
      }
    }
    io.emit('gameState', gameState); 
    return gameState;
  }
  
  export function restartGame(gridSize) {
    return createGameState(gridSize);
  }
  