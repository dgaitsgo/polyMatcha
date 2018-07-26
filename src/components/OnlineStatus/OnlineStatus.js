import React, { Component } from 'react'

class OnlineStatus extends Component {

	render () {
		const { online } = this.props
		return (
			<svg width="40" height="15" xmlns="http://www.w3.org/2000/svg">
				<circle
					cx="25" cy="9" r="6"
					fill={online ? 'hsl(141, 71%, 48%)' : 'hsl(0, 0%, 21%)'}
				/>
			</svg>
		)
	}
}

export default OnlineStatus
