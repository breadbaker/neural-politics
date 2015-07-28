'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var contribPie = require('lib/contrib-pie');
var industryPie = require('lib/industry-pie');

var states = require('data/states');

module.exports = BaseView.extend({

    legislatorTemplate: templates['legislator'],

    render: function () {
        var that = this;
        App.load();
        App.legislator.fetch({
        success: function () {
                that.$el.html(that.legislatorTemplate(App.legislator.toJSON()));
                that.contribPie(App.legislator.get('contributors').forContour());
                that.industryPie(App.legislator.get('industries').forContour());
                $('[data-toggle="popover"]').popover({
                    placement: 'top'
                });

                App.stopLoad();
            },
            error: function () {
                that.moveNext();
            }
        });
    },

    contribPie: contribPie,

    industryPie: industryPie
});
