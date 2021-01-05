import React from 'react'
import { connect } from 'react-redux'

import Checkboxes from '../../common/InputTypes/Checkboxes'
import RadioButtons from '../../common/InputTypes/Radiobuttons'
import Textarea from '../../common/InputTypes/Textarea'
import {
	saveAnswersRadio,
	saveAnswersCheck,
	saveAnswersText,
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
							props.saveAnswersCheck(
								newAnswerValue,
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
							props.saveAnswersRadio(
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
							props.saveAnswersText(
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
		<div className="InputType Cell">
			<ul>
				<li>{handler()}</li>
			</ul>
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
		saveAnswersRadio: (answerValue, goalPosition, columnPosition) =>
			dispatch(saveAnswersRadio(answerValue, goalPosition, columnPosition)),
		saveAnswersCheck: (answerValue, goalPosition, columnPosition) =>
			dispatch(saveAnswersCheck(answerValue, goalPosition, columnPosition)),
		saveAnswersText: (answerValue, goalPosition, columnPosition) =>
			dispatch(saveAnswersText(answerValue, goalPosition, columnPosition)),
		saveExplanation: (newExplanationValue, goalPosition, columnPosition) =>
			dispatch(
				saveExplanation(newExplanationValue, goalPosition, columnPosition)
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)
