module.exports = function (data) {

    new Contour({
        el: '.finance-range',

        chart: {
            padding: {
                left: 110
            },
            height: 60
        },

        // yAxis: {
        //     title: 'Total Medals'
        // },

        bar: {
            stacked: true
        },

        tooltip: {
          formatter: function (x) {
            return x;
          }
        },

        legend: {
            vAlign: 'top'
        }
    })
    .cartesian()
    .horizontal()
    .bar(data, {
      rangeBand: 8,
      barWidth: 6
    })
    // .legend(data)
    .tooltip()
    .render();
};

