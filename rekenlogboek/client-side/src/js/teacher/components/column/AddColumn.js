import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
	setInputType,
	setColumnTitle,
	addInputOption
} from '../../../redux/logbook/actions'

import AddInputOption from './AddInputOption'
import Checkboxes from '../../../common/InputTypes/Checkboxes'
import Explanation from './Explanation'
import Radiobuttons from '../../../common/InputTypes/Radiobuttons'
import Textarea from '../../../common/InputTypes/Textarea'

import '../../../../scss/teacher/components/column/AddColumn.scss'
function AddColumn(props) {
	const [title, setTitle] = useState('')
	const [options, setOptions] = useState('')
	const [inputType, setInputType] = useState('')
	const [selected, setSelected] = useState(props.inputTypes.radiobuttons)

	useEffect(() => {
		const column = props.columns.filter(
			column => column.position === props.position
		)[0]
		setTitle(column.title)
		setInputType(column.input.type)
		setOptions(column.input.options)
		setSelected(column.input.type)
	}, [props.columns])

	const getInputType = () => {
		switch (inputType) {
			case props.inputTypes.checkboxes:
				return <Checkboxes options={options} type={'edit'} />
			case props.inputTypes.radiobuttons:
				return <Radiobuttons options={options} type={'edit'} />
			case props.inputTypes.textarea:
				return <Textarea type={'preview'} />
			default:
				return null
		}
	}

	return (
		<div className="AddColumns">
			<div className="Block">
				<h4>Titel kolom:</h4>

				<input
					id="title"
					type="text"
					placeholder="Titel kolom"
					onChange={e => props.setColumnTitle(e.target.value)}
					value={title}
				/>
			</div>

			<div className="Block">
				<h4>Selecteer input type:</h4>

				<select
					onChange={e => props.setInputType(e.target.value)}
					value={selected}
					id="inputType"
				>
					<option value={props.inputTypes.radiobuttons}>Kies er één</option>
					<option value={props.inputTypes.checkboxes}>Kies er meerdere</option>
					<option value={props.inputTypes.textarea}>
						Schrijf zelf een antwoord op
					</option>
				</select>
			</div>

			<div className="Block Values">
				<h4>Overzicht opties :</h4>

				{getInputType()}
			</div>

			{inputType !== 'textarea' && <AddInputOption />}
			{inputType !== 'textarea' && <Explanation />}
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
		addInputOption: payload => dispatch(addInputOption(payload)),
		setColumnTitle: payload => dispatch(setColumnTitle(payload)),
		setInputType: payload => dispatch(setInputType(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddColumn)
