const uuid = require('uuid/v4');

class Concierge {
  constructor() {
    this.rooms = [];
  }

  getNumberOfUsers(io, roomId) {
    const numberOfUsers = io.sockets.adapter.rooms[roomId]
      ? io.sockets.adapter.rooms[roomId].length
      : 0;
    return numberOfUsers;
  }

  joinRoom(io, socket, username) {
    let room = null;
    if (!this.rooms.length) {
      room = uuid();
      this.rooms.push(room);
    } else {
      this.rooms.forEach(roomId => {
        const numberOfUsers = this.getNumberOfUsers(io, roomId);
        console.log(numberOfUsers);
        if (numberOfUsers < 2) {
          room = roomId;
          return;
        }
      });
      console.log('check if room is still null', room);
      if (!room) {
        room = uuid();
        this.rooms.push(room);
      }
    }

    socket.join(room);

    const newUser = {
      id: socket.id,
      username,
      room,
    };

    return newUser;
  }

  getUserRoom(socket) {
    const userIdRoomsArray = Object.keys(socket.rooms);
    const [, roomId] = userIdRoomsArray;
    return roomId;
  }

  filterOutEmptyRooms(io) {
    if (!this.rooms.length) return this.rooms;
    return this.rooms.filter(room => {
      const numberOfUsers = this.getNumberOfUsers(io, room);
      console.log(numberOfUsers, numberOfUsers === 0);
      return numberOfUsers !== 0;
    });
  }

  leaveRoom(io, socket) {
    const room = this.getUserRoom(socket);
    socket.leave(room);
    this.rooms = this.filterOutEmptyRooms(io);
  }
}

module.exports = Concierge;
