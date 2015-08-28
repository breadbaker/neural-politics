'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);


module.exports = BaseView.extend({
    template: templates['industry-details'],

    initialize: function () {
        BaseView.prototype.initialize.apply(this, arguments);

        this.listenTo(this.model, 'change:amount', this.render.bind(this));

        return this;
    },

    render: function () {
        var that = this;

        that.$el.html(that.template(that.model.toJSON()));


        return this;
    }
});