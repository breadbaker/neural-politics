'use strict';

var path = require('path');

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-nodemon');

    grunt.config.set('nodemon', {
      server: {
        script: 'index.js',
        options: {
          args: ['dev'],
          nodeArgs: ['--debug'],
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
          },
          watch: ['api'],
        }
      }
    });
};
