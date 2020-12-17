import React from 'react'

export default function Explanation(props) {
	return (
		<li className="Explanation">
			<textarea
				type="text"
				name="explanation"
				placeholder="Omdat..."
				value={props.studentExplanation}
				onChange={e => newExplanation(e)}
			/>
		</li>
	)
}
