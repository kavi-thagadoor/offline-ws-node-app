const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Add GET method for testing
app.get('/test', (req, res) => {
  res.send('Socket.IO server is running!');
});
io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  socket.on('send_data', (data) => {
    console.log('Data received from web:', data);
    io.emit('receive_data', data); // send to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


server.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://localhost:3000');
});

