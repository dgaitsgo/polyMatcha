import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

import Layout from '../../components/Layout'
import Field from '../../components/Field'
import $ from 'jquery'
import Validator from '../../helpers/Validator'

import './LogIn.css'
import '../../containers/App/App.css'
import '../../containers/App/bulma.css'

class LogIn extends Component {

	state = {
			email : '',
			password : '',
			rememberMe : false,
			readyToSubmit : false,
			emailValid : false
	}

	valid = new Validator

	isPrivate = false

	login = () => {
		const { email, password, rememberMe } = this.state
		axios.post('/api/login', {
	    email,
	    password,
			rememberMe
    }).then( (res) => {
				if (res.data.error) {
					this.setState({ password : '', formError : true })
				} else {
					const { redirect, id, token } = res.data
					// this.props.handleLogin(id, res.data.token)
					this.setState({ redirect, id })
				}
			},
			error => {
				this.setState({ redirect : '/500'})
			})
		}//show 'thinking', set timeout

	validateForm = () => {
		const { emailValid, password } = this.state
		this.setState({ readyToSubmit : emailValid && password.length > 0 })
	}

	validateEmail = (email) =>
		this.setState({ email, emailValid : this.valid.email(email) }, this.validateForm)

	updatePassword = (password) =>
		this.setState({ password : password }, this.validateForm)

	toggleRememberMe = () => {
		const cond = !this.state.rememberMe
		this.setState({ rememberMe : cond })
	}

	getFormHelp = () => {
		if (this.state.formError)
			return (<p className="help is-danger">There's a problem with your email or password</p>)
	}

	getEmailHelp = () => {
		const { email, emailValid } = this.state
		if (email.length === 0)
			return (null)
		else if (!emailValid)
			return (<p className="help is-danger">Please put in a valid email.</p>)
	}

	render() {
		const { readyToSubmit, redirect, password } = this.state
		if (redirect) return (<Redirect push to={redirect}/>)

		const emailHelp = this.getEmailHelp()
		const formHelp = this.getFormHelp()

		return (
			<Layout>

				<div className="LogIn">
					<div className="columns is-centered is-narrow">
						<div className="column is-half">
							<h1 className="title is-3" style={{ paddingTop : '2vh' }}>Log In</h1>
							<div className="box">
								<Field
										label="Email"
										placeholder=""
										type="text"
										onBlur={this.validateEmail}
										onChange={null}
										iconLeft="fa fa-envelope"
										help={emailHelp}
								/>
								<Field
										label="Password"
										type="password"
										placeholder=""
										value={password}
										onChange={this.updatePassword}
										iconLeft = "fa fa-lock"
								/>
								{formHelp}
								<div className="control">
									<label className="checkbox">
										<input type="checkbox" onChange={this.toggleRememberMe}></input>
										<checkbox></checkbox>
										{"      Remember Me"}
									</label>
								</div>
								<br></br>
							<Link to='./ForgotPassword'>I forgot my password</Link>
							<nav className="level" id="signupDirectionNav">
								<div className="level-item">
									<button className="button is-success" onClick={this.login} disabled={!readyToSubmit}>
										Log in!
									</button>
								</div>
							</nav>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}
}

export default LogIn
