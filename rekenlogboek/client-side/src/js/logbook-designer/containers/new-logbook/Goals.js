import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postImage, setGoal } from '../../../redux/logbook/actions'

import AddGoals from '../../components/goals/AddGoals'
import Button from '../../../common/Button'
import Jumbotron from '../../../common/Jumbotron'
import LogbookFrame from '../../../common/logbook/LogbookFrame'
import LogbookHeader from '../../../common/logbook/LogbookHeader'
import LogbookRows from '../../../common/logbook/LogbookRows'
import Modal from '../../../common/logbook/Modal'
import TopBar from '../../../common/logbook/TopBar'

import '../../../../scss/logbook-designer/NewLogbook.scss'

function Goals(props) {
	const [nextButtonColor, setNextButtonColor] = useState('gray')
	const [goals, setGoals] = useState(props.goals)
	const verifyGoals = () =>
		props.goals.length > 0
			? props.history.push('./overview')
			: alert('Je moet eerst leerdoelen invoeren.')

	const addGoal = () => {
		const goal = props.goals[props.goals.length - 1]

		if (goal.title.length < 1) {
			alert('Voer een titel in')
		} else {
			props.postImage()
			props.setGoal()
		}
	}

	const checkNextButtonColor = () => {
		if (!props.goals.length > 0) {
			setNextButtonColor('gray')
		} else {
			setNextButtonColor('blue')
		}
	}

	useEffect(() => {
		checkNextButtonColor()
		setGoals(goals)

		// Prevent skipping columns page
		props.columns.map(c => !c.added && props.history.push('./columns'))
	}, [props.goals])

	return (
		<div className="new-logbook">
			{props.modalVisible && (
				<Modal handler={addGoal} btnValue="Toevoegen">
					<AddGoals />
				</Modal>
			)}
			<Jumbotron>
				<TopBar title="Leerdoelen toevoegen" button />

				<LogbookFrame>
					<LogbookHeader
						columns={props.columns}
						type={props.logbookTypes.newLogbook}
					/>
					<LogbookRows
						goals={props.goals}
						type={props.logbookTypes.newLogbook}
					/>
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
				<Button
					color={nextButtonColor}
					value="Volgende"
					handler={() => verifyGoals()}
				/>
			</div>
		</div>
	)
}
const mapStateToProps = state => ({
	columns: state.logbook.columns,
	goals: state.logbook.goals,
	logbookTypes: state.main.logbookTypes,
	modalVisible: state.logbook.modal.visible
})

const mapDispatchToProps = dispatch => ({
	postImage: () => dispatch(postImage()),
	setGoal: () => dispatch(setGoal())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Goals))
