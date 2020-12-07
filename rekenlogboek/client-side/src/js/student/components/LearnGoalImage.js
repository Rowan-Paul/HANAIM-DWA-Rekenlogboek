import React from 'react'

// import a from '../../../img/temp/LearnGoalThumb.png'

export default function LearnGoalImage(props) {
	return (
		<div className="learn-goal-image">
			<h2>{props?.title}</h2>
			<img
				src={'http://localhost:3000' + props.src}
				alt="leerdoel afbeelding"
			/>
		</div>
	)
}
