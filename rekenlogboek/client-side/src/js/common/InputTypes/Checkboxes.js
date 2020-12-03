import React from 'react'
import shortid from 'shortid'

import '../../../scss/logbook-designer/components/InputTypes/Checkboxes.scss'
export default function Checkboxes(props) {
	return (
		<ul className="Checkboxes">
			{props.values.map(value => (
				<li key={shortid.generate()}>
					<input type="checkbox" value="default" />
					<span>{value}</span>
					<span></span>
				</li>
			))}
			<li>
				<input type="checkbox" value="default" />
				<span>Ik weet het nog niet</span>

				<span>
					<i className="fa fa-lock"></i> (default)
				</span>
			</li>
		</ul>
	)
}
