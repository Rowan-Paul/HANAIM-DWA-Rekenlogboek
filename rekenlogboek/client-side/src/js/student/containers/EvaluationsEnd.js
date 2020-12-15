import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import '../../../scss/student/Student.scss'

import Happy from '../../../img/icons/evaluation/happy.svg'
import Sad from '../../../img/icons/evaluation/sad.svg'
import Sceptic from '../../../img/icons/evaluation/sceptic.svg'

import ResultText from 	'../components/ResultText'
import ResultTable from '../components/ResultTable'

import Jumbotron from 	'../../common/Jumbotron'

// import { fetchAllGoals } from '../../../redux/studentlogbook/actions'
// import { previousGoal } from '../../../redux/studentlogbook/actions'
// import { nextGoal } from '../../../redux/studentlogbook/actions'
// import { fetchAnswers } from '../../../redux/studentlogbook/actions'

import { fetchAllGoals, previousGoal, nextGoal, fetchAnswers } from '../../../redux/studentlogbook/actions'

function EvaluationsEndUI(props) {
	useEffect(() => {
		props.doFetchAllGoals()
		if (props.goal.position !== undefined) {
			props.doFetchAnswers()
		}
	}, [])

	//TODO: fix it going back and actually loading the page
	const previousPage = () => {
		props.history.push('/student/evaluation')
	}

	let currentGoal = [props.currentGoal]

	return (
		<div className="end-screen student-container">
			<Jumbotron columns={1}>
				<div className="learn-goal-container">
					<div className="left-side">
						<ResultText
							title="Je bent klaar!"
							description="De door jou ingevoerde antwoorden zijn naar jouw leerkracht verstuurd."
							image=""
						/>
					</div>
					<div className="right-side">
						<ResultTable
							results={currentGoal}
							answers={props.answers}
							columnPosition={3}
							description="Dit zijn de door jou ingevulde antwoorden:"
						/>
					</div>
				</div>
			</Jumbotron>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		column: state.studentLogbook.column,
		goal: state.studentLogbook.currentGoal,
		answers: state.studentLogbook.answers,
		allGoals: state.studentLogbook.allGoals,
		currentGoal: state.studentLogbook.currentGoal
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

export const EvaluationsEnd = connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(EvaluationsEndUI))
