import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Menu.css'

class Menu extends Component {

	static propTypes = {
		orientation : PropTypes.string.isRequired,
		items : PropTypes.array.isRequired
	}

	constructor(props) {
		super(props)
	}

	static defaultValues = {
		orientation : 'horizontal'
	}

	state = {
		items : this.props.items
	}
//logo																Log In     About
	render () {
		const { orientation, items } = this.props
		return (
			<div className="Menu">
				<div className={orientation}>
					{
						items.map( (item, i) => {
							return (<div className="item" key={i}>{item.title}</div>)
						})
					}
				</div>
			</div>
			)
	}
}

export default Menu
