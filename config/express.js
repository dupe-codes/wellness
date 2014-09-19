'use strict';


// Intializes and configures our express application


var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var consolidate = require('consolidate');
var swig = require('swig');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')({
  session: session
});
var config = require('./config');
var flash = require('connect-flash');

module.exports = function(db) {
  var app = express();

  // Add logging
  app.use(logger('dev'));
  app.set('showStackError', true);

  // Get all data of body parameters
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());

  // Expose static files as residing in top level domain
  app.use(express.static(path.join(__dirname, '../public')));

  // Set up serverside views template engine
  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'html');
  app.engine('.html', consolidate.swig);

  // Configure MongoDB session store
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store: new mongoStore({
      db: db.connection.db,
      collection: config.sessionCollection
    })
  }));

  // Configure passport middleware session management
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash()); // To display error messages

  // Load application routes
  require('./routes')(app);

  // Add some error handling
  app.use(function(request, response, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function(err, request, response, next) {
    response.status(err.status || 500);
    response.render('error', {
      message: err.message,
      error: err
    });
  });

  // Now give back fully configured application
  return app;
};
