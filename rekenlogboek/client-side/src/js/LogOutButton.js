import React from 'react'
import { withRouter } from 'react-router-dom'

function LogOutButtonUI(props) {
	const logOut = () => {
		window.localStorage.clear()
		props.history.push('/loggedOut')
	}
	return (
		<div>
			<button onClick={logOut}>Logout</button>
		</div>
	)
}

export const LogOutButton = withRouter(LogOutButtonUI)
