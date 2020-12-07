import React from 'react'
import Evaluation from '../../../common/InputTypes/Evaluation'
import Goal from './Goal'
import InputType from './InputType'

export default function LogbookRow(props) {
	return (
		<div className="Row Body">
			<Goal goal={props.goal} />
			<InputType position={1} readonly />
			<InputType position={2} readonly />
			<Evaluation />
		</div>
	)
}
