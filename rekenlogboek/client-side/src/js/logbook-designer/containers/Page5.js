import React from 'react'

import Illustration from '../components/Illustration'
import Image from '../../../img/illustrations/log_saved.svg'
import InfoContainer from '../../common/InfoContainer'
import Jumbotron from '../../common/Jumbotron'
import LogbookSaved from '../components/LogbookSaved'

import '../../../scss/logbook-designer/containers/NewLogbook.scss'

export default function Page5(props) {
	return (
		<div className="new-logbook">
			<Jumbotron>
				<LogbookSaved />
				<InfoContainer>
					<Illustration image={Image} title="Opgeslagen..." />
				</InfoContainer>
			</Jumbotron>
		</div>
	)
}
