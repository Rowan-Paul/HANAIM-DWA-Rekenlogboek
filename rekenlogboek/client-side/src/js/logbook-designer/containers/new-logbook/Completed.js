import React from 'react'

import Illustration from '../../components/Illustration'
import Image from '../../../../img/illustrations/log_saved.svg'
import InfoContainer from '../../../common/InfoContainer'
import Jumbotron from '../../../common/Jumbotron'
import LogbookSaved from '../../components/LogbookSaved'

import '../../../../scss/logbook-designer/NewLogbook.scss'

export default function Completed() {
	return (
		<div className="new-logbook">
			<Jumbotron columns={3}>
				<LogbookSaved />
				<InfoContainer>
					<Illustration image={Image} title="Opgeslagen..." />
				</InfoContainer>
			</Jumbotron>
		</div>
	)
}
