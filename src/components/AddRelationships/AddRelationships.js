import React, { Component } from 'react'
import PropTypes from 'prop-types'

//constants
import relationshipTypes from '../../constants/relationshipTypes'
import BulmaDropDownMenu from '../../components/BulmaDropDownMenu'

const AddRelationships = () =>
	<nav className="level">
		<div className="level-left">
			<div className="field is-grouped">
				<div className="control ">
					<input className="input" type="text" placeholder="Username"></input>
				</div>
				<div className="control">
					<BulmaDropDownMenu title={"relationship"} replace={true} items={relationshipTypes}/>
				</div>
				<div className="control">
					<a className="button is-light"><strong>+</strong></a>
				</div>
			</div>
		</div>
	</nav>

export default AddRelationships
