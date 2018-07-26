import React from 'react'
import Layout from '../../components/Layout'
import { Link } from 'react-router-dom'

const e500 = () =>
	<Layout>
		<div className="columns is-mobile is-centered">
			<div className="column is-half">
				<h1 className="title">Error 500</h1>
				<h1 className="subtitle">
					That resource was not found. Click <Link to='./Home'>here</Link> to return to the home page.
				</h1>
			</div>
		</div>
	</Layout>

export default e500
