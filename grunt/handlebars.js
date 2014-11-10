'use strict';

module.exports = function (grunt) {

    grunt.config.set('watch.handlebars', {
        files: [
            'src/templates/**/*.hbs'
        ],
        tasks: [
            'handlebars:web',
            'browserify:dev',
            'notify:build'
        ]
    });

    grunt.loadNpmTasks('grunt-contrib-handlebars');

    grunt.config.set('handlebars', {
        options: {
            commonjs: true,
            namespace: false,
            processName: function (filename) {
                return filename.replace(/.+templates\//, '').replace(/\..+$/, '');
            }
        },
        web: {
            files: {
                'src/scripts/templates.js' : [ 'src/templates/**/*.hbs' ]
            }
        }
    });
};