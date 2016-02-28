module.exports = function(server) {

  var connectedUsers = {};

  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    console.log('new user connected !', socket.id);
    socket.emit('new-user', { user_id: socket.id });
    socket.join(socket.id);

    socket.on('message', function(msg) {
      io.emit('message', msg);
    });

    socket.on('private', function(from_id, from_username, msg) {
      socket.join(from_id);
      io.to(from_id).emit('message', 'from ', from_username, ': ', msg);
      socket.leave(from_id);
    });

    socket.on('disconnect', function () {
      io.emit('user-disconnected');
      socket.leave(socket.id);
      console.log('user disconnected');
    });

  });
};
