var socket = io.connect('http://localhost:3306');

var addMessage = function(msg) {
  // $('#messages').prepend($('li').append('strong').css('color', 'red').val('Username'));
  $('#messages').prepend('<li>' + msg + '</li>');
};

socket.on('message', function(msg) {
  addMessage(msg);
});

socket.on('new-user', function(data) {
  addMessage('new user has connected !');
});

$('#form-msg').submit(function() {
  var message = $('#btn-input').val();

  socket.emit('message', message);
  $('#btn-input').val('').focus();
  return false;
});
