'use strict';

var BaseModel = require('base-model');
var states = require('data/states');


module.exports = BaseModel.extend({
    toJSON: function () {
        return {
            name: states[this.id]
        };
    },

    url: function () {
        return '/getLegislators?state=' + this.id;
    },

    parse: function (data) {
        var legislators = [];

        var data;
        _.each(data.legislator, function (legislator) {
            data = legislator.$;
            data.shortName = data.firstlast.split(' ')[0][0] + '. ' + data.lastname;
            legislators.push(data);
        });

        App.legislators.reset();

        App.legislators.add(legislators);

        return {};
    }
});
