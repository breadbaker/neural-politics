'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);

    grunt.file.expand('grunt/*.js').forEach(function (task) {
        require('./' + task)(grunt);
    });

    grunt.registerTask('dev', [
        'clean',
        'less:dev',
        'uglify:dev',
        'browserify:dev',
        'copy:dev',
        'concurrent',
        'notify:build',
    ]);

    grunt.registerTask('default', [
        'clean',
        'less:dev',
        'uglify:dev',
        'browserify:dev',
        'copy:dev'
    ]);

    grunt.registerTask('production', [
        'clean',
        'less:prod',
        'uglify:prod',
        'browserify:prod',
        'copy:prod'
    ]);
};
