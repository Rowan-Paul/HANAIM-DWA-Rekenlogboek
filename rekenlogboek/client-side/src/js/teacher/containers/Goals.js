import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postImage, setGoal } from '../../../redux/logbook/actions'

import AddGoals from '../components/goals/AddGoals'
import Button from '../../common/Button'
import Jumbotron from '../../common/Jumbotron'
import LogbookFrame from '../components/logbook/LogbookFrame'
import LogbookHeader from '../components/logbook/LogbookHeader'
import LogbookRows from '../components/logbook/LogbookRows'
import Modal from '../components/logbook/Modal'
import TopBar from '../components/logbook/TopBar'

import '../../../scss/teacher/containers/NewLogbook.scss'

function Goals(props) {
	const verifyGoals = () =>
		props.goals.length > 0
			? props.history.push('./overview')
			: //TODO: replace this by something less evil than a alert
			  alert('Je moet eerst leerdoelen invoeren.')

	const addGoal = () => {
		props.postImage()
		props.setGoal()
	}

	// useEffect for model / overlay
	useEffect(() => {}, [props.modalVisible])
	return (
		<div className="new-logbook">
			{props.modalVisible && (
				<Modal handler={addGoal}>
					<AddGoals />
				</Modal>
			)}
			<Jumbotron>
				<TopBar title="Leerdoelen toevoegen" button />

				<LogbookFrame>
					<LogbookHeader />
					<LogbookRows />
				</LogbookFrame>
			</Jumbotron>

			<div className="prev button">
				<Button
					color="gray"
					value="Vorige"
					handler={() => props.history.push('./columns')}
				/>
			</div>
			<div className="next button">
				<Button color="blue" value="Volgende" handler={() => verifyGoals()} />
			</div>
		</div>
	)
}
const mapStateToProps = state => {
	return {
		goals: state.logbook.goals,
		modalVisible: state.logbook.modal.visible
	}
}

const mapDispatchToProps = dispatch => {
	return {
		postImage: () => dispatch(postImage()),
		setGoal: () => dispatch(setGoal())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Goals))
