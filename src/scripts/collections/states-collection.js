var BaseCollection = Backbone.Collection;

var StateModel = require('models/state-model');

module.exports = BaseCollection.extend({
    toggleState: function (stateId) {
        var model = new StateModel({
            id: stateId
        });
        var thisModel = this.get(model);

        if (thisModel) {
            this.remove(thisModel);
        } else {
            this.add(model);
        }
    },

    ready: function () {
        return App.chosenStates.models.length > 1;
    },

    getLegislators: function (callback) {
        var fetched = _.after(App.chosenStates.models.length, callback);
        _.each(App.chosenStates.models, function (model) {
            model.fetch({
                success: fetched,
                error: fetched
            });
        });
    }
});