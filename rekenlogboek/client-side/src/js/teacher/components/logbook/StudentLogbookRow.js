import React from 'react'
import Evaluation from '../../../common/InputTypes/Evaluation'
import Goal from './Goal'
import InputType from './InputType'

export default function StudentLogbookRow(props) {
	return (
		<div className="Row Body">
			<Goal goal={props.goal} type={'edit'} />
			<InputType position={1} type={'edit'} />
			<InputType position={2} type={'edit'} />
			<Evaluation type={'edit'} />
		</div>
	)
}
