import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import shortid from 'shortid'
import InputHandlers from '../../logbook-designer/components/column/InputHandlers'

import '../../../scss/common/InputTypes.scss'
import Explanation from './Explanation'

function Checkboxes(props) {
	const stateHandler = () => {
		const givenAnswer = props.answer?.answer.value
		let splittedValues = []

		if (givenAnswer) splittedValues = givenAnswer.split(',')

		switch (props.state) {
			// If active
			case props.inputStates.inUse:
				return props.options.map(option => (
					<li className="inUse" key={shortid.generate()}>
						<input
							checked={splittedValues.includes(option)}
							onChange={e => {
								props.changeHandler(e.target.value)
							}}
							value={option}
							type="checkbox"
						/>
						<span>{option}</span>
					</li>
				))

			// If editable
			case props.inputStates.onEdit:
				return props.options.map((option, i) => (
					<li className="onEdit" key={shortid.generate()}>
						<input type="checkbox" value={option} disabled />
						<span>{option}</span>
						<div>
							<InputHandlers position={i} />
						</div>
					</li>
				))

			// If only preview
			case props.inputStates.inPreview:
				return props.options.map(option => (
					<li className="inPreview" key={shortid.generate()}>
						<input
							checked={splittedValues.includes(option)}
							value={option}
							type="checkbox"
							disabled
						/>
						<span>{option}</span>
					</li>
				))
			default:
				return (
					<p className="ErrorMessage">
						Checkboxes: props.state not set! (see state.main.inputStates)
					</p>
				)
		}
	}

	const explanationHandler = () => {
		if (props.answer?.answer.explanation || props.explanation) {
			return (
				<Explanation
					state={props.state}
					text={props.answer?.answer.explanation}
					changeHandler={props.explanationChangeHandler}
				/>
			)
		}
	}
	return (
		<ul className="Checkboxes">
			{stateHandler()}
			{explanationHandler()}
		</ul>
	)
}
const mapStateToProps = state => ({
	inputStates: state.main.inputStates
})

export default connect(mapStateToProps)(withRouter(Checkboxes))
