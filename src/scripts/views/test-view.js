'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var contribPie = require('lib/contrib-pie');

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
      var currentLegislator = this.legislators[this.index];
      currentLegislator.getData(function () {
        that.$('.legislator').html(that.legislatorTemplate(currentLegislator.toJSON()));
        that.$('.like-meter').html(that.likeTemplate(currentLegislator.getLiked()));
      })

      // this.contribPie();
    },

    contribPie: contribPie,

    index: 0,

    events: {
      'click .next':'getNext'
    },

    getNext: function () {
      if (this.index +1 >= this.legislators.length) {
        window.location.hash = 'thanks';
      } else {
        this.index++;
        this.renderLegislator();
      }
    }

});
