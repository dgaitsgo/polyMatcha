import React, { Component } from 'react'

//A row for each new column
class Row extends Component {
	render () {
		return (
			<div className="columns">
				<div className="column">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Row
