import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import '../../../scss/student/containers/AfterPreTest.scss'
import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import LearnGoal from '../components/LearnGoal'
import Jumbotron from '../../common/Jumbotron'
import LearnGoalImage from '../components/LearnGoalImage'
import Question from '../components/Question'
import Button from '../../common/Button'

import { fetchColumn } from '../../../redux/studentlogbook/actions'
import { fetchGoal } from '../../../redux/studentlogbook/actions'
import { fetchGoalAmount } from '../../../redux/studentlogbook/actions'

function AfterPreTestUI(props) {
	useEffect(() => {
		props.doFetchGoalAmount()
		props.doFetchColumn(1)
		props.doFetchGoal(props.goal.position)
	}, [])

	return (
		<div className="after-pre-test student-container">
			<ProgressBar itemCount={props.goalAmount} done={[]} />
			<Jumbotron columns={1}>
				<div className="learn-goal-container">
					<div className="left-side">
						<LearnGoal
							goal={'Doel 1: ' + props.goal.title}
							description={props.goal.description}
						/>
						<Question />
					</div>
					<div className="right-side">
						<LearnGoalImage src={props.goal.imageLink} />
					</div>
				</div>
			</Jumbotron>
			<div className="next button">
				<Button color="blue" value="Volgende" handler={() => verifyGoals()} />
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		column: state.studentLogbook.column,
		goal: state.studentLogbook.currentGoal,
		goalAmount: state.studentLogbook.goalAmount
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doFetchColumn: payload => dispatch(fetchColumn(payload)),
		doFetchGoal: payload => dispatch(fetchGoal(payload)),
		doFetchGoalAmount: () => dispatch(fetchGoalAmount())
	}
}

export const AfterPreTest = connect(
	mapStateToProps,
	mapDispatchToProps
)(AfterPreTestUI)
