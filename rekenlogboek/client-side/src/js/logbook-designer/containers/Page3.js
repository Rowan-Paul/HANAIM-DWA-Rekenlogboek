import React, { useState } from 'react'

import AddLearnGoal from '../components/AddLearnGoal'
import Jumbotron from '../../common/components/Jumbotron'
import InfoContainer from '../../common/components/InfoContainer'
import Illustration from '../components/Illustration'
import Image from '../../../img/illustrations/log_select_learning_goals.svg'
import '../../../scss/logbook-designer/containers/Page3.scss'
export default function Page3() {
	const [learnGoals, setlearnGoals] = useState([])

	return (
		<div className="Page3">
			<Jumbotron>
				<AddLearnGoal />
				<InfoContainer>
					{learnGoals.length > 0 ? (
						<div></div> // <LearnGoalList />
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
