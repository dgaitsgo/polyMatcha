/******************************************************************************/
//Imports
/******************************************************************************/
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
/******************************************************************************/
//Authentication Strategy
/******************************************************************************/

const	isAuthenticated = () => {
		return (false)
	}


const AuthRoute = ({ component, ...props }) => {
	const { isPrivate } = component

	if (isAuthenticated()) {
		return (isPrivate ?
				<Route {...props} component={component} />
			: <Redirect to={'/profile'} />
		)
	}
	else {
		return (isPrivate ?
			<Redirect to={'/login'} />
		: <Route {...props} component={component}/>
		)
	}
}

export default AuthRoute
