'use strict';

var ContourBaseApp = require('./contour-base');
var MainRouter = require('../routers/main-router');
// No exports
require('lib/handlebars-helpers');

require('lib/brain/neuralnetwork');


require('service/config');

function App() {
}



App.prototype = _.extend(ContourBaseApp.prototype, {
    initialize: function () {
        this.router = new MainRouter({});
    },

    step: 0
});

module.exports = App;
