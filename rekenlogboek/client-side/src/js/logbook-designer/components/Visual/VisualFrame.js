import React from 'react'

import '../../../../scss/logbook-designer/components/Visual/VisualFrame.scss'
export default function Visual(props) {
	return <ul className="Visual">{props.children}</ul>
}
