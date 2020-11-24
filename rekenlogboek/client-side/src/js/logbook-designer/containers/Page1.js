import React from 'react'

import Jumbotron from '../../common/Jumbotron'
import InfoContainer from '../../common/InfoContainer'
import Select from '../../common/Select'

export default function Page1() {
	return (
		<Jumbotron>
			<div>
				{/* TODO: remove dummy options & replace with dynamic data*/}
				<Select
					title="Kies een groep:"
					options={['Groep 5a', 'Groep 6a', 'Groep 6b', 'Groep 7a', 'Groep 8']}
				/>
				<Select
					title="Kies een blok:"
					options={['Blok 1', 'Blok 2', 'Blok 3', 'Blok 4', 'Blok 5', 'Blok 6']}
				/>
			</div>
			<InfoContainer>
				{/* <img src="../../../img/illustraions/log_select_year.svg" /> */}
			</InfoContainer>
		</Jumbotron>
	)
}
