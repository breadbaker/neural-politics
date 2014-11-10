'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.config.set('concurrent', {
        dev: {
            tasks: [
                'watch'
            ]
        },

        production: {
            tasks: [
                // 'less',
                // 'uglify',
                // 'browserify',
                // 'copy'
            ]
        }

    });

    return grunt;
};
