import React from 'react'
import ButtonContainer from '../../common/ButtonContainer'

import Check from '../../../img/icons/check_green.svg'
import Lock from '../../../img/icons/lock_blue.svg'

export default function StudentAccessSelector() {
	return (
		<div className="content-container">
			<div className="explanation-container">
				<h1>Bepaal wat uw leerlingen zien.</h1>
				<p>
					Kies welk deel van het logboek u wilt ontgrendelen. Er kan maar een
					deel tegelijkertijd open staan. Bij het kiezen van de evaluaties
					pagina kunt u zelf bepalen welk leerdoel geëvalueerd mag worden.
				</p>
				<p>
					Wilt u een ander blok openen, dan kan dat rechtsbovenin. Zodra u een
					deel van een ander blok ontgrendeld zullen alle andere blokken van de
					klas vergrendeld worden. Op die manier is er altijd maar een blok in
					beeld voor de leerlingen.
				</p>
			</div>
			<ButtonContainer
				icon={Check}
				color="green"
				description="Open na pre-toets pagina."
				value="Ontgrendel"
				// handler={() => history.push('../teacher/logbooks')}
			/>

			<ButtonContainer
				icon={Lock}
				color="blue"
				description="Sluit instructie pagina."
				value="Vergrendel"
				// handler={() => history.push('../teacher/logbooks')}
			/>

			<ButtonContainer
				icon={Check}
				color="green"
				description="Open na pre-toets pagina."
				value="Ontgrendel"
				handler={() =>
					props.modalShow({
						title: 'Bepaal toegang'
					})
				}
			/>
		</div>
	)
}
