require('dotenv').config()
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

let users = [];

// store all connected users in the socket server
const addUser = (userEmail, socketId) => {
  !users.some(user => user.email === userEmail) &&
    users.push({
      email: userEmail,
      socketId
    });
}

// removes the user from the user list if disconnected
const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
}

// get specific user
const getUser = (userEmail) => {
  return users.find(user => user.email === userEmail);
}

io.on('connection', socket => {
  console.log('a user joined the socket server.')
  // receive the request from the client
  socket.on('initUser', userEmail => {
    addUser(userEmail, socket.id);
    io.emit('getUsers', users);
  });

  // get sent message from client
  socket.on('sendMessage', ({ payload }) => {
    if (payload.type === 'channel') {
      io.emit('getMessage', payload);
    } else if (payload.type === 'self') {
      socket.join(payload.roomId)
      io.to(payload.roomId).emit('getMessage', payload);
    } else {
      const user = getUser(payload.recipient);
      user && io.to(user.socketId).emit('getMessage', payload);
    }
  });

  socket.on('disconnect', () => {
    console.log('a user left the socket server.')
    removeUser(socket.id);
  })
});

http.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
