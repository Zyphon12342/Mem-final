import { createGameState, flipCard, restartGame } from '../models/gameModel.js';

const gameController = (io) => {
  let gameState = createGameState(4); 

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.emit('gameState', gameState); 

    socket.on('flipCard', (cardId) => {
      gameState = flipCard(gameState, cardId, io);
    });

    socket.on('restartGame', () => {
      gameState = restartGame(4);
      io.emit('gameState', gameState); 
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default gameController;
