import React from 'react'

import ButtonContainer from '../../common/components/ButtonContainer'

import '../../../scss/logbook-designer/containers/LogbookDesignerLanding.scss'

export default function LogbookDesigner() {
	return (
		<div className="logbook-designer-landing">
			<div className="flex-center">
				<h1>Welkom, (username)</h1>
				<p>Wat wilt u doen vandaag?</p>
				<div className="buttons-container">
					<ButtonContainer
						color="yellow"
						description="Het overzicht van alle logoeken bekijken."
						value="Bekijk overzicht"
					/>
					<ButtonContainer
						color="green"
						description="Een nieuw logboek aanmaken."
						value="Nieuw logboek"
					/>
				</div>
			</div>
		</div>
	)
}
