import React from 'react'
import LearnGoal from './LearnGoal'

import '../../../scss/teacher/components/LearnGoalList.scss'
export default function LearnGoalList(props) {
	return (
		<div className="LearnGoalList">
			<h1>Leerdoelen</h1>
			<ul>
				{props.goals.map((goal, i) => (
					<LearnGoal
						key={goal.ID}
						index={++i}
						goal={goal}
						removeHandler={props.removeHandler}
					/>
				))}
			</ul>
		</div>
	)
}
