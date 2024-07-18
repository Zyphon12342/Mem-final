import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import gameController from './src/controllers/gameController.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 42164;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname,'public')));
gameController(io);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
