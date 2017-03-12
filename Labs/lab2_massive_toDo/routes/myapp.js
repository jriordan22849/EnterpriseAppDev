var express = require('express')
var router = express()

var models = require('../models/index');

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
  res.send('Hello World!')
})

router.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

router.post('/users', function(req, res) {
  models.User.create({
    email: req.body.email
  }).then(function(user) {
    res.json(user);
  });
});

router.get('/todos', function(req, res) {
  models.Todo.findAll({}).then(function(todos) {
    res.json(todos);
  });
});

router.post('/todos', function(req, res) {
  models.Todo.create({
    title: req.body.title,
    UserId: req.body.user_id
  }).then(function(todo) {
    res.json(todo);
  });
});
