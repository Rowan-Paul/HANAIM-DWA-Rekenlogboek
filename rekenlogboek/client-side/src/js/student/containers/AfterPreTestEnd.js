import React from 'react'
import { withRouter } from 'react-router-dom'

import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'
import ResultText from '../components/ResultText'
import ResultTable from '../components/ResultTable'

function AfterPreTestEnd() {
	const saveAnswers = () => {}

	const results = [
		{ goalCount: 'Doel 1', goalName: 'Optellen', answer: 'Ik snap het goed' },
		{
			goalCount: 'Doel 2',
			goalName: 'Breuken',
			answer: 'Ik vind het nog erg moeilijk'
		},
		{
			goalCount: 'Doel 3',
			goalName: 'Keersommen',
			answer: 'Ik snap het, maar vind het nog lastig'
		}
	]

	return (
		<div className="end-screen student-container">
			<ProgressBar itemCount={5} done={[0, 1, 2, 3, 4]} />
			<Jumbotron columns={1}>
				<div className="learn-goal-container">
					<div className="left-side">
						<ResultText
							title="Je bent klaar!"
							description="De door jou ingevoerde antwoorden zijn naar jouw leerkracht verstuurd. Mocht je ze willen aanpassen dan kan je nog terug gaan naar de vorige pagina’s door op vorige te klikken of door op een van de blokjes hierboven te klikken."
							image=""
						/>
					</div>
					<div className="right-side">
						<ResultTable
							results={results}
							description="Dit heb je bij je leerdoelen beantwoord:"
						/>
					</div>
				</div>
			</Jumbotron>
			<div className="next button">
				<Button color="blue" value="Afsluiten" handler={() => saveAnswers()} />
			</div>
		</div>
	)
}

export default withRouter(AfterPreTestEnd)
