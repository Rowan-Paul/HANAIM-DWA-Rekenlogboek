import React from 'react'

import '../../scss/common/Select.scss'

export default function Select(props) {
	const changeValue = e => {
		//call the change handler defined by the parent
		props.changeHandler(e.target.value)
	}

	const getOptions = () =>
		//create an option tag for each value in the props.options array
		props.options.map(option => {
			//sets the first letter to upper case
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
				//the selected state is saved by each parent component and will be passed in here
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
