import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Link} from 'react-router-dom'

import Calendar from '../../constants/calendar'
import BulmaDropDownMenu from '../../components/BulmaDropDownMenu'
import Field from '../../components/Field'

import Validator from '../../helpers/Validator' // should be in controllers
import uiHelpMessages from '../../controllers/uiHelpMessages'

import { trim, reverse } from 'lodash'
import moment from 'moment'
import axios from 'axios'

const uiHelp = new uiHelpMessages

class NewAccount extends Component {

	isPrivate = false

	state = {
		username : '',
		email : '',
		birthDay : '',
		birthMonth : '',
		birthYear : '',
		password : '',
		confirmedPassword : '',

		usernameValid : false,
		emailValid : false,
		passwordStrength : 0,
		birthdateValid : false,
		agreesToConditions : false,

		usernameUnique : false,
		emailUnique : false,

		readyToSubmit : false,
	}

	valid = new Validator

	createNewUser = () => {
		const { username, email, password, birthdate } = this.state
		axios.post('/api/newUser', {
	    username,
	    email,
			password,
			birthdate
    }).then( response => {
				this.setState({ redirect : response.redirect })
			},
			error => {
				this.setState({ redirect : '/500'})
		})
	}

	validateForm = () => {

		const s = this.state

		this.setState({
			readyToSubmit :	s.usernameValid &&
											s.emailValid &&
											s.passwordStrength >= 2 &&
											s.password === s.confirmedPassword &&
											s.birthdateValid &&
											s.agreesToConditions
		  })
	}

	validateUsername = (username) => {
		if (username.toLowerCase() != this.state.username.toLowerCase()) {
			if (this.valid.username(username)) {
				const unameCheckU =
					fetch(`/api/usernameUnique/${username.toLowerCase()}`, { method : 'GET' })
						.then(res => res.json())
						.then( (unique) => {
							return (unique)
					})
					this.setState({ username, usernameUnique : unameCheckU }, this.validateForm)
					unameCheckU.then( ({ usernameUnique }) => {
						this.setState({ username, usernameValid : true, usernameUnique}, this.validateForm)
					})
				} else {
					this.setState({ username, usernameValid : false }, this.validateForm)
				}
			}
		}

	validateEmail = (email) => {
		if (email.toLowerCase() != this.state.email.toLowerCase()) {
			if (this.valid.email(email.toLowerCase())) {
				const emailCheckU =
					fetch(`/api/emailUnique/${email}`, { method : 'GET' })
						.then(res => res.json())
						.then( (unique) => {
							return (unique)
					})
					this.setState({ email, emailUnique : emailCheckU }, this.validateForm)
					emailCheckU.then( ({ emailUnique }) => {
						this.setState({ email, emailValid : true, emailUnique }, this.validateForm)
					})
			} else {
					this.setState({ email, emailValid : false }, this.validateForm)
			}
		}
	}

	validatePassword = (password) =>
		this.setState({ password, passwordStrength : this.valid.password(password) }, this.validateForm)

	validateConfirmedPassword	= (confirmedPassword) =>
		this.setState({ confirmedPassword }, this.validateForm)

	validateBirthdate = () => {
		const { birthDay, birthMonth, birthYear } = this.state
		const bds = moment(`${birthYear}-${birthMonth}-${birthDay}`, 'YYYY-MMMM-D', true)
		const birthdate = moment(bds).format('YYYY-MM-DD');
		this.setState({ birthdate, birthdateValid : (this.valid.isOver18(bds) && this.valid.date(bds)) })
	}

	updateDay = (value) => this.setState({birthDay : value }, this.validateBirthdate)
	updateMonth = (value) => this.setState({birthMonth : value}, this.validateBirthdate)
	updateYear = (value) => this.setState({birthYear : value}, this.validateBirthdate)

	toggleAgreement = () => {
		const cond = !this.state.agreesToConditions
		this.setState({ agreesToConditions : cond }, this.validateForm)
	}

	render () {
		const {
			birthDay, birthMonth, birthYear, readyToSubmit,
			username, usernameValid, usernameUnique,
			email, emailValid, emailUnique,
			password, passwordStrength,
			confirmedPassword,
			redirect
		} = this.state

		if (redirect) return <Redirect push to={redirect} />

		const usernameHelp = uiHelp.newUsername(username, usernameValid, usernameUnique)
		const emailHelp = uiHelp.newEmail(email, emailValid, emailUnique)
		const passwordHelp = uiHelp.newPassword(password, passwordStrength)
		const confirmedPasswordHelp = uiHelp.confirmPassword(confirmedPassword, password)


		return (
			<div className="BasicProfileInfo">

				<Field
						label="Username"
						type="text"
						placeholder=""
						onBlur={this.validateUsername}
						onFocus={this.usernameGuide}
						onChange={null}
						iconLeft="fa fa-user"
						help={usernameHelp}
				/>
				<Field
						label="Email"
						placeholder="It won't be public"
						type="text"
						onBlur={this.validateEmail}
						onChange={null}
						iconLeft="fa fa-envelope"
						help={emailHelp}
				/>
				<Field
						label="Password"
						type="password"
						onBlur={this.validatePassword}
						onChange={null}
						placeholder=""
						iconLeft = "fa fa-lock"
						help={passwordHelp}
				/>
				<Field
						label="Confirm password"
						type="password"
						onChange={null}
						onChange={this.validateConfirmedPassword}
						placeholder=""
						iconLeft = "fa fa-lock"
						help={confirmedPasswordHelp}
				/>
				<div className="field">
					<label className="label">Birthday</label>
					<nav className="level">
						<div className="level-left">
							<div className="level-item">
								<BulmaDropDownMenu replace={true} onClick={this.updateDay} title={birthDay.length ? birthDay : "day"} items={Calendar.days}/>
							</div>
							<div className="level-item">
								<BulmaDropDownMenu replace={true} onClick={this.updateMonth} title={birthMonth.length ? birthMonth : "month"} items={Calendar.months}/>
							</div>
							<div className="level-item">
								<BulmaDropDownMenu replace={true} onClick={this.updateYear} title={birthYear.length ? birthYear : "year"} items={reverse(Calendar.year)}/>
							</div>
						</div>
					</nav>
				</div>
				<div className="field">
					<div className="control">
						<label className="checkbox">
							<input type="checkbox" onChange={this.toggleAgreement}></input>
							<checkbox></checkbox>
							{" I agree to "}
						</label>
						<a>{" Terms and Conditions"}</a>
					</div>
				</div>
				<nav className="level" id="signupDirectionNav">
					<div className="level-item">
						<button className="button is-success" onClick={this.createNewUser} disabled={!readyToSubmit}>Create Account!</button>
					</div>
				</nav>
			</div>
		)
	}
}

export default NewAccount
