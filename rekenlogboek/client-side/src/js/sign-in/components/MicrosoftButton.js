import '../../../scss/sigin-in/components/MicrosoftButton.scss'

import React from 'react'
import { withRouter } from 'react-router-dom'
import MicrosoftLogo from '../../../img/icons/microsoft.svg'

function MicrosoftButtonUI() {
	return (
		<a href="http://localhost:3000/auth">
			<button className="MicrosoftButton">
				<div>
					<img src={MicrosoftLogo} alt="Microsoft Logo" />
					<span>Login met Microsoft</span>
				</div>
			</button>
		</a>
	)
}

export const MicrosoftButton = withRouter(MicrosoftButtonUI)
