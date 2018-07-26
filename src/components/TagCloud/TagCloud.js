import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './TagCloud.css'

class TagCloud extends Component {
	static propTypes = {
		items : PropTypes.array.isRequired,
		activeItems : PropTypes.array.isRequried,
		onClick : PropTypes.func.isRequired,
		addX : PropTypes.bool
	}

	onClick = ({ target : { innerHTML } }) => this.props.onClick(innerHTML)

	render () {

		const { activeItems, items, addX } = this.props
		const className = "tag" + (addX ? " allowDelete" : "")

		return (
			<div className="field is-grouped is-grouped-multiline">
					{items.map( (item, i) =>
					<div className="control" key={i}>
						<div className="tags has-addons">
							<span
								onClick={this.onClick}
								className={className + (activeItems.indexOf(item) > -1 ? " is-info" : "")}
								>{item}
							</span>
						</div>
					</div>
				)}
			</div>
		)
	}
}

export default TagCloud
