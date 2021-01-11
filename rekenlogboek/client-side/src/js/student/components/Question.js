import React from 'react'
import { connect } from 'react-redux'

import Checkboxes from '../../common/InputTypes/Checkboxes'
import RadioButtons from '../../common/InputTypes/Radiobuttons'
import Textarea from '../../common/InputTypes/Textarea'
import {
	saveAnswerRadio,
	saveAnswerCheck,
	saveAnswerText,
	saveExplanation
} from '../../redux/studentlogbook/actions'

function Question(props) {
	const handler = () => {
		switch (props.input.type) {
			// CHECKBOXES
			case props.inputTypes.checkboxes:
				return (
					<Checkboxes
						answer={props.answer}
						options={props.input.options}
						state={props.state}
						explanation={props.explanation}
						changeHandler={newAnswerValue => {
							props.saveAnswerCheck(
								newAnswerValue,
								props.goalPosition,
								props.columnPosition
							)
						}}
						explanationChangeHandler={newExplanationValue => {
							props.saveExplanation(
								newExplanationValue,
								props.goalPosition,
								props.columnPosition
							)
						}}
					/>
				)

			// RADIOBUTTONS
			case props.inputTypes.radiobuttons:
				return (
					<RadioButtons
						answer={props.answer}
						options={props.input.options}
						state={props.state}
						explanation={props.explanation}
						changeHandler={newAnswerValue => {
							props.saveAnswerRadio(
								newAnswerValue,
								props.goalPosition,
								props.columnPosition
							)
						}}
						explanationChangeHandler={newExplanationValue => {
							props.saveExplanation(
								newExplanationValue,
								props.goalPosition,
								props.columnPosition
							)
						}}
					/>
				)

			// TEXTAREA
			case props.inputTypes.textarea:
				return (
					<Textarea
						answer={props.answer}
						state={props.state}
						changeHandler={newAnswerValue => {
							props.saveAnswerText(
								newAnswerValue,
								props.goalPosition,
								props.columnPosition
							)
						}}
					/>
				)
			default:
				return ''
		}
	}

	return (
		<div>
			<h2>{props.question}</h2>
			<div className="InputType Cell">
				<ul>
					<li>{handler()}</li>
				</ul>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		inputTypes: state.main.inputTypes,
		inputStates: state.main.inputStates
	}
}

const mapDispatchToProps = dispatch => {
	return {
		saveAnswerRadio: (answerValue, goalPosition, columnPosition) =>
			dispatch(saveAnswerRadio(answerValue, goalPosition, columnPosition)),
		saveAnswerCheck: (answerValue, goalPosition, columnPosition) =>
			dispatch(saveAnswerCheck(answerValue, goalPosition, columnPosition)),
		saveAnswerText: (answerValue, goalPosition, columnPosition) =>
			dispatch(saveAnswerText(answerValue, goalPosition, columnPosition)),
		saveExplanation: (newExplanationValue, goalPosition, columnPosition) =>
			dispatch(
				saveExplanation(newExplanationValue, goalPosition, columnPosition)
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)
