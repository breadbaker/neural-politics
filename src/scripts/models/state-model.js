'use strict';

var BaseModel = require('base-model');
var states = require('data/states');


module.exports = BaseModel.extend({
    toJSON: function () {
        return {
            name: states[this.id]
        };
    },

    getLegislators: function (callback) {
        var legislators = [];
        $.post('/getLegislators', {
            state: this.id
        }, function (data) {
            _.each(data.legislator, function (legislator) {
                legislators.push(legislator.$);
            });
            App.legislators.add(legislators);
            callback();
        });
    }
});
