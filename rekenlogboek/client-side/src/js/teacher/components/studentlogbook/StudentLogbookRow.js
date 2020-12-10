import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Evaluation from '../../../common/InputTypes/Evaluation'
import Goal from '../logbook/Goal'
import StudentLogbookInputType from './StudentLogbookInputType'

function StudentLogbookRow(props) {
	const [inputAnswer1, setAnswer1] = useState('')
	const [inputAnswer2, setAnswer2] = useState('')
	const [studentExplanation1, setExplanation1] = useState('')
	const [studentExplanation2, setExplanation2] = useState('')
	const [studentEvaluation, setEvaluation] = useState('')

	useEffect(() => {
		const answersGoal = props.answers.filter(
			answer => answer.goalPosition === props.goalid
		)

		const answer1 = answersGoal.filter(answer => answer.columnPosition === 1)[0]

		const answer2 = answersGoal.filter(answer => answer.columnPosition === 2)[0]
		const answer3 = answersGoal.filter(answer => answer.columnPosition === 3)[0]

		if (answer1 !== undefined) {
			setAnswer1(answer1.answer.value)
			setExplanation1(answer1.answer.explanation)
		}
		if (answer2 !== undefined) {
			setAnswer2(answer2.answer.value)
			setExplanation2(answer2.answer.explanation)
		}
		if (answer3 !== undefined) {
			setEvaluation(answer3.answer.value)
		}
	})
	return (
		<div className="Row Body">
			<Goal goal={props.goal} />
			<StudentLogbookInputType
				position={1}
				type={'edit'}
				inputAnswer={inputAnswer1}
				studentExplanation={studentExplanation1}
				row={props.goalid}
			/>
			<StudentLogbookInputType
				position={2}
				type={'edit'}
				inputAnswer={inputAnswer2}
				studentExplanation={studentExplanation2}
				row={props.goalid}
			/>
			<Evaluation type={'edit'} inputAnswer={studentEvaluation} />
		</div>
	)
}

const mapStateToProps = state => {
	return {
		answers: state.logbookoverview.activeStudentlogbook.answers
	}
}

export default connect(mapStateToProps, null)(StudentLogbookRow)
