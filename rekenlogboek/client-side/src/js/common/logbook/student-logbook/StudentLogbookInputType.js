import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Checkboxes from '../../../common/InputTypes/Checkboxes'
import RadioButtons from '../../../common/InputTypes/Radiobuttons'
import Textarea from '../../../common/InputTypes/Textarea'

function InputType(props) {
	const [column, setColumn] = useState()

	useEffect(() => {
		const column = props.columns[props.position]
		setColumn(column)
	}, [props.columns])

	const handler = () => {
		switch (column.input.type) {
			// CHECKBOXES
			case props.inputTypes.checkboxes:
				return (
					<Checkboxes
						answer={props.answer}
						options={column.input.options}
						state={props.state}
					/>
				)

			// RADIOBUTTONS
			case props.inputTypes.radiobuttons:
				return (
					<RadioButtons
						answer={props.answer}
						options={column.input.options}
						state={props.state}
					/>
				)

			// TEXTAREA
			case props.inputTypes.textarea:
				return <Textarea state={props.state} />
			default:
				return ''
		}
	}

	return (
		<div className="InputType Cell">
			<ul>
				<li>{column && handler()}</li>
			</ul>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		columns: state.logbookoverview.currentLogbook.columns,
		inputTypes: state.main.inputTypes,
		inputStates: state.main.inputStates
	}
}

export default connect(mapStateToProps, null)(InputType)
