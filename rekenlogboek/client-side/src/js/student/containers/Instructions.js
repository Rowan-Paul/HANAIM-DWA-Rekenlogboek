import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../../../scss/student/containers/Instructions.scss'
import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import LearnGoal from '../components/LearnGoal'
import LearnGoalImage from '../components/LearnGoalImage'
import Question from '../components/Question'

import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'

// import {
// 	previousGoal,
// 	nextGoal,
// 	newExplanation,
// 	newAnswer,
// 	fetchAnswers,
// 	fetchColumn,
// 	fetchGoal,
// 	fetchGoalAmount
// } from '../../redux/studentlogbook/actions'

function InstructionsUI(props) {
	useEffect(() => {
		props.doFetchGoalAmount()
		props.doFetchColumn(2)
		props.doFetchGoal(props.goal.position)

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

	const previousPage = () => {
		if (props.goal.position > 1) {
			props.doPreviousGoal()

			props.doFetchGoalAmount()
			props.doFetchColumn(2)
			props.doFetchGoal(props.goal.position)

			if (props.goal.position !== undefined) {
				props.doFetchAnswers()
			}

			setInputAnswer('')
			setInputExplanation('')
			setGivenAnswers('')
		}
	}

	const nextPage = () => {
		props.doNewAnswer(inputAnswer)
		if (props.goal.position < props.goalAmount) {
			props.doNextGoal()

			props.doFetchGoalAmount()
			props.doFetchColumn(2)
			props.doFetchGoal(props.goal.position)

			if (props.goal.position !== undefined) {
				props.doFetchAnswers()
			}

			setInputAnswer('')
			setInputExplanation('')
			setGivenAnswers('')
		} else {
			props.history.push('/student/instruction/done')
		}
	}

	if (props.answers.length > 0 && givenAnswers.length < 1)
		props.answers.forEach(answer => {
			if (
				answer.goalPosition === props.column.position &&
				answer.columnPosition === 1
			) {
				setGivenAnswers(answer.answer.value)
			}
		})

	if (props.column.input !== undefined) {
		return (
			<div className="instructions student-container">
				<ProgressBar itemCount={1} done={[1, 3]} />
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
							<LearnGoalImage
								src={props.goal.imageLink}
								title="Dit gaf je aan na de pre-toets:"
								description={givenAnswers}
							/>
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

export const Instructions = connect(
	mapStateToProps,
	mapDispatchToProps
)(InstructionsUI)
