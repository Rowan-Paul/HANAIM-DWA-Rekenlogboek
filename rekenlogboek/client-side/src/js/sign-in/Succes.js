import React, { useEffect } from 'react'
import { connect } from 'react-redux'

export default function SuccesUI(props) {
	useEffect(() => {
		function teamsEnvironment() {
			if (window.parent !== window.self) {
				return true
			} else {
				return false
			}
		}

		if (props.user.groups) {
			switch (props.user.jobTitle) {
				case props.roles.Leerling:
					if (teamsEnvironment() === true) {
						props.history.push('/student')
					} else {
						props.history.push('/no-access')
					}
					break

				case props.roles.Leraar:
					if (teamsEnvironment() === true) {
						props.history.push('/teacher/logbooks')
					} else {
						props.history.push('/teacher')
					}
					break

				case props.roles.Logboekontwerper:
					props.history.push('/logbook-designer')
					break
				default:
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
		roles: state.main.roles,
		user: state.main.user
	}
}

export const Succes = connect(mapStateToProps)(SuccesUI)
