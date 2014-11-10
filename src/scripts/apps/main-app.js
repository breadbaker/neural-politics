'use strict';

var MainRouter = require('../routers/main-router');
// No exports
require('lib/handlebars-helpers');

require('lib/brain/neuralnetwork');

function App() {
}

App.prototype = _.extend(App.prototype, {
    initialize: function () {
        this.router = new MainRouter({});
    }
});

module.exports = App;
