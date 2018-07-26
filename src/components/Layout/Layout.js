import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

class Layout extends Component {

	render () {
		const { displayHeader, loggedIn } = this.props
		return (
			<div className="layout">
				<Header
					loggedIn={loggedIn}
					display={displayHeader}
					scrollToSignUp={this.props.scrollToSignUp}
				/>
				{ this.props.children }
				<Footer/>
			</div>
		)
	}
}

export default Layout
