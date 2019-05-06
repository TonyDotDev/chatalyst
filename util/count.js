countRooms = concierge => concierge.rooms.length;

countTotalUsers = socket => socket.client.conn.server.clientsCount;

getCountObject = (concierge, socket) => ({
  users: countTotalUsers(socket),
  rooms: countRooms(concierge),
});

module.exports = {
  countRooms,
  countTotalUsers,
  getCountObject,
};
