import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { modalShow, modalHide } from '../../redux/logbook/actions'

import '../../../scss/teacher/containers/AllowStudentAccess.scss'

import Check from '../../../img/icons/check_green.svg'
import Lock from '../../../img/icons/lock_blue.svg'

import Jumbotron from '../../common/Jumbotron'
import ButtonContainer from '../../common/ButtonContainer'
import Button from '../../common/Button'
import Modal from '../../common/logbook/Modal'

function AllowStudentAccess(props) {
	const [selectedLearnGoal, setSelectedLearnGoal] = useState()

	const UnlockEvaluation = goal => {
		setSelectedLearnGoal(goal)
		props.modalHide()
	}

	const selectGoal = nr => {
		setSelectedLearnGoal(nr)
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
			<div className="period-filter">
				<div>Blok:</div>
				<input type="number" defaultValue="1" min="1" max="99" />
				<Button color="blue" handler={() => {}} value="Kies blok" />
			</div>
			<Jumbotron>
				<div className="content-container">
					<div className="explanation-container">
						<h1>Bepaal wat uw leerlingen zien.</h1>
						<p>
							Kies welk deel van het logboek u wilt ontgrendelen. Er kan maar
							een deel tegelijkertijd open staan. Bij het kiezen van de
							evaluaties pagina kunt u zelf bepalen welk leerdoel geëvalueerd
							mag worden.
						</p>
						<p>
							Wilt u een ander blok openen, dan kan dat rechtsbovenin. Zodra u
							een deel van een ander blok ontgrendeld zullen alle andere blokken
							van de klas vergrendeld worden. Op die manier is er altijd maar
							een blok in beeld voor de leerlingen
						</p>
					</div>
					<ButtonContainer
						icon={Check}
						color="green"
						description="Open na pre-toets pagina."
						value="Ontgrendel"
						// handler={() => history.push('../teacher/logbooks')}
					/>

					<ButtonContainer
						icon={Lock}
						color="blue"
						description="Sluit instructie pagina."
						value="Vergrendel"
						// handler={() => history.push('../teacher/logbooks')}
					/>

					<ButtonContainer
						icon={Check}
						color="green"
						description="Open na pre-toets pagina."
						value="Ontgrendel"
						handler={() =>
							props.modalShow({
								title: 'Bepaal toegang'
							})
						}
					/>
				</div>
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
		modalVisible: state.logbook.modal.visible
	}
}

const mapDispatchToProps = dispatch => {
	return {
		modalShow: payload => dispatch(modalShow(payload)),
		modalHide: () => dispatch(modalHide())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AllowStudentAccess))
