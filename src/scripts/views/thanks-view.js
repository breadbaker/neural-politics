'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

module.exports = BaseView.extend({
    template: templates['thanks'],

    events: {
      'click .btn-link': 'reset'
    },

    reset: function () {
      window.location.hash = '';
    }

});
