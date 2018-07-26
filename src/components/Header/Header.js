import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, NavLink } from 'react-router-dom'

import './Header.css'
import '../../containers/App/App.css'
import HeaderMenuItems from '../../constants/menuPaths'

import Menu from '../../components/Menu'


class Header extends Component {

	constructor(props) {
		super(props)
		this.state = {
			logInRedirect : false,
			learnMoreRedirect : false,
		}
	}

	//That's not a typo, it's a hack!
	//This is the only way I could figure out how to keep NavLink
	//from staying 'active' after I clicked it. Plus, it gives that refresh 'feel'
	//when navigating between parts of the app. Lord forgive me
	extrahackybuttonsolution = (e) => e.preventDefaul()

	static defaultValues = {
		isFixed : true,
		isLoggedIn : false
	}

	getVisitorHeader = (opacity, isHome) =>
		<div id="landHeader"
			className={"hero-head matchaHeader" + (isHome ? " floatingHeader" : "")}
			style={(isHome ? { opacity : 0 } : { opacity : 1 })}>
		 <header id="headerItself" className="nav">
			 <div className="container">
				 <div className="nav-left">
				 <div className="nav-item">
					 <h1 className="title">polyMatcha</h1>
				 </div>
				 <div className="nav-right nav-menu">
					 <div className="nav-item">
						<NavLink to={"/LogIn"} onClick={this.extrahackybuttonsolution}
							activeClassName={"button is-info is-outlined"} className={"button is-info is-outlined"}>
							Log In
						</NavLink>
					</div>
					<NavLink className="nav-item" to="/Home/SignUp">
						<button className="button is-info is-outlined">
							Sign Up
						</button>
					</NavLink>
					<NavLink className="nav-item" to="/About">
						<button className="button is-primary">
							Learn More
						</button>
					</NavLink>
				 </div>
			 </div>
		 </div>
		 </header>
	 </div>

	 getUserHeader = (username) => {
		 //fetch user data
		 return (
			 <div id="userHeader" className="matchaHeader">
	 		 	<header id="headerItself" className="nav">
	 			 <div className="container">
	 				<div className="nav-left">
	 				 <div className="nav-item">
	 					<h1 className="title">polyMatcha</h1>
	 				 </div>
	 				 <div className="nav-right nav-menu">
					 	<a className="nav-item">
	 						<button className="button is-info is-outlined">
	 					 		Search
	 						</button>
	 					</a>
	 					<a className="nav-item">
	 						<button className="button is-info is-outlined">
	 					 		Notifications
	 						</button>
	 					</a>
 					 <a className="nav-item">
 						 <button className="button is-info is-outlined">
 								Chat
 						 </button>
 					 </a>
 					 <a className="nav-item">
 						 <button className="button is-info is-outlined">
 							 Log Out
 						 </button>
	 					</a>
	 				</div>
	 			 </div>
	 		 </div>
	 		</header>
	 	 </div>
	 	)
	 }

	render () {
		const { loggedIn, username, display } = this.props
		if (display === false) return (null)

		const header = !loggedIn ? this.getUserHeader(username) : this.getVisitorHeader()
		return (<div className="header">{header}</div>)
	}
}

export default Header
