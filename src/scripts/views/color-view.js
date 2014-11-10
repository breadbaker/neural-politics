'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

require('lib/brain/utils');

require('lib/brain/trainer');

require('lib/brain/tester');

require('lib/brain/extra');

module.exports = BaseView.extend({
    template: templates['colors'],

    colorTemplate: templates['color-item'],

    colors: ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'gray', 'black', 'brown', 'beige', 'pink'],

    render: function () {
      this.$el.html(this.template({
        colors: this.colors
      }));

      return this;
    },

    events: {
      'click .color-options':'chooseColor'
    },

    chooseColor: function (e) {
      trainer.chooseColor($(e.currentTarget).data('color'), this.colors);
    },

    afterRender: function () {
        $(document).ready(function(){
          trainer.changeColor();
          $("#progress-box").hide();
          $("#testing-box").hide();
          $("#code-box").hide();

          // only show nn and yiq
          $("#wcag-swatch-box").hide();
          // $("#test-box").hide();
        });
        // body...
    }

});
