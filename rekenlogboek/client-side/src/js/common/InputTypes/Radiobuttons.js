import React from 'react'
import shortid from 'shortid'

import '../../../scss/logbook-designer/components/InputTypes/Radiobuttons.scss'

export default function RadioButtons(props) {
	return (
		<ul className="Radiobuttons">
			{props.values.map(value => (
				<li key={shortid.generate()}>
					<input type="radio" name="radiobutton" value="default" />
					<span>{value}</span>
					<span></span>
				</li>
			))}
			<li>
				<input type="radio" name="radiobutton" value="default" />
				<span>Ik weet het nog niet</span>

				<span>
					<i className="fa fa-lock"></i> (default)
				</span>
			</li>
		</ul>
	)
}
