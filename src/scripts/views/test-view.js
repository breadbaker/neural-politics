'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

module.exports = BaseView.extend({
    template: templates['test'],

    legislatorTemplate: templates['legislator'],

    likeTemplate: templates['like-meter'],

    render: function () {
      this.$el.html(this.template());
      this.renderLegislator();
      return this;
    },

    initialize: function () {
      this.legislators = App.legislators.where({seen: false});
    },

    renderLegislator: function () {
      var that = this;
      var currentLegislator = App.legislators.at(this.index);
      currentLegislator.getContributors(function () {
        that.$('.legislator').html(that.legislatorTemplate(currentLegislator.toJSON()));
        that.$('.like-meter').html(that.likeTemplate(currentLegislator.getLiked()));
      })
    },

    index: 0,

    events: {
      'click .next':'getNext'
    },

    getNext: function () {
      this.index++;
      this.renderLegislator();
    }

});
