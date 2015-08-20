'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

module.exports = BaseView.extend({

    template: templates['mission'],

    render: function (argument) {
        this.$el.html(this.template());
        return this;
    }

});
