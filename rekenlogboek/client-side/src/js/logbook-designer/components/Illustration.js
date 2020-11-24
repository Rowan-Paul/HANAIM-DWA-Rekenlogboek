import React from 'react'
import '../../../scss/logbook-designer/components/Illustration.scss'
export default function Illustration(props) {
	return (
		<div className="Illustration">
			<h1>{props.title}</h1>
			<img src={props.image} alt="image" />
		</div>
	)
}
