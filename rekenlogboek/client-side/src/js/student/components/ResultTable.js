import React from 'react'

import '../../../scss/student/components/ResultTable.scss'

export default function ResultText(props) {
	const getTableRows = () => {
		{
			return props.results.map((result, i) => {
				if (props.answers[i].goalPosition === result.position) {
					result.answer = props.answers[i].answer.value
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
