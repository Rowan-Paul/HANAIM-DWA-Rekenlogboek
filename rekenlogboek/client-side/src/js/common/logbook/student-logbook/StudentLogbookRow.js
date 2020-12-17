import React, { useEffect, useState } from 'react'
import shortid from 'shortid'
import { connect } from 'react-redux'

import Evaluation from '../../InputTypes/Evaluation'
import Goal from '../Goal'
import StudentLogbookInputType from './StudentLogbookInputType'

function StudentLogbookRow(props) {
	const [goalAnswers, setGoalAnswers] = useState()

	useEffect(() => {
		const goalAnswers = props.answers.filter(
			answer => answer.goalPosition === props.goal.position
		)
		setGoalAnswers(goalAnswers)
	}, [props.answers])

	const handler = () => {
		if (goalAnswers) {
			return goalAnswers.map(goalAnswer => {
				if (goalAnswer.columnPosition === 3) {
					return <Evaluation key={shortid.generate()} />
				}
				return (
					<StudentLogbookInputType
						answer={goalAnswer.answer}
						key={shortid.generate()}
						position={goalAnswer.columnPosition}
						state={props.inputStates.inPreview}
					/>
				)
			})
		}
	}

	return (
		<div className="Row Body">
			<Goal goal={props.goal} state={props.inputStates.inPreview} />
			{handler()}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		answers: state.logbookoverview.activeStudentlogbook.answers,
		inputStates: state.main.inputStates
	}
}

export default connect(mapStateToProps, null)(StudentLogbookRow)
