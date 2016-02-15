var debug = require('debug')('http');
var app = require('./app/app');
var models = require('./app/models');
var http = require('http');

// Set port in environment variable
app.set('port', process.env.PORT || 3300);

// Synchronize models with database and start server
models.sequelize.sync().then(function() {
  // app.listen(3300, function() {
  //   console.log('App is listening on port 3300');
  // });

  // Create server
  var server = http.createServer(app);

  // Start server
  server.listen(3300, function() {
    debug('App [http] is listening on port 3300');
  });

  app.get('/', function(req, res) {
    debug('Get routes');
  });
});
