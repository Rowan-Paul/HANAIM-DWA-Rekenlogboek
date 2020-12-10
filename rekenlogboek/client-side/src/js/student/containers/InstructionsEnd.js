import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'
import ResultText from '../components/ResultText'
import ResultTable from '../components/ResultTable'

import { fetchAllGoals } from '../../../redux/studentlogbook/actions'
import { previousGoal } from '../../../redux/studentlogbook/actions'
import { nextGoal } from '../../../redux/studentlogbook/actions'
import { fetchAnswers } from '../../../redux/studentlogbook/actions'

function InstructionsEndUI(props) {
	useEffect(() => {
		props.doFetchAllGoals()
		if (props.goal.position !== undefined) {
			props.doFetchAnswers()
		}
	}, [])

	//TODO: fix it going back and actually loading the page
	const previousPage = () => {
		if (props.goal.position > 1) {
			props.doPreviousGoal()

			props.history.push('/student/instruction')
		}
	}

	return (
		<div className="end-screen student-container">
			<ProgressBar itemCount={props.goalAmount} done={[0, 1, 2, 3, 4]} />
			<Jumbotron columns={1}>
				<div className="learn-goal-container">
					<div className="left-side">
						<ResultText
							title="Je bent klaar!"
							description="De door jou ingevoerde antwoorden zijn naar jouw leerkracht verstuurd. Mocht je ze willen aanpassen dan kan je nog terug gaan naar de vorige pagina’s door op vorige te klikken of door op een van de blokjes hierboven te klikken."
							image=""
						/>
					</div>
					<div className="right-side">
						<ResultTable
							results={props.allGoals}
							answers={props.answers}
							columnPosition={props.column.position}
							description="Dit zijn de door jou ingevulde antwoorden:"
						/>
					</div>
				</div>
			</Jumbotron>
			<div className="prev button">
				<Button color="gray" value="Vorige" handler={() => previousPage()} />
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		column: state.studentLogbook.column,
		goal: state.studentLogbook.currentGoal,
		goalAmount: state.studentLogbook.goalAmount,
		answers: state.studentLogbook.answers,
		allGoals: state.studentLogbook.allGoals
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doFetchAnswers: () => dispatch(fetchAnswers()),
		doNextGoal: () => dispatch(nextGoal()),
		doPreviousGoal: () => dispatch(previousGoal()),
		doFetchAllGoals: () => dispatch(fetchAllGoals())
	}
}

export const InstructionsEnd = connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(InstructionsEndUI))
