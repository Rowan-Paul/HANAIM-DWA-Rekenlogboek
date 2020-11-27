import '../../../scss/sigin-in/components/SignInContainer.scss'

import React from 'react'
import { MicrosoftButton } from './MicrosoftButton'

export default function SignInContainer() {
	return (
		<div className="SignInContainer">
			<h1>Inloggen</h1>
			<p>Login om gebruik te kunnen maken van de applicatie</p>
			<MicrosoftButton />
		</div>
	)
}
