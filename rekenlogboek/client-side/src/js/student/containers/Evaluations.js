import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../../../scss/student/containers/Evaluation.scss'
import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import LearnGoal from '../components/LearnGoal'
import Jumbotron from '../../common/Jumbotron'
import LearnGoalImage from '../components/LearnGoalImage'
import Question from '../components/Question'
import Button from '../../common/Button'

import { newExplanation } from '../../../redux/studentlogbook/actions'
import { newAnswer } from '../../../redux/studentlogbook/actions'
import { fetchAnswers } from '../../../redux/studentlogbook/actions'
import { fetchColumn } from '../../../redux/studentlogbook/actions'
import { fetchGoal } from '../../../redux/studentlogbook/actions'

function EvaluationsUI(props) {
	useEffect(() => {
		// null will automatically choose the activeGoal
		props.doFetchGoal(null)

		if (props.goal.position !== undefined) {
			props.doFetchAnswers()
		}
	}, [])

	const [inputAnswer, setInputAnswer] = useState('')
	const [inputExplanation, setInputExplanation] = useState('')
	const [givenAnswers, setGivenAnswers] = useState('')

	const changeAnswer = value => {
		props.doNewAnswer(value)
		setInputAnswer(value)
	}

	const changeExplanation = value => {
		props.doNewAnswer(inputAnswer)
		props.doNewExplanation(value)
		setInputExplanation(value)
	}

	const nextPage = () => {
		props.doNewAnswer(inputAnswer)
		props.history.push('/student/evaluation/done')
	}

	return (
		<div className="evaluation student-container">
			<ProgressBar itemCount={5} done={[1, 3]} />
			<Jumbotron columns={1}>
				<div className="learn-goal-container">
					<div className="left-side">
						<LearnGoal
							goal={props.goal.title}
							description={props.goal.description}
						/>
						<Question
							title="Hoe heb ik de les gemaakt?"
							type="evaluation"
							inputAnswer={inputAnswer}
							changeAnswer={changeAnswer}
						/>
					</div>
					<div className="right-side">
						<LearnGoalImage src={props.goal.imageLink} />
					</div>
				</div>
			</Jumbotron>
			<div className="next button">
				<Button color="blue" value="Volgende" handler={() => nextPage()} />
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		column: state.studentLogbook.column,
		goal: state.studentLogbook.currentGoal,
		answers: state.studentLogbook.answers
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doFetchColumn: payload => dispatch(fetchColumn(payload)),
		doFetchGoal: payload => dispatch(fetchGoal(payload)),
		doFetchAnswers: () => dispatch(fetchAnswers()),
		doNewAnswer: payload => dispatch(newAnswer(payload)),
		doNewExplanation: payload => dispatch(newExplanation(payload))
	}
}

export const Evaluations = connect(
	mapStateToProps,
	mapDispatchToProps
)(EvaluationsUI)
