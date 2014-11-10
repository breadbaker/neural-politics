
'use strict';

var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var getOpts = function (model, key, options) {
    var hash = options.hash || {};
    var addon = hash.addon;
    var size = hash.size ? 'input-' + hash.size : '';
    var meta = model.meta[key];
    var type = meta.type || 'text';
    var value = model.get ? model.get(key) : model[key];

    var opts = {
        hash: hash,
        addon: addon,
        size: size,
        meta: meta,
        type: type,
        value: value
    };

    return opts;
};

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

    getGender: function (g) {
        return g === 'F' ? 'Female' : 'Male';
    },

    getParty: function (p) {
        return p === 'R' ? 'Republican' : 'Democrat';
    },

    currency: function (c) {
        return d3.format('$,2f')(c);
    }

});

module.exports = Handlebars;
