import '../../../scss/teacher/components/LogbookList.scss'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Icon from '../../../img/temp/smallicon.png'
import { saveCurrentStudentlogbook } from '../../../redux/logbookoverview/actions'

function LogbookList(props) {
	return (
		<div className="LogbookList">
			<div>
				<table border="1">
					<p>Leerjaar: {props.logbook.year}</p>
					<p>Groep: {props.logbook.group}</p>
					<p>Blok: </p>{' '}
					<select value="4" name="period" id="period">
						<option selected value="1">
							1
						</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
					</select>
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
	return {}
}

const mapDispatchToProps = dispatch => {
	return {
		setActiveStudentLogbook: logbook =>
			dispatch(saveCurrentStudentlogbook(logbook))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(LogbookList))
