import '../../../scss/logbook-designer/containers/Page3.scss'

import React from 'react'
import { useHistory } from 'react-router-dom'
import AddLearnGoal from '../components/AddLearnGoal'
import Button from '../../common/Button'
import { connect } from 'react-redux'
import Illustration from '../components/Illustration'
import Image from '../../../img/illustrations/log_select_learning_goals.svg'
import InfoContainer from '../../common/InfoContainer'
import Jumbotron from '../../common/Jumbotron'
import LearnGoalList from '../components/LearnGoalList'
import Button from '../../common/Button'

import { addLearnGoal, removeLearnGoal } from '../../../redux/logbook/actions'
import '../../../scss/logbook-designer/containers/NewLogbook.scss'

function Page3(props) {
	const removeHandler = ID => props.removeLearnGoal(ID)
	const learnGoalHandler = newGoal => props.addLearnGoal(newGoal)

	let history = useHistory()
	const changePage = page => {
		history.push('/logbook-designer/' + page)
	}

	return (
		<div className="new-logbook">
			<Jumbotron>
				<AddLearnGoal handler={learnGoalHandler} />
				<InfoContainer>
					{props.goals.length > 0 ? (
						<LearnGoalList goals={props.goals} removeHandler={removeHandler} />
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
					handler={() => changePage('new-logbook/page-2')}
				/>
			</div>
			<div className="next button">
				<Button
					color="blue"
					value="Volgende"
					handler={() => changePage('new-logbook/page-4')}
				/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Page3)
