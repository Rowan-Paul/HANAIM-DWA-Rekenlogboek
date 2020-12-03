import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import AddLearnGoal from '../components/AddLearnGoal'
import Button from '../../common/Button'
import Illustration from '../components/Illustration'
import LearnGoalList from '../components/LearnGoalList'

import Image from '../../../img/illustrations/log_select_learning_goals.svg'
import InfoContainer from '../../common/InfoContainer'
import Jumbotron from '../../common/Jumbotron'

import { addLearnGoal, removeLearnGoal } from '../../../redux/logbook/actions'
import '../../../scss/teacher/containers/NewLogbook.scss'

function Page3(props) {
	const verifyGoals = () =>
		props.goals.length > 0
			? props.history.push('./overview')
			: //TODO: replace this by something less evil than a alert
			  alert('Je moet eerst leerdoelen invoeren.')

	return (
		<div className="new-logbook">
			<Jumbotron>
				<AddLearnGoal handler={newGoal => props.addLearnGoal(newGoal)} />
				<InfoContainer>
					{props.goals.length > 0 ? (
						<LearnGoalList
							goals={props.goals}
							removeHandler={ID => props.removeLearnGoal(ID)}
						/>
					) : (
						<Illustration
							title="Maak een leerdoel aan om hem hieronder te laten weergeven."
							image={Image}
						/>
					)}
				</InfoContainer>
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
		goals: state.logbook.goals
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addLearnGoal: payload => dispatch(addLearnGoal(payload)),
		removeLearnGoal: payload => dispatch(removeLearnGoal(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page3))
