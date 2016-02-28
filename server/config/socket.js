module.exports = function(server) {

  var connectedUsers = {};

  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    console.log('new user connected !', socket.id);
    if (!connectedUsers[socket.id]) {
      connectedUsers[socket.id] = true;
    }
    socket.emit('new-user', { user_id: socket.id });
    socket.join(socket.id);

    socket.on('message', function(msg) {
      io.emit('message', msg);
    });

    socket.on('join_room', function(room) {
      console.log('Join room ', room);
      socket.join(room);
    });

    socket.on('private', function(from, to, msg) {
      var message = '<span class="private_message">From</span> ';
      message += '<span class="username_chat">' + from + '</span>';
      message += ': ';
      message += '<span class="private_message">' + msg + '</span> ';
      io.to(to).emit('message', message);
    });

    socket.on('disconnect', function () {
      io.emit('user-disconnected');
      connectedUsers[socket.id] = false;
      socket.leave(socket.id);
      console.log('user disconnected');
    });

  });
};
