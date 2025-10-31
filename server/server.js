const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Store active users
let activeUsers = new Map();

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins with username
  socket.on('join', (username) => {
    socket.username = username;
    activeUsers.set(socket.id, username);

    // Broadcast user joined
    socket.broadcast.emit('userJoined', username);

    // Send current active users to the new user
    socket.emit('activeUsers', Array.from(activeUsers.values()));

    console.log(`${username} joined the chat`);
  });

  // Handle chat messages
  socket.on('sendMessage', (messageData) => {
    const message = {
      id: Date.now(),
      text: messageData.text,
      sender: socket.username,
      timestamp: new Date().toISOString(),
      type: 'message'
    };

    // Broadcast message to all clients
    io.emit('receiveMessage', message);
  });

  // Handle typing indicators
  socket.on('typing', (isTyping) => {
    socket.broadcast.emit('userTyping', {
      username: socket.username,
      isTyping: isTyping
    });
  });

  // Handle private messages
  socket.on('privateMessage', (data) => {
    const { recipient, message } = data;
    const recipientSocket = Array.from(activeUsers.entries()).find(([id, name]) => name === recipient);

    if (recipientSocket) {
      const privateMessage = {
        id: Date.now(),
        text: message,
        sender: socket.username,
        recipient: recipient,
        timestamp: new Date().toISOString(),
        type: 'private'
      };

      // Send to recipient
      io.to(recipientSocket[0]).emit('receivePrivateMessage', privateMessage);
      // Send back to sender
      socket.emit('receivePrivateMessage', privateMessage);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (socket.username) {
      activeUsers.delete(socket.id);
      socket.broadcast.emit('userLeft', socket.username);
      console.log(`${socket.username} left the chat`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
