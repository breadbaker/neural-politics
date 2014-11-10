'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.config.set('watch.less', {
        files: [
            'src/styles/**/*.less'
        ],
        tasks: [
            'less:dev', 'notify:build'
        ]
    });

    var files = [{
        src: 'src/styles/style.less',
        dest: 'web/styles/style.css'
    }];

    grunt.config.set('less', {
        dev: {
            files: files
        },

        prod: {
            files: files,
            options: {
                cleancss: true
            }
        }
    });

    return grunt;
};
