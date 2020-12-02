import '../../../scss/logbook-designer/components/AddLearnGoal.scss'
import React, { useState } from 'react'
import Button from '../../common/Button'
import shortid from 'shortid'

export default function AddLearnGoal(props) {
	const [title, setTitle] = useState('')
	const [description, setdescription] = useState('')
	const [imageName, setImageName] = useState('')
	const [file, setFile] = useState('')

	const addLearnGoalHandler = async e => {
		e.preventDefault()

		async function postImage() {
			const formData = new FormData()
			formData.append('file', file) // appending file

			let fetchPath = await fetch('http://localhost:3000/files/upload/goals', {
				method: 'POST',
				body: formData
			})

			return await fetchPath.json()
		}

		let response = await postImage()
		let imagePath = await response.path

		//TODO: reset form after submission
		title.trim().length > 0 && description.trim().length > 0
			? props.handler({
					ID: shortid.generate(),
					title,
					description,
					imageLink: await imagePath,
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
						// check max file size is under 1mb
						if (e.target.files[0].size < 1000000) {
							setImageName(e.target.files[0].name)
							setFile(e.target.files[0])
						} else {
							console.log('Image too large')
							e.target.value = null
						}
					}}
					type="file"
					accept=".jpeg, .jpg, .png"
				/>

				<Button color="blue" value="Toevoegen" />
			</form>
		</div>
	)
}
