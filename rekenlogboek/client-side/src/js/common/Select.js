import React from 'react'

import '../../scss/common/Select.scss'

export default function Select(props) {
	// console.log(props.selected, props.options)
	const changeValue = e => {
		props.changeHandler(e.target.value)
	}

	const getOptions = () =>
		props.options.map(option => {
			const ucFirstOption = option.charAt(0).toUpperCase() + option.slice(1)
			return (
				<option value={option} key={option}>
					{ucFirstOption}
				</option>
			)
		})

	return (
		<div className="select-container">
			<label className="select-label">{props.title}</label>
			<select
				defaultValue={props.selected}
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
