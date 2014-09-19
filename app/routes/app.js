'use strict';


// Main application routes


var express = require('express');
var router = express.Router();

// Frontend routes to handle all angular requests
router.get('*', function(request, response) {
  // Only authenticated users can access the application
  if (!request.user){
      response.redirect('/users/signin');
  } else {
      response.sendfile('./public/views/app.html');
  }
});

module.exports = router;
