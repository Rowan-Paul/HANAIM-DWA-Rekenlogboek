import React from 'react'

import '../../../../scss/teacher/components/logbook/Goal.scss'
export default function Goal(props) {
	return (
		<div className="Goal Cell">
			<ul>
				<li>
					<h4>{props.goal.title}</h4>
				</li>
				<li>
					<p>{props.goal.description}</p>
				</li>
				{props.goal.imageLink && (
					<li>
						<img
							src={
								'http://localhost:3000/uploads/goals/' + props.goal.imageLink
							}
						/>
					</li>
				)}
			</ul>
		</div>
	)
}
