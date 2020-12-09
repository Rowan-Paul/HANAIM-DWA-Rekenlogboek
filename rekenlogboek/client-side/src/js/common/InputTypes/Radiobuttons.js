import React from 'react'
import shortid from 'shortid'

import InputHandlers from '../../teacher/components/column/InputHandlers'
import '../../../scss/common/InputTypes.scss'

export default function RadioButtons(props) {
	const newAnswer = e => {
		if (props.readonly) {
			props.changeAnswer(e.target.value)
		}
	}

	const newExplanation = e => {
		if (props.readonly) {
			props.changeExplanation(e.target.value)
		}
	}
	return (
		<ul className="Radiobuttons">
			{props.options.map((option, i) => (
				<li
					key={shortid.generate()}
					className={props.readonly ? 'ReadOnly' : 'Edit'}
				>
					<input
						type="radio"
						name={
							props.position ? `${props.row + props.position}` : 'radiobutton'
						}
						value={option}
						checked={props.inputAnswer === option}
						onChange={e => newAnswer(e)}
					/>
					<span>{option}</span>

					{!props.readonly && (
						<div>
							<InputHandlers position={i} />
						</div>
					)}
				</li>
			))}
			<li className={props.readonly ? 'ReadOnly' : 'Edit'}>
				<input
					onChange={e => newAnswer(e)}
					checked={props.inputAnswer === ''}
					type="radio"
					name="radiobutton"
					value="default"
				/>
				<span>Ik weet het nog niet</span>

				{!props.readonly && (
					<div>
						<span>
							<i className="fa fa-lock"></i> (default)
						</span>
					</div>
				)}
			</li>

			{props.explanation && (
				<li className="Explanation">
					<textarea
						type="text"
						name="explanation"
						value={props.studentExplanation}
						placeholder="Omdat..."
						onChange={e => newExplanation(e)}
					/>
				</li>
			)}
		</ul>
	)
}
