module.exports = function(server) {

  var connectedUsers = {};

  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    console.log('new user connected !', socket.id);
    socket.emit('new-user', { message: 'A new user has connected.' });

    socket.on('message', function(msg) {
      io.emit('message', msg);
    });

    socket.on('disconnect', function () {
      io.emit('user disconnected');
      console.log('user disconnected');
    });

  });
};
