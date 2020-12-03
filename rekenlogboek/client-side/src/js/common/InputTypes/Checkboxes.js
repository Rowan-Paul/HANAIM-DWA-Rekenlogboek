import React from 'react'
import shortid from 'shortid'

import '../../../scss/common/InputTypes.scss'
import InputHandlers from './InputHandlers'

export default function Checkboxes(props) {
	return (
		<ul className="Checkboxes">
			{props.values.map((value, i) => (
				<li key={shortid.generate()}>
					<input type="checkbox" name="checkboxes" value="default" />
					<span>{value}</span>
					<div>
						<InputHandlers position={i} />
					</div>
					<i></i>
					<input className="Explanation" type="text" placeholder="Omdat..." />
				</li>
			))}
			<li>
				<input type="checkbox" name="checkboxes" value="default" />
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
