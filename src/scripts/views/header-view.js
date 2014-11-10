'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

module.exports = BaseView.extend({
    template: templates['header'],

    nameTemplate: templates['name'],

    el: '#header',

    render: function () {
        this.$el.html(this.template({
            timeElapsed: 0.0,
            fte: 0
        }));

        return this;
    }
});
