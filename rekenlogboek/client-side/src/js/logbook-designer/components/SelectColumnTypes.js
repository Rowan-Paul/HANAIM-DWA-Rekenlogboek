import React from 'react'

import Select from '../../common/Select'

export default function SelectColumnTypes(props) {
	const types = ['checkboxes', 'keuzerondjes', 'invulvelden']

	return (
		<form>
			<label>Kies kolom titel 1:</label>
			<input
				onChange={e => props.changeTitleHandler(1, e.target.value)}
				placeholder="Vul hier een titel in..."
				type="text"
				value={props.columnTitle1}
			/>
			{/* TODO: remove dummy options & replace with dynamic data*/}
			<Select
				title="Kies kolomtype 1:"
				selected={props.columnType1}
				options={types}
				changeHandler={value => props.changeTypeHandler(1, value)}
			/>
			<br />
			<label>Kies kolom titel 2:</label>
			<input
				onChange={e => props.changeTitleHandler(2, e.target.value)}
				placeholder="Vul hier een titel in..."
				type="text"
				value={props.columnTitle2}
			/>
			{/* TODO: remove dummy options & replace with dynamic data*/}
			<Select
				title="Kies kolomtype 2:"
				selected={props.columnType2}
				options={types}
				changeHandler={value => props.changeTypeHandler(2, value)}
			/>
		</form>
	)
}
