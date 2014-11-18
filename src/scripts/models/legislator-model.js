'use strict';

var BaseModel = require('base-model');
var __super__ = BaseModel.prototype;

module.exports = BaseModel.extend({

    getContributors: function (callback) {
        var that = this;
        var contributors = [];
        $.post('/get-contributors', {  cid: this.get('cid')}, function (data) {
            _.each(data.contributors[0].contributor, function (contributor) {
                contributors.push(contributor.$);
            })
            that.set('contributors', new Backbone.Collection(contributors));
            callback();
        });
    },

    getData: function (callback) {
        var fetched = _.after(2, callback);
        this.getContributors(fetched);
        this.getSummary(fetched);
    },

    getSummary: function (callback) {
        var that = this;
        $.post('/get-summary', {  cid: this.get('cid')}, function (data) {
            that.set('summary', data.summary[0].$);
            callback();
        });
    },

    defaults: function () {
        return {
            seen: false
        };
    },

    toJSON: function () {
        var json = BaseModel.prototype.toJSON.apply(this, arguments);

        json.contributors = this.get('contributors').toJSON();
        json.debt = json.summary.debt;
        json.firstElected = json.summary.first_elected;
        json.spent = json.summary.spent;
        json.cash = json.summary.cash_on_hand;
        json.contributions = this.contributions();
        json.state = json.summary.state;

        return json;
    },

    contributions: function () {
        return _.inject(this.get('contributors').models, function ( memo, c ) { return memo + +c.get('total') }, 0 );
    },

    getLearningInput: function () {
        var summary = this.get('summary');
        return {
            g:  this.get('gender') === 'M' ? 1 : 0,
            p:  this.get('party') === 'R' ? 1 : 0,
            d:  summary.debt / 10000000,
            s:  summary.spent / 10000000,
            c:  summary.cash_on_hand / 10000000,
            f:  (2014 - summary.first_elected ) / 30
        }
    },

    toLearningPoint: function () {
        var data = {
            input: this.getLearningInput(),
            output: {
                liked: this.get('liked') ? 1 : 0
            }
        };

        return data;
    },

    getLiked: function () {
        return App.net.toFunction()(this.getLearningInput());
    }
});
