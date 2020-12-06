import React, { useEffect } from 'react'
import { connect } from 'react-redux'

export default function SuccesUI(props) {
	useEffect(() => {
		// redirect to the correct page
		if (props.user.groups !== undefined && props.user.groups !== null) {
			if (props.user.groups.includes('Logboekontwerpers')) {
				props.history.push('/teacher')
			} else if (
				props.user.jobTitle === 'Leerling' &&
				window.parent !== window.self
			) {
				props.history.push('/student')
			} else {
				props.history.push('/no-access')
			}
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

export const Succes = connect(mapStateToProps)(SuccesUI)
