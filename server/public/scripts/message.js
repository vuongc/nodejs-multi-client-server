var socket = io.connect('http://localhost:3306');

var addMessage = function(msg) {
  // $('#messages').prepend($('li').append('strong').css('color', 'red').val('Username'));
  $('#messages').prepend('<li>' + msg + '</li>');
};

var addUsernameClass = function(username) {
  return '<span class="username_chat">' + username + '</span>';
};

socket.on('message', function(msg) {
  addMessage(msg);
});

socket.on('new-user', function(data) {
  var username = addUsernameClass($('#username').text());

  socket.emit('message', username + ' has connected !');
  // addMessage(username + ' has connected !');
});

socket.on('user-disconnected', function(data) {
  var username = addUsernameClass($('#username').text());

  addMessage(username + ' has disconnected !');
});

$('#form-msg').submit(function() {
  var username = addUsernameClass($('#username').text());
  var message = username + ': ' + $('#btn-input').val();

  socket.emit('message', message);
  $('#btn-input').val('').focus();
  return false;
});
