import React, { useState } from 'react'
import '../../../scss/logbook-designer/components/LearnGoal.scss'

export default function LearnGoal(props) {
	const [view, setView] = useState(false)

	return (
		<li className="LearnGoal">
			<div className="top-row">
				<div className="title">
					<span>
						Leerdoel {props.index}: {props.learnGoal.title}
					</span>
				</div>

				<div className="image">
					<span>{props.learnGoal.image}</span>
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
						onClick={() => props.removeHandler(props.learnGoal.ID)}
					></i>
				</div>
			</div>

			{view ? (
				<div className="description">
					<p>{props.learnGoal.description}</p>
				</div>
			) : null}
		</li>
	)
}
