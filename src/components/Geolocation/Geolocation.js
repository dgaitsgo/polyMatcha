import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Geolocation extends Component {

	//gets called in case user blocks geolocation services
	locateByIp = () => {
		console.log('back up')
	}

	navPos = (position) => console.log(position)

	fetchLocation = () => navigator.geolocation.getCurrentPosition(this.navPos, this.locateByIp)

	render() {
		return (
			<div className="field is-grouped">
				<div className="control ">
					<a className="button is-info" onClick={this.fetchLocation}>
						Find Me!
					</a>
  			</div>
  			<div className="control is-expanded">
					<input className="input" type="text" placeholder="Just the city will do"></input>
  			</div>
			</div>
		)
	}
}

export default Geolocation
