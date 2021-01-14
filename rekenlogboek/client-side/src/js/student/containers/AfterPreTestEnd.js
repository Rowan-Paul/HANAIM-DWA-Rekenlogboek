import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import ResultText from '../components/ResultText'
import ResultTable from '../components/ResultTable'

import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'

import { setCurrentGoal } from '../../redux/studentlogbook/actions'

function AfterPreTestEndUI(props) {
	const previousPage = () => {
		props.history.push('/student/pretest')
	}

	const getProgressBarNumbers = () => {
		const numbers = props.answers.map(answer => {
			if (answer.columnPosition === 1) {
				return answer.goalPosition
			}
		})
		return numbers.filter(number => number !== undefined)
	}

	return (
		<div className="end-screen student-container">
			<ProgressBar
				itemCount={props.allGoals.length}
				done={getProgressBarNumbers()}
				changeHandler={goal => {
					props.setCurrentGoal(goal)
					props.history.push('/student/pretest')
				}}
			/>
			<Jumbotron columns={1}>
				<div className="learn-goal-container">
					<div className="left-side">
						<ResultText
							title="Je bent klaar!"
							description="De door jou ingevoerde antwoorden zijn naar jouw leraar verstuurd."
							image=""
						/>
					</div>
					<div className="right-side">
						<ResultTable
							results={props.allGoals}
							answers={props.answers}
							columnPosition={1}
							description="Dit heb je bij je leerdoelen beantwoord:"
						/>
					</div>
				</div>
			</Jumbotron>
			<div className="buttons">
				<div className="prev button">
					<Button color="gray" value="Vorige" handler={() => previousPage()} />
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	answers: state.studentLogbook.studentlogbook.answers,
	allGoals: state.studentLogbook.logbook.goals
})

const mapDispatchToProps = dispatch => ({
	setCurrentGoal: goal => dispatch(setCurrentGoal(goal))
})

export const AfterPreTestEnd = connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AfterPreTestEndUI))
