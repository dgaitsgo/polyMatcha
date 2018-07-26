import * as d3 from 'd3'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import relationshipTypes from '../../constants/relationshipTypes'
import graph from '../../constants/relationships'

import './NetworkVisualization.css'

class NetworkVisualization extends Component {

	constructor (props) {
		super(props)
		this.node = null
		this.nodes = null
		this.nodeById = null
		this.links = null
		this.bilinks = null
		this.link = null
		this.simulation = null
		this.color = null
	}


	static propTypes = {
		parent : PropTypes.string.isRequired,
		relationships : PropTypes.array.isRequired
	}


	ticked = () => {
		this.link.attr("d", this.positionLink)
		this.node.attr("transform", this.positionNode)
	}

	positionLink = (d) => {
		return (
			"M" + d[0].x + "," + d[0].y
			+ "S" + d[1].x + "," + d[1].y
			+ " " + d[2].x + "," + d[2].y
		)
	}

	positionNode = (d) => "translate(" + d.x + "," + d.y + ")"

	dragstarted = (d) => {
	  if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
	  d.fx = d.x, d.fy = d.y;
	}

	dragged = (d) => {
		d.fx = d3.event.x, d.fy = d3.event.y
	}

	dragended = (d) => {
	  if (!d3.event.active) this.simulation.alphaTarget(0);
	  d.fx = null, d.fy = null;
	}

	componentDidMount() {

		const demo = true

		const { parent, relationships } = this.props

		const heightNode = d3.select('#' + parent)
		const widthNode = d3.select('body')

		const { width } = widthNode.node().getBoundingClientRect()
		const { height } = heightNode.node().getBoundingClientRect()

		this.color = d3.scaleOrdinal(d3.schemeCategory20);

		const svg = widthNode.append('svg')
			.attr('id', 'networkVisualization')
			.attr('width', width)
			.attr('height', height)
			.attr('x', 0)
			.attr('y', 0)

		svg.append('g')
			.append('rect')
				.attr('width', width)
				.attr('height', height)
				.attr('opacity', 1)
				.attr('fill', 'white')

		this.simulation = d3.forceSimulation()
	  	.force("link", d3.forceLink().distance(300).strength(0.01))
	    .force("charge", d3.forceManyBody())
	    .force("center", d3.forceCenter(width / 2, height / 2))

		this.nodes = graph.nodes
	  this.nodeById = d3.map(this.nodes, (d) => d.id)
	  this.links = graph.links
	  this.bilinks = []

	  this.links.forEach( (link) => {
			var s = link.source = this.nodeById.get(link.source),
				t = link.target = this.nodeById.get(link.target),
				i = {}; // intermediate node
				this.nodes.push(i);
				this.links.push({source: s, target: i}, {source: i, target: t});
				this.bilinks.push([s, i, t]);
	  })

	 	this.link = svg.selectAll(".link")
	    .data(this.bilinks)
	    .enter().append("path")
	      .attr("class", "link");

	  this.node = svg.selectAll(".node")
	    .data(this.nodes.filter(function(d) { return d.id; }))
	    .enter().append("circle")
	      .attr("class", "node")
				.attr('stroke', 1)
				.attr('stroke-fill', 'black')
	      .attr("r", 5)
	      .attr("fill", (d) => this.color(d.group))
	      .call(d3.drag()
	        .on("start", this.dragstarted)
	        .on("drag", this.dragged)
	        .on("end", this.dragended))

	  // this.node.append("title")
	  //     .text(function(d) { return d.id; })

	  this.simulation
	      .nodes(this.nodes)
	      .on("tick", this.ticked);

	  this.simulation.force("link")
	      .links(this.links)
	}


	render () {
		return (null)
	}
}

export default NetworkVisualization
