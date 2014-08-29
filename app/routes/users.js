'use strict';

/*
 * Routes for handling user sign up and authentication.
 */

var express = require('express');
var router = express.Router();

/* Render user signin page */
router.get('/signin', function(req, res) {
    res.render('signin', { pagetitle: 'Sign-in' });
});

module.exports = router;
