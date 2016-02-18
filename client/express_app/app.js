var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');

var app        = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
