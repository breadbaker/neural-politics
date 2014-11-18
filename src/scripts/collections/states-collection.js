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
    }
})