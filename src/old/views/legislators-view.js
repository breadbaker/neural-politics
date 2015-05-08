'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var contribPie = require('lib/contrib-pie');
var industryPie = require('lib/industry-pie');

var states = require('data/states');

module.exports = React.createClass({
    template: templates['legislators'],

    legislatorTemplate: templates['legislator'],

    render: function () {
        this.$el.html(this.template({
            legislators: App.legislators.toJSON(),
            state: App.state
        }));
        this.renderLegislator();

        return this;
    },

    initialize: function () {
        this.legislator = App.legislators.at(0);
        return BaseView.prototype.initialize.apply(this, arguments);
    },

    renderLegislator: function () {
        var that = this;
        this.$('.state-legislators-list button').removeClass('active');
        this.$('button[data-name="'+ this.legislator.get('firstlast') + '"]').addClass('active');
        App.load();
        this.legislator.fetch({
            success: function () {
                that.$('.legislator').html(that.legislatorTemplate(that.legislator.toJSON()));
                that.contribPie(that.legislator.get('contributors').forContour());
                that.industryPie(that.legislator.get('industries').forContour());
                $('[data-toggle="popover"]').popover({
                    placement: 'top'
                });

                App.stopLoad();
            },
            error: function () {
                that.moveNext();
            }
        });
    },

    contribPie: contribPie,

    industryPie: industryPie,

    events: {
        'click button[data-name]': 'viewLegislator'
    },

    viewLegislator: function (e) {
        this.legislator = App.legislators.findWhere({
              firstlast: $(e.currentTarget).data('name')
        });
        this.renderLegislator();
    }
});
