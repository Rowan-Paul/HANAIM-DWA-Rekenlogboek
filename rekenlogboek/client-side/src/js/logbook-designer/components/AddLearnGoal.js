import '../../../scss/logbook-designer/components/AddLearnGoal.scss'
import React, { useState } from 'react'
import Button from '../../common/Button'
import shortid from 'shortid'

export default function AddLearnGoal(props) {
	const [title, setTitle] = useState('')
	const [description, setdescription] = useState('')
	const [imageLink, setImageLink] = useState('')
	const [imageName, setImageName] = useState('')

	const toBase64 = file =>
		new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result)
			reader.onerror = error => reject(error)
		})

	const addLearnGoalHandler = e => {
		e.preventDefault()

		title.trim().length > 0 &&
		description.trim().length > 0 &&
		imageLink.size < 3000000
			? props.handler({
					ID: shortid.generate(),
					title,
					description,
					imageLink,
					imageName
			  })
			: //TODO: use something less evil than alert
			  alert('Niet alle velden zijn correct ingevuld')
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

				<label>Afbeelding:</label>
				<input
					name="image"
					onChange={async e => {
						const file = e.target.files[0]

						if (file.size < 3000000) {
							setImageName(file.name)
							setImageLink(await toBase64(file))
						} else {
							console.log('Image too large')
							e.target.value = null
						}
					}}
					type="file"
					accept=".jpeg, .jpg, .png"
				/>

				{/* TODO: clear the input fields after pressing add */}
				<Button color="blue" value="Toevoegen" />
			</form>
		</div>
	)
}
