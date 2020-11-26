import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../common/Button'

import '../../../scss/logbook-designer/components/LogbookSaved.scss'

export default function LogbookSaved(props) {
	const history = useHistory()
	return (
		<div className="LogbookSaved">
			<h1>Logboek aangemaakt...</h1>
			<p>Het logboek is aangemaakt en is nu beschikbaar in het overzicht.</p>
			<Button
				color="blue"
				value="Overzicht bekijken"
				handler={() => history.push('../overview')}
			/>
		</div>
	)
}
