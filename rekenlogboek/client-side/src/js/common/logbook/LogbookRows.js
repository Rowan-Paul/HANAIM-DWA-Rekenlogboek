import React, { useEffect, useState } from 'react'
import shortid from 'shortid'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import LogbookRow from './new-logbook/NewLogbookRow'
import StudentLogbookRow from './student-logbook/StudentLogbookRow'

export function LogbookRows(props) {
	const [goals, setGoals] = useState(props.goals)
	useEffect(() => {
		setGoals(props.goals)
	}, [props.goals])

	const rowTypeHandler = () => {
		if (goals) {
			switch (props.type) {
				case props.logbookTypes.newLogbook:
					return goals.map(goal => {
						if (goal.added) {
							return <LogbookRow key={shortid.generate()} goal={goal} />
						}
					})

				case props.logbookTypes.studentLogbook:
					return goals.map((goal, i) => (
						<StudentLogbookRow key={shortid.generate()} goal={goal} id={i} />
					))

				default:
					return (
						<p className="ErrorMessage">
							LogbookRows: props.type not set or empty! (See state.logbook.type)
						</p>
					)
			}
		}
		return (
			<p className="ErrorMessage">LogbookRows: props.goals not set or empty!</p>
		)
	}

	return <div>{rowTypeHandler()}</div>
}
const mapStateToProps = state => {
	return {
		logbookTypes: state.main.logbookTypes
	}
}
const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(LogbookRows))
