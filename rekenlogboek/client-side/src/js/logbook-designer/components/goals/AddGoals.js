import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	setGoalDescription,
	setGoalImage,
	setGoalTitle
} from '../../../redux/logbook/actions'

import '../../../../scss/logbook-designer/components/AddGoals.scss'
function AddGoals(props) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		const goal = props.goals.filter(goal => goal.position === props.position)[0]
		setTitle(goal.title)
		setDescription(goal.description)
	}, [props.goals])

	const imageHandler = async e => {
		try {
			await imageValidation(e.target.files[0])
			props.setGoalImage({
				imageBlobURL: window.URL.createObjectURL(e.target.files[0]),
				imageName: e.target.files[0].name
			})
			setError('')
		} catch (error) {
			setError(error.message)
		}
	}

	const imageValidation = img => {
		return new Promise((resolve, reject) => {
			// Check isset
			if (!img) {
				reject(new Error(`Geen afbeelding gevonden`))
			}
			// Check fileSize
			if (img.size > 1000000) {
				reject(new Error(`Afbeelding is te groot.`))
			}
			// Check extension
			if (!img.name.match(/\.(jpg|jpeg|png)$/)) {
				reject(new Error(`Extensie is niet toegestaan.`))
			}
			// Create image
			const image = new Image()

			// Set source
			image.src = URL.createObjectURL(img)

			// Check size
			image.onload = () => {
				if (image.height < 0) reject(new Error('Afbeelding niet hoog genoeg'))
				if (image.width < 0) reject(new Error('Afbeelding niet breed genoeg'))
				resolve(image)
			}
			// Check errors
			image.onerror = () =>
				reject(new Error('Afbeelding kan niet geladen worden'))
		})
	}

	return (
		<div className="AddGoals">
			<div className="Block">
				<h4>Titel kolom:</h4>

				<input
					name="title"
					onChange={e => props.setGoalTitle(e.target.value)}
					placeholder="Vul hier een leerdoel in..."
					type="text"
					value={title}
				/>
			</div>

			<div className="Block">
				<h4>Beschrijving</h4>
				<textarea
					name="description"
					placeholder="Vul hier een beschrijving in..."
					onChange={e => props.setGoalDescription(e.target.value)}
					value={description}
				></textarea>
			</div>

			<div className="Block">
				<h4>Afbeelding:</h4>
				<label className="error">{error}</label>
				<input
					name="image"
					onChange={e => imageHandler(e)}
					type="file"
					accept=".jpeg, .jpg, .png"
				/>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		goals: state.logbook.goals,
		position: state.logbook.position
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setGoalDescription: payload => dispatch(setGoalDescription(payload)),
		setGoalImage: payload => dispatch(setGoalImage(payload)),
		setGoalTitle: payload => dispatch(setGoalTitle(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGoals)
