import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Checkboxes from '../../../common/InputTypes/Checkboxes'
import RadioButtons from '../../../common/InputTypes/Radiobuttons'
import Textarea from '../../../common/InputTypes/Textarea'

function InputType(props) {
	const [column, setColumn] = useState({
		input: {
			type: 'textarea'
		}
	})

	useEffect(() => {
		const column = props.columns[props.position]
		setColumn(column)
	}, [props.columns])

	let inputType
	switch (column.input.type) {
		case 'checkboxes':
			inputType = (
				<Checkboxes
					explanation={column.explanation}
					studentExplanation={props.studentExplanation}
					options={column.input.options}
					type={props.type}
					inputAnswer={props.inputAnswer}
					readonly
				/>
			)
			break
		case 'radiobuttons':
			inputType = (
				<RadioButtons
					explanation={column.explanation}
					studentExplanation={props.studentExplanation}
					options={column.input.options}
					type={props.type}
					inputAnswer={props.inputAnswer}
					row={props.row}
					position={props.position}
					readonly
				/>
			)
			break
		case 'textarea':
			inputType = <Textarea type={props.type} />
			break
		default:
			inputType = ''
	}

	return (
		<div className="InputType Cell">
			<ul>
				<li>{inputType}</li>
			</ul>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		columns: state.logbookoverview.currentLogbook.columns
	}
}

const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps, mapDispatchToProps)(InputType)
