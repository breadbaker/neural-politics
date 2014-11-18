'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');

    var htmlFiles = [
        {
            expand: true,
            cwd: 'src/',
            src: ['*.html', 'training-worker.js'],
            dest: 'web'
        }
    ];

    grunt.config.set('copy', {
        model: {
            files: [
                {
                    expand: true,
                    cwd: 'src/model/',
                    src: ['**'],
                    dest: 'web/model/'
                }
            ]
        },

        static: {
            files: [
                {
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.png', 'favicon.ico', '**/*.gif', '**/*.jpg', '**/*.svg', '**/*.eot', '**/*.ttf', '**/*.woff', '**/*.json', '**/*.pdf', '**/*.pptx', '**/*.swf'],
                    dest: 'web'
                }
            ]
        },

        js_dev: {
            files: [
                {
                    expand: true,
                    cwd: 'src/',
                    src: ['**/development/**/*.js', '**/*.min.js', '**/*.map'],
                    dest: 'web'
                }
            ]
        },

        js_prod: {
            files: [
                {
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.min.js', '**/*.map'],
                    dest: 'web'
                }
            ]
        },

        html_dev: {
            files: htmlFiles,
            options: {
                process: function (content, srcpath) {
                    return replaceMarks('DEVELOPMENT', 'PRODUCTION', content);
                }
            }
        },

        html_prod: {
            files: htmlFiles,
            options: {
                process: function (content, srcpath) {
                    return replaceMarks('PRODUCTION', 'DEVELOPMENT', content);
                }
            }
        }
    });

    grunt.registerTask('copy:dev', [
        'copy:model',
        'copy:static',
        'copy:js_dev',
        'copy:html_dev'
    ]);

    grunt.registerTask('copy:prod', [
        'copy:model',
        'copy:static',
        'copy:js_prod',
        'copy:html_prod'
    ]);

    grunt.config.set('watch.copy-model', {
        files: ['src/model/**/*.*'],
        tasks: ['copy:model', 'notify:build']
    });

    grunt.config.set('watch.copy-static', {
        files: ['src/img/**/*.*', 'src/**/*.json', 'src/**/*.swf'],
        tasks: ['copy:static', 'notify:build']
    });

    grunt.config.set('watch.copy-js', {
        files: ['src/**/development/**/*.js', 'src/**/*.min.js'],
        tasks: ['copy:js_dev', 'notify:build']
    });

    grunt.config.set('watch.copy-html', {
        files: ['src/**/*.html'],
        tasks: ['copy:html_dev', 'notify:build']
    });

    grunt.config.set('watch.train', {
        files: ['src/training-worker.js'],
        tasks: ['copy', 'notify:build']
    });


    function replaceMarks(includeMark, excludeMark, content) {
        content = content.replace(markRegExp(includeMark), '$1');
        content = content.replace(markRegExp(excludeMark), '');

        return content.replace(/%TIMESTAMP%/g, Date.now());


        function markRegExp(mark) {
            return new RegExp('%' + mark + '%([^]*)%/' + mark + '%', 'g');
        }
    }


    return grunt;
};
