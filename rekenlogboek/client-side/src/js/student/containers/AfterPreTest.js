import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../../../scss/student/containers/AfterPreTest.scss'
import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import LearnGoal from '../components/LearnGoal'
import Jumbotron from '../../common/Jumbotron'
import LearnGoalImage from '../components/LearnGoalImage'
import Question from '../components/Question'
import Button from '../../common/Button'

import { previousGoal } from '../../../redux/studentlogbook/actions'
import { nextGoal } from '../../../redux/studentlogbook/actions'
import { newExplanation } from '../../../redux/studentlogbook/actions'
import { newAnswer } from '../../../redux/studentlogbook/actions'
import { fetchAnswers } from '../../../redux/studentlogbook/actions'
import { fetchColumn } from '../../../redux/studentlogbook/actions'
import { fetchGoal } from '../../../redux/studentlogbook/actions'
import { fetchGoalAmount } from '../../../redux/studentlogbook/actions'

function AfterPreTestUI(props) {
	useEffect(() => {
		props.doFetchGoalAmount()
		props.doFetchColumn(1)
		props.doFetchGoal(props.goal.position)

		if (props.goal.position !== undefined) {
			props.doFetchAnswers()
		}
	}, [])

	const [inputAnswer, setInputAnswer] = useState('')
	const [inputExplanation, setInputExplanation] = useState('')

	const changeAnswer = value => {
		props.doNewAnswer(value)
		setInputAnswer(value)
	}

	const changeExplanation = value => {
		props.doNewAnswer(inputAnswer)
		props.doNewExplanation(value)
		setInputExplanation(value)
	}

	const previousPage = () => {
		if (props.goal.position > 1) {
			props.doPreviousGoal()

			props.doFetchGoalAmount()
			props.doFetchColumn(1)
			props.doFetchGoal(props.goal.position)

			if (props.goal.position !== undefined) {
				props.doFetchAnswers()
			}

			setInputAnswer('')
			setInputExplanation('')
		}
	}

	const nextPage = () => {
		if (props.goal.position < props.goalAmount) {
			props.doNextGoal()
			props.doNewAnswer(inputAnswer)

			props.doFetchGoalAmount()
			props.doFetchColumn(1)
			props.doFetchGoal(props.goal.position)

			if (props.goal.position !== undefined) {
				props.doFetchAnswers()
			}

			setInputAnswer('')
			setInputExplanation('')
		} else {
			props.history.push('/student/pretest/done')
		}
	}

	if (props.column.input !== undefined) {
		return (
			<div className="after-pre-test student-container">
				<ProgressBar itemCount={props.goalAmount} done={[1, 3]} />
				<Jumbotron columns={1}>
					<div className="learn-goal-container">
						<div className="left-side">
							<LearnGoal
								goal={props.goal.title}
								description={props.goal.description}
							/>
							<Question
								title={props.column.title}
								type={props.column.input.type}
								inputAnswer={inputAnswer}
								changeAnswer={changeAnswer}
								options={props.column.input.options}
								explanation={props.column.explanation}
								changeExplanation={changeExplanation}
							/>
						</div>
						<div className="right-side">
							<LearnGoalImage src={props.goal.imageLink} />
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
		column: state.studentLogbook.column,
		goal: state.studentLogbook.currentGoal,
		goalAmount: state.studentLogbook.goalAmount,
		answers: state.studentLogbook.answers
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doFetchColumn: payload => dispatch(fetchColumn(payload)),
		doFetchGoal: payload => dispatch(fetchGoal(payload)),
		doFetchGoalAmount: () => dispatch(fetchGoalAmount()),
		doFetchAnswers: () => dispatch(fetchAnswers()),
		doNewAnswer: payload => dispatch(newAnswer(payload)),
		doNewExplanation: payload => dispatch(newExplanation(payload)),
		doNextGoal: () => dispatch(nextGoal()),
		doPreviousGoal: () => dispatch(previousGoal())
	}
}

export const AfterPreTest = connect(
	mapStateToProps,
	mapDispatchToProps
)(AfterPreTestUI)
