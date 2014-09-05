'use strict';

/*
 * Defines the passport strategy for user authentication using local
 * sign in
 */

 var passport = require('passport');
 var LocalStrategy = require('passport-local').Strategy;
 var User = require('mongoose').model('User');

/* Exports function which defines the strategy to use for local authentication */
 module.exports = function() {

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            // Some error occured
            if (err) { return done(err); }
            // User with given username doesn't exist
            if (!user) { return done(null, false, { message: 'Unknown user' }); }

            // User exists, see if valid password given
            if(!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            return done(null, user);
        });
    }));
};
