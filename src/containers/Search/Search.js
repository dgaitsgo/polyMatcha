import React, { Component } from 'react'

import FilterPanel from '../../components/FilterPanel'
import ResultsThumbnail from '../../components/ResultsThumbnail'
import users from '../../constants/users'

// console.log(users)

//There should be results already here (based on implicit matches),
//and the user goes from there :
//Results methods [shuffle, grid view, ]
//Menu to conveniently 'block', 'like'

class Search extends Component {

	isPrivate = false

	state = {}

	render () {
		return (
			<div className="Search">
				<div className="FilterPanel">
					{/*This where the ID of who's signed in will be passed down*/}
					<FilterPanel />
				</div>
				<div className="columns is-centered is-mobile">
					<div className="column is-half">
						{
							users.map( (u, i, arr) => {
							var a = i * 2
							if (a > arr.length) return ;
							var n = a + 1;
							if (arr[n]) {
								return (
									<div className="columns" key={i}>
										<ResultsThumbnail user={arr[a]} />
										<ResultsThumbnail user={arr[n]}/>
									</div>
								)
							} else {
								return (
									<div className="columns" key={i}>
										<ResultsThumbnail user={arr[a]} />
									</div>
								)
							}
						})}
					</div>
				</div>
				<div className="card">
					<div className="card-content">
						<p className="title" style={{color : '#ff3860'}}>
							{"No more results. Try expanding your criteria?"}
						</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Search
