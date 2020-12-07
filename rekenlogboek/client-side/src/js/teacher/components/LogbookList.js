import '../../../scss/teacher/components/LogbookList.scss'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Icon from '../../../img/temp/smallicon.png'
import {
	saveCurrentStudentlogbook,
	setCurrentLogbookPeriod
} from '../../../redux/logbookoverview/actions'

function LogbookList(props) {
	function handleSelectChange(event) {
		props.setPeriod(event.target.value)
	}

	return (
		<div className="LogbookList">
			<div>
				<p>Leerjaar: {props.logbook.year}</p>
				<p>Groep: {props.logbook.group}</p>
				<p>Blok: {props.period}</p>{' '}
				<select
					value={props.period}
					name="period"
					id="period"
					onChange={handleSelectChange}
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
				</select>
				<table border="1">
					<tbody>
						{props.studentlogbooks.map(studentlogbook => (
							<tr key={studentlogbook.student}>
								<td>
									<p>{studentlogbook.student}</p>
								</td>
								<td>
									<p>ERROR</p>
								</td>
								<td>
									<img
										onClick={() => {
											props.setActiveStudentLogbook(studentlogbook)
										}}
										src={Icon}
									/>
								</td>
							</tr>
						))}
						<tr>
							<td>
								<p>Jan Peter </p>
							</td>
							<td>
								<p>Status: Na pretoets ingevuld</p>
							</td>
							<td>
								<img src={Icon} />
							</td>
						</tr>
						<tr>
							<td>
								<p>Emma </p>
							</td>
							<td>
								<p>Status: Instructie ingevuld</p>
							</td>
							<td>
								<img src={Icon} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		period: state.logbookoverview.period
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setActiveStudentLogbook: logbook =>
			dispatch(saveCurrentStudentlogbook(logbook)),
		setPeriod: period => dispatch(setCurrentLogbookPeriod(period))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(LogbookList))
