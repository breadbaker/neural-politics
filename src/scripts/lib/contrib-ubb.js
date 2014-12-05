module.exports = function (data) {
      new Contour({
            el: '.contrib-pie',
            xAxis: {
                categories: _.map(data.series, function (i) {
                  return i.x;
                })
            },
            yAxis: {
                tickValues: [+data.min - 100, +data.max + 100]
                // min: 
            },
            chart: {
              height: 290,
              padding: {
                left: 80,
                right: 20,
                bottom: 50,
                top: 50
              },
              internalPadding: {
                left: 100
              }
            },
            scatter: {
                // argument d is the element of the data series
                // that is currently being added to the visualization
                radius: function(d) { return (d.z) * 1.8 }
            }
        })
        .cartesian()
        .scatter(data.series)
        // .tooltip()
        .rotateLabels(data.series)
        .render();

    };

Contour.export('rotateLabels', function (data, layer, options) {
    var item;
    var circle;
    var value;
     _.each(this.svg.selectAll('.tick text')[0], function (e, i) {
      item = d3.select(this.svg.selectAll('.tick text')[0][i]);
      item.attr('transform', "rotate(30)")
        .attr('dy', "-20")
        .attr('dx', '-32');

      circle = d3.select(this.svg.selectAll('circle')[0][i]);

      if (!circle[0][0]) {
        return;
      }

      value = layer.selectAll('.value').data([null]);

      value.enter().append('text')
        .attr('class', 'value-text');

      value
        .attr('x', circle.attr('cx'))
        .attr('y', +circle.attr('cy') + 40)
        .attr('dx', -40)
        .text(function() { return d3.format('$,')(data[0].data[i].total) });


    },this);
});