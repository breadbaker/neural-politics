'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var StateModel = require('models/state-model');

var states = require('data/states');

module.exports = BaseView.extend({
    template: templates['states'],

    mapTemplate: templates['states-map'],

    currentStateTemplate: templates['currentState'],

    render: function () {
        var statesIds = Object.keys(states);
        this.$el.html(this.template({
            states: statesIds
        }));
        this.$('.states-map').html(this.mapTemplate());
        return this;
    },

    initialize: function () {
        return BaseView.prototype.initialize.apply(this, arguments);
    },

    events: {
        'mouseenter .land':'hoverState',
        'click .land':'toggleState',
        'click .next': 'getLegislators',
        'click button.view-toggle': 'toggleViewType',
        'click .state': 'chooseStateFromList'
    },

    toggleViewType: function () {
        this.$('.view-toggle').toggleClass('hide');
    },

    renderChosen: function () {
        this.$('.land').removeClass('chosen');

        _.each(this.chosenStates.models, function (model) {
            this.$('#US-' + model.id).addClass('chosen');
        }, this);
    },

    hoverState: function (e) {
        this.currentStateId = $(e.currentTarget).attr('id').replace('US-','');
        this.currentState = this.states[this.currentStateId];
        this.renderCurrentState();
    },

    toggleState: function () {
        window.location.hash = '#states/' + this.currentStateId;
    },

    renderCurrentState: function () {
        this.$('.current-state').html(this.currentStateTemplate({
            state: this.currentState
        }));
    },

    states: states
});
