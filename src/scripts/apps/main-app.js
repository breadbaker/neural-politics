'use strict';

var MainRouter = require('../routers/main-router');
// No exports
require('lib/handlebars-helpers');

var LegislatorsCollection = require('collections/legislators-collection');

function App() {
}


var opts = {
        lines: 17, // The number of lines to draw
        length: 0, // The length of each line
        width: 15, // The line thickness
        radius: 32, // The radius of the inner circle
        corners: 0.1, // Corner roundness (0..1)
        rotate: 50, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: 'rgb(98, 52, 52)', // #rgb or #rrggbb or array of colors
        speed: 0.5, // Rounds per second
        trail: 52, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
        };

App.prototype = _.extend(App.prototype, {
    initialize: function () {
        this.spinner = new Spinner(opts);
        this.legislators = new LegislatorsCollection();
        this.contributors = new Backbone.Collection();
        this.router = new MainRouter({});
    },

    load: function () {
        var target = document.getElementById('spinner');
        this.spinner.spin(target);
        $('#back-drop').show();
    },

    stopLoad: function () {
        this.spinner.stop();
        $('#back-drop').hide();

    }
});

module.exports = App;
