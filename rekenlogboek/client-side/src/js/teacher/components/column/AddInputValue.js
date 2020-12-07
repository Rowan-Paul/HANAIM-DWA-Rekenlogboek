import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addInputOption } from '../../../../redux/logbook/actions'
function addInputValueFunc(props) {
	const [value, setValue] = useState('')

	const addInputOption = e => {
		e.preventDefault()
		props.addInputOption(value)
		setValue('')
	}

	return (
		<div className="Block">
			<h4>Waarde toevoegen :</h4>

			<div className="AddContainer">
				<form onSubmit={e => addInputOption(e)}>
					<input
						onChange={e => setValue(e.target.value)}
						placeholder="Waardes toevoegen"
						type="text"
						value={value}
					/>
					<button>
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
