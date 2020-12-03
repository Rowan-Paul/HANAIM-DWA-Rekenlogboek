import React, { useState } from 'react'
import '../../../scss/logbook-designer/components/LearnGoal.scss'

export default function LearnGoal(props) {
	const [view, setView] = useState(false)

	return (
		<li className="LearnGoal">
			<div className="top-row">
				<div className="title">
					<span>
						Leerdoel {props.index}: {props.goal.title}
					</span>
				</div>

				<div className="image">
					<span>{props.goal.imageName}</span>
				</div>

				<div className="toggle-description">
					<i
						className={view ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}
						onClick={() => setView(!view)}
					></i>
				</div>

				<div className="delete">
					<i
						className="fa fa-trash"
						onClick={() => props.removeHandler(props.goal.ID)}
					></i>
				</div>
			</div>

			{view ? (
				<div className="description">
					<p>{props.goal.description}</p>
				</div>
			) : null}
		</li>
	)
}
