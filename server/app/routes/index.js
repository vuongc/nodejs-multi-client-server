var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.User.findAll().then(function(users) {
    console.log('Users are ', users);
  });
});

module.exports = router;
