import React from 'react'

import '../../../scss/student/components/ResultTable.scss'

import Happy from '../../../img/icons/evaluation/happy.svg'
import Sad from '../../../img/icons/evaluation/sad.svg'
import Sceptic from '../../../img/icons/evaluation/sceptic.svg'

export default function ResultText(props) {
	const getTableRows = () => {
		{
			console.log(props.answers)

			let columnAnswers = []
			props.answers.forEach(answer => {
				if (answer.columnPosition === props.columnPosition) {
					columnAnswers.push(answer)
				}
			})

			// columnAnswers.sort((answer1, answer2) => {
			// 	return answer1.goalPosition < answer2.goalPosition
			// })

			console.log(columnAnswers)
			console.log(props.results)

			if (columnAnswers.length > 0)
				return props.results.map((result, i) => {
					const answer = columnAnswers.find(
						a => a.goalPosition === result.position
					)
					if (answer !== undefined) {
						if (answer.value === 'default') {
							result.answer = 'Ik weet het nog niet'
						} else if (answer.value === 'Happy') {
							result.answer = (
								<div>
									<img src={Happy} alt="Happy" />
								</div>
							)
						} else if (answer.value === 'Sceptic') {
							result.answer = (
								<div>
									<img src={Sceptic} alt="Sceptic" />
								</div>
							)
						} else if (answer.value === 'Sad') {
							result.answer = (
								<div>
									<img src={Sad} alt="Sad" />
								</div>
							)
						} else {
							result.answer = answer.answer.value
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
