import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'

import StudentLogbookRow from './StudentLogbookRow'

function StudentLogbookRows(props) {
	const [goals, setGoals] = useState(props.goals)
	useEffect(() => {
		setGoals(props.goals)
	}, [props.goals])

	return (
		<div>
			{goals.map((goal, id) => (
				<StudentLogbookRow key={shortid.generate()} goal={goal} goalid={id} />
			))}
		</div>
	)
}
const mapStateToProps = state => {
	return {
		goals: state.logbookoverview.currentLogbook.goals
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentLogbookRows)
