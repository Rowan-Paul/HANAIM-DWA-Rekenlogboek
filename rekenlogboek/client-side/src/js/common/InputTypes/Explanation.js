import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function Explanation(props) {
	const handler = () => {
		switch (props.state) {
			// IN USE
			case props.inputStates.inUse:
				return (
					<li className="Explanation">
						<textarea
							type="text"
							name="explanation"
							placeholder="Omdat..."
							value={props.text}
							onChange={() => alert('Gebruik hier AUB redux')}
						/>
					</li>
				)

			// ON EDIT
			case props.inputStates.onEdit:
				return (
					<li className="Explanation">
						<textarea
							name="explanation"
							placeholder="Omdat..."
							type="text"
							value={props?.text}
							disabled
						/>
					</li>
				)

			// IN PREVIEW
			case props.inputStates.inPreview:
				return (
					<li className="Explanation">
						<textarea
							name="explanation"
							placeholder="Omdat..."
							type="text"
							value={props?.text}
							disabled
						/>
					</li>
				)

			default:
				return (
					<p className="ErrorMessage">
						Explanation: props.state not set! (see state.main.inputStates)
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
)(withRouter(Explanation))
