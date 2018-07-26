import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BulmaDropDownMenu extends Component {

	onClick = ({ target : { innerHTML } }) => this.props.onClick(innerHTML)

	render () {
		const { title, items } = this.props
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
	 				<div className="dropdown-content" style={{height: 20 + 'vh', overflow:"scroll"}}>
						{items.map( (item, i) => {
							return (<a key={i} className="dropdown-item" onClick={this.onClick}>{item}</a>)
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default BulmaDropDownMenu
