import React from 'react'
import '../../../../scss/logbook-designer/components/TopBar.scss'
export default function TopBar(props) {
	return (
		<ul className="TopBar">
			<li>
				<h1>{props.title}</h1>
			</li>

			<li></li>
			<li>
				<h3>
					Groep {props.group} <i className="fa fa-angle-right"></i> Blok{' '}
					{props.period}
				</h3>
			</li>
		</ul>
	)
}
