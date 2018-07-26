import React, { Component } from 'react'
import PropTypes from 'prop-types'

class GenderMenu extends Component {

	static propTypes = {
		title : PropTypes.string
	}

	static defaultValues = {
		title : 'Gender'
	}

	onClick = (e) => {
		this.props.onClick(e.target.innerHTML)
	}

	render () {
		const {title} = this.props
		return (
			<div className="dropdown is-hoverable">
				<div className="dropdown-trigger">
					<button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
						<span>{title}</span>
						<span className="icon is-small">
							<i className="fa fa-angle-down" aria-hidden="true"></i>
						</span>
					</button>
				</div>
				<div className="dropdown-menu">
					<div className="dropdown-content">
						<div className="dropdown-item">
							<a onClick={this.onClick}>
								<nav className="level">
									<div className="level-left">
										<div className="level-item">
											Female
										</div>
									</div>
								</nav>
							</a>
						</div>
						<div className="dropdown-item">
							<a>
								<nav className="level">
									<div className="level-left">
										<div onClick={this.onClick} className="level-item">
											Male
										</div>
									</div>
								</nav>
							</a>
						</div>
						<div className="dropdown-item">
							<a>
								<nav className="level">
									<div className="level-left">
										<div onClick={this.onClick} className="level-item">
											Non-Binary
										</div>
									</div>
								</nav>
							</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default GenderMenu
