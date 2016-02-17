var debug   = require('debug')('routes');
var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.User.findAll().then(function(users) {
    console.log('Successfully get user model !');
  });
});

module.exports = router;
