'use strict';

module.exports = {
    db: 'mongodb://localhost/wellness-dev', //TODO: Figure out how to dynamically create this
    port: process.env.PORT || 8080,
    sessionSecret: 'thekeytoahealthymind',
    sessionCollection: 'sessions'
};
