var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');
var flash = require('connect-flash');
//Import routes
var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var logout = require('./routes/logout');
var post = require('./routes/post');
var postdetail = require('./routes/postdetail');
var postedit = require('./routes/postedit');
var postdelete = require('./routes/postdelete');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());

//session setting
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 600000 }
}));


// use express-flash as a feedback when rendering


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// 
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);
app.use('/post', post);
app.use('/postdetail', postdetail);
app.use('/postedit', postedit);
app.use('/postdelete', postdelete);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
