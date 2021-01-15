import React from 'react'

export default function LearnGoal(props) {
	return (
		<div className="learn-goal">
			<h1 className={`learngoal${props.currentGoal + 1}`}>
				Leerdoel {props.currentGoal + 1}: {props.goal}
			</h1>
			<p>{props.description}</p>
		</div>
	)
}
