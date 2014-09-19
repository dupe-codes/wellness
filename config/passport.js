'use strict';


// Configuration for passport authentication


var passport = require('passport');
var User = require('mongoose').model('User');
var path = require('path');

module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, '-salt -password', function(err, user) {
      done(err, user);
    });
  });

  // Set strategies to be used
  // TODO: How can I do this better?
  require('./strategies/local')();

};
