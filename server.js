'use strict';

// Modules 
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var consolidate = require('consolidate');
var swig = require('swig');
// TODO: Look into what bodyParser and methodOverride do

var app = express();

// Configurations
app.use(logger('dev'));
// Make an applications settings module and import it here?

var db = require('./config/db');
mongoose.connect(db.url);

// Get all data of body parameters (POSTs)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Expose static files as residing in top level domain
app.use(express.static(__dirname + '/public/static'));

// Serverside views
app.set('views', path.join(__dirname, '/app/views'));

// Now using swig. TODO: Maybe convert to handlebars? Want something that
// is well known enough for others to hop aboard
app.set('view engine', 'html');
app.engine('.html', consolidate.swig);

// Routes
var index = require('./app/routes/index');
app.use('/', index);

var users = require('./app/routes/users');
app.use('/users', users)

// TODO: Look into how to factor this code below out in a clean way
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

// Start application
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Wellness awaits on port ' + port);

// Expose app TODO: Look into why we need to do this
exports = module.exports = app;
