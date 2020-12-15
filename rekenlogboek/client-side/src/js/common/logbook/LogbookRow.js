import React from 'react'
import Evaluation from '../InputTypes/Evaluation'
import Goal from './Goal'
import InputType from './InputType'

export default function LogbookRow(props) {
	return (
		<div className="Row Body">
			<Goal goal={props.goal} type={'edit'} />
			<InputType position={1} type={'preview'} />
			<InputType position={2} type={'preview'} />
			<Evaluation type={'preview'} />
		</div>
	)
}
