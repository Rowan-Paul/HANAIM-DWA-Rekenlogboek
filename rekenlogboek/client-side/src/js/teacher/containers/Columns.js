import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setColumn } from '../../redux/logbook/actions'

import Button from '../../common/Button'
import AddColumn from '../components/column/AddColumn'
import Evaluation from '../../common/InputTypes/Evaluation'
import Jumbotron from '../../common/Jumbotron'
import LogbookFrame from '../components/logbook/LogbookFrame'
import LogbookHeader from '../components/logbook/LogbookHeader'
import Modal from '../components/logbook/Modal'
import TopBar from '../components/logbook/TopBar'

import '../../../scss/teacher/containers/NewLogbook.scss'
import InputType from '../components/logbook/InputType'
function Columns(props) {
	const history = useHistory()
	const [columns, setColumns] = useState(props.columns)
	const [modal, setModal] = useState(props.modalVisible)

	// Verify if all collumns set
	const verifyColumns = () => {
		if (!columns.every(c => c.added)) {
			alert('Vul eerst alle kolommen in')
		} else {
			history.push('./goals')
		}
	}

	useEffect(
		() => {
			setColumns(props.columns)
			setModal(props.modalVisible)
		},
		[props.columns],
		[props.modalVisible]
	)

	return (
		<div className="new-logbook">
			{modal && (
				<Modal handler={props.setColumn}>
					<AddColumn />
				</Modal>
			)}
			<Jumbotron>
				<TopBar title={'Kolommen toevoegen'} />
				<LogbookFrame>
					<LogbookHeader />
					<li className="Row Body">
						<div className="Cell">
							<p className="Description">
								Maak op de volgende pagina de doelen aan om ook hiervoor een
								preview te krijgen.
							</p>
						</div>

						<InputType position={1} type={'edit'} />
						<InputType position={2} type={'edit'} />
						<div>
							<Evaluation type={'preview'} />
						</div>
					</li>
				</LogbookFrame>
			</Jumbotron>

			<div className="prev button">
				<Button
					color="gray"
					value="Vorige"
					handler={() => props.history.push('./general')}
				/>
			</div>
			<div className="next button">
				<Button color="blue" value="Volgende" handler={() => verifyColumns()} />
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		columns: state.logbook.columns,
		modalVisible: state.logbook.modal.visible
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setColumn: () => dispatch(setColumn())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Columns)
