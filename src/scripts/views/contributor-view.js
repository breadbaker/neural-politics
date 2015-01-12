'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

require('lib/jquery.percent-item');

module.exports = BaseView.extend({
    template: templates['contrib-details'],

    el: '.contrib-view',

    initialize: function () {
        BaseView.prototype.initialize.apply(this, arguments);

        this.render();

        return this;
    },

    render: function () {
        this.$el.html(this.template(this.model.details.toJSON()))

        this.$('.percent-item').percentize();

        return this;
    }
});
