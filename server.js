'use strict';

/*
 * Initializes and runs the server.
 */

var config = require('./config/config'),
    mongoose = require('mongoose');

// Create connection to the database
var db = mongoose.connect(config.db);

// TODO: Here, load up all models to get rid of dependencies

// Initialize the application
var app = require('./config/express')(db);

// Bootstrap passport strategy configuration
require('./config/passport')();

// Start application
app.listen(config.port);
console.log('Wellness awaits on port ' + config.port);

// Expose app TODO: Look into why we need to do this
exports = module.exports = app;
