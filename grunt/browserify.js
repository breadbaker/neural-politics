'use strict';

var _ = require('lodash');
var minifyify = require('minifyify');

module.exports = function (grunt) {
    var scripts = grunt.config.get('scripts');

    grunt.loadNpmTasks('grunt-browserify');

    var appFiles = [{
        dest: 'web/scripts/app.min.js',
        src: [
            'src/scripts/main.js',
            '!src/scripts/vendor/**/*.js',
            '!src/scripts/templates.js'
        ]
    }];

    var appOptions = {
        alias: [
            'src/scripts/views/base-view.js:base-view',
            'src/scripts/models/base-model.js:base-model',
            'src/scripts/templates.js:templates'
        ],
        aliasMappings: [
            {
                expand: true,
                cwd: 'src/scripts/models',
                src: ['**/*.js'],
                dest: 'models/'
            },{
                expand: true,
                cwd: 'src/scripts/collections',
                src: ['**/*.js'],
                dest: 'collections/'
            },{
                expand: true,
                cwd: 'src/scripts/view-models',
                src: ['**/*.js'],
                dest: 'view-models/'
            },{
                expand: true,
                cwd: 'src/scripts/views',
                src: ['**/*.js'],
                dest: 'views/'
            },{
                expand: true,
                cwd: 'src/scripts/service',
                src: ['**/*.js'],
                dest: 'service/'
            },{
                expand: true,
                cwd: 'src/scripts/lib',
                src: ['**/*.js'],
                dest: 'lib/'
            },{
                expand: true,
                cwd: 'src/scripts/data',
                src: ['**/*.js'],
                dest: 'data/'
            },{
                expand: true,
                cwd: 'src/scripts/config',
                src: ['**/*.js'],
                dest: 'config/'
            }
        ]
    };

    var loginOptions = {
        aliasMappings: [
            {
                expand: true,
                cwd: 'src/scripts/service',
                src: ['**/*.js'],
                dest: 'service/'
            }
        ]
    };

    grunt.config.set('browserify', {
        options: {
            debug: true
        },

        app_dev: {
            files: appFiles,
            options: appOptions
        },

        app_prod: {
            files: appFiles,
            options: _.extend({
                preBundleCB: function (b) {
                    b.plugin(minifyify, {
                        map: 'app.min.js.map',
                        output: 'web/scripts/app.min.js.map'
                    });
                }
            }, appOptions)
        }
    });

    grunt.registerTask('browserify:dev', [
        'browserify:app_dev'
    ]);

    grunt.registerTask('browserify:prod', [
        'browserify:app_prod'
    ]);

    grunt.config.set('watch.browserify', {
        files: [
            'src/scripts/**/*.js',
            '!src/scripts/vendor/**/*.js'
        ],
        tasks: [
            'browserify:dev',
            'notify:build'
        ],
        options: {
            debug: true
        }
    });

    return grunt;
};
