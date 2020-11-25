import React, { useState } from 'react'

import Select from '../../common/Select'

export default function SelectColumnTypes() {
	const [columnType1, setColumnType1] = useState('Checkboxes')
	const [columnTitle1, setColumnTitle1] = useState('')

	const [columnType2, setColumnType2] = useState('Checkboxes')
	const [columnTitle2, setColumnTitle2] = useState('')

	const changeTypeHandler = (column, value) => {
		column === 1 ? setColumnType1(value) : setColumnType2(value)
	}

	const changeTitleHandler = (column, value) => {
		column === 1 ? setColumnTitle1(value) : setColumnTitle2(value)
	}

	const types = ['checkboxes', 'keuzerondjes', 'invulvelden']

	return (
		<form>
			<label>Kies kolom titel 1:</label>
			<input
				onChange={e => changeTitleHandler(1, e.target.value)}
				placeholder="Vul hier een titel in..."
				type="text"
				value={columnTitle1}
			/>
			{/* TODO: remove dummy options & replace with dynamic data*/}
			<Select
				title="Kies kolomtype 1:"
				selected={columnType1}
				options={types}
				changeHandler={() => changeTypeHandler(1)}
			/>
			<br />
			<label>Kies kolom titel 2:</label>
			<input
				onChange={e => changeTitleHandler(2, e.target.value)}
				placeholder="Vul hier een titel in..."
				type="text"
				value={columnTitle2}
			/>
			{/* TODO: remove dummy options & replace with dynamic data*/}
			<Select
				title="Kies kolomtype 2:"
				selected={columnType2}
				options={types}
				changeHandler={() => changeTypeHandler(2)}
			/>
		</form>
	)
}
