var Sequelize = require('sequelize');

// Options for the database
var user_database_options = {
  dialect: 'mysql',
  host: 'localhost',
  port: 8080,
  protocol: 'tcp'
};

var sequelize = new Sequelize('User', null, null, user_database_options);
