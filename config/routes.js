'use strict';

/*
 * Configures all application routes
 */

 module.exports = function(app) {

    // Index routes
    app.use('/', require('../app/routes/index'));

    // User routes
    app.use('/users', require('../app/routes/users'));

};
