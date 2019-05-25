const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');

const { getCountObject } = require('./util/count');
const Concierge = require('./Concierge/Concierge');
const concierge = new Concierge();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

io.sockets.on('connection', socket => {
  const emitUserPerRoomCount = roomsArray => {
    roomsArray.forEach(room => {
      const usersInRoom = io.sockets.adapter.rooms[room];
      io.to(room).emit('update in room user count', usersInRoom);
    });
  };

  socket.on('count', () => {
    const countObject = getCountObject(concierge, socket);
    io.emit('count', countObject);
  });

  socket.on('join room', username => {
    let error = '';
    const blackListRegEx = /\W/;

    if (blackListRegEx.test(username)) {
      error = 'Username must be alphanumeric';
    }

    if (username.trim() === '' || username === undefined) {
      error = 'Please enter a username';
    }

    if (error) io.emit('join response', { error, userId: socket.id });
    else {
      const user = concierge.joinRoom(io, socket, username);

      const countObject = getCountObject(concierge, socket);

      io.emit('join response', user);
      io.emit('count', countObject);
      emitUserPerRoomCount(concierge.rooms);
    }

    socket.on('message', message => {
      const roomsArr = Object.keys(socket.rooms);
      let error = '';

      if (message.trim() === '' || message === undefined) {
        error = 'Please enter a message';
      }

      if (message.trim().length >= 140) {
        error = '140 characters or less please';
      }

      if (error) {
        io.to(roomsArr[1]).emit('message form error', {
          error,
          userId: socket.id,
        });
      } else
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
  });

  socket.on('room check', () => {
    const isInRoom = Object.keys(socket.rooms)[1] ? true : false;
    io.emit('room check', { authorized: isInRoom, userId: socket.id });
  });

  socket.on('disconnect', () => {
    concierge.leaveRoom(io, socket);
    const countObject = getCountObject(concierge, socket);
    io.emit('remove message on disconnect', { userId: socket.id });
    io.emit('count', countObject);

    emitUserPerRoomCount(concierge.rooms);
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT);
