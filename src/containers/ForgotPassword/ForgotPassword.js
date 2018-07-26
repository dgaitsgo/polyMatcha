import React, { Component } from 'react'
import Layout from '../../components/Layout'
import Field from '../../components/Field'
import uiHelpMessages from '../../controllers/uiHelpMessages'
import Validator from '../../helpers/Validator'

class ForgotPassword extends Component {

	state = {
		emailValid : false,
		submitted : false,
		email : ''
	}

	valid = new Validator
	uiHelp = new uiHelpMessages

	validateEmail = (email) =>
		this.setState({ email, emailValid : this.valid.email(email.toLowerCase()) })

	resetPassword = () => {
		this.setState({ submitted : true })
	}

	render () {

		const { email, emailValid, submitted } = this.state
		const emailHelp = this.uiHelp.email(email, emailValid)

		const form =
			<div classnName="ForgotPasswordForm">
				<h1 className="subtitle" style={{paddingTop : '2vh'}}>
					You'll have to reset your password in order to
					regain access to your account.
				</h1>
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
				</div>
				<button className="button is-success" onClick={this.resetPassword} disabled={!emailValid}>
					Reset Password
				</button>
			</div>

		return (
			<Layout>
				<div className="columns is-centered is-narrow">
					<div className="column is-half">
						<h1 className="title is-3">Forgot Password</h1>
						{ !submitted
								? form
								: <div className="box">
										<h1 className="subtitle">
											If that email is in our system, you'll find a link in your
									 		inbox to reset your password. Check in your spam too.
										</h1>
									</div>
						}
					</div>
				</div>
			</Layout>
		)
	}
}


export default ForgotPassword
