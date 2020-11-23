import { useState } from 'react'
import LogbookDesignerLanding from './containers/LogbookDesignerLanding'

import React from 'react'
import '../../scss/logbook-designer/LogbookDesigner.scss'

function LogbookDesigner() {
	const [page, setPage] = useState('landing')
	const getLogbookDesignerPage = () => {
		switch (page) {
			case 'landing':
				return <LogbookDesignerLanding />
		}
	}

	return <div className="logbook-developer">{getLogbookDesignerPage()}</div>
}

export default LogbookDesigner
