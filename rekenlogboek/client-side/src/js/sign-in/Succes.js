import '../../scss/sigin-in/SignIn.scss'

import React from 'react'
import { connect } from 'react-redux'

import { saveUserAction } from '../../redux/mainReducer'

export default function SuccesUI(props) {
	String.prototype.removeCharAt = function (i) {
		var tmp = this.split('') // convert to an array
		tmp.splice(i - 1, 1) // remove 1 element from the array (adjusting for non-zero-indexed counts)
		return tmp.join('') // reconstruct the string
	}

	// save to reducer
	props.doSaveUser(decodeURI(props.location.search.removeCharAt(1)))

	// redirect to the correct page
	if (props.user.groups.includes('Logboekontwerpers'))
		props.history.push('/logbook-designer')

	return (
		<section>
			<p>Loading..</p>
		</section>
	)
}

function mapStateToProps(state) {
	return {
		user: state.main.user
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doSaveUser: payload => dispatch(saveUserAction(payload))
	}
}

export const Succes = connect(mapStateToProps, mapDispatchToProps)(SuccesUI)
