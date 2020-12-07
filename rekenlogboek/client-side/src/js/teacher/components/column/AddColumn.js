import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
	setInputType,
	setColumnTitle,
	addInputValue
} from '../../../../redux/logbook/actions'

import AddInputValue from './AddInputValue'
import Checkboxes from '../../../common/InputTypes/Checkboxes'
import Radiobuttons from '../../../common/InputTypes/Radiobuttons'
import Textarea from '../../../common/InputTypes/Textarea'

import '../../../../scss/teacher/components/column/AddColumn.scss'
function AddColumn(props) {
	const [title, setTitle] = useState('')
	const [inputValues, setInputValues] = useState('')
	const [inputType, setInputType] = useState('')
	const [selected, setSelected] = useState(props.inputTypes.radiobuttons)

	useEffect(() => {
		const column = props.columns.filter(
			column => column.position === props.position
		)[0]
		setTitle(column.title)
		setInputType(column.inputType)
		setInputValues(column.values)
		setSelected(column.inputType)
	}, [props.columns])

	const getInputType = () => {
		switch (inputType) {
			case props.inputTypes.checkboxes:
				return <Checkboxes values={inputValues.checkboxes} />
			case props.inputTypes.radiobuttons:
				return <Radiobuttons values={inputValues.radiobuttons} />
			case props.inputTypes.textarea:
				return <Textarea value={inputValues.textarea} />
			default:
				return null
		}
	}

	const AddValues = () => (inputType === 'textarea' ? null : <AddInputValue />)

	return (
		<div className="AddColumns">
			<div className="Block">
				<h4>Titel kolom:</h4>

				<input
					type="text"
					placeholder="Titel kolom"
					onChange={e => props.setColumnTitle(e.target.value)}
					value={title}
				/>
			</div>

			<div className="Block ">
				<h4>Selecteer input type:</h4>

				<select
					onChange={e => props.setInputType(e.target.value)}
					value={selected}
				>
					<option value={props.inputTypes.radiobuttons}>
						{props.inputTypes.radiobuttons}
					</option>
					<option value={props.inputTypes.checkboxes}>
						{props.inputTypes.checkboxes}
					</option>
					<option value={props.inputTypes.textarea}>
						{props.inputTypes.textarea}
					</option>
				</select>
			</div>

			<div className="Block Values">
				<h4>Overzicht waardes :</h4>

				{getInputType()}
			</div>

			{AddValues()}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		columns: state.logbook.columns,
		inputTypes: state.logbook.inputTypes,
		position: state.logbook.position
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addInputValue: payload => dispatch(addInputValue(payload)),
		setColumnTitle: payload => dispatch(setColumnTitle(payload)),
		setInputType: payload => dispatch(setInputType(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddColumn)
