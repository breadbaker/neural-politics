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
      this.$el.html(this.template());
      this.$('.states-map').html(this.mapTemplate());
      return this;
    },

    initialize: function () {
      return BaseView.prototype.initialize.apply(this, arguments);
    },

    events: {
      'mouseenter .land':'hoverState',
      'click .land':'toggleState',
      'click .next': 'getLegislators'
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
      var model = new StateModel({
            id: this.currentStateId
        });
      App.state = this.states[this.currentStateId];
      model.fetch({
        success: function () {
          window.location.hash = 'view-legislators';
        }
      });
    },

    renderCurrentState: function () {
      this.$('.current-state').html(this.currentStateTemplate({
        state: this.currentState
      }));
    },

    getLegislators: function () {
      App.chosenStates.getLegislators( function () {
        window.location.hash = 'train';
      });
    },

    states: states

});
