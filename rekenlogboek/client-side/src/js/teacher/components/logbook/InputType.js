import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { modalShow } from '../../../redux/logbook/actions'

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
		switch (column.input.type) {
			case 'checkboxes':
				inputType = (
					<Checkboxes
						explanation={column.explanation}
						options={column.input.options}
						type={props.type}
					/>
				)
				break
			case 'radiobuttons':
				inputType = (
					<RadioButtons
						explanation={column.explanation}
						options={column.input.options}
						type={props.type}
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
					{props.type === 'edit' && (
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
			{props.type === 'edit' && (
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
