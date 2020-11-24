import React from 'react'

import '../../scss/common/Select.scss'

export default function Select(props) {
	console.log(props.options)

	const changeValue = e => {
		props.changeHandler(e.target.value)
	}

	const getOptions = () =>
		props.options.map(option => {
			return (
				<option
					value={option}
					key={option}
					selected={props.selected === props.option ? true : null}
				>
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
					changeValue(e)
				}}
			>
				{getOptions()}
			</select>
		</div>
	)
}
