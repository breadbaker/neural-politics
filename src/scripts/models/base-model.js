'use strict';

var __base__ = Backbone.Model;
var __super__ = __base__.prototype;

var local = window.localStorage;

var getLocal = function (key) {
    var str = local.getItem(key);
    if (str !== 'undefined') {
        return JSON.parse(str);
    } else {
        return false;
    }
}

module.exports = __base__.extend({
    fetch: function (opt) {
        var key = this.url();
        var cached = getLocal(key);

        if (cached) {
            this.set(this.parse(cached));
            opt.success();
        } else {

            var success = opt.success;

            opt.success = function (model, resp) {
                local.setItem(key, JSON.stringify(resp));
                success(resp);
            }
            __super__.fetch.apply(this, arguments);
        }
    }

});
