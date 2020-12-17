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
						options={column.input.options}
						state={props.inputStates.inPreview}
					/>
				)

			// RADIOBUTTONS
			case props.inputTypes.radiobuttons:
				return (
					<RadioButtons
						options={column.input.options}
						state={props.inputStates.inPreview}
					/>
				)

			// TEXTAREA
			case props.inputTypes.textarea:
				return <Textarea state={props.inputStates.inPreview} />
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
