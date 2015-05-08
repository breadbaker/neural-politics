'use strict';
// var BaseView = require('base-view');

// var Handlebars = require('handlebars');
// var templates = require('templates')(Handlebars);

// var contribPie = require('lib/contrib-pie');
// var industryPie = require('lib/industry-pie');

// var states = require('data/states');

var LegislatorList = require('./legislators-list-view');

// var Legislator = require('./legislator-view');

module.exports = React.createClass({
    // template: templates['legislators'],

    // legislatorTemplate: templates['legislator'],

    // render: function () {
    //     this.$el.html(this.template({
    //         legislators: App.legislators.toJSON(),
    //         state: App.state
    //     }));
    //     this.renderLegislator();

    //     return this;
    // },

    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, 5000);
    },

    render: function () {
        return (
            <div class="row">
                <div class="col-xs-2">
                    <ReactRouter.Link to="choose-state">
                        <p><i class="fa  fa-angle-double-left"></i>Choose State</p>
                    </ReactRouter.Link>
                    <h3>{ this.state }</h3>
                    <LegislatorList legislators={this.legislators} />   
                </div>
                
            </div>
        );
    },

    // <Legislator legislator={ this.legislator } />

    // initialize: function () {
    //     this.legislator = App.legislators.at(0);
    //     return BaseView.prototype.initialize.apply(this, arguments);
    // },

    // renderLegislator: function () {
    //     var that = this;
    //     this.$('.state-legislators-list button').removeClass('active');
    //     this.$('button[data-name="'+ this.legislator.get('firstlast') + '"]').addClass('active');
    //     App.load();
    //     this.legislator.fetch({
    //         success: function () {
    //             that.$('.legislator').html(that.legislatorTemplate(that.legislator.toJSON()));
    //             that.contribPie(that.legislator.get('contributors').forContour());
    //             that.industryPie(that.legislator.get('industries').forContour());
    //             $('[data-toggle="popover"]').popover({
    //                 placement: 'top'
    //             });

    //             App.stopLoad();
    //         },
    //         error: function () {
    //             that.moveNext();
    //         }
    //     });
    // },

    // contribPie: contribPie,

    // industryPie: industryPie,

    // events: {
    //     'click button[data-name]': 'viewLegislator'
    // },

    // viewLegislator: function (e) {
    //     this.legislator = App.legislators.findWhere({
    //           firstlast: $(e.currentTarget).data('name')
    //     });
    //     this.renderLegislator();
    // }
});
