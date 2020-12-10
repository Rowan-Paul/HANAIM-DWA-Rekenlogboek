import React from 'react'

import '../../../scss/student/components/ResultTable.scss'

export default function ResultText(props) {
	const getTableRows = () => {
		{
			let columnAnswers = []
			props.answers.forEach(answer => {
				if (answer.columnPosition === props.columnPosition) {
					columnAnswers.push(answer)
				}
			})

			if (columnAnswers.length > 0)
				return props.results.map((result, i) => {
					if (columnAnswers[i].goalPosition === result.position) {
						if (columnAnswers[i].answer.value === 'default') {
							result.answer = 'Ik weet het nog niet'
						} else {
							result.answer = columnAnswers[i].answer.value
						}
					}

					return (
						<div key={result.title} className="row">
							<div className="cell">{result.title}</div>
							<div className="cell">{result.description}</div>
							<div className="cell">{result.answer}</div>
						</div>
					)
				})
		}
	}

	return (
		<div className="result-table">
			<p>{props.description}</p>

			<div className="table">{getTableRows()}</div>
		</div>
	)
}
