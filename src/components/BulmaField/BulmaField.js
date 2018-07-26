import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BulmaField extends Component {

	static propTypes = {
		label : PropTypes.string,
		inputType : PropTypes.string.isRequired,
		iconName : PropTypes.string,
		placeholder : PropTypes.string
	}

	render () {
		const { label, inputType, iconName, placeHolder } = this.props
		return (
			<div className="field">
				<label className="label">{label}</label>
				<p className={"control has-icons-left"}>
				<input className="input" type={inputType} placeholder={placeHolder}></input>
					<span className={"icon is-small is-left"}>
						<i className={iconName}></i>
					</span>
				</p>
			</div>
		)
	}
}

export default BulmaField
