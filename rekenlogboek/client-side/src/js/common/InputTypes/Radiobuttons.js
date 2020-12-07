import React from 'react'
import shortid from 'shortid'

import InputHandlers from '../../teacher/components/column/InputHandlers'
import '../../../scss/common/InputTypes.scss'

export default function RadioButtons(props) {
	return (
		<ul className="Radiobuttons">
			{props.values.map((value, i) => (
				<li
					key={shortid.generate()}
					className={props.readonly ? 'ReadOnly' : 'Edit'}
				>
					<input type="radio" name="radiobutton" value="default" />
					<span>{value.text}</span>

					{!props.readonly && (
						<div>
							<InputHandlers explanation={value.explanation} position={i} />
						</div>
					)}
					<i></i>
					{value.explanation && (
						<input className="Explanation" type="text" placeholder="Omdat..." />
					)}
				</li>
			))}
			<li className={props.readonly ? 'ReadOnly' : 'Edit'}>
				<input type="radio" name="radiobutton" value="default" />
				<span>Ik weet het nog niet</span>

				{!props.readonly && (
					<div>
						<span>
							<i className="fa fa-lock"></i> (default)
						</span>
					</div>
				)}
			</li>
		</ul>
	)
}
