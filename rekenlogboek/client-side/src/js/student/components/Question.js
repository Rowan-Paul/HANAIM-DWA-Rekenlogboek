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
						inputAnswer={props.inputAnswer}
						changeAnswer={props.changeAnswer}
						changeExplanation={props.changeExplanation}
					/>
				)
				break
			case 'checkboxes':
				return (
					<Checkboxes
						options={props.options}
						readonly={true}
						inputAnswer={props.inputAnswer}
						changeAnswer={props.changeAnswer}
					/>
				)
				break
			case 'textarea':
				return (
					<Textarea
						changeAnswer={props.changeAnswer}
						inputAnswer={props.inputAnswer}
					/>
				)
				break
			case 'evaluation':
				return (
					<Evaluation
						changeAnswer={props.changeAnswer}
						inputAnswer={props.inputAnswer}
					/>
				)
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
