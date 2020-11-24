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

	// remove questionmark and split
	// in different params
	const removeChar = props.location.search.removeCharAt(1)
	const splitParams = removeChar.split('&')
	// remove %20, select the correct
	// string from the array and convert it to a string
	let user = {
		name: decodeURIComponent(
			splitParams[0].split('=').splice(0 - 1, 1)
		).toString(),
		jobTitle: decodeURIComponent(
			splitParams[1].split('=').splice(0 - 1, 1)
		).toString(),
		email: decodeURIComponent(
			splitParams[2].split('=').splice(0 - 1, 1)
		).toString(),
		groups: decodeURIComponent(splitParams[3])
			.split('=')
			.splice(0 - 1, 1)
			.toString()
			.split(',')
	}

	props.doSaveUser(user)

	// redirect to the correct page
	if (user.groups.includes('Logboekontwerpers'))
		props.history.push('/logbook-designer')

	return (
		<section>
			<p>Loading..</p>
		</section>
	)
}

function mapStateToProps() {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		doSaveUser: payload => dispatch(saveUserAction(payload))
	}
}

export const Succes = connect(mapStateToProps, mapDispatchToProps)(SuccesUI)
