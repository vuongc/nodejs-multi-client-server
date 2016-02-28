var express = require('express');
var User = require('../models/user');
var router = express.Router();

User.syncUser();

router.get('/', function(req, res) {
  User.findAll(function(users) {
    if (users) {
      res.json(users);
    }
    return users;
  });
});

router.get('/create', function(req, res) {
  if (req.body.username && req.body.password) {
    User.createUser(req.body.username, req.body.password, function(user) {
      res.json({
        message: 'User created !',
        user: user
      });
      return user;
    });
  }
  res.json({
    error: true,
    message: 'Miss username or password !'
  });
});

module.exports = router;
