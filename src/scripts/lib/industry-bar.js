

module.exports = function (data) {
    var contour = new Contour({
        el: '.industry-bar',
        chart: {
            height: 260
        },
        legend: {
            vAlign: 'top'
        },
        ticks: false
    })
    .cartesian()
    .column(data.series)
    .statictip(data.industryModel)
    .render();

    var x;
};