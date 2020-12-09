import React from 'react'
import { connect } from 'react-redux'
import { modalShow, setGoalPosition } from '../../../../redux/logbook/actions'
import '../../../../scss/teacher/components/logbook/TopBar.scss'

function TopBar(props) {
	const position = props.goals.length + 1

	const newGoal = () => {
		props.modalShow({ position, title: 'Leerdoelen toevoegen' }) // Show modal
		props.setGoalPosition(position) // Init new goal
	}
	return (
		<ul className="TopBar">
			<li>
				<h1>{props.title}</h1>
			</li>

			<li>
				{props.button && (
					<button onClick={() => newGoal()}>
						<i className="fa fa-plus"></i>
						<span>Leerdoel</span>
					</button>
				)}
			</li>

			{!props.noBreadcrumbs && (
				<li>
					<h3>
						Groep {props.group} <i className="fa fa-angle-right"></i> Blok{' '}
						{props.period}
					</h3>
				</li>
			)}
		</ul>
	)
}

const mapStateToProps = state => {
	return {
		goals: state.logbook.goals,
		group: state.logbook.group,
		period: state.logbook.period
	}
}

const mapDispatchToProps = dispatch => {
	return {
		modalShow: payload => dispatch(modalShow(payload)),
		setGoalPosition: payload => dispatch(setGoalPosition(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
