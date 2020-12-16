import React from 'react'
import { withRouter } from 'react-router-dom'

// import Button from '../../common/Button'

import '../../../scss/logbook-designer/components/LogbookSaved.scss'

function LogbookSavedUI() {
	return (
		<div className="LogbookSaved">
			<h1>Logboek aangemaakt</h1>
			<p>
				Het logboek is aangemaakt {/*en is nu beschikbaar in het overzicht*/}.
			</p>
			{/* <Button
				color="blue"
				value="Overzicht bekijken"
				handler={() => props.history.push('../overview')}
			/> */}
		</div>
	)
}

export default withRouter(LogbookSavedUI)
