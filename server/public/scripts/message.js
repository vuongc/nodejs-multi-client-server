var socket = io.connect('http://localhost:3306');

socket.emit('join_room', $('#username').text());

var addMessage = function(msg) {
  // $('#messages').prepend($('li').append('strong').css('color', 'red').val('Username'));
  $('#messages').prepend('<li>' + msg + '</li>');
};

var addUsernameClass = function(username) {
  return '<span class="username_chat">' + username + '</span>';
};

var receivePrivateMessage = function(from, msg) {
  var message = '<span class="private_message">From</span> ';
  message += addUsernameClass(from);
  message += ': ';
  message += '<span class="private_message">' + msg + '</span> ';

  return message;
};

var sendPrivateMessage = function(to, msg) {
  var message = '<span class="private_message">To</span> ';
  message += addUsernameClass(to);
  message += ': ';
  message += '<span class="private_message">' + msg + '</span> ';

  return message;
};

socket.on('message', function(msg) {
  addMessage(msg);
});

socket.on('master-message', function(msg) {
  addMessage('<span class="master_message">From Master</span>: ' + msg);
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
  var message = $('#btn-input').val();
  var final_message = username + ': ' + message;

  var tokens = getCmd(message);
  if (tokens != undefined) {
    if (tokens.cmd === "msg") {
      socket.emit('private',username, tokens.param, tokens.message);
      addMessage(sendPrivateMessage(tokens.param, tokens.message));
      $('#btn-input').val('').focus();
    }
  }
  else {
    socket.emit('message', final_message);
    $('#btn-input').val('').focus();
  }
  return false;
});
