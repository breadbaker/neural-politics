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
    },

    getTrainingLegislators: function () {
        var trainingSet = [];
        var models = _.shuffle(this.models);
        var model;
        _.times(8, function () {
            model = models.pop();
            this.remove(model);
            trainingSet.push(model);
        }, this);

        return trainingSet;
    }
})