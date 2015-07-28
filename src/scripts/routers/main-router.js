'use strict';

var RouterBase = require('./router-base');

var ChooseStateView = require('views/choose-state-view');

var LegislatorsView = require('views/legislators-view');
var LegislatorView = require('views/legislator-view');
var StateModel = require('models/state-model');
var states = require('data/states');

var __super__ = RouterBase.prototype;

module.exports = RouterBase.extend({

    routes: {
        '': 'chooseState',
        'chooseState': 'chooseState',
        'states/:state': 'viewState',
        'view-legislators': 'viewLegislators',
        'legislator/:state/:name': 'viewLegislator'
    },

    viewState: function (state) {
        var model = new StateModel({
            id: state
        });
        App.stateId = state;
        App.state = states[this.currentStateId];
        App.load();
        var that = this;
        model.fetch({
            success: function () {
                App.stopLoad();
                that.showView(new LegislatorsView());
            }
        });
    },

    chooseState: function () {
        var that = this;

        this.showView(new ChooseStateView());
    },

    viewLegislators: function () {
        if (!App.legislators.length) {
            window.location.hash = 'chooseState';
            return;
        }

        // App.legislators = new LegislatorsCollection([{"cid":"N00033474","firstlast":"Suzanne Bonamici","lastname":"BONAMICI","party":"D","office":"OR01","gender":"F","first_elected":"2012","exit_code":"0 ","comments":"","phone":"202-225-0855","fax":"","website":"http://bonamici.house.gov","webform":"https://bonamici.house.gov/contact-me","congress_office":"439 Cannon House Office Building","bioguide_id":"B001278","votesmart_id":"59641","feccandid":"H2OR01133","twitter_id":"RepBonamici","youtube_url":"http://youtube.com/RepSuzanneBonamici","facebook_id":"congresswomanbonamici","birthdate":"1954-10-14","seen":false,"contributors":[{"org_name":"Nike Inc","total":"14100","pacs":"10000","indivs":"4100"},{"org_name":"Intel Corp","total":"11500","pacs":"9000","indivs":"2500"},{"org_name":"American Crystal Sugar","total":"10000","pacs":"10000","indivs":"0"},{"org_name":"American Federation of Teachers","total":"10000","pacs":"10000","indivs":"0"},{"org_name":"American Fedn of St/Cnty/Munic Employees","total":"10000","pacs":"10000","indivs":"0"},{"org_name":"Credit Union National Assn","total":"10000","pacs":"10000","indivs":"0"},{"org_name":"Intl Brotherhood of Electrical Workers","total":"10000","pacs":"10000","indivs":"0"},{"org_name":"National Education Assn","total":"10000","pacs":"10000","indivs":"0"},{"org_name":"Painters & Allied Trades Union","total":"10000","pacs":"10000","indivs":"0"},{"org_name":"Service Employees International Union","total":"10000","pacs":"10000","indivs":"0"}],"summary":{"cand_name":"Bonamici, Suzanne","cid":"N00033474","cycle":"2014","state":"OR","party":"D","chamber":"H","first_elected":"2012","next_election":"2014","total":"895579.06","spent":"620117.49","cash_on_hand":"483135.76","debt":"200000","origin":"Center for Responsive Politics","source":"http://www.opensecrets.org/politicians/summary.php?cid=N00033474&cycle=2014","last_updated":"10/15/2014"},"debt":"200000","firstElected":"2012","spent":"620117.49","cash":"483135.76","contributions":105600,"state":"OR"}])
        var that = this;

        this.showView(new LegislatorsView());
    },

    viewLegislator: function (stateId, name) {
        if (App.stateId == stateId) {
            App.legislator = App.legislators.findWhere({
              firstlast: name
            });
            this.showView(new LegislatorView());
        } else {
            var model = new StateModel({
                id: stateId
            });
            App.load();
            var that = this;
            model.fetch({
                success: function () {
                    App.stopLoad();
                    App.legislator = App.legislators.findWhere({
                      firstlast: name
                    });
                    that.showView(new LegislatorView());
                }
            });
        }
    },

    initialize: function () {
        __super__.initialize.apply(this, arguments);

        Backbone.history.start();

        return this;
    }
});
