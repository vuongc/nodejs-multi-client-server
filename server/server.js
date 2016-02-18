var debug  = require('debug')('http');
var app    = require('./app/app');
var models = require('./app/models');
var routes = require('./app/routes');
var http   = require('http');
var io     = require('socket.io');

// Set port in environment variable
app.set('port', process.env.PORT || 3306);

// Synchronize models with database and start server
models.sequelize.sync().then(function() {

  app.get('/', function(req, res) {
    res.send('Get routes console log');
  });

  // Create server
  var server = http.createServer(app, function() {
    console.log('Create server console log');
  });

  // Start server
  server.listen(3306, function() {
    console.log('App [http] is listening on port 3306');
  });
});
