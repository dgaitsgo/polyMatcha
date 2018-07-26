import React, { Component } from 'react'

import './Footer.css'

class Footer extends Component {
	render () {
		return (
			<div className="footerCont">
				<footer id="mainFooter" className="footer">
					<div className="container">
						<nav className="breadcrumb is-centered has-dot-separator" aria-label="breadcrumbs">
							<ul>
								<li><a href="#">Learn More About Polyamory</a></li>
								<li><a href="#">Terms & Conditions</a></li>
								<li><a href="#">Safety Tips</a></li>
								<li><a href="#">Privacy</a></li>
							</ul>
						</nav>
						<div className="content has-text-centered">
							<p>
								<strong>polyMatcha</strong> by <a href="https://github.com/dgaitsgo">David Gaitsgory</a>
							</p>
							<p>
								<a className="icon" href="https://github.com/dgaitsgo">
									<i className="fa fa-github"></i>
								</a>
							</p>
						</div>
					</div>
				</footer>
			</div>
		)
	}
}

export default Footer
