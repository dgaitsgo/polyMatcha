import React, { Component } from 'react'
import $ from 'jquery'

import './PhotoThumbnail.css'

class PhotoThumbnail extends Component {

	onClick = ( { target } ) => {
		if (this.props.editable) {
			$('#photo-upload').trigger('click')
		} else {
				const { id } = target
				const order = Number(id.split('_')[0])
				this.props.onClick(order)
		}
	}

	render () {

		const {
			src, active, size, order, onClick, upload, type, disabled
		} = this.props

		const icon =
			type === 'profile' ? 'fa fa-picture-o fa-2x'
												 : 'fa fa-upload fa-1'

		const image =
			src ? <img className="thumbnailImage" id={order + "_thumbImg"} src={src}/>
					: <span className="icon is-medium">
							<i className={icon} aria-hidden="true"></i>
						</span>

		return (
				<a disabled={disabled}
					id={order + "_thumbBox"}
					className={type + " button is-outline is-large"}
					onClick={type === "thumb" ? this.onClick : () => {} }
					onHover={this.onHover}
				>
					{image}
				</a>
		)
	}
}

export default PhotoThumbnail
