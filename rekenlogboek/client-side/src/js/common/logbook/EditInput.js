import React from 'react'
import { connect } from 'react-redux'
import { modalShow } from '../../redux/logbook/actions'

function EditInput(props) {
	// Modal pops up
	const showModal = () => {
		props.modalShow({
			position: props.position,
			title: 'Kolom toevoegen'
		})
	}
	return (
		<li className="Header">
			<h4>Invoertype:</h4>

			<button onClick={() => showModal()}>
				<i className="fa fa-pencil"></i>
			</button>
		</li>
	)
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {
		modalShow: payload => dispatch(modalShow(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInput)
