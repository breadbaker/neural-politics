'use strict';

var MainRouter = require('../routers/main-router');
// No exports
require('lib/handlebars-helpers');

require('lib/brain/neuralnetwork');

var StatesCollection = require('collections/states-collection');

var LegislatorsCollection = require('collections/legislators-collection');

function App() {
}

App.prototype = _.extend(App.prototype, {
    initialize: function () {
        this.chosenStates = new StatesCollection();
        this.legislators = new LegislatorsCollection();
        this.router = new MainRouter({});
    },


    trainNetwork: function () {
        this.net = new NeuralNetwork();
        var data = this.legislators.toData();
        this.net.train(data, {
            iterations: 9000
        });

        this.test();

        window.location.hash = 'test';
    },
});

module.exports = App;
