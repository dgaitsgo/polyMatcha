function graph(id) {

	var graph = {};

	graph.id = id;

	/* Pass the id of the parent node */
	graph.attachTo = function (parent) {
		this.svg = d3.select(parent).append('svg')
		return (this)
	}

	graph.setDimensions = function (width, height) {
		this.svg.attr('width', width)
		this.svg.attr('height', height)
		this.width = width;
		this.height = height;
		return (this)
	}

	graph.setMargins = function (left, right, top, bottom) {
		this.margin = {}
		this.margin.left = left;
		this.margin.right = right;
		this.margin.top = top;
		this.margin.bottom = bottom;
		this.horMar = left + right;
		this.vertMar = top + bottom;
		return (this)
	}

	graph.setPlotArea = function () {
		this.plotArea = this.svg.append('g')
							.attr('id', 'plotArea_' + this.id)
							.attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
		this.plotAreaWidth = this.width - this.margin.left * 2;
		this.plotAreaHeight = this.height - this.margin.top * 2;
		return (this);
	}

	graph.setXScale = function (scaleFn, domain, range) {
		this.xScale = scaleFn
						.domain(domain)
		if (range != undefined)
			this.xScale.range(range)
		else
			this.xScale.range([0, this.plotAreaWidth])
		return (this)
	}

	graph.setYScale = function (scaleFn, domain, range) {
		this.yScale = scaleFn
						.domain(domain)
		if (range != undefined)
			this.yScale.range(range)
		else
			this.yScale.range([this.plotAreaHeight, 0])
		return (this)
	}

	graph.setRadiusScale = function(exponent, domain) {
		this.rScale = d3.scalePow()
			.exponent(exponent)
			.domain(domain)
			.range([1, this.plotAreaHeight / 2])
		return (this)
	}

	graph.setXLabel = function (text) {
		this.plotArea.append('text')
			.attr('transform', 'translate(' + this.plotAreaWidth / 2 + ',' + (this.plotAreaHeight) + ')')
			.attr('dy', this.margin.top / 2)
			.attr('class', 'axis-label')
			.attr('text-anchor', 'middle')
			.text(text)
		return (this)
	}

	graph.setYLabel = function (text) {
	this.plotArea.append('text')
		.attr('transform', 'rotate(270) translate(' + (-this.plotAreaHeight / 2) + ',' + 0 + ')')
		.attr('dy', -this.margin.right / 2)
		.attr('class', 'axis-label')
		.attr('text-anchor', 'middle')
		.text(text)
		return (this)
	}

	graph.setAxes = function () {
		this.xAxisG = this.plotArea.append('g')
			.attr('id', 'xAxis')
			.attr('transform', 'translate(0,' + this.plotAreaHeight + ')')

		this.yAxisG = this.plotArea.append('g')
			.attr('id', 'yAxis')

		this.xAxis = d3.axisBottom(this.xScale)
		this.yAxis = d3.axisLeft(this.yScale)
		this.xAxisG.call(this.xAxis)
		this.yAxisG.call(this.yAxis)

		return (this)
	}

	graph.debug = function () {
		this.plotArea.append('rect')
			.attr('width', this.plotAreaWidth)
			.attr('height', this.plotAreaHeight)
			.attr('fill', 'green')
			.attr('opacity', 0.3)

		this.svg.append('rect')
			.attr('width', this.width)
			.attr('height', this.height)
			.attr('fill', 'orange')
			.attr('opacity', 0.3)
	}

	graph.setShapeGen = function (generator, xAccessor, yAccessor) {
		var ref = this;
		this.shapeGen = generator
			.curve(d3.curveMonotoneX)
			.x(function(inst) {
				return (ref.xScale(inst[[xAccessor]]))
			})
			.y(function(inst) {
				return (ref.yScale(inst[[yAccessor]]))
			})
		return (this);
	}

	graph.setZoom = function (zoomFn) {
		var ref = this
		this.zoom = d3.zoom()
			.on('zoom', zoomFn)
			.extent([[0, 0], [
					ref.plotAreaWidth,
					ref.plotAreaHeight]
			])
			this.svg.call(this.zoom)
			return (this)
	}

	return (graph);
}
