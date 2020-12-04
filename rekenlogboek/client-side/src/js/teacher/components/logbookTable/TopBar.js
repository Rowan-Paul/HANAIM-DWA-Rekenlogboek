import React from 'react'
import { connect } from 'react-redux'
import '../../../../scss/teacher/components/TopBar.scss'

function TopBar(props) {
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

const mapStateToProps = state => {
	return {
		group: state.logbook.group,
		period: state.logbook.period
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
