'use strict';

/*
 * Intializes and configures our express application
 */

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    consolidate = require('consolidate'),
    swig = require('swig'),
    passport = require('passport');

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

    // Configure passport middleware session management
    app.use(passport.initialize());
    app.use(passport.session());

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
