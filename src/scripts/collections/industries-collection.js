var BaseCollection = Backbone.Collection;

module.exports = BaseCollection.extend({

    url: function () {
        return 'getIndustries?cid=' + this.id;
    },

    parse: function (data) {
        if(!data.industries){
            return [];
         } else {
            var industries = [];
            _.each(data.industries[0].industry, function (industry) {
                industries.push(industry.$);
            });
            return industries;
        }
    },

    forContour: function (argument) {
        var data = {
            series: []
        };

        data.total = _.inject( this.models, function (memo, model) {
            return memo + +model.get('total');
        }, 0);

        _.each(this.models, function (model) {
            data.series.push({
                x: model.get('industry_name'),
                y: model.get('total') / data.total,
                real: model.get('total')
            });
        });

        return data;
    },
})