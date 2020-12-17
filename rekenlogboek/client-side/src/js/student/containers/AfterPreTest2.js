import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import '../../../scss/student/containers/AfterPreTest.scss'
import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import LearnGoal from '../components/LearnGoal'
import LearnGoalImage from '../components/LearnGoalImage'
import Question from '../components/Question'

import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'

import {
	decrementCurrentGoal,
	incrementCurrentGoal
} from '../../redux/studentlogbook/actions'

function AfterPreTestUI(props) {
	useEffect(() => {}, [])

	const previousPage = () => {
		props.decrementCurrentGoal()
	}

	const nextPage = () => {
		props.incrementCurrentGoal()
	}

	if (props.column.input !== undefined) {
		return (
			<div className="after-pre-test student-container">
				<ProgressBar itemCount={props.goalAmount} done={[1, 3]} />
				<Jumbotron columns={1}>
					<div className="learn-goal-container">
						<div className="left-side">
							<LearnGoal
								goal={props.goals[props.currentGoal].title}
								description={props.goals[props.currentGoal].description}
							/>
							{/* <Question
								title={props.column.title}
								type={props.column.input.type}
								inputAnswer={inputAnswer}
								changeAnswer={changeAnswer}
								options={props.column.input.options}
								explanation={props.column.explanation}
								changeExplanation={changeExplanation}
							/> */}
						</div>
						<div className="right-side">
							<LearnGoalImage src={props.goals[props.currentGoal].imageLink} />
						</div>
					</div>
				</Jumbotron>
				<div className="prev button">
					<Button color="gray" value="Vorige" handler={() => previousPage()} />
				</div>
				<div className="next button">
					<Button color="blue" value="Volgende" handler={() => nextPage()} />
				</div>
			</div>
		)
	} else {
		return <p>Loading</p>
	}
}

function mapStateToProps(state) {
	return {
		column: state.studentLogbook.logbook.columns[1],
		currentGoal: state.studentLogbook.currentGoal,
		goals: state.studentLogbook.logbook.goals
	}
}

function mapDispatchToProps(dispatch) {
	return {
		incrementCurrentGoal: () => dispatch(incrementCurrentGoal()),
		decrementCurrentGoal: () => dispatch(decrementCurrentGoal())
	}
}

export const AfterPreTest = connect(
	mapStateToProps,
	mapDispatchToProps
)(AfterPreTestUI)
