import React from 'react'

import '../../../../scss/teacher/components/LogbookTable.scss'
export default function logbookFrame(props) {
	return <ul className="LogbookFrame">{props.children}</ul>
}
