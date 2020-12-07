import React from 'react'

export default function EndText(props) {
	return (
		<div className="end-text">
			<h1>{props.title}</h1>
			<p>{props.description}</p>

			<img
				src={'http://localhost:3000' + props.image}
				alt="leerdoel afbeelding"
			/>
		</div>
	)
}
