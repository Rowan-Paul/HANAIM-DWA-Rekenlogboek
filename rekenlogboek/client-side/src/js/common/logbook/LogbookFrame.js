import React from 'react'

import '../../../scss/teacher/components/logbook/LogbookFrame.scss'
export default function LogbookFrame(props) {
	return <ul className="LogbookFrame">{props.children}</ul>
}
