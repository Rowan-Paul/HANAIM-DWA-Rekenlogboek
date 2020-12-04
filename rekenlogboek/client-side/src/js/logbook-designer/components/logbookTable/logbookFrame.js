import React from 'react'

import '../../../../scss/logbook-designer/components/LogbookTable.scss'
export default function logbookFrame(props) {
	return <ul className="LogbookFrame">{props.children}</ul>
}
