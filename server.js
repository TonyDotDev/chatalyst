const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const io = require('socket.io')(server);

const Concierge = require('./Concierge/Concierge');
const concierge = new Concierge();

io.sockets.on('connection', socket => {
  console.log('User connected', socket.id);

  socket.on('join room', username => {
    let error = '';
    const blackListRegEx = /\w/;

    if (username.trim() === '' || username === undefined) {
      error = 'Please enter a username';
    }

    if (!blackListRegEx.test(username)) {
      error = 'Usernames can only contain alphanumeric characters';
    }

    if (error) io.emit('join response', { error });
    else {
      const user = concierge.joinRoom(io, socket, username);
      console.log('join', concierge.rooms);
      io.emit('join response', user);
    }
  });

  socket.on('leave room', () => {
    concierge.leaveRoom(io, socket);
    console.log('deleted', concierge.rooms);
  });

  socket.on('message', message => {
    console.log(message);
    console.log('message', socket.id);

    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT);
console.log('listening on port ' + PORT);
