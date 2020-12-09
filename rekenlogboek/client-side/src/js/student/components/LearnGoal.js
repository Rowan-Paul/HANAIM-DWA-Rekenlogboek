import React from 'react'

export default function LearnGoal(props) {
	return (
		<div className="learn-goal">
			<h1>{props.goal}</h1>
			<p>{props.description}</p>
		</div>
	)
}
