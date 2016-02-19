// Get module
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

var port = 3306;

var users = require('./routes/users');

// Use middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Load routes here
app.use('/users', users);

app.get('/', function (req, res) {
   res.send('Hello World');
})

// Open server
var server = http.createServer(app);

server.listen(port, function() {
  var server_port = server.address().port;

  console.log('Listening to port %s', port);
});
