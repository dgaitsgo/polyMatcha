import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Search from './containers/Search'
import LogIn from './containers/LogIn'
import Home from './containers/Home'
import SignUp from './containers/SignUp'

export default (
	<div>
			<Route exact={true} path='/'				component={Home}/>
			<Route exact={true} path="/Search"	component={Search}/>
			<Route exact={true} path="/LogIn"		component={LogIn}/>
			<Route exact={true} path="/SignUp"	component={SignUp}/>
			<Route exact={true} path='/Home'		component={Home}/>
			{/* <Router path='/profile/:username'		component={Profile}/> */}
	</div>
)
