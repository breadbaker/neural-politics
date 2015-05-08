'use strict';

module.exports = React.createClass({

    defaultProps: {
        currentStateId: 'aoeu'
    },

    chooseState: function () {
        window.location.hash = 'view-legislators?state=' + this.state.currentStateId;
    },

    addListeners: function () {
        var $land = $(this.getDOMNode()).find('.land');

        $land.on('mouseenter', this.hoverState);
        $land.on('click', this.chooseState);
    },

    hoverState: function (e) {
        this.currentStateId = $(e.currentTarget).attr('id').replace('US-','').split('_')[0];

        this.setState({ currentStateId: this.currentStateId });
    },

    render: function () {
        return (
            <div>
                <div class="states row">
                    <div class="col-xs-12">
                        <p> 
                            Pick a state and view the legislators
                        </p>
                        <div>
                            <p>{ this.currentStateId }</p>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="states-map">
                            <ReactInlineSVG onLoad={ this.addListeners } src="/web/images/usaLow.svg" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
