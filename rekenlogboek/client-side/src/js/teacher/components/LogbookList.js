import '../../../scss/teacher/components/LogbookList.scss'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	saveCurrentStudentlogbook,
	setCurrentLogbookPeriod,
	setGroup
} from '../../../redux/logbookoverview/actions'

function LogbookList(props) {
	const makeGroupOptions = () => {
		if (props.userGroups) {
			return props.userGroups.map(group => {
				const groupNumber = group.substr(6, 1)
				if (group.substr(0, 5) === 'Groep') {
					const groupNo = group.substr(6, 1)
					if (typeof Number(groupNo) === 'number') {
						props.setGroup(groupNo)
					}
					return (
						<option key={group} value={groupNumber}>
							{groupNo}
						</option>
					)
				}
			})
		}
	}

	const makeRows = () => {
		return props.studentlogbooks.map(studentlogbook => (
			<li className="Student" key={studentlogbook.student}>
				<div>
					<span>{studentlogbook.student}</span>
				</div>

				<div>
					<span>Status: </span>
				</div>
				<div>
					<button
						onClick={() => {
							props.setActiveStudentLogbook(studentlogbook)
							props.history.push('/teacher/logbooks/studentlogbook')
						}}
					>
						<span>Openen </span>
						<i className="fa fa-arrow-right"></i>
					</button>
				</div>
			</li>
		))
	}

	return (
		<ul className="LogbookList">
			<li className="Header">
				<div>
					<h4>Leerjaar: {props.year}</h4>
				</div>

				<div className="Select">
					<h4>Groep: </h4>
					<select
						value={props.group}
						name="group"
						id="group"
						onChange={e => props.setGroup(e.target.value)}
					>
						{makeGroupOptions()}
					</select>
				</div>

				<div className="Select">
					<h4>Blok: </h4>
					<select
						value={props.period}
						name="period"
						id="period"
						onChange={e => props.setPeriod(e.target.value)}
					>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
					</select>
				</div>
			</li>

			{makeRows()}
		</ul>
	)
}

const mapStateToProps = state => {
	return {
		userGroups: state.main.user.groups,
		year: state.logbookoverview.year,
		group: state.logbookoverview.group,
		period: state.logbookoverview.period
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setActiveStudentLogbook: logbook =>
			dispatch(saveCurrentStudentlogbook(logbook)),
		setPeriod: period => dispatch(setCurrentLogbookPeriod(period)),
		setGroup: group => dispatch(setGroup(group))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(LogbookList))
