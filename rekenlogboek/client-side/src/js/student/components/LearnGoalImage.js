import React from 'react'

// import a from '../../../img/temp/LearnGoalThumb.png'

export default function LearnGoalImage(props) {
	const loadImage = () => {
		if (props.src) {
			let image = new Image()
			let imageURL =
				process.env.REACT_APP_SERVER_ADDRESS + '/uploads/goals/' + props.src
			image.src = imageURL
			if (image.width !== 0) {
				return <img src={imageURL} alt="leerdoel afbeelding" />
			}
		}
	}

	return (
		<div className="learn-goal-image">
			<h2>{props?.title}</h2>
			<p>{props?.description}</p>
			{loadImage()}
		</div>
	)
}
