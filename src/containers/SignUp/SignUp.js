import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { trim, reverse } from 'lodash'
import { Modal } from 're-bulma';
import moment from 'moment'

//constants:
import relationshipTypes from '../../constants/relationshipTypes'
import TermsAndConditions from '../../constants/TermsAndConditions'

//components
import TagCloud from '../../components/TagCloud'
import PhotoDisplay from '../../components/PhotoDisplay'
import Geolocation from '../../components/Geolocation'
import AddRelationships from '../../components/AddRelationships'
import Field from '../../components/Field'
import TextBox from '../../components/TextBox'
import Gender from '../../components/Gender'
import Layout from '../../components/Layout'

//helpers
import Validator from '../../helpers/Validator'

//css
import '../../containers/App/bulma.css'
import '../../containers/SignUp/SignUp.css'

class BlurbAndBio extends Component {

	getBlurb = () => this.props.blurb

	getBio = () => this.props.bio

	render () {
		const { blurb, bio } = this.props
		return (
			<div className="BlurbAndBio">
				<TextBox
					className = {"textarea" +  (blurb.length > 80 ? " is-danger" : "")}
					getValue={this.getBlurb}
					rows={2}
					maxChars={80}
					label={"Tell us about yourself succinctly"}
					onChange={this.props.validateBlurb}
				/>
				<br></br>
				<TextBox
					className = {"textarea" +  (bio.length > 500 ? " is-danger" : "")}
					getValue={this.getBio}
					rows={8}
					maxChars={500}
					label={"Go into more detail"}
					onChange={this.props.validateBio}
				/>
			</div>
		)
	}
}

class Hobbies extends Component {

	state = { value : '' }

	onClick = (value) => this.props.onUpdate(this.props.hobbies.filter( (h, i) => h != value))

	enterHobby = ({ key }) => {
		if (key === 'Enter' || key === ' ') {
			const { value } = this.state
			const { hobbies } = this.props
			const v = value.replace(/ /g,'')
			if (hobbies.indexOf(v) === -1 && v.length > 0) {
				this.props.onUpdate(this.props.hobbies.concat(v))
				this.setState({ value : '' })
			}
		}
	}

	updateValue = ({ target : { value } }) => this.setState({ value })

	render () {
		const { value } = this.state
		const { hobbies } = this.props

		return (
			<div className="hobbies">
				<div className="field">
					<label className="label">What do you like to do?</label>
						<input className="input" value={value} type="text" onChange={this.updateValue} onKeyPress={this.enterHobby}>
					</input>
				</div>
				<TagCloud items={hobbies} addX={true} onClick={this.onClick} activeItems={[]}/>
			</div>
		)
	}
}

class SignUp extends Component {

	isPrivate = true

	v = new Validator

	state = {
		firstName : '',
		lastName : '',
		genderAssigned : '',
		genderSeeking : [],
		blurb : '',
		bio : '',
		relationshipsSeeking : [],
		hobbies : [],
		images : [],

		firstNameValid : false,
		lastNameValid : false,
		readyToSubmit : false,
		genderAssignedValid : false,
	}

	getHelp = () => {

		var help = {}

		const { firstNameValid, firstName, lastNameValid, lastName, hobbies } = this.state

		help.firstName = (!firstNameValid && firstName.length > 0) ?
			<p className="help is-danger">Please put a valid name</p>
			: null

		help.lastName = (!lastNameValid && lastName.length > 0) ?
			<p className="help is-danger">Please put a valid name</p>
			: null

		help.hobbies = (!hobbies.length > 300) ?
			<p className="help is-danger">Too many hobbies! Where do you find the time?</p>
			: null

		return (help)
	}

	validateForm = () => {
		const s = this.state

		console.log(s.firstNameValid, s.lastNameValid,
		s.relationshipsSeeking.length > 0,
		s.genderAssignedValid, s.genderSeeking.length > 0,
		s.hobbies.length > 0,
		s.bio.length > 0, s.bio.length < 500,
		s.blurb.length > 0, s.blurb.length < 80)

		this.setState({
			readyToSubmit :
			s.firstNameValid && s.lastNameValid &&
			s.relationshipsSeeking.length > 0 &&
			s.genderAssignedValid && s.genderSeeking.length > 0 &&
			s.hobbies.length > 0 &&
			s.bio.length > 0 && s.bio.length < 500 &&
			s.blurb.length > 0 && s.blurb.length < 80
		})
	}

	validateFirstName = (firstName) => this.setState({ firstName, firstNameValid : this.v.name(firstName) }, this.validateForm)

	validateLastName = (lastName) => this.setState({ lastName, lastNameValid : this.v.name(lastName) }, this.validateForm)

	validateHobbies = (hobbies) => this.setState({ hobbies }, this.validateForm)

	validateBlurb = (blurb) => this.setState({ blurb }, this.validateForm)

	validateBio = (bio) => this.setState({ bio }, this.validateForm)

	validateGenderAssigned = (genderAssigned) => this.setState({ genderAssigned, genderAssignedValid : true }, this.validateForm)

	validateGenderSeeking = (value) => {
		const { genderSeeking } = this.state
		const newValue = genderSeeking.indexOf(value) === -1 ?
			genderSeeking.concat(value)
			: genderSeeking.filter( (g) => g != value)
		this.setState({ genderSeeking : newValue }, this.validateForm)
	}

	validateRelationshipsSeeking = (relationshipType) => {
		const { relationshipsSeeking } = this.state
		const newValue = relationshipsSeeking.indexOf(relationshipType) === -1 ?
				relationshipsSeeking.concat(relationshipType)
			: relationshipsSeeking.filter( (r) => r != relationshipType)
		this.setState({relationshipsSeeking : newValue }, this.validateForm)
	}

	render () {
		const { readyToSubmit, relationshipsSeeking, hobbies, blurb, bio } = this.state
		const help = this.getHelp()

		return (
			<Layout>
				<div className="sign-up-form" style={{ marginTop : '4vh' }}>
					<div className="columns is-centered is-narrow">
						<div className="column is-half">
							<h1 className="title is-3">Sign Up</h1>
							<hr></hr>
							<div className="box">
								<Field
										label="First Name"
										type="text"
										onBlur={this.validateFirstName}
										iconLeft={null}
										help={help.firstName}
								/>
								<Field
										label="Last Name"
										type="text"
										onBlur={this.validateLastName}
										iconLeft={null}
										help={help.lastName}
								/>
								<Gender
									validateGenderAssigned={this.validateGenderAssigned}
									validateGenderSeeking={this.validateGenderSeeking}
									genderAssigned={this.state.genderAssigned}
									genderSeeking={this.state.genderSeeking}
								/>
								<br></br>
								<label className="label">Relationships</label>
								{/* Later there will be request to server for this*/}
								<TagCloud activeItems={relationshipsSeeking} onClick={this.validateRelationshipsSeeking} items={relationshipTypes}/>
								<hr></hr>
								<Hobbies
									onUpdate={this.validateHobbies}
									hobbies={hobbies}
								/>
								<br></br>
								{help.hobbies}
								<BlurbAndBio
									validateBlurb={this.validateBlurb}
									validateBio={this.validateBio}
									blurb={blurb}
									bio={bio}
								/>

								<hr></hr>
								<PhotoDisplay
									label={"Show us what you look like!"}
									photos={[]}
									editable={true}
								/>
								<hr></hr>
								<label className="label">Where are you?</label>
								<Geolocation/>
								<br></br>
								<label className="label">Already connected with people on polyMatcha?</label>
								<p className="is-small">Add them here:</p>
								<br></br>
								<AddRelationships/>
								<hr></hr>
								<nav className="level" id="signupDirectionNav">
									<div className="level-item">
										<button onClick={this.signupUser} className="button is-success" disabled={!readyToSubmit}>See My Matches</button>
									</div>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}
}

export default SignUp
