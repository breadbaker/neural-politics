
'use strict';

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

Handlebars.registerHelper({

    formatPercent: function (per) {
        return d3.format('%.2f')(per);
    },

    titleBar: function (text) {
        var html = templates['util/title-bar']({ 
            text: text
        });

        return new Handlebars.SafeString(html);
    },

    item: function (label, value) {
        return new Handlebars.SafeString(templates['util/item']({
            label: label,
            value: value
        }));
    },

    getGender: function (g) {
        return g === 'F' ? 'female' : 'male';
    },

    getParty: function (p) {
        return p === 'R' ? 'Republican' : 'Democrat';
    },

    partyImage: function (p) {
        return p === 'R' ? 'elephant.png' : 'donkey.png';
    },

    currency: function (c) {
        return d3.format('$,2f')(c);
    }

});

module.exports = Handlebars;
