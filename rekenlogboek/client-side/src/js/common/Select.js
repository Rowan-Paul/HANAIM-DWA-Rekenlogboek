import React, { useState } from 'react'

import '../../scss/common/Select.scss'

export default function Select(props) {
	const [value, setValue] = useState(props.option)
	console.log(props.options)

	const changeValue = e => {}

	const getOptions = () =>
		props.options.map(option => {
			return (
				<option value={option} key={option}>
					{option}
				</option>
			)
		})

	return (
		<div className="select-container">
			<label className="select-label">{props.title}</label>
			<select
				className="select"
				onChange={e => {
					changeValue()
				}}
			>
				{getOptions()}
			</select>
		</div>
	)
}
