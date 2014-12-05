var BaseModel = require('base-model');

module.exports = BaseModel.extend({

    url: function () {
        return 'getSummary?cid=' + this.id;
    },

    parse: function (data) {
        return data.summary[0].$;
    }
});