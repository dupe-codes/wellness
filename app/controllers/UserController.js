'use strict';

/*
 * Provides logic and services for working with
 * users, such as account creation and authentication.
 */

var User = require('../models/user.js');
var passport = require('passport');

/* Creates a new user account
 * TODO: Add in validations and checks before saving the new account
 */
exports.create_account = function(request, response) {
    var new_account = new User(request.body);

    new_account.save(function(error) {
        if (error) {
            response.send({'success': false, 'error': error.errors});
        } else {
            response.send({'success': true });
        }
    });
};

exports.signin = function(request, response, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/signin'
    })(request, response, next);
};

/* Returns a list of all registered users */
exports.list_users = function(request, response) {
    User.find(function(err, users) {
        if(err){
            response.send({'success': false, 'error': err});
        } else{
            response.send({'success': true, 'users': users});
        }
    });
};
