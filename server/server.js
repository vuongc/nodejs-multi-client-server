var debug = require('debug')('http');
var app = require('./app/app');
var models = require('./app/models');
var routes = require('./app/routes');
var http = require('http');

// Set port in environment variable
app.set('port', process.env.PORT || 3306);

// Synchronize models with database and start server
models.sequelize.sync().then(function() {

  // Create server
  var server = http.createServer(app, function() {
    console.log('Create server console log');
  });

  // Start server
  server.listen(3306, function() {
    console.log('App [http] is listening on port 3306');
  });

  app.get('/', function(req, res) {
    console.log('Get routes console log');
  });
});
