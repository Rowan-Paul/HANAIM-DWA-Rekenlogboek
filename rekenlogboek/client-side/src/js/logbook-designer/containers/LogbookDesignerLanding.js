import { useState } from 'react'

import '../../../scss/logbook-designer/containers/LogbookDesignerLanding.scss'

export default function LogbookDesigner() {
	return (
		<div className="logbook-designer-landing">
			<div className="flex-center">
				<h1>Welkom, (username)</h1>
				<p>Wat wilt u doen vandaag?</p>
			</div>
		</div>
	)
}
