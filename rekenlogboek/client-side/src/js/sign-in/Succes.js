import React, { useEffect } from 'react'
import { connect } from 'react-redux'

export default function SuccesUI(props) {
	useEffect(() => {
		// redirect to the correct page
		if (props.user.groups !== undefined && props.user.groups !== null) {
			// if user is logboekontwerper
			if (
				props.user.groups.includes('Logboekontwerpers') &&
				window.parent === window.self
			) {
				props.history.push('/teacher')
			}
			// if user is leerling and in Teams
			else if (
				props.user.jobTitle === 'Leerling' &&
				window.parent !== window.self
			) {
				props.history.push('/student')
			}
			// if user is leraar and in Teams
			else if (
				props.user.jobTitle === 'Leraar' &&
				window.parent !== window.self
			) {
				console.log('teacher and in teams')
				props.history.push('/teacher/logbooks')
			}
			// redirect to no access page
			else {
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
