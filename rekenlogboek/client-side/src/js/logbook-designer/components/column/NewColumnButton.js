import React from 'react'
import { connect } from 'react-redux'
import { modalShow } from '../../../redux/logbook/actions'

function NewColumnButton(props) {
	return (
		<div className="Plus">
			<button
				onClick={() =>
					props.modalShow({
						position: props.position,
						title: 'Kolom toevoegen'
					})
				}
			>
				<i className="fa fa-plus"></i>
			</button>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		modalShow: payload => dispatch(modalShow(payload))
	}
}

export default connect(mapDispatchToProps)(NewColumnButton)
