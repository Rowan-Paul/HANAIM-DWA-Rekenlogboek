import '../../../scss/common/InputTypes.scss'
import React from 'react'

export default function Textarea(props) {
	return (
		<textarea
			className="Textarea"
			placeholder="Omschrijf hier een antwoord."
			className={props.type}
		></textarea>
	)
}
