'use strict';

var MainRouter = require('../routers/main-router');
// No exports
require('lib/handlebars-helpers');

var LegislatorsCollection = require('collections/legislators-collection');

function App() {
}

App.prototype = _.extend(App.prototype, {
    initialize: function () {
        this.legislators = new LegislatorsCollection();
        this.router = new MainRouter({});
    }
});

module.exports = App;
