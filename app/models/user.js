/*
 * Defines the user model for storing user accounts
 * in the database.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: '',
        match: [/.+\@.+\..+/, 'Please provide a valid email address']
    },
    username: {
        type: String,
        unique: 'Username already exists',
        required: 'Username must be provided'
    },
    password: {
        type: String,
        default: ''
    },
    salt: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
