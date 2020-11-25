import React from 'react'

import Jumbotron from '../../common/Jumbotron'
import InfoContainer from '../../common/InfoContainer'
import SelectColumnTypes from '../components/SelectColumnTypes'
import Button from '../../common/Button'
import Illustration from '../components/Illustration'

import Image from '../../../img/illustrations/log_select_question_type.svg'
import '../../../scss/logbook-designer/containers/NewLogbook.scss'

export default function Page2() {
	return (
		<div className="new-logbook">
			<Jumbotron>
				<div className="vertical-center">
					<SelectColumnTypes />
				</div>
				<InfoContainer>
					<Illustration
						title="Kies de 2 kolomtypes van een logboek."
						image={Image}
					/>
				</InfoContainer>
			</Jumbotron>
			<div className="nextButton">
				<Button color="blue" value="Volgende" />
			</div>
		</div>
	)
}
