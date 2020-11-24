import React from 'react'
import { useHistory } from 'react-router-dom'

import ButtonContainer from '../../common/ButtonContainer'

import '../../../scss/logbook-designer/containers/LogbookDesignerLanding.scss'
import createLogbookSVG from '../../../img/icons/create_log_green.svg'
import logbookSVG from '../../../img/icons/view_log_yellow.svg'

export default function LogbookDesigner() {
	let history = useHistory()
	const changePage = page => {
		history.push('/logbook-designer/' + page)
	}

	return (
		<div className="logbook-designer-landing">
			<div className="flex-center">
				<h1>Welkom, (username)</h1>
				<p>Wat wilt u doen vandaag?</p>
				<div className="buttons-container">
					<ButtonContainer
						icon={logbookSVG}
						color="yellow"
						description="Het overzicht van alle logoeken bekijken."
						value="Bekijk overzicht"
						handler={() => changePage('overview')}
					/>
					<ButtonContainer
						icon={createLogbookSVG}
						color="green"
						description="Een nieuw logboek aanmaken."
						value="Nieuw logboek"
						handler={() => changePage('new-logbook/page-1')}
					/>
				</div>
			</div>
		</div>
	)
}
