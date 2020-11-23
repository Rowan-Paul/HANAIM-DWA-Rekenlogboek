import React from 'react'
import '../../scss/no-access/NoAccess.scss'
export default function NoAccess() {
	return (
		<section>
			<h1>Oeps! Geen toegang...</h1>
			<p>
				Je hebt niet de juiste rechten voor deze applicatie. Neem contact op met
				de beheerder, of niet...
			</p>

			<div class="illustration"></div>
		</section>
	)
}
