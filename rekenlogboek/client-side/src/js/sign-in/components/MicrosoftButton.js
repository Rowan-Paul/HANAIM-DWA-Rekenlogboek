import '../../../scss/sigin-in/components/MicrosoftButton.scss'

import React from 'react'
import { withRouter } from 'react-router-dom'
import MicrosoftLogo from '../../../img/icons/microsoft.svg'

function MicrosoftButtonUI(props) {
	return (
		<button
			className="MicrosoftButton"
			onClick={() => props.history.push('/auth')}
		>
			<div>
				<img src={MicrosoftLogo} alt="Microsoft Logo" />
				<span>Login met Microsoft</span>
			</div>
		</button>
	)
}

export const MicrosoftButton = withRouter(MicrosoftButtonUI)
