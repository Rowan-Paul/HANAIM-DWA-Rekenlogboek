import React from 'react'
import { connect } from 'react-redux'

import Evaluation from '../../InputTypes/Evaluation'
import Goal from '../Goal'
import InputType from './NewLogbookInputType'

function LogbookRow(props) {
	return (
		<div className="Row Body">
			<Goal goal={props.goal} state={props.inputStates.onEdit} />
			<InputType position={1} state={props.inputStates.inPreview} />
			<InputType position={2} state={props.inputStates.inPreview} />
			<Evaluation state={props.inputStates.onEdit} />
		</div>
	)
}

const mapStateToProps = state => ({
	inputStates: state.main.inputStates
})

export default connect(mapStateToProps)(LogbookRow)
