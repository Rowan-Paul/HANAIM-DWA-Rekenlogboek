import React from 'react'
import { withRouter } from 'react-router-dom'

import '../../../scss/student/containers/AfterPreTest.scss'
import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'

function AfterPreTestEnd() {
	const saveAnswers = () => {}

	return (
		<div className="after-pre-test student-container">
			<ProgressBar itemCount={5} done={[0, 1, 2, 3, 4]} />
			<Jumbotron columns={1}>
				<div className="learn-goal-container">
					<div className="left-side"></div>
					<div className="right-side"></div>
				</div>
			</Jumbotron>
			<div className="next button">
				<Button color="blue" value="Afsluiten" handler={() => saveAnswers()} />
			</div>
		</div>
	)
}

export default withRouter(AfterPreTestEnd)
