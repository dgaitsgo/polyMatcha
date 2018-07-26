import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css'

import './Slider.css'
import '../../containers/App/bulma.css'

class Slider extends Component {

	static propTypes = {
		min : PropTypes.number.isRequired,
		max : PropTypes.number.isRequired,
		step : PropTypes.number,
	}

	static defaultValues = {
		step : 1
	}

	constructor(props) {
		super(props);

    this.state = {
      value: {
				min: this.props.min,
				max: this.props.max
			},
    };
  }

	handleChange = (value) => {
		this.setState({value});
	}

	render() {
		const { min, max, label } =  this.props;
		return (
				<nav className="level">
					<div className="level-item">
						<h4>{label}</h4>
					</div>
					<div className="sliderTenderLove">
						<div className="level-right">
							<InputRange
								maxValue={max}
								minValue={min}
								value={this.state.value}
								onChange={this.handleChange}
							/>
						</div>
					</div>
				</nav>
		)
	}
}

export default Slider
