import React, { useEffect, useState } from 'react'
import shortid from 'shortid'
import { connect } from 'react-redux'

import Evaluation from '../../InputTypes/Evaluation'
import Goal from '../Goal'
import StudentLogbookInputType from './StudentLogbookInputType'

function StudentLogbookRow(props) {
	const [answers, setAnswers] = useState(props.answers)
	const [columns, setColumns] = useState(props.columns)
	const [goal, setGoal] = useState(props.goal)

	useEffect(() => {
		setAnswers(props.answers)
		setColumns(props.columns)
		setGoal(props.goal)
	}, [props.answers, props.columns, props.goal])

	const findAnswer = column =>
		answers.filter(
			a =>
				a.goalPosition === goal.position && a.columnPosition == column.position
		)[0]

	const handler = () => {
		if (answers) {
			return columns.map(column => {
				switch (column.position) {
					case 0:
						return (
							<Goal
								goal={props.goal}
								key={shortid.generate()}
								state={props.inputStates.inPreview}
							/>
						)
					case 3:
						return (
							<Evaluation
								answer={findAnswer(column)}
								key={shortid.generate()}
								input={column.input}
								state={props.inputStates.inPreview}
							/>
						)

					default:
						return (
							<StudentLogbookInputType
								answer={findAnswer(column)}
								key={shortid.generate()}
								input={column.input}
								position={column.columnPosition}
								state={props.inputStates.inPreview}
							/>
						)
				}
			})
		}
	}

	return <div className="Row Body">{handler()}</div>
}

const mapStateToProps = state => {
	return {
		inputStates: state.main.inputStates,
		answers: state.logbookoverview.activeStudentlogbook.answers,
		columns: state.logbookoverview.currentLogbook.columns
	}
}

export default connect(mapStateToProps, null)(StudentLogbookRow)
