'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

module.exports = BaseView.extend({
    template: templates['states'],

    currentStateTemplate: templates['currentState'],

    render: function () {
      this.$el.html(this.template());

      return this;
    },

    events: {
      'mouseenter .land':'hoverState',
      'click .land':'selectState'
    },

    hoverState: function (e) {
      this.currentStateId = $(e.currentTarget).attr('id').replace('US-','');
      this.currentState = this.states[this.currentStateId];
      this.renderCurrentState();
    },

    selectState: function () {
      window.location.hash = 'getLegislators/' + this.currentStateId;
    },

    renderCurrentState: function () {
      this.$('.current-state').html(this.currentStateTemplate({
        state: this.currentState
      }));
    },

    states: {
      "AL": "Alabama",
      "AK": "Alaska",
      "AZ": "Arizona",
      "AR": "Arkansas",
      "CA": "California",
      "CO": "Colorado",
      "CT": "Connecticut",
      "DE": "Delaware",
      "FL": "Florida",
      "GA": "Georgia",
      "HI": "Hawaii",
      "ID": "Idaho",
      "IL": "Illinois",
      "IN": "Indiana",
      "IA": "Iowa",
      "KS": "Kansas",
      "KY": "Kentucky",
      "LA": "Louisiana",
      "ME": "Maine",
      "MD": "Maryland",
      "MA": "Massachusetts",
      "MI": "Michigan",
      "MN": "Minnesota",
      "MS": "Mississippi",
      "MO": "Missouri",
      "MT": "Montana",
      "NE": "Nebraska",
      "NV": "Nevada",
      "NH": "New Hampshire",
      "NJ": "New Jersey",
      "NM": "New Mexico",
      "NY": "New York",
      "NC": "North Carolina",
      "ND": "North Dakota",
      "OH": "Ohio",
      "OK": "Oklahoma",
      "OR": "Oregon",
      "PA": "Pennsylvania",
      "RI": "Rhode Island",
      "SC": "South Carolina",
      "SD": "South Dakota",
      "TN": "Tennessee",
      "TX": "Texas",
      "UT": "Utah",
      "VT": "Vermont",
      "VA": "Virginia",
      "WA": "Washington",
      "WV": "West Virginia",
      "WI": "Wisconsin",
      "WY": "Wyoming"
    }

});
