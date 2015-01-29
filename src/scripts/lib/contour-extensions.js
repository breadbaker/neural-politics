
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