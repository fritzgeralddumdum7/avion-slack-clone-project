require('dotenv').config()
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"]
    }
  });

io.on('connection', socket => {
    // receive the request from the client
    socket.on('send-message', ({ payload }) => {
        io.emit('receive-message', ({ payload }));
    });
});

http.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
