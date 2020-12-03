import '../../../scss/teacher/components/LogbookList.scss'
import React from 'react'
import Icon from '../../../img/temp/smallicon.png'

export default function LogbookList(props) {
	return (
		<div className="LogbookList">
			<div>
				<table border="1">
					<p>Leerjaar: 2019-2020</p>
					<p>Groep: 5</p>
					<p>Blok: 5</p>

					<tbody>
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
