import React, { useState } from 'react'
import Button from '../../common/Button'
import '../../../scss/logbook-designer/components/AddLearnGoal.scss'

export default function AddLearnGoal(props) {
	const [ID, setID] = useState(1)
	const [title, setTitle] = useState('')
	const [description, setdescription] = useState('')
	const [image, setimage] = useState('')

	const addLearnGoalHandler = e => {
		e.preventDefault()

		props.handler({
			ID,
			title,
			description,
			image
		})
		setID(ID + 1)
	}

	return (
		<div className="AddLearnGoal">
			<h1>Leerdoel toevoegen</h1>
			<form onSubmit={e => addLearnGoalHandler(e)}>
				<label>Titel</label>
				<input
					name="title"
					onChange={e => setTitle(e.target.value)}
					placeholder="Vul hier een leerdoel in..."
					type="text"
					value={title}
				/>
				<label>Beschrijving</label>
				<textarea
					name="description"
					onChange={e => setdescription(e.target.value)}
					value={description}
				></textarea>

				<label>Afbeelding:</label>
				<input
					name="image"
					onChange={e => setimage(e.target.value)}
					type="file"
				/>

				<Button color="blue" value="Toevoegen" />
			</form>
		</div>
	)
}
