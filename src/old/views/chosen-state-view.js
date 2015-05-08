'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

module.exports = BaseView.extend({
    template: templates['chosen-states'],

    render: function () {
        $('.chosen-states').html(this.template({
            states: this.chosenStates.toJSON()
        }));

        $('.land').attr('class', 'land');
        _.each(this.chosenStates.models, function (model) {
            $('#US-' + model.id).attr('class', 'land chosen');
        }, this);

        return this;
    },

    initialize: function (opts) {
        this.chosenStates = opts.chosenStates;
        return BaseView.prototype.initialize.apply(this, arguments);
    }
});
