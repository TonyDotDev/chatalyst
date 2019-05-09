const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const io = require('socket.io')(server);

const { getCountObject } = require('./util/count');
const Concierge = require('./Concierge/Concierge');
const concierge = new Concierge();

io.sockets.on('connection', socket => {
  console.log('User connected', socket.id);

  socket.on('count', () => {
    const countObject = getCountObject(concierge, socket);
    io.emit('count', countObject);
  });

  socket.on('join room', username => {
    let error = '';
    const blackListRegEx = /\w/;

    if (blackListRegEx.test(username)) {
      error = 'Username must be alphanumeric';
    }

    if (username.trim() === '' || username === undefined) {
      error = 'Please enter a username';
    }

    if (error) io.emit('join response', { error });
    else {
      const user = concierge.joinRoom(io, socket, username);

      console.log('join', concierge.rooms);

      const countObject = getCountObject(concierge, socket);

      io.emit('join response', user);
      io.emit('count', countObject);
    }

    socket.on('message', message => {
      const roomsArr = Object.keys(socket.rooms);
      io.to(roomsArr[1]).emit('message', {
        message,
        user: socket.id,
        username,
      });
    });
  });

  socket.on('leave room', () => {
    concierge.leaveRoom(io, socket);
    const countObject = getCountObject(concierge, socket);

    io.emit('count', countObject);
    console.log('deleted', concierge.rooms);
  });

  socket.on('room check', () => {
    const isInRoom = Object.keys(socket.rooms)[1] ? true : false;
    io.emit('room check', { authorized: isInRoom, userId: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    concierge.leaveRoom(io, socket);
    const countObject = getCountObject(concierge, socket);

    io.emit('count', countObject);
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT);
console.log('listening on port ' + PORT);
