import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'

import LogbookRow from './LogbookRow'

function LogbookRows(props) {
	const [goals, setGoals] = useState(props.goals)
	useEffect(() => {
		setGoals(props.goals)
	}, [props.goals])

	return (
		<div>
			{goals.map(goal =>
				goal.added ? (
					<LogbookRow
						key={shortid.generate()}
						goal={goal}
						readonly={props.readonly}
					/>
				) : (
					''
				)
			)}
		</div>
	)
}
const mapStateToProps = state => {
	return {
		goals: state.logbook.goals
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogbookRows)
