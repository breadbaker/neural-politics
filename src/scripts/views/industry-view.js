'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);


module.exports = BaseView.extend({
    template: templates['industry-details'],

    initialize: function () {
        BaseView.prototype.initialize.apply(this, arguments);

        this.listenTo(this.model, 'change:amount', this.render.bind(this));

        return this;
    },

    render: function () {
        var that = this;

        that.$el.html(that.template(that.model.toJSON()));


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