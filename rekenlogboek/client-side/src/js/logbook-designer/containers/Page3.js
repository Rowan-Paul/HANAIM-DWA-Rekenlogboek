import React, { useState } from 'react'

import AddLearnGoal from '../components/AddLearnGoal'
import Jumbotron from '../../common/components/Jumbotron'
import InfoContainer from '../../common/components/InfoContainer'
import Illustration from '../components/Illustration'
import Image from '../../../img/illustrations/log_select_learning_goals.svg'
import LearnGoalList from '../components/LearnGoalList'
import '../../../scss/logbook-designer/containers/Page3.scss'
export default function Page3() {
	const [learnGoals, setlearnGoals] = useState([])

	const removeHandler = ID => {
		const newList = learnGoals.filter(goal => goal.ID !== ID)

		console.log(newList)
		setlearnGoals(newList)
	}
	const learnGoalHandler = newGoal => setlearnGoals([...learnGoals, newGoal])

	return (
		<div className="Page3">
			<Jumbotron>
				<AddLearnGoal handler={learnGoalHandler} />
				<InfoContainer>
					{learnGoals.length > 0 ? (
						<LearnGoalList
							learnGoals={learnGoals}
							removeHandler={removeHandler}
						/>
					) : (
						<Illustration
							title="Maak een leerdoel aan om hem hieronder te laten weergeven."
							image={Image}
						/>
					)}
				</InfoContainer>
			</Jumbotron>
		</div>
	)
}
