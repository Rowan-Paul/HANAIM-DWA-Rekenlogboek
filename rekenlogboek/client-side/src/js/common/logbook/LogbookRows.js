import React, { useEffect, useState } from 'react'
import shortid from 'shortid'
import StudentLogbookRow from './student-logbook/StudentLogbookRow'

import LogbookRow from './LogbookRow'

export default function LogbookRows(props) {
	const [goals, setGoals] = useState(props.goals)
	useEffect(() => {
		setGoals(props.goals)
	}, [props.goals])

	return (
		<div>
			{goals.map((goal, i) => {
				switch (props.type) {
					case 'studentLogbooks':
						return (
							<StudentLogbookRow key={shortid.generate()} goal={goal} id={i} />
						)

					default:
						goal.added && (
							<LogbookRow
								key={shortid.generate()}
								goal={goal}
								readonly={props.readonly}
							/>
						)
				}
			})}
		</div>
	)
}
