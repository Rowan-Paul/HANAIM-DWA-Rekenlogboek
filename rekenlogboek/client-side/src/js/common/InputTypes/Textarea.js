import '../../../scss/common/InputTypes.scss'
import React from 'react'

export default function Textarea(props) {
	const newAnswer = e => {
		if (props.readonly) {
		} else {
			props.changeAnswer(e.target.value)
		}
	}

	return (
		<textarea
			className="Textarea"
			placeholder="Omschrijving toevoegen"
			onBlur={e => newAnswer(e)}
			value={props.inputValue}
		></textarea>
	)
}
