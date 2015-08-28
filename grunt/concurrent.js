'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.config.set('concurrent', {
        dev: {
            tasks: [
                'watch', 'nodemon'
            ],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    return grunt;
};
