import '../../../scss/teacher/components/LogbookList.scss'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Icon from '../../../img/temp/smallicon.png'
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
			<tr key={studentlogbook.student}>
				<td>
					<p>{studentlogbook.student}</p>
				</td>
				<td>
					<p>Status: </p>
				</td>
				<td>
					<img
						onClick={() => {
							props.setActiveStudentLogbook(studentlogbook)
							props.history.push('/teacher/logbooks/studentlogbook')
						}}
						src={Icon} // TODO: Image moet nog vervangen worden
					/>
				</td>
			</tr>
		))
	}

	return (
		<div className="LogbookList">
			<div>
				<p>Leerjaar: {props.year}</p>
				<p>Groep: </p>
				<select
					value={props.group}
					name="group"
					id="group"
					onChange={e => props.setGroup(e.target.value)}
				>
					{makeGroupOptions()}
				</select>
				<p>Blok: </p>{' '}
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
				<table border="1">
					<tbody>{makeRows()}</tbody>
				</table>
			</div>
		</div>
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
