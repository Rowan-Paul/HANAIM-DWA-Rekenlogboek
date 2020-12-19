import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { modalShow, modalHide } from '../../redux/logbook/actions'
import { getActiveLogbook } from '../../redux/allow-student-access/actions'

import '../../../scss/teacher/containers/AllowStudentAccess.scss'

import Jumbotron from '../../common/Jumbotron'
import Modal from '../../common/logbook/Modal'
import PeriodFilter from '../components/PeriodFilter'
import StudentAccessSelector from '../components/StudentAccessSelector'

function AllowStudentAccess(props) {
	const [selectedLearnGoal, setSelectedLearnGoal] = useState()

	const UnlockEvaluation = goal => {
		setSelectedLearnGoal(goal)
		props.modalHide()
	}

	const selectGoal = nr => {
		setSelectedLearnGoal(nr)
	}

	const filterClick = (schoolYear, period) => {
		props.getLogbookData({ schoolYear, period })
	}

	const learnGoals = [
		{
			goalNumber: 1,
			name: 'doel 1: Procenten'
		},
		{
			goalNumber: 2,
			name: 'doel 3: Afmetingen'
		},
		{
			goalNumber: 3,
			name: 'doel 4: Schattingen'
		},
		{
			goalNumber: 4,
			name: 'doel 5: Plus sommen'
		},
		{
			goalNumber: 5,
			name: 'doel 6: Keer sommen'
		},
		{
			goalNumber: 6,
			name: 'doel 7: Afstanden'
		},
		{
			goalNumber: 7,
			name: 'doel 8: Snelheden'
		}
	]

	const getLearnGoals = () =>
		learnGoals.map(goal => {
			return (
				<div
					className={classNames('goal', {
						selected: goal.goalNumber === selectedLearnGoal
					})}
					onClick={() => selectGoal(goal.goalNumber)}
					key={goal.goalNumber}
				>
					{goal.name}
				</div>
			)
		})

	return (
		<div className="allow-student-access">
			<PeriodFilter filterClick={filterClick} />
			<Jumbotron>
				{console.log(props.currentLogbook)}
				{Object.keys(props.currentLogbook).length !== 0 ? (
					<StudentAccessSelector modalShow={props.modalShow} />
				) : (
					<div className="no-logbook-found">
						<h1>Geen logboek gevonden</h1>
						<p>
							Kies rechtsbovenin een leerjaar en blok om de opties voor een
							logboek in te laden.
						</p>
					</div>
				)}
			</Jumbotron>

			{props.modalVisible && (
				<Modal
					btnValue="Bevestig"
					handler={learnGoal => UnlockEvaluation(learnGoal)}
				>
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
		modalShow: payload => dispatch(modalShow(payload)),
		modalHide: () => dispatch(modalHide()),
		getLogbookData: payload => dispatch(getActiveLogbook(payload))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AllowStudentAccess))
