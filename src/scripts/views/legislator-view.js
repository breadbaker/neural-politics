'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var contribBar = require('lib/contrib-bar');
var industryBar = require('lib/industry-bar');

var ContributorView = require('views/contributor-view');

var ContributorModel = require('models/contributor-model');

var states = require('data/states');

module.exports = BaseView.extend({

    legislatorTemplate: templates['legislator'],

    render: function () {
        var that = this;
        App.load();
        App.legislator.fetch({
        success: function () {
                that.$el.html(that.legislatorTemplate(App.legislator.toJSON()));
                var data = App.legislator.get('contributors').forContour();
                var contributorModel = new ContributorModel({
                  id: data.series[0].x
                });

                data.contributorModel = contributorModel;
                that.contribBar(data);
                that.industryBar(App.legislator.get('industries').forContour());
                $('[data-toggle="popover"]').popover({
                    placement: 'top'
                });
 
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

    // events: {
    //     'click .contributor'
    // },

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
