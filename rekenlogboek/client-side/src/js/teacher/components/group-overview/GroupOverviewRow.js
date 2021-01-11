import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Button from '../../../common/Button'

import '../../../../scss/teacher/components/groep-overview/GroupOverviewRow.scss'
import { getLogbookGroupOverview } from '../../../redux/group-overview/actions'
import shortid from 'shortid'

function GroupOverviewRow(props) {
	const [overview, setOverview] = useState(props.overview)
	const [columns, setColumns] = useState(props.columns)
	const [goal, setGoal] = useState(props.goal)

	useEffect(() => {
		setOverview(props.overview)
		setColumns(props.columns)
		setGoal(props.goal)
	}, [props])

	const redirect = (goal = '', column = '', answer = '') =>
		props.history.push(
			`/teacher/group-overview/answers?goal=${goal}&column=${column}&answer=${answer}`
		)

	const listAnswers = (row, column) => {
		if (overview) {
			if (overview.rows[row]) {
				if (overview.rows[row][column]) {
					return overview.rows[row][column].map(overviewAnswer => (
						<li
							key={shortid.generate()}
							onClick={() => redirect(row, column, overviewAnswer.value)}
						>
							<span>
								{overviewAnswer.count} x {overviewAnswer.value}
							</span>

							<i className="fa fa-info-circle" />
						</li>
					))
				}
			}
		}
	}

	const handler = () => {
		return (
			<li className="Row group_logbook_row">
				{columns.map(column => {
					switch (column.position) {
						case 0:
							return (
								<div className="Cell" key={shortid.generate()}>
									<div className="Title">
										<h4>
											Leerdoel {goal.position + 1}: {goal.title}
										</h4>
									</div>

									<div className="Main">
										<p>{goal.description}</p>

										<button
											className={`goal_${goal.position + 1}`}
											onClick={() => redirect(goal.position)}
										>
											Antwoorden bekijken
										</button>
									</div>
								</div>
							)

						default:
							return (
								<div className="Cell" key={shortid.generate()}>
									<div className="Title">
										<h4>{column.title}</h4>
										<span>{column.input.type}</span>
									</div>

									<ul className="List">
										{listAnswers(goal.position, column.position)}
									</ul>
								</div>
							)
					}
				})}
			</li>
		)
	}

	return handler()
}

const mapStateToProps = state => {
	return {
		columns: state.groupOverview.logbook.columns,
		overview: state.groupOverview.overview
	}
}
const mapDispatchToProps = dispatch => {
	return {
		getLogbookGroupOverview: () => dispatch(getLogbookGroupOverview())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(GroupOverviewRow))
