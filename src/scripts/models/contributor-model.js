'use strict';

var BaseModel = require('base-model');
var states = require('data/states');

var ContribDetailsModel = BaseModel.extend({
    url: function () {
        return '/orgSummary?id=' + this.id;
    },

    parse: function (json) {
        json = json.organization[0].$;
        json.democrats = +json.dems / (+json.dems + +json.repubs);
        json.republicans = +json.repubs / (+json.dems + +json.repubs);

        return json;
    }
});

module.exports = BaseModel.extend({
    toJSON: function () {
        return {
            name: states[this.id]
        };
    },

    url: function () {
        return '/getOrgs?org=' + this.id;
    },

    getDetails: function (callback) {
        var that = this;
        this.fetch({
            success: function () {
                that.details = new ContribDetailsModel({
                    id: that.get('orgid')
                });

                that.details.fetch({
                    success: function () {
                        App.stopLoad();
                        callback();
                    }
                });
            }
        });
    },

    parse: function (data) {
        if (!data.organization) {
            App.stopLoad();
            return;
        }
        return { orgid: data.organization[0].$.orgid}
    }
});
