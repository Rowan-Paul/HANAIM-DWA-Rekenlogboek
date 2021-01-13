import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Checkboxes from '../../InputTypes/Checkboxes'
import InputEditHeader from '../EditInput'
import NewColumnButton from '../../../logbook-designer/components/column/NewColumnButton'
import RadioButtons from '../../InputTypes/Radiobuttons'
import Textarea from '../../InputTypes/Textarea'

import '../../../../scss/common/logbook/InputType.scss'
function InputType(props) {
	const [column, setColumn] = useState({})

	useEffect(() => {
		const column = props.columns.filter(c => c.position === props.position)[0]
		setColumn(column)
	}, [props.columns])

	const getInputType = () => {
		switch (column.input.type) {
			// CHECKBOXES
			case props.inputTypes.checkboxes:
				return (
					<Checkboxes
						explanation={column.explanation}
						options={column.input.options}
						state={props.state}
					/>
				)

			// RADIOBUTTONS
			case props.inputTypes.radiobuttons:
				return (
					<RadioButtons
						explanation={column.explanation}
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

	if (column.added) {
		const inputType = getInputType()

		return (
			<div className="InputType Cell">
				<ul>
					{props.state === props.inputStates.onEdit && (
						<InputEditHeader position={props.position} />
					)}
					<li>{inputType}</li>
				</ul>
			</div>
		)
	}

	return (
		<div className="Cell">
			{props.state === props.inputStates.onEdit && (
				<NewColumnButton position={props.position} />
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	columns: state.logbook.columns,
	inputStates: state.main.inputStates,
	inputTypes: state.main.inputTypes
})

const mapDispatchToProps = dispatch => ({
	modalShow: payload => dispatch(modalShow(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(InputType)
