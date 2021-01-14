import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import shortid from 'shortid'

import Evaluation from '../../../common/InputTypes/Evaluation'
import Goal from '../../../common/logbook/Goal'
import StudentLogbookInputType from '../../../common/logbook/student-logbook/StudentLogbookInputType'

const queryParameters = () => new URLSearchParams(useLocation().search)

function GroupAnswerRow(props) {
	const [studentInfo, setStudentInfo] = useState(props.studentInfo)
	const [columns, setColumns] = useState(props.logbook.columns)

	const query = queryParameters()
	const goal = query.get('goal')

	useEffect(() => {
		setStudentInfo(props.studentInfo)
		setColumns(props.logbook.columns)
	}, [props.answers, props.columns])

	const findAnswer = column =>
		studentInfo.answers.filter(
			a =>
				a.goalPosition === parseInt(goal) && a.columnPosition == column.position
		)[0]

	const handler = () => {
		if (studentInfo) {
			return columns.map(column => {
				switch (column.position) {
					case 0:
						const goal = { title: studentInfo.student }

						return (
							<Goal
								goal={goal}
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

const mapStateToProps = state => ({
	inputTypes: state.main.inputTypes,
	inputStates: state.main.inputStates,
	logbook: state.groupOverview.logbook,
	logbookTypes: state.main.logbookTypes
})

export default connect(mapStateToProps)(GroupAnswerRow)
