'use strict';

module.exports = Backbone.Router.extend({

    initialize: function () {
        this.$content = $('#content');

        return this;
    },

    showView: function (view) {

        if (this.view) {
            this.view.remove();
        }

        $(window).scrollTop(0);

        this.$content.html(view.el);
        view.render();

        view.afterRender();

        this.view = view;

        this.trigger('showView', view);

        return this;
    }
});
