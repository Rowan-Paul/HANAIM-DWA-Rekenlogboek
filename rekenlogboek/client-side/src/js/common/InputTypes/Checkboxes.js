import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import shortid from 'shortid'
import InputHandlers from '../../logbook-designer/components/column/InputHandlers'

import '../../../scss/common/InputTypes.scss'
import Explanation from './Explanation'

function Checkboxes(props) {
	const newAnswer = e => {
		if (props.readonly) {
			const answers = [...props.inputAnswer]
			if (answers.includes(e.target.value)) {
				const i = answers.indexOf(5)
				answers.splice(i, 1)
			} else {
				answers.push(e.target.value)
			}
			console.log(answers)
			props.changeAnswer(answers)
		}
	}

	const newExplanation = e => {
		if (props.readonly) {
			props.changeExplanation(e.target.value)
		}
	}

	const stateHandler = () => {
		switch (props.state) {
			// If active
			case props.inputStates.inUse:
				return props.options.map((option, i) => (
					<li className="inUse" key={shortid.generate()}>
						<input type="checkbox" value={option} />
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
				return props.options.map((option, i) => (
					<li className="inPreview" key={shortid.generate()}>
						<input type="checkbox" value={option} disabled />
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
		if (props.explanation) {
			return <Explanation />
		}
	}
	return (
		<ul className="Checkboxes">
			{stateHandler()}
			{explanationHandler()}
		</ul>
	)
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
)(withRouter(Checkboxes))
