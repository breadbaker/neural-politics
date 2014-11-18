'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var states = require('data/states');

var ChosenStatesView = require('views/chosen-state-view');

module.exports = BaseView.extend({
    template: templates['states'],

    mapTemplate: templates['states-map'],

    currentStateTemplate: templates['currentState'],

    render: function () {
      this.$el.html(this.template());
      this.$('.states-map').html(this.mapTemplate());
      this.chosenView.render();
      return this;
    },

    initialize: function () {
      this.chosenView = new ChosenStatesView({chosenStates: App.chosenStates});
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
        this.$
      }, this);
    },

    hoverState: function (e) {
      this.currentStateId = $(e.currentTarget).attr('id').replace('US-','');
      this.currentState = this.states[this.currentStateId];
      this.renderCurrentState();
    },

    toggleState: function () {
      App.chosenStates.toggleState(this.currentStateId);
      this.checkCount();
      this.chosenView.render();
      // window.location.hash = 'getLegislators/' + this.currentStateId;
    },

    checkCount: function () {
      if (App.chosenStates.models.length > 4) {
        this.$('.next').removeClass('hidden');
      } else {
        this.$('.next').addClass('hidden');
      }
    },

    renderCurrentState: function () {
      this.$('.current-state').html(this.currentStateTemplate({
        state: this.currentState
      }));
    },

    getLegislators: function () {
      var fetched = _.after(App.chosenStates.models.length, function () {
        window.location.hash = 'train';
      })
      _.each(App.chosenStates.models, function (model) {
        model.getLegislators(fetched);
      })
    },

    states: states

});
