import React from 'react'
import Evaluation from '../../InputTypes/Evaluation'
import Goal from '../Goal'
import InputType from './NewLogbookInputType'

export default function LogbookRow(props) {
	return (
		<div className="Row Body">
			<Goal goal={props.goal} type={'edit'} />
			<InputType position={1} />
			<InputType position={2} />
			<Evaluation type={'preview'} />
		</div>
	)
}
