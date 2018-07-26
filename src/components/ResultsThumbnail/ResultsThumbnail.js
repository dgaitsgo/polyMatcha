// idea to optomize this :
// you could fetch the number of matches
// load x components
// or just get 10 x 10 for something 'progressive'
// Order by
// grid view, map view

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import OnlineStatus from '../../components/OnlineStatus'

class ResultsThumbnail extends Component {
	static propTypes = {
		user : PropTypes.object.isRequired
	}

	state = {
		isFocued : false
	}

	render () {
		const { firstName, online, url, bio, age, distance } = this.props.user
		return (
			<div className="column is-half">
				<div className="card">
					<div className="card-header">
						<div className="card-header-title">
							<p className="title is-4">{firstName + ', ' + age}</p>
						</div>
					</div>
					<div className="card-image">
						<figure className="image is-4by3">
							<img src={url} alt="Avatar"></img>
	    			</figure>
	  			</div>
			    <div className="card-content">
						<div className="content">
							<nav className="level">
								<div className="level-item">
									<OnlineStatus online={online}/>
								</div>
								<div className="level-item">
									<small>{distance + " miles away"}</small>
								</div>
								<div className="level-item">
									<i className="fa fa-heart-o" aria-hidden="true"></i>
								</div>
								<div className="level-item">
									<i className="fa fa-times" aria-hidden="true"></i>
								</div>
							</nav>
						</div>
			  	</div>
			 </div>
		 </div>
		)
	}
}

export default ResultsThumbnail
