'use strict';

module.exports = function(grunt) {
    // Files to watch
    var watchFiles = {
        serverJS: ['gruntfile.js', 'server.js', 'app/**/*.js'],
        clientJS: ['public/*.js', 'public/static/js/*.js']
    };

    // Load npm tasks
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            // Nothing yet
        },
        jshint: {
            all: {
                src: watchFiles.clientJS.concat(watchFiles.serverJS),
                options: {
                    jshintrc: true
                }
            }
        },
        mochaTest: {
            // Nothing yet
        },
        karma: {
            // Nothing yet
        },
    });

    grunt.registerTask('default', []);

    // Javascript lint tasks
    grunt.registerTask('jslint', ['jshint']);

    // Run the test suite
    grunt.registerTask('test', ['mochaTest', 'karma']);

};
