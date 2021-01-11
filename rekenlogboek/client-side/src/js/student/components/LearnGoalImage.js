import React from 'react'

// import a from '../../../img/temp/LearnGoalThumb.png'

export default function LearnGoalImage(props) {
	return (
		<div className="learn-goal-image">
			<h2>{props?.title}</h2>
			<p>{props?.description}</p>
			<img
				src={
					process.env.REACT_APP_SERVER_ADDRESS + '/uploads/goals/' + props.src
				}
				alt="leerdoel afbeelding"
			/>
		</div>
	)
}
