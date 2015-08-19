'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var contribBar = require('lib/contrib-bar');
var industryBar = require('lib/industry-bar');

var ContributorView = require('views/contributor-view');

var ContributorModel = require('models/contributor-model');

var IndustryView = require('views/industry-view');
var IndustryModel = Backbone.Model;

var states = require('data/states');

module.exports = BaseView.extend({

    legislatorTemplate: templates['legislator'],

    render: function () {
        var that = this;
        App.load();
        App.legislator.fetch({
        success: function () {
                window.twitter_message = App.legislator.twitterMessage();
                window.facebook_title = App.legislator.get('firstlast');
                window.facebook_image = App.legislator.get('profileImage');
                window.facebook_message = App.legislator.facebookMessage();

                App.legislator.attributes.summary.get('chamber')
                that.$el.html(that.legislatorTemplate(App.legislator.toJSON()));
                var data = App.legislator.get('contributors').forContour();
                var contributorModel = new ContributorModel({
                  id: data.series[0].x,
                  amount: data.series[0].real
                });

                data.contributorModel = contributorModel;
                that.contribBar(data);
                var industryData = App.legislator.get('industries').forContour();
                var industryModel = new IndustryModel({
                    id: industryData.series[0].x,
                    proportion: industryData.series[0].y,
                    amount: industryData.series[0].real
                });
                industryData.industryModel = industryModel;
                that.industryBar(industryData);

                that.industryView = new IndustryView({
                    model: industryModel
                });

                that.industryView.$el = that.$('.industry-details');
                that.industryView.render();
                $('[data-toggle="popover"]').popover({
                    placement: 'top'
                });

                that.$(that.$('.industry-bar .s-1 rect')[0]).click();
 
                that.contributorView = new ContributorView({
                    model: contributorModel
                });

                that.contributorView.$el = that.$('.contrib-details');

                that.contributorView.render();
                App.stopLoad();
            },
            error: function () {
                that.moveNext();
            }
        });
    },

    events: {
        'click .tooltip-tracker': 'highlightBar'
    },

    highlightBar: function (e) {
        $(e.currentTarget).closest('.series').find('rect').attr('class', 'column tooltip-tracker');
        $(e.currentTarget).attr('class','column tooltip-tracker selected');
    },

//     renderContributorView: function () {
//         this.con

// //                 var contributorModel = App.contributors.get(contributorName) || new ContributorModel({
// //                   id: contributorName
// //                 });

// //                 // App.load();
// //                 contributorModel.getDetails( function () {
// //                   var contribView = new ContributorView({
// //                     model: contributorModel
// //                   });
// //                 });
//     },

    contribBar: contribBar,

    industryBar: industryBar,


});
