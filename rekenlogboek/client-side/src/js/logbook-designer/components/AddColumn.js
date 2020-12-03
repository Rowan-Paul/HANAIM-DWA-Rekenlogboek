import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
	setInputType,
	setColumnTitle,
	addInputValue
} from '../../../redux/visual/actions'

import '../../../scss/logbook-designer/components/AddColumn.scss'
import AddInputValue from './Columns/AddInputValue'
import Checkboxes from '../../common/InputTypes/Checkboxes'
import Radiobuttons from '../../common/InputTypes/Radiobuttons'
import Textarea from '../../common/InputTypes/Textarea'

function AddColumn(props) {
	const [title, setTitle] = useState('')
	const [inputValues, setInputValues] = useState('')
	const [inputType, setInputType] = useState('')

	useEffect(() => {
		const column = props.columns.filter(
			column => column.position === props.position
		)[0]
		setTitle(column.title)
		setInputType(column.inputType)
		setInputValues(column.values)
	}, [props.columns])

	const getInputType = () => {
		switch (inputType) {
			case 'checkboxes':
				return <Checkboxes values={inputValues.checkboxes} />
			case 'radiobuttons':
				return <Radiobuttons values={inputValues.radiobuttons} />
			case 'textarea':
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

			<div className="Block">
				<h4>Selecteer input type:</h4>

				<select onChange={e => props.setInputType(e.target.value)}>
					<option value="radiobuttons">Radiobuttons</option>
					<option value="checkboxes">Checkboxes</option>
					<option value="textarea">Tekstveld</option>
				</select>
			</div>

			<div className="Block">
				<h4>Overzicht waardes :</h4>

				{getInputType()}
			</div>

			{AddValues()}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		columns: state.visualState.columns,
		position: state.visualState.position
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
