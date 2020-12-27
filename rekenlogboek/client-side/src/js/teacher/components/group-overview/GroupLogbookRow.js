import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Button from '../../../common/Button'

import '../../../../scss/teacher/components/groep-overview/GroupLogbookRow.scss'

function GroupLogbookRow(props) {
	const [columns, setColumns] = useState(props.columns)
	const [goal, setGoal] = useState(props.goal)

	const handler = () => {
		return (
			<li className="Row group_logbook_row">
				{columns.map(column => {
					console.log(column)
					switch (column.position) {
						case 0:
							return (
								<div className="Cell">
									<div className="Title">
										<h4>
											Leerdoel {goal.position + 1}: {goal.title}
										</h4>
									</div>

									<div className="Main">
										<p>{goal.description}</p>

										<Button color="blue" value="Antwoorden bekijken" />
									</div>
								</div>
							)

						default:
							return (
								<div className="Cell">
									<div className="Title">
										<h4>{column.title}</h4>
										<span>{column.input.type}</span>
									</div>
								</div>
							)
					}
				})}
			</li>
		)
	}

	useEffect(() => {
		setColumns(props.columns)
		setGoal(props.goal)
	}, [props.columns, props.goal])

	return handler()
}

const mapStateToProps = state => {
	return {
		columns: state.groupOverview.logbook.columns
	}
}
const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(GroupLogbookRow))
