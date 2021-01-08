import React from 'react'
import { connect } from 'react-redux'
import { deleteGoal, modalShow } from '../../redux/logbook/actions'

function EditGoal(props) {
	// Modal pops up
	const showModal = () => {
		props.modalShow({
			position: props.position,
			title: 'Leerdoel wijzigen'
		})
	}

	return (
		<div>
			<button onClick={() => showModal()}>
				<i className="fa fa-pencil"></i>
			</button>

			<button onClick={() => props.deleteGoal(props.position)}>
				<i className="fa fa-trash"></i>
			</button>
		</div>
	)
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {
		deleteGoal: payload => dispatch(deleteGoal(payload)),
		modalShow: payload => dispatch(modalShow(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGoal)
