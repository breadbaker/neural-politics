'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

require('lib/jquery.percent-item');

module.exports = BaseView.extend({
    template: templates['contrib-details'],

    el: '.contrib-details',

    render: function () {
        var that = this;

        this.model.getDetails( function () {
            that.$el.html(that.template(that.model.details.toJSON()));

            that.$('.percent-item').percentize();
        });

        return this;
    }
});

// var Handlebars = require('handlebars');
// var templates = require('templates')(Handlebars);

// var contribTemplate = templates['contributor'];

// var ContributorModel = require('models/contributor-model');

// var ContributorView = require('views/contributor-view');


//         tooltip: {
//             formatter: function (d) {
//                 var contributorName = d.x;
//                 var contributorModel = App.contributors.get(contributorName) || new ContributorModel({
//                   id: contributorName
//                 });

//                 // App.load();
//                 contributorModel.getDetails( function () {
//                   var contribView = new ContributorView({
//                     model: contributorModel
//                   });
//                 });

//                 return new Handlebars.SafeString(contribTemplate({
//                   name: d.x,
//                   proportion: d3.format('%')(d.y),
//                   amount: d3.format('$,')(d.real)
//                 }));
//             }
//         }