import React, { useState } from 'react'

import Jumbotron from '../../common/Jumbotron'
import InfoContainer from '../../common/InfoContainer'
import Select from '../../common/Select'
import Button from '../../common/Button'
import Illustration from '../components/Illustration'

import Image from '../../../img/illustrations/log_select_year.svg'
import '../../../scss/logbook-designer/containers/NewLogbook.scss'

export default function Page1() {
	const [group, setGroup] = useState('Groep 5a')
	const [period, setPeriod] = useState('Blok 1')

	const changeGroupHandler = value => setGroup(value)
	const changePeriodHandler = value => setPeriod(value)

	return (
		<div className="new-logbook">
			<Jumbotron>
				<div className="vertical-center">
					{/* TODO: remove dummy options & replace with dynamic data*/}
					<Select
						title="Kies een groep:"
						selected={group}
						options={[
							'Groep 5a',
							'Groep 6a',
							'Groep 6b',
							'Groep 7a',
							'Groep 8'
						]}
						changeHandler={() => changeGroupHandler()}
					/>
					<Select
						title="Kies een blok:"
						selected={period}
						options={[
							'Blok 1',
							'Blok 2',
							'Blok 3',
							'Blok 4',
							'Blok 5',
							'Blok 6'
						]}
						changeHandler={() => changePeriodHandler()}
					/>
				</div>
				<InfoContainer>
					<Illustration
						title="Vul de velden links in voor een invulbare preview voor een doel van het logboek."
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
