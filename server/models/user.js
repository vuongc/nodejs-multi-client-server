var database = require('../database/database');
var bcrypt   = require('bcrypt-nodejs');

var User = database.sequelize.define('User', {
  username: { type: database.Sequelize.STRING, unique: true, allowNull: false },
  password: { type: database.Sequelize.STRING, allowNull: false }
});

var syncUser = function () {
  User.sync().then(function(err) {
    console.log('SUCCESS: User has been synchronized with database !');
  }, function(err) {
    console.log('ERROR: ', err.message);
  });
};

// Password hashing
var generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

var validPassword = function(password, userPassword) {
  return bcrypt.compareSync(password, userPassword);
};

// Database interaction
var createUser = function(username, password, promise) {
  User.create({ username: username, password: generateHash(password) }).then(promise);
};

var findById = function(id, promise) {
  User.findById(id, {raw: true}).then(promise);
};

var findOne = function(username, password, promise) {
  User.findOne({
    raw: true,
    where: { username: username }
  }).then(promise);
};

// Testing purpose
var findAll = function(promise) {
  User.findAll({ raw: true }).then(promise);
};

// Has to change this, it's ugly
var build = function(user) {
  return User.build(user);
};

module.exports = {
  build: build,
  syncUser: syncUser,
  createUser: createUser,
  findById: findById,
  findOne: findOne,
  findAll: findAll,
  validPassword: validPassword,
  generateHash: generateHash
};
