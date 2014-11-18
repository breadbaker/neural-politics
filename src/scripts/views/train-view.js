'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var contribPie = require('lib/contrib-pie');

module.exports = BaseView.extend({
    template: templates['train'],

    legislatorTemplate: templates['legislator'],

    render: function () {
      this.$el.html(this.template());
      this.renderLegislator();
      return this;
    },

    renderLegislator: function () {
      var that = this;
      App.legislators.at(this.index).getData(function () {
        that.$('.legislator').html(that.legislatorTemplate(App.legislators.at(that.index).toJSON()));
        // that.contribPie();
      })
    },

    contribPie: contribPie,

    index: 0,

    events: {
      'click .like':'likeLegislator',
      'click .dislike': 'dislikeLegislator'
    },

    likeLegislator: function () {
      this.setPreference(true);
    },

    dislikeLegislator: function () {
      this.setPreference(false);
    },

    setPreference: function (liked) {
      App.legislators.at(this.index).set({
        liked: liked,
        seen: true
      });
      this.index++;
      this.renderLegislator();
      if (this.index > 8) {
        window.location.hash = 'trainNetwork';
      }
    }

});
