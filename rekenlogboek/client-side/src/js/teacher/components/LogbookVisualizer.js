import '../../../scss/teacher/components/LogbookVisualizer.scss'
import React from 'react'

export default function LogbookVisualizer(props) {
	return (
		<div className="LogbookVisualizer">
			<h1>Logboek visueel</h1>

			<div>
				<table border="1">
					<thead>
						<tr>
							<th>Doelen</th>

							{/* Create dynamic columns  */}
							{props.columns.map(column => (
								<th key={column.position}>{column.title}</th>
							))}
						</tr>
					</thead>

					<tbody>
						{/* create dynamic rows for each goal */}
						{props.goals.map((goal, i) => (
							<tr key={goal.ID}>
								<td>
									<span>
										Doel {++i}: {goal.title}
									</span>

									<p>{goal.description}</p>

									<img src={'http://localhost:3000' + goal.imageLink} />
								</td>

								{/* Get inputtype for each column  */}
								{props.columns.map(column => (
									<td key={column.position}>{column.inputType}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
