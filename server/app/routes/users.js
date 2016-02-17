var models  = require('../models/');
var express = require('express');
var router  = express.Router();

// router.post('/create', function(req, res) {
//   models.User.create({
//     username: req.body.username,
//     password: req.body.password,
//     isAdmin: req.body.isAdmin
//   }).then(function() {
//     res.redirect('/');
//   });
// });

// router.route('/')
// .get(function(req, res) {
//   User.find(function(err, users) {
//     if (err) {
//       console.error('Error: ', err);
//       return res.send(err);
//     }
//     console.log(users);
//     res.json(users);
//   });
// });

router.get('/', function(req, res) {
  res.send('USERS');
  models.User.findAll({
    attributes: [
      'username',
      'isAdmin'
    ],
    raw: true
  }).then(function(users) {
    return users;
  });
});

// router.get('/:user_id/destroy', function(req, res) {
//   models.User.destroy({
//     where: {
//       id: req.params.user_id
//     }
//   }).then(function() {
//     res.redirect('/');
//   });
// });

// router.post('/:user_id/tasks/create', function (req, res) {
//   models.Task.create({
//     title: req.body.title,
//     UserId: req.params.user_id
//   }).then(function() {
//     res.redirect('/');
//   });
// });
//
// router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
//   models.Task.destroy({
//     where: {
//       id: req.params.task_id
//     }
//   }).then(function() {
//     res.redirect('/');
//   });
// });

module.exports = router;
