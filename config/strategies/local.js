'use strict';

/*
 * Defines the passport strategy for user authentication using local
 * sign in
 */

 var passport = require('passport');
 var LocalStrategy = require('passport-local').Strategy
 var User = require('mongoose').model('User');

/* Exports function which defines the strategy to use for local authentication */
// TODO: Clean this up stylistically
 module.exports = function() {
    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' },
            function(username, password, done) {
                console.log('Signing on...');
                User.findOne({ username: username }, function(err, user) {
                    if (err) { return done(err) }
                    if (!user) { return done(null, false, { message: 'Unknown user' }); }

                    if(!user.authenticate(password)) {
                        return done(null, false, {
                            message: 'Invalid password'
                        });
                    }

                    return done(null, user);
                });
        })
    );
};
