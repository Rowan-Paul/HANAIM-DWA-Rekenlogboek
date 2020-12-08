import '../../../../scss/teacher/components/AddGoals.scss'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'
import {
	postImage,
	setGoal,
	setGoalDescription,
	setGoalImage,
	setGoalTitle
} from '../../../../redux/logbook/actions'

function AddGoals(props) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	useEffect(() => {
		const goal = props.goals.filter(goal => goal.position === props.position)[0]

		setTitle(goal.title)
		setDescription(goal.description)
	}, [props.goals])

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
				<input
					name="image"
					onChange={e => {
						// check max file size is under 1mb
						if (e.target.files[0].size < 1000000) {
							props.setGoalImage({
								imageBlob: window.URL.createObjectURL(e.target.files[0]),
								imageName: e.target.files[0].name
							})
						} else {
							console.log('Image too large')
							e.target.value = null
						}
					}}
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
