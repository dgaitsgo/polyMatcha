import React, { Component } from 'react'
import * as d3 from 'd3'
import { Redirect, BrowserRouter as Router } from 'react-router-dom'
import $ from 'jquery'

import Route from '../../components/AuthRoute'
import Search from '../../containers/Search'
import LogIn from '../../containers/LogIn'
import Home from '../../containers/Home'
import SignUp from '../../containers/SignUp'
import Profile from '../../containers/Profile'
import e500 from '../../containers/500'
import ForgotPassword from '../../containers/ForgotPassword'

import user from '../../constants/user'

import './App.css'

class App extends Component {

	constructor() {
		super()
		this.state = {
			loggedIn : false,
			id : null,
			token : null
		}
	}

	handleLogin(v) {
		const { id, token } = v
		console.log('true')
		this.setState({
			id, token, loggedIn : true
		})
	}

	render () {

		const { loggedIn, id, token } = this.state

		return (
			<main>
				<Router>
					<div className="routes">
						<Route exact path='/'					component={Home}/>
						<Route path='/Home'						component={Home}/>
						<Route exact path='/LogIn'		uponLogIn={this.handleLogin} component={LogIn}/>
						<Route exact path='/Profile'	id={id} component={Profile}/>
						<Route exact path='/Search'		component={Search}/>
						<Route exact path='/SignUp'		component={SignUp}/>
						<Route exact path='/ForgotPassword' component={ForgotPassword}/>
					</div>
				</Router>
			</main>
		)
	}
}

export default App
