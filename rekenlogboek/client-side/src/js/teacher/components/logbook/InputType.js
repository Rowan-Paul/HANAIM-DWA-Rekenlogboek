import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { modalShow } from '../../../../redux/logbook/actions'

import Checkboxes from '../../../common/InputTypes/Checkboxes'
import RadioButtons from '../../../common/InputTypes/Radiobuttons'
import Textarea from '../../../common/InputTypes/Textarea'

import '../../../../scss/teacher/components/logbook/InputType.scss'
function InputType(props) {
	const [column, setColumn] = useState({})

	useEffect(() => {
		const column = props.columns.filter(c => c.position === props.position)[0]
		setColumn(column)
	}, [props.columns])

	if (column.added) {
		let inputType
		switch (column.inputType) {
			case 'checkboxes':
				inputType = (
					<Checkboxes
						values={column.values.checkboxes}
						readonly={props.readonly}
					/>
				)
				break
			case 'radiobuttons':
				inputType = (
					<RadioButtons
						values={column.values.radiobuttons}
						readonly={props.readonly}
					/>
				)
				break
			case 'textarea':
				inputType = (
					<Textarea value={column.values.textarea} readonly={props.readonly} />
				)
				break
			default:
				inputType = ''
		}

		return (
			<div className="InputType Cell">
				<ul>
					{!props.readonly && (
						<li className="Header">
							<h4>Invoertype:</h4>

							<button
								onClick={() =>
									props.modalShow({
										position: props.position,
										title: 'Kolom toevoegen'
									})
								}
							>
								<i className="fa fa-pencil"></i>
							</button>
						</li>
					)}

					<li>{inputType}</li>
				</ul>
			</div>
		)
	}

	return (
		<div className="Cell">
			{!props.readonly && (
				<div className="Plus">
					<button
						onClick={() =>
							props.modalShow({
								position: props.position,
								title: 'Kolom toevoegen'
							})
						}
					>
						<i className="fa fa-plus"></i>
					</button>
				</div>
			)}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		columns: state.logbook.columns
	}
}

const mapDispatchToProps = dispatch => {
	return {
		modalShow: payload => dispatch(modalShow(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputType)
