import React from 'react'
import '../../../scss/teacher/components/Illustration.scss'
export default function Illustration(props) {
	return (
		<div className="Illustration">
			<div className="title">
				<h1>{props.title}</h1>
			</div>

			<div className="image">
				<img src={props.image} alt="image" />
			</div>
		</div>
	)
}
