import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextBox extends Component {

	static propTypes = {
		rows : PropTypes.number.isRequired,
		label : PropTypes.string,
		maxChars : PropTypes.number,
		onChange : PropTypes.func,
		className : PropTypes.string
	}

	handleChange = ({ target : { value } }) => {
		this.props.onChange(value)
	}


	render () {
		const { getValue, rows, label, maxChars, onChange, className } = this.props
		const value = getValue()

		const counter = maxChars ? <p className="label">{`${value.length}/${maxChars}`}</p> : null
		return (
			<div className="TextBox">
				<nav className="level">
					<div className="level-left">
						<label className="label">{label}</label>
					</div>
					<div className="level-right">
						{counter}
					</div>
				</nav>
				<div className="field is-horizontal">
					<div className="field-body">
						<div className="field">
							<div className="control">
								<textarea
									className={className}
									rows={rows}
									value={value}
									onChange={this.handleChange}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default TextBox
