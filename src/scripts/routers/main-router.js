'use strict';

var RouterBase = require('./router-base');

var ChooseStateView = require('views/choose-state-view');

var StatesCollection = require('collections/states-collection');

var TrainView = require('views/train-view');

var ThanksView = require('views/thanks-view');

var TestView = require('views/test-view');

var LegislatorsCollection = require('collections/legislators-collection');

var __super__ = RouterBase.prototype;

module.exports = RouterBase.extend({

    routes: {
        '': 'chooseState',
        'chooseState': 'chooseState',
        'getLegislators/:state': 'getLegislators',
        'train': 'train',
        'trainNetwork': 'trainNetwork',
        'thanks': 'thanks'
    },

    chooseState: function () {
        var that = this;

        App.chosenStates = new StatesCollection();
        App.legislators = new LegislatorsCollection();

        this.showView(new ChooseStateView());
    },

    getLegislators: function (state) {
        if (!state) {
            window.location.hash = 'chooseState';
            return;
        }
        var legislators = [];

    },

    train: function () {
        if (!App.legislators) {
            window.location.hash = 'chooseState';
            return;
        }
        var that = this;

        this.showView(new TrainView());
    },

    trainNetwork: function () {
        if (!App.legislators) {
            window.location.hash = 'chooseState';
            return;
        }
      App.net = new NeuralNetwork();
      var data = App.legislators.toData();
      App.net.train(data, {
        iterations: 9000
      });

      this.test();
    },

    test: function () {
        var that = this;

        this.showView(new TestView());
    },

    initialize: function () {
        __super__.initialize.apply(this, arguments);

        Backbone.history.start();

        return this;
    },

    thanks: function () {
        if (!App.legislators) {
            window.location.hash = 'chooseState';
            return;
        }
        var that = this;

        this.showView(new ThanksView());
    }
});
