/*
 * Provides logic and services for working with
 * users, such as account creation and authentication.
 */

var User = require('../models/user.js');

/* Creates a new user account
 * TODO: Add in validations and checks before saving the new account
 */
exports.create_account = function(request, response) {
    var new_account = new User({
        firstName: request.body.firstname,
        lastName: request.body.lastname,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    });
    new_account.save();
    response.send('Success!');
};

/* Returns a list of all registered users */
exports.list_users = function(request, response) {
    User.find(function(err, users) {
        response.send(users);
    });
}
