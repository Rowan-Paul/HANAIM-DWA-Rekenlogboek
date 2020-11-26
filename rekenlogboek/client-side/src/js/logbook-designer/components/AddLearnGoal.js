import '../../../scss/logbook-designer/components/AddLearnGoal.scss'
import React, { useState } from 'react'
import Button from '../../common/Button'
import shortid from 'shortid'

export default function AddLearnGoal(props) {
	const [title, setTitle] = useState('')
	const [description, setdescription] = useState('')
	// const [imageLink, setImageLink] = useState('')

	const addLearnGoalHandler = e => {
		e.preventDefault()

		title.trim().length > 0 && description.trim().length > 0
			? props.handler({
					ID: shortid.generate(),
					title,
					description,
					// imageLink
					imageLink: 'goal1.png'
			  })
			: alert('Vul a.u.b. alle velden in.')
	}

	return (
		<div className="AddLearnGoal">
			<form onSubmit={e => addLearnGoalHandler(e)}>
				<h1>Leerdoel toevoegen</h1>
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

				{/*<label>Afbeelding:</label>
				/* <input
					name="image"
					onChange={e => setImageLink(e.target.value)}
					type="file"
				/> */}

				{/* TODO: clear the input fields after pressing add */}
				<Button color="blue" value="Toevoegen" />
			</form>
		</div>
	)
}
