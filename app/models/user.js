'use strict';

/*
 * Defines the user model for storing user accounts
 * in the database.
 */

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var passwordValid = function(password) {
    return password && password.length > 6;
};

var userSchema = new Schema({
    firstName: {
        type: String,
        default: '',
        required: 'First name must be provided'
    },
    lastName: {
        type: String,
        default: '',
        required: 'Last name must be provided'
    },
    email: {
        type: String,
        default: '',
        required: 'Email must be provided',
        unique: true,
        match: [/.+\@.+\..+/, 'Please provide a valid email address']
    },
    username: {
        type: String,
        unique: true,
        required: 'Username must be provided'
    },
    password: {
        type: String,
        default: '',
        required: 'Password must be provided',
        validate: [passwordValid, 'Password must be 6 or more characters']
    },
    salt: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/* User unique validator plugin to get uniqueness errors as mongoose errors */
userSchema.plugin(uniqueValidator, { message: 'Given {PATH} is already in use' });

userSchema.pre('save', function(next) {
    if (this.passwordValid(this.password)) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

userSchema.methods.passwordValid = passwordValid;

userSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
        // TODO: Look into what this crypto.pbdk... stuff does
    } else {
        return password;
    }
};

userSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('User', userSchema);
