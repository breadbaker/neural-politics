
var Handlebars = require('handlebars');
var templates = require('templates')(Handlebars);

var contribTemplate = templates['contributor'];

var ContributorModel = require('models/contributor-model');

var ContributorView = require('views/contributor-view');

module.exports = function (data) {
    var contour = new Contour({
        el: '.industry-bar',
        chart: {
            height: 260
        },
        legend: {
            vAlign: 'top'
        },
        ticks: false,
        tooltip: {
            formatter: function (d) {

                return new Handlebars.SafeString(contribTemplate({
                  name: d.data.x,
                  proportion: d3.format('%')(d.value),
                  amount: d3.format('$,')(d.data.real)
                }));
            }
        }
    })
    .cartesian()
    .column(data.series)
    .tooltip()
    .render();

    var x;
};