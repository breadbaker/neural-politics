module.exports = React.createClass({
    render: function() {
        var legislatorNodes = this.props.legislators.map(function(legislator, index) {
            return (
                <button data-name="{{firstlast}}" class=" btn btn-link btn-info">
                    { legislator.firstlast }
                </button>
            );
        });
        return (
            <div className="state-legislators-list">
                {legislatorNodes}
            </div>
        );
    }
});