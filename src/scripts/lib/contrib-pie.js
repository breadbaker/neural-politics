
var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var contribTemplate = templates['contributor'];

var ContributorModel = require('models/contributor-model');

var ContributorView = require('views/contributor-view');

module.exports = function (data) {
    new Contour({
        el: '.contrib-pie',
        chart: {
            height: 260
        },
        legend: {
            vAlign: 'top'
        },
        tooltip: {
            formatter: function (d) {
                var contributorName = d.data.x;
                var contributorModel = App.contributors.get(contributorName) || new ContributorModel({
                  id: contributorName
                });

                // App.load();
                contributorModel.getDetails( function () {
                  var contribView = new ContributorView({
                    model: contributorModel
                  });
                });

                return new Handlebars.SafeString(contribTemplate({
                  name: d.data.x,
                  proportion: d3.format('%')(d.value),
                  amount: d3.format('$,')(d.data.real)
                }));
            }
        }
    })
    .pie(data.series)
    .tooltip()
    .render();
};
