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
						explanation={props.motivation}
						options={props.options}
					/>
				)
				break
			case 'checkboxes':
				return <Checkboxes options={props.options} />
				break
			case 'textarea':
				return <Textarea />
				break
			case 'evaluation':
				return <Evaluation options={props.options} />
				break
		}
	}

	return (
		<div className="question">
			<div>{props.title}</div>
			{getInputTypes()}
		</div>
	)
}
