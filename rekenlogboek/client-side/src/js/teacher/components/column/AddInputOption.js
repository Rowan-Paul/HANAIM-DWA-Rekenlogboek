import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addInputOption } from '../../../redux/logbook/actions'
function addInputValueFunc(props) {
	const [option, setOption] = useState('')

	const addInputOption = e => {
		e.preventDefault()
		props.addInputOption(option)
		setOption('')
	}

	return (
		<div className="Block">
			<h4>Optie toevoegen :</h4>

			<div className="AddContainer">
				<form onSubmit={e => addInputOption(e)}>
					<input
						onChange={e => setOption(e.target.value)}
						placeholder="Optie toevoegen"
						type="text"
						value={option}
						id="addOption"
					/>
					<button id="addBtn">
						<i className="fa fa-plus"></i>
					</button>
				</form>
			</div>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		addInputOption: payload => dispatch(addInputOption(payload))
	}
}

export default connect(null, mapDispatchToProps)(addInputValueFunc)
