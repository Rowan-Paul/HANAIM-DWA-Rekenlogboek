import React from 'react'
import shortid from 'shortid'
import InputHandlers from '../../teacher/components/column/InputHandlers'

import '../../../scss/common/InputTypes.scss'

export default function Checkboxes(props) {
	return (
		<ul className="Checkboxes">
			{props.options.map((option, i) => (
				<li
					key={shortid.generate()}
					className={props.readonly ? 'ReadOnly' : 'Edit'}
				>
					<input type="checkbox" name="checkboxes" value="default" />
					<span>{option}</span>
					{!props.readonly && (
						<div>
							<InputHandlers position={i} />
						</div>
					)}
				</li>
			))}
			<li className={props.readonly ? 'ReadOnly' : 'Edit'}>
				<input type="checkbox" name="checkboxes" value="default" />
				<span>Ik weet het nog niet</span>

				{!props.readonly && (
					<div>
						<span>
							<i className="fa fa-lock"></i> (default)
						</span>
					</div>
				)}
			</li>

			{props.explanation && (
				<li className="Explanation">
					<textarea type="text" name="explanation" placeholder="Omdat..." />
				</li>
			)}
		</ul>
	)
}
