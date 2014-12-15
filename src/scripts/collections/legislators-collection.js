var BaseCollection = Backbone.Collection;

var LegislatorModel = require('models/legislator-model');
module.exports = BaseCollection.extend({
    model: LegislatorModel,

    toData: function (argument) {
        var data = [];

        _.each(this.where({seen: true}), function (model) {
            data.push(model.toLearningPoint());
        });

        return data;
    }
})