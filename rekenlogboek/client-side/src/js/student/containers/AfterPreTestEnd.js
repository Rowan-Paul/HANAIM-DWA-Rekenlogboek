import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import ResultText from 	'../components/ResultText'
import ResultTable from '../components/ResultTable'

import Jumbotron from 	'../../common/Jumbotron'
import Button from 		'../../common/Button'

// import { fetchAllGoals } from '../../../redux/studentlogbook/actions'
// import { previousGoal } from '../../../redux/studentlogbook/actions'
// import { nextGoal } from '../../../redux/studentlogbook/actions'
// import { fetchAnswers } from '../../../redux/studentlogbook/actions'

import { fetchAllGoals, previousGoal, nextGoal, fetchAnswers} from '../../../redux/studentlogbook/actions'

function AfterPreTestEndUI(props) {
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

			props.history.push('/student/pretoets')
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
							description="De door jou ingevoerde antwoorden zijn naar jouw leraar verstuurd."
							image=""
						/>
					</div>
					<div className="right-side">
						<ResultTable
							results={props.allGoals}
							answers={props.answers}
							columnPosition={props.column.position}
							description="Dit heb je bij je leerdoelen beantwoord:"
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

export const AfterPreTestEnd = connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AfterPreTestEndUI))
