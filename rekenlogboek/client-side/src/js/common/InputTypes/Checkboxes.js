import React from 'react'
import shortid from 'shortid'
import InputHandlers from '../../teacher/components/column/InputHandlers'

import '../../../scss/common/InputTypes.scss'

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
