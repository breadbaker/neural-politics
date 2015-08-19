'use strict';

var BaseModel = require('base-model');
var __super__ = BaseModel.prototype;

var ContributorsCollection = require('collections/contributors-collection');

var LegistlatorSummaryModel = require('models/summary-model');

var IndustriesCollection = require('collections/industries-collection');

var ProfileModel = require('models/profile-model');

var states = require('data/states');

module.exports = BaseModel.extend({

    defaults: function () {
        return {
            contributors: new ContributorsCollection(),
            summary: new LegistlatorSummaryModel(),
            industries: new IndustriesCollection(),
            profile: new ProfileModel()
        }
    },

    childModels: ['summary', 'contributors', 'industries'],

    fetch: function (opt) {
        var success = _.after(this.childModels.length, opt.success);

        var model;
        _.each(this.childModels, function (attr) {
            model = this.get(attr);
            model.id = this.get('cid');
            model.fetch({
                success: success,
                error: opt.error
            }, this);
        }, this);
    },

    genderMap: {
        M: 'Man',
        F: 'Woman'
    },

    genderMapPossesive: {
        M: 'his',
        F: 'her'
    },

    twitterMessage: function () {
        var chamber = this.get('summary').get('chamber');

        var str = 'Come see where ' + states[this.get('summary').get('state')] + ' ';
        if (chamber === 'H') {
            str += 'Congress' + this.genderMap[this.get('gender')];
        } else {
            str += 'Senator'
        }

        str += ' ' + this.get('firstlast');


        str += ' gets ' + this.genderMapPossesive[this.get('gender')] + ' money';

        return str;
    },

    facebookMessage: function () {
        return this.twitterMessage() + '.  ' + this.contributionSummary();
    }, 

    contributionSummary: function () {
        return d3.format('$,2f')(this.toJSON().contributorsTotal) + ' from just the top contributors.'
    },

    summable: ['industries', 'contributors'],

    toJSON: function () {
        var json = BaseModel.prototype.toJSON.apply(this, arguments);

        // json.contributors = this.get('contributors').toJSON();
        // json.summary = this.get('summary').toJSON();
        _.each(this.childModels, function (attr) {
            json[attr] = this.get(attr).toJSON()
        }, this);

        _.each(this.summable, function (attr) {
            json[attr + 'Total'] = _.inject(json[attr], function ( memo, el) {
                return memo + +el.total;
            }, 0);
        }, this);

        json.twitterMessage = this.twitterMessage();

        // json.debt = json.summary.debt;
        // json.firstElected = json.summary.first_elected;
        // json.spent = json.summary.spent;
        // json.cash = json.summary.cash_on_hand;
        // json.contributions = this.contributions();
        // json.state = json.summary.state;

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
