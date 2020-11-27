import '../../../scss/logbook-designer/components/LogbookOverview.scss'
import React from 'react'

export default function LogbookOverview(props) {
	return (
		<div className="LogbookOverview">
			<h1>Logboek overzicht</h1>

			<div className="container">
				{/* Group  */}
				<label>Groep:</label>
				<ul>
					<li>Groep {props.group}</li>
				</ul>

				{/* column inputType */}
				<label>Kolom types:</label>
				<ul>
					{props.columns.map((column, i) => (
						<li key={`${column.inputType}${i}`}>
							Kolom {++i}: {column.inputType}
						</li>
					))}
				</ul>

				{/* learn goals  */}
				<label>Leerdoelen:</label>
				<ul>
					{props.goals.map((goal, i) => (
						<li key={goal.ID}>
							Leerdoel {++i}: {goal.title}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
