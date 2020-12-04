import React from 'react'
import { connect } from 'react-redux'
import { addInputValue } from '../../../redux/logbook/actions'

import '../../../scss/common/InputTypes.scss'

function Textarea(props) {
	return (
		<div className="Textarea">
			<textarea
				placeholder="Omschrijving toevoegen"
				onChange={e => props.addInputValue(e.target.value)}
				value={props.value}
			></textarea>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		addInputValue: payload => dispatch(addInputValue(payload))
	}
}

export default connect(null, mapDispatchToProps)(Textarea)
