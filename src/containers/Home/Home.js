import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'

import SignUp from '../../containers/SignUp'
import NewAccount from '../../components/NewAccount'
import NetworkVisualization from '../../components/NetworkVisualization'
import Layout from '../../components/Layout'

import demoRelationships from '../../constants/relationships'
import '../../containers/App/bulma.css'
import './Home.css'

class Home extends Component {

	isPrivate = false

	state = {
		scrollIsNecessary : false
	}

	componentWillMount () {
		const { location : { pathname } } = this.props

		pathname.split('/')[2] === 'SignUp' && this.setScrollToSignUp()
	}

	setScrollToSignUp = () => this.setState({ scrollIsNecessary : true })

	scrollToSignUp = () => {
		if (this.state.scrollIsNecessary) {
			const y = document.getElementById('signUpContainer').offsetTop
			$('html, body').animate({ scrollTop: y }, '50')
		}
	}

	componentDidMount() { this.scrollToSignUp() }

	componentDidUpdate() { this.scrollToSignUp() }

	extrahackybuttonsolution = (e) => e.preventDefaul()

	render () {
		return (
			<Layout displayHeader={false}>
				<div className="home">
					<section className="hero is-fullheight is-bold" id="fpHero">
						<div className="hero-body" id="heroSvg">
							<NetworkVisualization
								parent="heroSvg"
								relationships={demoRelationships}
							/>
							<div className="columns is-centered" style={{width : '100%', padding: ''}}>
								<div className="column is-one-third">
									<h1 className="title">polyMatcha</h1>
									<h4 className="subtitle">Discover those who want <br></br> to be intimate with many</h4>
									<div id="landingCenterNav" className="field is-grouped">
										<p className="control">
										 <NavLink to={"/LogIn"} onClick={this.extrahackybuttonsolution} className={"button is-info"}>
											 Log In
										 </NavLink>
										</p>
										<p className="control">
										 <a onClick={this.setScrollToSignUp} className={"button is-info"}>
											 Sign Up
										 </a>
										</p>
										<p className="control">
										 <NavLink to={"/About"} className={"button is-primary"}>
											 Learn More
										 </NavLink>
										</p>
									</div>
								</div>
								<div className="column is-4">
									<div className="tile is-ancestor">
										<div className="tile is-parent">
											<div className="tile is-child box">
												<p className="title">We See Intimacy Differently</p>
												<p>
													When love is shared beyond the conventional pair it generates
													a network of intimate bonds. Here you can explore and share those bonds
													with other polyamorists. We match people to people, people
													to groups, and even groups to groups. Join and branch into a loving community.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<div id="signUpContainer">
						<div className="columns">
							<div className="column is-one-half">
								<div className="box">
									<h1 className="title is-3" style={{ paddingTop : '2vh' }}>Sign Up</h1>
									<NewAccount />
								</div>
							</div>
							<div className="tile is-parent">
								<article className="tile is-child notification is-warning">
							      <div className="content">
							        <p className="title">{"Polyamory"}</p>
							        <p className="subtitle">{
												`Polyamory (from Greek πολύ poly, "many, several", and Latin amor, "love")
												 is the practice of or desire for intimate relationships with more than one partner,
												 with the knowledge of all partners. It has been described as "consensual,
												 ethical, and responsible non-monogamy". People who identify as polyamorous
												 reject the view that sexual and relational exclusivity are necessary for deep,
												 committed, long-term loving relationships. Those who are open to or emotionally
												 suited for polyamory may embark on a polyamorous relationship when single or already
												 in a monogamous or open relationship.`}
											 </p>
							      </div>
							    </article>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}
}

export default Home
