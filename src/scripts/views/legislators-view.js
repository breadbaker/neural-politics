'use strict';
var BaseView = require('base-view');

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

module.exports = BaseView.extend({
    template: templates['legislators'],

    render: function () {
        this.$el.html(this.template({
            legislators: App.legislators.toJSON(),
            state: App.state
        }));

        return this;
    },

    events: {
        'click button[data-name]': 'viewLegislator'
    },

    viewLegislator: function (e) {
        App.legislator = App.legislators.findWhere({
              firstlast: $(e.currentTarget).data('name')
        });
        window.location.hash = '#legislator/' + App.legislator.get('firstlast');
    }
});
