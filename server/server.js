// Get module
var express  = require('express');
var app      = express();
var http     = require('http');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var ejs          = require('ejs');
var session      = require('express-session');

var port = process.env.PORT || 3306;

// var users = require('./routes/users');

require('./config/passport')(passport); // pass passport for configuration

// Use middlewares
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // Read cookie (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set the folder where the pages are kept
app.set('views', __dirname + '/public/views');

// This avoids having to provide the
// extension to res.render()
app.set('view engine', 'html');

// required for passport
app.use(session({ secret: 'secret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Use middlewares
app.use('/', express.static(__dirname + '/public'));

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// Open server
var server = http.createServer(app);

server.listen(port, function() {
  var server_port = server.address().port;

  console.log('Listening to port %s', port);
});
