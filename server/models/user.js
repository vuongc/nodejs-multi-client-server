var database = require('../database/database');

var User = database.sequelize.define('user', {
  username: { type: database.Sequelize.STRING, unique: true, allowNull: false },
  password: { type: database.Sequelize.STRING, allowNull: false },
});

var syncUser = function () {
  User.sync().then(function(err) {
    console.log('SUCCESS: User has been synchronized with database !');
  }, function(err) {
    console.log('ERROR: ', err.message);
  });
};

var createUser = function(username, password, promise) {
  User.create({ username: username, password: password }).then(promise);
};

var findById = function(id, promise) {
  User.findById(id).then(promise);
};

var findOne = function(username, password, promise) {
  User.findOne({
    where: { username: username, password: password }
  }).then(promise);
};

// Testing purpose
var findAll = function(promise) {
  User.findAll({ raw: true }).then(promise);
};

module.exports = {
  syncUser: syncUser,
  createUser: createUser,
  findById: findById,
  findOne: findOne,
  findAll: findAll
};
