import React from 'react'
import shortid from 'shortid'
import InputHandlers from '../../teacher/components/column/InputHandlers'

import '../../../scss/common/InputTypes.scss'

export default function Checkboxes(props) {
	const newAnswer = e => {
		if (props.readonly) {
			const answers = [...props.inputAnswer]
			if (answers.includes(e.target.value)) {
				const i = answers.indexOf(5)
				answers.splice(i, 1)
			} else {
				answers.push(e.target.value)
			}
			console.log(answers)
			props.changeAnswer(answers)
		}
	}

	const newExplanation = e => {
		if (props.readonly) {
			props.changeExplanation(e.target.value)
		}
	}

	return (
		<ul className="Checkboxes">
			{props.options.map((option, i) => (
				<li
					key={shortid.generate()}
					className={props.readonly ? 'ReadOnly' : 'Edit'}
				>
					<input
						type="checkbox"
						name="checkboxes"
						value={option}
						onChange={e => newAnswer(e)}
						checked={props.inputAnswer?.includes(option)}
					/>
					<span>{option}</span>
					{!props.readonly && (
						<div>
							<InputHandlers position={i} />
						</div>
					)}
				</li>
			))}

			{props.explanation && (
				<li className="Explanation">
					<textarea
						type="text"
						name="explanation"
						placeholder="Omdat..."
						value={props.studentExplanation}
						onChange={e => newExplanation(e)}
					/>
				</li>
			)}
		</ul>
	)
}
