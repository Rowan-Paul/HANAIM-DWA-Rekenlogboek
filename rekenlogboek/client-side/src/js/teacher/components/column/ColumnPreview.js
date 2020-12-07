import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { modalShow } from '../../../../redux/logbook/actions'

import Checkboxes from '../../../common/InputTypes/Checkboxes'
import RadioButtons from '../../../common/InputTypes/Radiobuttons'
import Textarea from '../../../common/InputTypes/Textarea'

import '../../../../scss/teacher/components/column/ColumnPreview.scss'
function ColumnPreview(props) {
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
					<Checkboxes values={column.values} explanation={explanation.value} />
				)
				break
			case 'radiobuttons':
				inputType = (
					<RadioButtons
						values={column.values}
						explanation={column.explanation}
					/>
				)
				break
			case 'textarea':
				inputType = <Textarea />
				break
			default:
				inputType = ''
		}

		return (
			<div className="ColumnPreview">
				<ul>
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

					<li>{inputType}</li>
				</ul>
			</div>
		)
	}

	return (
		<div>
			<button
				className="Plus"
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

export default connect(mapStateToProps, mapDispatchToProps)(ColumnPreview)
