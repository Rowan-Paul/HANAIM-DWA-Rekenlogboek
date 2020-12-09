import React from 'react'
import { withRouter } from 'react-router-dom'

import '../../../scss/student/containers/Default.scss'

import defaultSVG from '../../../img/illustrations/nothing_to_see.svg'

function Default() {
	return (
		<div className="default">
			<div className="text-field">
				<h1>Niks te zien hier!</h1>
				<p>
					Je meester/jufvrouw heeft nog geen taken voor je open gezet. Klopt dit
					niet? Laat het dan even weten, dan zorgt hij/zij ervoor dat je weer
					verder kan.
				</p>
			</div>
			<img src={defaultSVG} />
		</div>
	)
}

export default withRouter(Default)
