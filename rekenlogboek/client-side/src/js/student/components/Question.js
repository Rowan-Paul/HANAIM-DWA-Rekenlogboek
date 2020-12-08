import React from 'react'

import Radiobuttons from '../../common/InputTypes/Radiobuttons'
import Checkboxes from '../../common/InputTypes/Checkboxes'
import Textarea from '../../common/InputTypes/Textarea'
import Evaluation from '../../common/InputTypes/Evaluation'

export default function Question(props) {
	const getInputTypes = () => {
		switch (props.type) {
			case 'radiobuttons':
				return (
					<Radiobuttons
						explanation={props.explanation}
						options={props.options}
						readonly={true}
						inputHandler={props?.inputHandler}
					/>
				)
				break
			case 'checkboxes':
				return (
					<Checkboxes
						options={props.options}
						readonly={true}
						inputHandler={props?.inputHandler}
					/>
				)
				break
			case 'textarea':
				return <Textarea inputHandler={props?.inputHandler} />
				break
			case 'evaluation':
				return <Evaluation inputHandler={props?.inputHandler} />
				break
		}
	}

	return (
		<div className="question">
			<h2>{props.title}</h2>
			{getInputTypes()}
		</div>
	)
}
