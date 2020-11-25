import '../../scss/sigin-in/SignIn.scss'

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { saveUserAction } from '../../redux/main/actions'

export default function SuccesUI(props) {
	useEffect(() => {
		String.prototype.removeCharAt = function (i) {
			var tmp = this.split('') // convert to an array
			tmp.splice(i - 1, 1) // remove 1 element from the array (adjusting for non-zero-indexed counts)
			return tmp.join('') // reconstruct the string
		}

		// save to reducer
		props.doSaveUser(decodeURI(props.location.search.removeCharAt(1)))
	}, [])

	useEffect(() => {
		// redirect to the correct page
		if (props.user.groups !== undefined && props.user.groups !== null) {
			if (props.user.groups.includes('Logboekontwerpers'))
				props.history.push('/logbook-designer')
		}
	})

	return (
		<section>
			<p>Redirecting you to the correct page..</p>
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
