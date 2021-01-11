import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { modalHide } from '../../redux/logbook/actions'
import {
	getSelectedLogbook,
	updateActiveGoal
} from '../../redux/allow-student-access/actions'
import { updateCurrentPhase } from '../../redux/allow-student-access/actions'

import '../../../scss/teacher/containers/AllowStudentAccess.scss'

import Jumbotron from '../../common/Jumbotron'
import Modal from '../../common/logbook/Modal'
import PeriodFilter from '../components/PeriodFilter'
import StudentAccessSelector from '../components/StudentAccessSelector'

function AllowStudentAccess(props) {
	const [selectedLearnGoal, setSelectedLearnGoal] = useState()

	const updatePhase = newPhase => {
		//make sure no goal is selected when switching phase
		newPhase !== 'evaluation' && selectGoal()
		props.updateCurrentPhase({
			currentPhase: newPhase,
			logbookID: props.currentLogbook._id
		})
	}

	const openEvaluationPhase = () => {
		updatePhase('evaluation')
		props.updateActiveGoal({
			activeGoal: selectedLearnGoal,
			logbookID: props.currentLogbook._id
		})
		props.modalHide()
	}

	const selectGoal = nr => {
		setSelectedLearnGoal(nr)
	}

	const filterClick = (schoolYear, period) => {
		props.getLogbookData({ schoolYear, period })
	}

	const getLearnGoals = () =>
		props.currentLogbook.goals.map(goal => {
			return (
				<div
					className={classNames('goal', {
						selected: selectedLearnGoal == goal.position
					})}
					onClick={() => selectGoal(goal.position)}
					key={goal.position}
				>
					{goal.title}
				</div>
			)
		})

	return (
		<div className="allow-student-access">
			<PeriodFilter filterClick={filterClick} />
			<Jumbotron>
				{props.currentLogbook &&
				Object.keys(props.currentLogbook).length !== 0 ? (
					<StudentAccessSelector
						logbookData={{
							year: props.currentLogbook.year,
							period: props.currentLogbook.period
						}}
						updatePhase={updatePhase}
						selectGoal={selectGoal}
					/>
				) : (
					<div className="no-logbook-found">
						<h1>Geen logboek gevonden</h1>
						{props.currentLogbook ? (
							<p>
								Kies rechtsbovenin een leerjaar en blok om de opties voor een
								logboek in te laden.
							</p>
						) : (
							<span>
								<p>
									Neem contact op met een logboekontwerper om een logboek aan te
									maken voor uw groep.
								</p>
							</span>
						)}
					</div>
				)}
			</Jumbotron>

			{props.modalVisible && (
				<Modal btnValue="Bevestig" handler={() => openEvaluationPhase()}>
					<p>
						Selecteer een leerdoel waar de leerlingen hun evaluatie op kunnen
						geven.
					</p>
					<div className="learn-goal-list">{getLearnGoals()}</div>
				</Modal>
			)}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		modalVisible: state.logbook.modal.visible,
		currentLogbook: state.allowStudentAccess.currentLogbook
	}
}

const mapDispatchToProps = dispatch => {
	return {
		modalHide: () => dispatch(modalHide()),
		getLogbookData: payload => dispatch(getSelectedLogbook(payload)),
		updateCurrentPhase: payload => dispatch(updateCurrentPhase(payload)),
		updateActiveGoal: payload => dispatch(updateActiveGoal(payload))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AllowStudentAccess))
