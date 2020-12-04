import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addInputValue } from '../../../../redux/logbook/actions'
function addInputValueFunc(props) {
	const [value, setValue] = useState('')

	const addInputValue = e => {
		e.preventDefault()
		props.addInputValue(value)
		setValue('')
	}

	return (
		<div className="Block">
			<h4>Waarde toevoegen :</h4>

			<div className="AddContainer">
				<form onSubmit={e => addInputValue(e)}>
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
		addInputValue: payload => dispatch(addInputValue(payload))
	}
}

export default connect(null, mapDispatchToProps)(addInputValueFunc)
