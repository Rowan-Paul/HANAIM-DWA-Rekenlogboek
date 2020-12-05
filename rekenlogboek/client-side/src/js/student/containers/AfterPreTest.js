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

function AfterPreTestUI(props) {
	useEffect(() => {
		props.doFetchColumn(1)
		props.doFetchGoal(1)
	}, [])

	return (
		<div className="after-pre-test student-container">
			<ProgressBar itemCount={5} done={[1, 3]} />
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
						{/* TODO: replace with src from database */}
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
		goal: state.studentLogbook.goal
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doFetchColumn: payload => dispatch(fetchColumn(payload)),
		doFetchGoal: payload => dispatch(fetchGoal(payload))
	}
}

export const AfterPreTest = connect(
	mapStateToProps,
	mapDispatchToProps
)(AfterPreTestUI)
