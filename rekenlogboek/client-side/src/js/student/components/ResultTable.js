import React from 'react'

import '../../../scss/student/components/ResultTable.scss'

import Happy from '../../../img/icons/evaluation/happy.svg'
import Sad from '../../../img/icons/evaluation/sad.svg'
import Sceptic from '../../../img/icons/evaluation/sceptic.svg'

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
						} else if (columnAnswers[i].answer.value === 'Happy') {
							result.answer = (
								<div>
									<img src={Happy} alt="Happy" />
								</div>
							)
						} else if (columnAnswers[i].answer.value === 'Sceptic') {
							result.answer = (
								<div>
									<img src={Sceptic} alt="Sceptic" />
								</div>
							)
						} else if (columnAnswers[i].answer.value === 'Sad') {
							result.answer = (
								<div>
									<img src={Sad} alt="Sad" />
								</div>
							)
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
