import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from '../../components/Row'
import PhotoThumbnail from '../../components/PhotoThumbnail'
import Photos from '../../constants/Photos'

import './PhotoDisplay.css'

class PhotoDisplay extends Component {

	// static propTypes = {
	// 	editable : PropTypes.bool.isRequired,
	// 	label : PropTypes.string
	// 	photos : PropTypes.array
	// }

	state = {
		activeIndex : 0
	}

	setActive = ( activeIndex ) => this.setState({ activeIndex })

	genThumbnails = (max, activeIndex, photos, editable) => {
		var thumbnails = []
		for (var i = 0 ; i < max ; i++) {
			const src = photos[i] ? photos[i] : null
				thumbnails.push(
					<Row key={i}>
						<PhotoThumbnail
							type='thumb'
							src={src}
							disabled={i > photos.length}
							active={activeIndex === i}
							order={i}
							onClick={this.setActive}
							upload = {editable}
						/>
					</Row>
				)
			}
			return (thumbnails)
	}

	render () {
		const { label, editable, photos } = this.props
		const { activeIndex } = this.state
		const labelElem = label ? <label className="label">{label}</label> : null

		const maxPhotos = 5
		// const photos = Photos
		const max = editable ? maxPhotos : photos.length
		const input = editable ? <input id="photo-upload" type='file'/> : null
		const thumbnails = this.genThumbnails(max, activeIndex, photos, editable)

		return (
			<div className="PhotoDisplay">
				{labelElem}
				{input}
				<div className="columns">
					<div id="photoThumbailColumn" className="column">
				  	<div className="columns is-mobile">
							<div className="column is-one-quarter">
								{thumbnails}
							</div>
						</div>
					</div>
					<div id="profilePhoto" className="column">
						<PhotoThumbnail
							type="profile"
							disabled={false}
							src={photos[activeIndex] ? photos[activeIndex] : null}
						/>
		  		</div>
				</div>
			</div>
		)
	}
}

export default PhotoDisplay
