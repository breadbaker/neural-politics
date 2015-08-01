'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var contribBar = require('lib/contrib-bar');
var industryBar = require('lib/industry-bar');

var states = require('data/states');

module.exports = BaseView.extend({

    legislatorTemplate: templates['legislator'],

    render: function () {
        var that = this;
        App.load();
        App.legislator.fetch({
        success: function () {
                that.$el.html(that.legislatorTemplate(App.legislator.toJSON()));
                that.contribBar(App.legislator.get('contributors').forContour());
                that.industryBar(App.legislator.get('industries').forContour());
                $('[data-toggle="popover"]').popover({
                    placement: 'top'
                });
                that.contributorView = new ContributorView(App.legislator.get('contributors').forContour());

                that.renderContributorView();
                App.stopLoad();
            },
            error: function () {
                that.moveNext();
            }
        });
    },

    renderContributorView: function () {
        this.con
    },

    contribBar: contribBar,

    industryBar: industryBar,


});
