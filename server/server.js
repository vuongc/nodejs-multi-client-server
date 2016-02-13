var app = require('./app/app');
var models = require('./app/models');

// Set port in environment variable
app.set('port', process.env.PORT || 3306);

// Synchronize models with database and start server
models.sequelize.sync().then(function() {
  app.listen(3306, function() {
    console.log('App is listening on port 3306');
  });
});
