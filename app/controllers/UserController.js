'use strict';


// Provides logic and services for working with
// users, such as account creation and authentication.


var User = require('../models/user.js');
var passport = require('passport');

// Creates a new user account
// TODO: Add in validations and checks before saving the new account
// Add in redirects
exports.createAccount = function(request, response) {
  var newAccount = new User(request.body);

  newAccount.save(function(error) {
      if (error) {
          response.send({'success': false, 'error': error.errors});
      } else {
          response.send({'success': true });
      }
  });
};

// Authenticates a user attempting to login
exports.signin = function(request, response, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
  })(request, response, next);
};

// Destroys the current session, logging the user out
exports.signout = function(request, response, next) {
  request.logout();
  response.redirect('/');
};

// Returns a list of all registered users
exports.listUsers = function(request, response) {
  User.find(function(err, users) {
    if(err){
      response.send({'success': false, 'error': err});
    } else{
      response.send({'success': true, 'users': users});
    }
  });
};
