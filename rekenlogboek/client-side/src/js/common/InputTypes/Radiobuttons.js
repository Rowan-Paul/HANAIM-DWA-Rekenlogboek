import React from 'react'
import shortid from 'shortid'

import InputHandlers from '../../teacher/components/column/InputHandlers'
import '../../../scss/common/InputTypes.scss'

export default function RadioButtons(props) {
	return (
		<ul className="Radiobuttons">
			{props.values.map((value, i) => (
				<li key={shortid.generate()}>
					<input type="radio" name="radiobutton" value="default" />
					<span>{value.text}</span>
					<div>
						<InputHandlers explanation={value.explanation} position={i} />
					</div>
					<i></i>
					{value.explanation && (
						<input className="Explanation" type="text" placeholder="Omdat..." />
					)}
				</li>
			))}
			<li>
				<input type="radio" name="radiobutton" value="default" />
				<span>Ik weet het nog niet</span>

				<div>
					<span>
						<i className="fa fa-lock"></i> (default)
					</span>
				</div>
			</li>
		</ul>
	)
}
