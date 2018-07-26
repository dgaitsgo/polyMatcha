import React from 'react'
import { Link } from 'react-router-dom'

class uiHelpMessages {

	newUsername = (username, usernameValid, usernameUnique) => {

		if (username.length === 0)
			return (null)
		if (username.length > 22)
			return (<p className="help is-danger">Username must be less than 22 characters</p>)
		if (usernameUnique.then) // checking it its a Promise, in which case we show 'thinking'
			return (<a className="button is-loading"></a>)
		else if (!usernameValid)
			return (<p className="help is-danger">Username must only contain numbers and letters</p>)
		else if (!usernameUnique)
			return (<p className="help is-danger">Username is already in use <Link to='/LogIn'>Click here to login</Link></p>)
		else if (usernameValid && usernameUnique)
			return (<p className="help is-success">Username is available</p>)
	}

	newEmail = (email, emailValid, emailUnique) => {

		if (email.length === 0)
			return (null)
		else if (emailUnique.then)
			return (<a className="button is-loading"></a>)
		else if (!emailValid)
			return (<p className="help is-danger">Please put in a valid email.</p>)
		else if (!emailUnique)
			return (<p className="help is-danger">Email is already in use <Link to='/LogIn'>Click here to login</Link></p>)
		else if (emailValid && emailUnique)
			return (<p className="help is-success">Email is valid</p>)
	}

	email = (email, emailValid) => {

		if (email.length === 0)
			return (null)
		else if (!emailValid)
			return (<p className="help is-danger">Please put in a valid email.</p>)
	}

	newPassword = (password, passwordStrength) => {
		if (password.length === 0)
			return (null)
		if (password.length > 128)
			return (<p className="help is-danger">Password is too long</p>)
		else if (passwordStrength < 2)
			return (<p className="help is-danger">Password can be guessed too easily</p>)
		else if (passwordStrength === 2)
			return (<p className="help is-warning">Password is not very strong</p>)
		else if (passwordStrength > 2)
			return (<p className="help is-success">Secure</p>)
	}

	confirmPassword = (confirmedPassword, password) => {
		if (confirmedPassword.length === 0)
			return (null)
		else if (confirmedPassword != password)
			return (<p className="help is-danger">Passwords do not match</p>)
	}

}

export default uiHelpMessages
