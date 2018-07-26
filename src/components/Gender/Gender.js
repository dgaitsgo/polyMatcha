import React, { Component } from 'react'

import GenderMenu from '../../components/GenderMenu'

class Gender extends Component {

	getGenderIcon = (g) => {
		const gen = g.toLowerCase()
		switch(gen) {
			case 'female' :
					return (<i className="fa fa-venus" aria-hidden="false"></i>)
			case 'male' :
					return ( <i className="fa fa-mars" aria-hidden="false"></i>)
			case 'non-binary' :
					return ( <i className="fa fa-transgender-alt" aria-hidden="false"></i>)
			}
	}

	render() {
		const { genderAssigned , genderSeeking } = this.props

		const assignedIcon = this.getGenderIcon(genderAssigned)

		return (
			<div className="gender">

				<label className="label">Gender</label>
				<nav className="level">
					<div className="level-left">
						<div className="field is-grouped">
							<div className="control">
								<GenderMenu
									title="I Am"
									onClick = {this.props.validateGenderAssigned}
								/>
							</div>
							<div className="control">
								<a className="button is-info is-outlined">
			    				<span className="icon">
			      				{assignedIcon}
			    				</span>
			  				</a>
							</div>
							<div className="control">
								<GenderMenu
									onClick={this.props.validateGenderSeeking}
									title="Seeking"
								/>
							</div>
							{ genderSeeking.map( (gs, i) => {
								return (
									<div className="control" key={i}>
									<a className="button is-info is-outlined">
									<span className="icon">
										{this.getGenderIcon(gs)}
									</span>
									</a>
									</div>
								)})}
						</div>
					</div>
				</nav>
			</div>
		)
	}
}

export default Gender
