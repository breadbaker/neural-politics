var BaseModel = require('base-model');

module.exports = BaseModel.extend({

    url: function () {
        return 'getProfile?cid=' + this.id;
    },

    parse: function (data) {
        data = data['member_profile'][0];
        var json = data.$;
        if (!json.net_high) {
            return false;
        }

        json.assets = _.map(data.assets[0].asset, function (item) {
            return item.$;
        });
        return json;
    },

    rangeItems: function () {
       var data = [{
            name: "low-range",
            data: [{ x: "Net Worth", y: 11 }, { x: "Assets", y: 22 }]
        }, {
            name: "high-range",
            data: [{ x: "Net Worth", y: 14 }, { x: "Assets", y: 17 }]
        }];

        return data;
    }
});