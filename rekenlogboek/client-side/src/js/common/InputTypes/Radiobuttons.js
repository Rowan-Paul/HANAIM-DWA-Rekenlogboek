import React from 'react'
import shortid from 'shortid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Explanation from './Explanation'
import InputHandlers from '../../logbook-designer/components/column/InputHandlers'

import '../../../scss/common/InputTypes.scss'

function RadioButtons(props) {
	const stateHandler = () => {
		switch (props.state) {
			// If active
			case props.inputStates.inUse:
				return (
					<ul className="Radiobuttons">
						{props.options.map((option, i) => (
							<li className={props.inputStates.inUse} key={shortid.generate()}>
								<input
									onChange={e => {
										props.changeHandler(e.target.value)
									}}
									type="radio"
									value={option}
									checked={props.answer?.answer.value === option}
								/>
								<span>{option}</span>
							</li>
						))}

						<li className={props.inputStates.inUse}>
							<input
								type="radio"
								value="default"
								onChange={e =>
									props.changeHandler(e.target.value, {
										...props.answer
									})
								}
								checked={!props.answer?.answer.value}
							/>
							<span>Ik weet het nog niet</span>
						</li>
						{explanationHandler()}
					</ul>
				)

			// If editable
			case props.inputStates.onEdit:
				return (
					<ul className="Radiobuttons">
						{props.options.map((option, i) => (
							<li className={props.inputStates.onEdit} key={shortid.generate()}>
								<input type="radio" value={option} disabled />
								<span>{option}</span>

								<div>
									<InputHandlers position={i} />
								</div>
							</li>
						))}

						<li className={props.inputStates.onEdit}>
							<input type="radio" value="default" disabled />
							<span>Ik weet het nog niet</span>
							<div>
								<span>
									<i className="fa fa-lock"></i> (default)
								</span>
							</div>
						</li>
						{explanationHandler()}
					</ul>
				)

			// If only preview
			case props.inputStates.inPreview:
				return (
					<ul className="Radiobuttons">
						{props.options.map((option, i) => (
							<li
								className={props.inputStates.inPreview}
								key={shortid.generate()}
							>
								<input
									checked={props.answer?.answer.value === option}
									type="radio"
									value={option}
									disabled
								/>
								<span>{option}</span>
							</li>
						))}

						<li className={props.inputStates.inPreview}>
							<input
								checked={!props.answer?.answer.value} // Suggestion
								type="radio"
								value="default"
								disabled
							/>
							<span>Ik weet het nog niet</span>
						</li>
						{explanationHandler()}
					</ul>
				)

			default:
				return (
					<p className="ErrorMessage">
						Radiobuttons: props.state not set! (see state.main.inputStates)
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
	return stateHandler()
}

const mapStateToProps = state => {
	return {
		inputStates: state.main.inputStates
	}
}
const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(RadioButtons))
