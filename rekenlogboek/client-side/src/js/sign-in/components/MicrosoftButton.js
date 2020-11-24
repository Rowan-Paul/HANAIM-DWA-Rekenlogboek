import React from 'react'
import MicrosoftLogo from '../../../img/icons/microsoft.svg'

import '../../../scss/sigin-in/components/MicrosoftButton.scss'

export default function MicrosoftButton() {
	return (
		<button className="MicrosoftButton">
			<div>
				<img src={MicrosoftLogo} alt="Microsoft Logo" />
				<span>Login met Microsoft</span>
			</div>
		</button>
	)
}
