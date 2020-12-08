import '../../../scss/common/InputTypes.scss'
import React from 'react'

export default function Textarea(props) {
	return (
		<textarea
			className={`Textarea ${props.type} `}
			placeholder="Omschrijf hier een antwoord."
		></textarea>
	)
}
