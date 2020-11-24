import React from 'react'
import LearnGoal from './LearnGoal'

import '../../../scss/logbook-designer/components/LearnGoalList.scss'
export default function LearnGoalList(props) {
	return (
		<div className="LearnGoalList">
			<h1>Leerdoelen</h1>
			<ul>
				{props.learnGoals.map((learnGoal, i) => (
					<LearnGoal
						key={learnGoal.ID}
						index={++i}
						learnGoal={learnGoal}
						removeHandler={props.removeHandler}
					/>
				))}
			</ul>
		</div>
	)
}
