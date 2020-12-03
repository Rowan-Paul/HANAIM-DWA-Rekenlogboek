import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setColumn } from '../../../redux/visual/actions'
import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'

import TopBar from '../components/Visual/TopBar'
import Evaluation from '../../common/InputTypes/Evaluation'
import VisualFrame from '../components/Visual/VisualFrame'
import Modal from '../components/Modal'
import AddColumn from '../components/AddColumn'
import VisualHeader from '../components/Visual/VisualHeader'
import ColumnPreview from '../components/Columns/ColumnPreview'

import '../../../scss/logbook-designer/containers/NewLogbook.scss'
function Columns(props) {
	const history = useHistory()
	const [columns, setColumns] = useState(props.columns)
	const [modal, setModal] = useState(props.modalVisible)

	// Verify if all collumns set
	const verifyCollumns = () => {
		if (!columns.every(c => c.added)) {
			alert('Vul eerst alle kolommen in')
		} else {
			history.push('./goals')
		}
	}

	// useEffect for model / overlay
	useEffect(() => {
		setModal(props.modalVisible)
	}, [props.modalVisible])

	// useEffect for verifying collums added
	useEffect(() => {
		setColumns(props.columns)
	}, [props.columns])

	return (
		<div className="new-logbook">
			{modal && (
				<Modal handler={props.setColumn}>
					<AddColumn />
				</Modal>
			)}
			<Jumbotron>
				<TopBar title={'Kolommen toevoegen'} group={5} period={1} />
				<VisualFrame>
					<VisualHeader />
					<li className="Row Body">
						<div>
							<p>
								Maak op de volgende pagina de doelen aan om ook hiervoor een
								preview te krijgen.
							</p>
						</div>

						<ColumnPreview position={1} />
						<ColumnPreview position={2} />
						<div>
							<Evaluation />
						</div>
					</li>
				</VisualFrame>
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
					color="blue"
					value="Volgende"
					handler={() => verifyCollumns()}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		columns: state.visualState.columns,
		modalVisible: state.visualState.modal.visible
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setColumn: () => dispatch(setColumn())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Columns)
