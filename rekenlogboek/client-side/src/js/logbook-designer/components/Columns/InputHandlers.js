import React from 'react'
import { connect } from 'react-redux'
import {
	deleteInputValue,
	explanationFieldToggle
} from '../../../../redux/visual/actions'
import '../../../../scss/common/InputTypes.scss'

function InputHandlers(props) {
	return (
		<ul className="InputHandlers">
			<li>
				<button onClick={() => props.explanationFieldToggle(props.position)}>
					{props.explanation ? (
						<i className="fa fa-close"></i>
					) : (
						<i className="fa fa-comment"></i>
					)}
				</button>
			</li>

			<li>
				<button onClick={() => props.deleteInputValue(props.position)}>
					<i className="fa fa-trash"></i>
				</button>
			</li>
		</ul>
	)
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {
		deleteInputValue: payload => dispatch(deleteInputValue(payload)),
		explanationFieldToggle: payload => dispatch(explanationFieldToggle(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputHandlers)
