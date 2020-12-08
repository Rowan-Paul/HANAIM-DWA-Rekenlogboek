import React from 'react'
import { withRouter } from 'react-router-dom'

import '../../../scss/student/containers/Instructions.scss'
import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import LearnGoal from '../components/LearnGoal'
import Jumbotron from '../../common/Jumbotron'
import LearnGoalImage from '../components/LearnGoalImage'
import Question from '../components/Question'
import Button from '../../common/Button'

function Instructions() {
	const previousPage = () => {}
	const nextPage = () => {}

	return (
		<div className="instructions student-container">
			<ProgressBar itemCount={5} done={[1, 3]} />
			<Jumbotron columns={1}>
				<div className="learn-goal-container">
					<div className="left-side">
						{/* TODO: replace with data from database */}
						<LearnGoal
							goal="Doel 1:test"
							description="Je leert getallen afronden op tientallen, honderdtallen en duizendtallen. Je leert optellen en aftrekken met de afgeronde getallen."
						/>
						<Question />
					</div>
					<div className="right-side">
						{/* TODO: replace with src from database */}
						<LearnGoalImage
							src="/uploads/goals/LearnGoalThumb.png"
							title="Dit gaf je aan na de pre-toets:"
							description="“Ik snap het, maar vind het nog lastig.”"
						/>
					</div>
				</div>
			</Jumbotron>
			{/* TODO: create handlers */}
			<div className="prev button">
				<Button color="gray" value="Vorige" handler={() => previousPage()} />
			</div>
			<div className="next button">
				<Button color="blue" value="Volgende" handler={() => nextPage()} />
			</div>
		</div>
	)
}

export default withRouter(Instructions)
