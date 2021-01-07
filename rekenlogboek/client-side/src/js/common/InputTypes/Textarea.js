import React from 'react'
import shortid from 'shortid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import '../../../scss/common/InputTypes.scss'

function Textarea(props) {
	const handler = () => {
		switch (props.state) {
			// IN USE
			case props.inputStates.inUse:
				return (
					<textarea
						className="Textarea"
						key={shortid.generate()}
						placeholder="Omschrijving toevoegen"
						defaultValue={props.answer?.answer.value}
						onBlur={e => {
							props.changeHandler(e.target.value)
						}}
					></textarea>
				)

			// ON EDIT
			case props.inputStates.onEdit:
				return (
					<textarea
						className="Textarea"
						placeholder="Omschrijving toevoegen"
						readOnly
					></textarea>
				)

			// IN PREVIEW
			case props.inputStates.inPreview:
				return (
					<textarea
						className="Textarea"
						placeholder="Omschrijving toevoegen"
						readOnly
					></textarea>
				)
			default:
				return (
					<p className="ErrorMessage">
						TextArea: props.state not set! (see state.main.inputStates)
					</p>
				)
		}
	}

	return handler()
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
)(withRouter(Textarea))
