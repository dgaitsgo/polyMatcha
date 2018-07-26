import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Field extends Component {

	constructor(props) {
		super(props)
		this.state = {
			label : props.label,
			iconLeft : props.iconLeft,
			placeholder : props.placeholder,
			type : props.type,
			value : props.value
		}
	}

	onBlur = ({ target : { value } }) => {
		console.log(value)
		const cb = this.props.onBlur
		cb ? cb(value) : null
	}

	onChange = ({ target : { value } }) => {
		const cb = this.props.onChange
		cb ? cb(value) : null
	}

	onFocus = ({ target : { value } }) => {
		const cb = this.props.onFocus
		cb ? cb(value) : null
	}

	render () {

		const { label, iconLeft, placeholder, type } = this.state
		const { help, value  } = this.props
		const iconLeftWrapper =
			iconLeft ?
				<span className="icon is-small is-left">
					<i className={iconLeft}></i>
				</span>
				: null
		return (
			<div className="field">
				<label className="label">{label}</label>
				<div className={"control" + (iconLeft ? " has-icons-left" : "")}>
					<input
						value={value}
						className="input" type={type} placeholder={placeholder}
						onChange={this.onChange}
						onBlur={this.onBlur}></input>
					{iconLeftWrapper}
					{help}
				</div>
			</div>
		)
	}
}

export default Field
