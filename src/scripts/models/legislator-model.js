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

    defaults: function () {
        return {
            seen: false
        };
    },

    toJSON: function () {
        var json = BaseModel.prototype.toJSON.apply(this, arguments);

        json.contributors = this.get('contributors').toJSON();

        return json;
    },

    getLearningInput: function () {
        return {
            g:  this.get('gender') === 'M' ? 1 : 0,
            p:  this.get('party') === 'R' ? 1 : 0
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
