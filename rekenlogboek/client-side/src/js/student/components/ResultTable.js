import React from 'react'

import '../../../scss/student/components/ResultTable.scss'

export default function ResultText(props) {
	const getTableRows = () => {
		return props.results.map(result => {
			return (
				<div key={result.goalName} className="row">
					<div className="cell">{result.goalCount}</div>
					<div className="cell">{result.goalName}</div>
					<div className="cell">{result.answer}</div>
				</div>
			)
		})
	}

	return (
		<div className="result-table">
			<p>{props.description}</p>

			<div className="table">{getTableRows()}</div>
		</div>
	)
}
