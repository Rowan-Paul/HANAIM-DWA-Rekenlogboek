import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setColumn } from '../../../redux/logbook/actions'

import AddColumn from '../../components/column/AddColumn'
import Button from '../../../common/Button'
import Evaluation from '../../../common/InputTypes/Evaluation'
import InputType from '../../../common/logbook/InputType'
import Jumbotron from '../../../common/Jumbotron'
import LogbookFrame from '../../../common/logbook/LogbookFrame'
import LogbookHeader from '../../../common/logbook/LogbookHeader'
import Modal from '../../../common/logbook/Modal'
import TopBar from '../../../common/logbook/TopBar'

import '../../../../scss/logbook-designer/NewLogbook.scss'
function Columns(props) {
	const history = useHistory()
	const [columns, setColumns] = useState(props.columns)
	const [modal, setModal] = useState(props.modalVisible)
	const [nextButtonColor, setNextButtonColor] = useState('gray')

	// Verify if all collumns set
	const verifyColumns = () => {
		if (!columns.every(c => c.added)) {
			alert('Vul eerst alle kolommen in')
		} else {
			history.push('./goals')
		}
	}

	const checkNextButtonColor = () => {
		if (!columns.every(c => c.added)) {
			setNextButtonColor('gray')
		} else {
			setNextButtonColor('blue')
		}
	}

	useEffect(() => {
		// Prevent skipping general page
		if (props.group < 1 && props.period < 1) {
			history.push('./general')
		}

		setColumns(props.columns)
		setModal(props.modalVisible)
	}, [props.columns, props.modalVisible])

	useEffect(() => {
		checkNextButtonColor()
	}, [props.columns])

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
				<Button
					color={nextButtonColor}
					value="Volgende"
					handler={() => verifyColumns()}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		columns: state.logbook.columns,
		group: state.logbook.group,
		modalVisible: state.logbook.modal.visible,
		period: state.logbook.period
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setColumn: () => dispatch(setColumn())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Columns)
