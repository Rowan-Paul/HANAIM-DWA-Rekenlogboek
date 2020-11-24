import React from 'react'

import Jumbotron from '../../common/components/Jumbotron'

import '../../../scss/logbook-designer/containers/NewLogbook.scss'

function NewLogbook(props) {
	return (
		<div className="new-logbook">
			<Jumbotron>{props.children}</Jumbotron>
		</div>
	)
}

export default NewLogbook
