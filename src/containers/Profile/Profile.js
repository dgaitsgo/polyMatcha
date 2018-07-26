import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import axios from 'axios'

import Loading from '../../components/Loading'
import Layout from '../../components/Layout'
import PhotoDisplay from '../../components/PhotoDisplay'
import Gender from '../../components/Gender'
import OnlineStatus from '../../components/OnlineStatus'
import TagCloud from '../../components/TagCloud'

import user from '../../constants/user'

import './Profile.css'

class Profile extends Component {

	isPrivate = true

	g = new Gender

	propTypes = {
		userId : PropTypes.number.isRequired
	}

	genderIconNum = (g) => {
		if (g === 1)
			return ('venus')
		else if (g === 2)
			return ('mars')
		else if (g === 3)
			return ('transgender-alt')
	}

	constructor(props) {
		super(props)
		const { userId, user } = this.props
		this.state = {
			userId,
			loading : true,
			user : null
		}
	}

	componentDidMount () {

		const { userId } = this.props

		axios.get(`/api/user/${userId}`)
			.then( (res) => {
				const user = res.data
				this.setState({ loading : false, user })
			},
			(error) => {
				<Redirect push to='/500'/>
			}
		)
	}

	render () {

		const { user, loading } = this.state

		if (loading) {
			return (
				<Loading/>
			)
		}

		const lto = user.online ?
			<p><strong>last time online : </strong>{user.lastTimeOnline}</p>
			: null;


		return (
			<Layout loggedIn={true}>
				<div className="container">
					<div id="profileName" className="column">
						<nav className="level">
						<h1 className="title">
							{user.firstName} {user.lastName}
						</h1>
							<p className="blurb">{user.blurb}</p>
						</nav>
						<hr></hr>
					</div>
					<div className="columns">
						<div className="column is-half">
							<PhotoDisplay
								editable={false}
								photos={user.photoURLS.split(',')}
							/>
						</div>
						<div className="column">
							<div className="card">
								<div className="card-content">
									<div className="content">
										<nav className="level">
											<div className="level-item">
												<OnlineStatus online={user.online}/>
											</div>
											<div className="level-item">
												<small>{user.distance + " miles away"}</small>
											</div>
											<div className="level-item">
												<i className="fa fa-heart-o" aria-hidden="true"></i>
											</div>
											<div className="level-item">
												<i className="fa fa-envelope-o" aria-hidden="true"></i>
											</div>
											<div className="level-item">
												<i className="fa fa-times" aria-hidden="true"></i>
											</div>
										</nav>
									</div>
									<footer className="card-footer">
										<div className="columns is-multiline">
											<div className="column">
												<table>
													<tbody className="profTable">
														<tr className="row">
															<strong><td>username</td></strong>
															<td className="value">{user.username}</td>
														</tr>
														<tr className="row">
															<strong><td>age</td></strong>
															<td className="value">{user.age} </td>
														</tr>
														<tr className="row">
															<strong><td>gender</td></strong>
															<td className="value">
																<i className={"fa fa-" + this.genderIconNum(user.gender)} aria-hidden="false"></i>
															</td>
														</tr>
														<tr className="row">
															<td><strong>genders seeking</strong></td>
															<td className="value">
																{
																	user.gendersSeeking
																		.split(',')
																		.map( (gen, i) => {
																			var icon = 'transgender-alt'
																			if (gen === 'male')
																				icon = 'mars'
																			else if (gen === 'female')
																				icon = 'venus'
																			return (<i key={i} className={"fa fa-" + icon} aria-hidden="false"></i>)
																		})
																}
															</td>
														</tr>
														<tr className="row">
															<strong><td>last online : </td></strong>
															<td className="value">
																{(user.online ? 'Now' : user.lastTimeOnline)}</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className="profLists">
											<div className="columns">
												<div className="column">
												<p><strong>Relationships Seeking : </strong></p>
												<TagCloud
													items={user.relationshipsSeeking.split(',')}
													activeItems={[]}
													onClick={() => {}}
													addX={false}
												/>
												<p><strong>Hobbies : </strong></p>
												<TagCloud
													items={user.hobbies.split(',')}
													activeItems={[]}
													onClick={() => {}}
													addX={false}
												/>
												</div>
											</div>
										</div>
										</div>
									</footer>
								</div>
							</div>
						</div>
					</div>
					<div className="box">
						{user.bio}
					</div>
				</div>
			</Layout>
		)
	}
}

export default Profile
