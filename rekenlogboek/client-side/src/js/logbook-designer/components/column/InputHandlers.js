import React from 'react'
import { connect } from 'react-redux'
import { deleteInputOption } from '../../../redux/logbook/actions'
import '../../../../scss/common/InputTypes.scss'

function InputHandlers(props) {
	return (
		<ul className="InputHandlers">
			<li>
				<button onClick={() => props.deleteInputOption(props.position)}>
					<span>
						<i className="fa fa-trash"></i> verwijder
					</span>
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
		deleteInputOption: payload => dispatch(deleteInputOption(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputHandlers)
