var BaseCollection = Backbone.Collection;

module.exports = BaseCollection.extend({

    url: function () {
        return 'getContributors?cid=' + this.id;
    },

    parse: function (data) {
        if(!data.contributors){
            return [];
         } else {
            var contributors = [];
            _.each(data.contributors[0].contributor, function (contributor) {
                contributors.push(contributor.$);
            });
            return contributors;
        }
    },


    // getContributors: function (callback) {
    //     var that = this;
    //     var contributors = [];
    //     $.post('/get-contributors', {  cid: this.get('cid')}, function (data) {
            
    //         that.set('contributors', new ContributorsCollection(contributors));
    //         callback();
    //     }
    //     });
    // },

    forContour: function (argument) {
        var data = {
            series: []
        };

        data.total = _.inject( this.models, function (memo, model) {
            return memo + +model.get('total');
        }, 0);

        _.each(this.models, function (model) {
            data.series.push({
                x: model.get('org_name'),
                y: model.get('total') / data.total,
                real: model.get('total')
            });
        });

        return data;
    },

    // forContour: function (argument) {
    //     var data = {
    //         series: [],
    //         max: 2,
    //         // this.models.length,
    //         // this.max(function (model) {
    //         //     return model.get('total');
    //         // }).get('total'),
    //         min: 0,
    //         // this.min(function (model) {
    //         //     return model.get('total');
    //         // }).get('total'),

    //     };

    //     _.each(this.models, function (model, i) {
    //         data.series.push({
    //             total: model.get('total'),
    //             y: 0,
    //             z: model.get('total') / 1000,
    //             x: model.get('org_name')
    //         });
    //     });

    //     return data;
    // }
})