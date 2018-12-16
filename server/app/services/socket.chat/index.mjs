export default (app) => {
  let clients = {};

  app.io.on('connection', async (socket) => {

    clients[socket.id] = {
      id: socket.id,
      username: socket.handshake.headers.username,
    };

    socket.emit('all users', clients);
    socket.broadcast.emit('new user', clients[socket.id]);


    socket.on('chat message', (message, user) => {
      socket.broadcast.to(user).emit('chat message', message, socket.id);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('delete user', socket.id);
      delete clients[socket.id];
    });
  });
};
