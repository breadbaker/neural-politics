module.exports = function (data) {
    new Contour({
        el: '.contrib-bar',
        chart: {
            height: 260
        },
        legend: {
            vAlign: 'top'
        }
    })
    .cartesian()
    .column(data.series)
    .render();
};
