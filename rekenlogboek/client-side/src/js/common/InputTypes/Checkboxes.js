import React from 'react'
import shortid from 'shortid'
import InputHandlers from '../../teacher/components/column/InputHandlers'

import '../../../scss/common/InputTypes.scss'

export default function Checkboxes(props) {
	return (
		<ul className="Checkboxes">
			{props.options.map((option, i) => (
				<li key={shortid.generate()} className={props.type}>
					<input type="checkbox" name="checkboxes" value="default" />
					<span>{option}</span>
					{props.type === 'edit' && (
						<div>
							<InputHandlers position={i} />
						</div>
					)}
				</li>
			))}
			<li className={props.type}>
				<input type="checkbox" name="checkboxes" value="default" />
				<span>Ik weet het nog niet</span>

				{props.type === 'edit' && (
					<div>
						<span>
							<i className="fa fa-lock"></i> (default)
						</span>
					</div>
				)}
			</li>

			{props.explanation && (
				<li className={`${props.type} Explanation`}>
					<textarea type="text" name="explanation" placeholder="Omdat..." />
				</li>
			)}
		</ul>
	)
}
