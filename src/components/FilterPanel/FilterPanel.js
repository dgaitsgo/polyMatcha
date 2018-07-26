import React, { Component } from 'react'
import Slider from '../Slider'
import '../../../node_modules/font-awesome/css/font-awesome.min.css';


// import '../../containers/App/App.css'
import './FilterPanel.css'



/*
	filter criteria:
	//Implicit - gender, relationshipTypesInterestedIn
	//Dynamic - location, age, nInterests, specific interests, popularity
	//There should be an option to look around a certain point
	//Search the user outright

 */

class FilterPanel extends Component {
	state = {}

	render() {
		return(
			<div className="columns is-mobile is-centered">
			<div className="column is-half is-narrow">
				<nav className="panel">
					<p className="panel-heading">
						Find Partners :
					</p>
					<div className="panel-block">
						<Slider min={0} max={200} label={"Distance"}/>
					</div>
					<div className="panel-block">
						<Slider min={18} max={100} label={"Age"}/>
					</div>
					<div className="panel-block">
						<Slider min={0} max={30} label={"Interests in Common"}
						/>
					</div>
					<div className="panel-block">
						<Slider min={0} max={100} label={"Network Size"}
						/>
					</div>
					<div className="panel-block">
						<nav className="level">
							<div className="level-left">
								<h4>Specify interests</h4>
							</div>
							<div className="level-item">
								<div className="control">
									<input className="input" style={{width : 30 + 'vw'}} type="text" placeholder="#BaseJumping">
									</input>
								</div>
							</div>
						</nav>
					</div>
					<div className="panel-block">
						<nav className="level">
							<div className="level-left">
								<h4>From User</h4>
							</div>
							<div className="level-item">
								<div className="control">
									<input className="input" type="text" placeholder="">
									</input>
								</div>
							</div>
							<div className="level-right">
								<a className="button is-info">Search</a>
							</div>
						</nav>
					</div>
				</nav>
				<nav className="panel">
					<div className="panel-block">
						<nav className="level">
							<div className="level-item">
								<label className="checkbox">
									<input type="checkbox"></input>
									<checkbox>{"Has Photo"}</checkbox>
								</label>
							</div>
							<div className="level-item">
								<label className="checkbox">
									<input type="checkbox"></input>
									<checkbox>{"Currently online"}</checkbox>
								</label>
							</div>
							<div className="level-item">
								<div className="dropdown is-hoverable">
								  <div className="dropdown-trigger">
								    <button className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu4">
								      <span>Sort By</span>
												<span className="icon is-small">
													<i className="fa fa-angle-down" aria-hidden="true"></i>
												</span>
								    </button>
								  </div>
								  <div className="dropdown-menu">
								    <div className="dropdown-content">
								      <a href="#" className="dropdown-item">
								        <p>Distance</p>
								      </a>
											<a href="#" className="dropdown-item">
								        <p>Shuffle</p>
								      </a>
											<a href="#" className="dropdown-item">
								        <p>Network Size</p>
								      </a>
											<a href="#" className="dropdown-item">
								        <p>Common interests</p>
								      </a>
								    </div>
								  </div>
								</div>
							</div>
							<div className="level-item">
								<div className="field has-addons">
								  <p className="control">
								    <a className="button">
								      <span className="icon is-small">
								        <i className="fa fa-map-o"></i>
								      </span>
								    </a>
								  </p>
								  <p className="control">
								    <a className="button">
								      <span className="icon is-small">
								        <i className="fa fa-th"></i>
								      </span>
								    </a>
								  </p>
								</div>
							</div>
						</nav>
					</div>
				</nav>
			</div>
		</div>
		)
	}
}

export default FilterPanel
