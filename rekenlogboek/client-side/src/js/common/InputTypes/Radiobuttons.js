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
					<span>{value}</span>
					<div>
						<InputHandlers position={i} />
					</div>
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

			{props.explanation && (
				<li className="Explanation">
					<textarea type="text" name="explanation" placeholder="Omdat..." />
				</li>
			)}
		</ul>
	)
}
