 var defaults = {
        tooltip: {
            enable: true,
            animate: true,
            opacity: 0.85,
            showTime: 300,
            hideTime: 500,
            distance: 5,
            formatter: undefined //defined in formatters array in getTooltipText()
        }
    };

    function render(data, layer, options) {

        var clearHideTimer = function () {
            clearTimeout(this.tooltip.hideTimer);
        };

        var changeOpacity = function (opacity, delay) {
            if(this.options.tooltip.animate) {
                this.tooltipElement
                    .transition().duration(delay)
                        .style('opacity', opacity);
            } else {
                this.tooltipElement.style('opacity', opacity);
            }
        };

        var positionTooltip = function (d) {
            var pointOrCentroid = function () {
                return d3.event.target.tagName === 'path' ? _.nw.getCentroid(d3.event.target) : d3.mouse(this.container.node());
            };
            var xScale = this.xScale;
            var yScale = this.yScale;
            var plotLeft = this.options.chart.plotLeft;
            var plotWidth = this.options.chart.plotWidth;
            var plotTop = this.options.chart.plotTop;
            var plotHeight = this.options.chart.plotHeight;
            var distance = this.options.tooltip.distance;
            var width = parseFloat(this.tooltipElement.node().offsetWidth);
            var height = parseFloat(this.tooltipElement.node().offsetHeight);
            var pointX = xScale ? xScale(d.x) : pointOrCentroid.call(this)[0];
            var pointY = yScale ? yScale(d.y) : pointOrCentroid.call(this)[1];
            var alignedRight;

            var clampPosition = function (pos) {
                // Check outside plot area (left)
                if (pos.x < plotLeft) {
                    pos.x = plotLeft + distance;
                }

                // Check outside plot area (right)
                if (pos.x + width > plotLeft + plotWidth) {
                    pos.x -= (pos.x + width) - (plotLeft + plotWidth);
                    // Don't overlap point
                    pos.y = plotTop + pointY - (height + distance);
                    alignedRight = true;
                }

                // Check outside the plot area (top)
                if (pos.y < plotTop) {
                    pos.y = plotTop + distance;

                    // Don't overlap point
                    if (alignedRight && pointY >= pos.y && pointY <= pos.y + height) {
                        pos.y = pointY + plotTop + distance;
                    }
                }

                // Check outside the plot area (bottom)
                if (pos.y + height > plotTop + plotHeight) {
                    pos.y = Math.max(plotTop, plotTop + plotHeight - (height + distance));
                }

                return pos;
            };

            var positioner = {
                'vertical': function verticalPositioner() {
                    var pos = {
                        x: plotLeft + pointX + width, // - (distance + width / 2),
                        y: plotTop + plotHeight + height + 300 // + pointY - (distance + height)
                    };

                    return clampPosition(pos);
                }
            };

            return options.chart.rotatedFrame ? positioner.horizontal() : positioner.vertical();

        };

        var clicked = function (d) {
            data.set({
                id: d.x,
                amount: d.real,
                proportion: d.y
            });
            show.call(this, d);
        };

        var onMouseOut = function () {
            changeOpacity.call(this, 0, this.options.tooltip.hideTime);
        };

        var getTooltipText = function (d, allPoints) {
            return '';
        };

        var show = function (d) {
            clearHideTimer.call(this);

            var dataPoints = findOriginalDataPoint(d);

            this.tooltipElement.select('.text').html(getTooltipText.call(this, dataPoints[0] || d, dataPoints));

            var pos = positionTooltip.call(this, d);

            this.tooltipElement
                .style('top', pos.y + 'px')
                .style('left', pos.x + 'px');

            changeOpacity.call(this, this.options.tooltip.opacity, this.options.tooltip.showTime);
        };

        function findOriginalDataPoint(d) {
            var res = [];
            _.each(data, function (series, seriesIndex) {
                var name = series.name;
                _.each(series.data, function (point) {
                    if (point.x === d.x && d.y === point.y) {
                        res.push(_.extend(point, { series: name, seriesIndex:seriesIndex }));
                    }
                });
            });

            return res;
        }

        this.tooltipElement = this.container
            .style('position', 'relative')
            .selectAll('.nw-tooltip').data([1]);

        this.tooltipElement
            .enter().append('div')
            .attr('class', 'nw-tooltip')
            .style('opacity', 0)
            .append('div')
                .attr('class', 'text');

        this.svg.selectAll('.tooltip-tracker')
            .on('click.tooltip', clicked.bind(this))
    }

    render.defaults = defaults;


    /**
    * Adds a tooltip on hover to all other visualizations in the Contour instance.
    *
    * Although not strictly required, this visualization does not appear unless there are already one or more visualizations in this Contour instance for which to show the tooltips.
    *
    * ### Example:
    *
    *     new Contour({el: '.myChart'})
    *           .cartesian()
    *           .line([2, 4, 3, 5, 7])
    *           .tooltip()
    *           .render();
    *
    * @name tooltip(data, options)
    * @param {object|array} data Ignored!
    * @param {object} options Configuration options particular to this visualization that override the defaults.
    * @api public
    *
    * ### Notes:
    *
    * Each Contour instance can only include one `tooltip` visualization.
    */
    Contour.export('statictip', render);
