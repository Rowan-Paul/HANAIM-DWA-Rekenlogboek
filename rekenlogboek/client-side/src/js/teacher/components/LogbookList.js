import '../../../scss/teacher/components/LogbookList.scss'
import React from 'react'
import Icon from '../../../img/temp/smallicon.png'

export default function LogbookList(props) {
	return (
		<div className="LogbookList">
			<div>
				<table border="1">
					<p>Leerjaar: {props.logbook.year}</p>
					<p>Groep: {props.logbook.group}</p>
					<p>Blok: {props.logbook.period}</p>

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
									<img src={Icon} />
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
