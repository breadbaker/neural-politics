'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var contribPie = require('lib/contrib-pie');
var industryPie = require('lib/industry-pie');
var rangeItems = require('lib/range-item');

module.exports = BaseView.extend({
    template: templates['train'],

    legislatorTemplate: templates['legislator'],

    render: function () {
      this.$el.html(this.template());
      this.renderLegislator();

      return this;
    },

    initialize: function () {
      this.legislators = App.legislators.getTrainingLegislators();
      this.legislator = this.legislators.pop();
      return BaseView.prototype.initialize.apply(this, arguments);
    },

    renderLegislator: function () {
      var that = this;
      this.legislator.fetch({
        success: function () {
          that.$('.legislator').html(that.legislatorTemplate(that.legislator.toJSON()));
          that.contribPie(that.legislator.get('contributors').forContour());
          that.industryPie(that.legislator.get('industries').forContour());
          that.rangeItems(that.legislator.get('profile').rangeItems());
        },
        error: function () {
          that.moveNext();
        }
      });
    },

    contribPie: contribPie,

    industryPie: industryPie,

    rangeItems: rangeItems,

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
      this.legislator.set({
        liked: liked
      });
      this.moveNext();
    },

    moveNext: function () {
      if (!this.legislators.length) {
        App.trainNetwork();
      }
      this.legislator = this.legislators.pop();
      this.renderLegislator();
    }
});
