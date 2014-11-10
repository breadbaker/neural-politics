'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.config.set('watch.uglify', {
        files: [
            'src/scripts/vendor/**/*.js',
            '!**/*.min.js'
        ],
        tasks: [
            'uglify:dev'
        ]
    });

    var files = {
        'web/scripts/vendor.min.js': [
            'src/scripts/vendor/forio/contour.js',
            'src/scripts/vendor/forio/contour-advanced-components.js',
            'src/scripts/vendor/**/*.js',
            '!src/scripts/vendor/development/**/*.js',
            '!**/*.min.*'
        ]
    };

    grunt.config.set('uglify', {
        options: {
            sourceMap: true,
            sourceMapIncludeSources: true
        },

        dev: {
            files: files,
            options: {
                mangle: false,
                beautify: true
            }
        },

        prod: {
            files: files
        }
    });

    return grunt;
};
