import React, { useEffect, useState } from 'react'
import shortid from 'shortid'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import GroupOverviewRow from '../../teacher/components/group-overview/GroupOverviewRow'
import LogbookRow from './new-logbook/NewLogbookRow'
import StudentLogbookRow from './student-logbook/StudentLogbookRow'
import GroupAnswerRow from '../../teacher/components/group-overview/GroupAnswerRow'

export function LogbookRows(props) {
	const [goals, setGoals] = useState(props.goals)
	useEffect(() => {
		setGoals(props.goals)
	}, [props.goals])

	const rowTypeHandler = () => {
		if (goals) {
			switch (props.type) {
				// GROUP ANSWERS
				case props.logbookTypes.groupAnswer:
					return goals.map(studentInfo => (
						<GroupAnswerRow
							key={shortid.generate()}
							studentInfo={studentInfo}
						/>
					))
				// GROUP LOGBOOK
				case props.logbookTypes.groupOverview:
					return goals.map((goal, i) => (
						<GroupOverviewRow
							key={shortid.generate()}
							goal={goal}
							rowPosition={i}
						/>
					))

				// NEW LOGBOOK
				case props.logbookTypes.newLogbook:
					return goals.map(goal => {
						if (goal.added) {
							return <LogbookRow key={shortid.generate()} goal={goal} />
						}
					})

				// STUDENT LOGBOOK
				case props.logbookTypes.studentLogbook:
					return goals.map(goal => (
						<StudentLogbookRow key={shortid.generate()} goal={goal} />
					))

				default:
					return (
						<p className="ErrorMessage">
							LogbookRows: props.type not set or empty! (See
							props..logbookTypes)
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
const mapStateToProps = state => ({
	logbookTypes: state.main.logbookTypes
})

export default connect(mapStateToProps)(withRouter(LogbookRows))
