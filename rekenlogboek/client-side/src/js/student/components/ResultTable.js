import React from 'react'

import '../../../scss/student/components/ResultTable.scss'

export default function ResultText(props) {
	const getTableRows = () => {
		return props.results.map(result => {
			return (
				<tr key={result.goalName}>
					<td>{result.goalCount}</td>
					<td>{result.goalName}</td>
					<td>{result.answer}</td>
				</tr>
			)
		})
	}

	return (
		<div className="result-table">
			<p>{props.description}</p>

			<table>{getTableRows()}</table>
		</div>
	)
}
