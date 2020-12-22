import React from 'react'
import { connect } from 'react-redux'

import Checkboxes from '../../common/InputTypes/Checkboxes'
import RadioButtons from '../../common/InputTypes/Radiobuttons'
import Textarea from '../../common/InputTypes/Textarea'

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
					/>
				)

			// TEXTAREA
			case props.inputTypes.textarea:
				return <Textarea state={props.state} />
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

export default connect(mapStateToProps, null)(Question)
