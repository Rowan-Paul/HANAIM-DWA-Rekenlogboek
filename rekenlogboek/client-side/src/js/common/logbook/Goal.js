import React from 'react'
import { connect } from 'react-redux'

import '../../../scss/common/logbook/Goal.scss'
import EditGoal from './EditGoal'
function Goal(props) {
	if (!props.state) {
		return (
			<p className="ErrorMessage">
				Goal: props.state not set! (see state.main.inputStates)
			</p>
		)
	}

	return (
		<div className="Goal Cell">
			<ul>
				<li>
					<h4>{props.goal.title}</h4>

					{props.state === props.inputStates.onEdit && (
						<EditGoal position={props.goal.position} />
					)}
				</li>
				<li>
					<p>{props.goal.description}</p>
				</li>

				{props.goal.imageLink && (
					<li>
						<img
							src={
								'http://localhost:3000/uploads/goals/' + props.goal.imageLink
							}
						/>
					</li>
				)}
			</ul>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		inputStates: state.main.inputStates
	}
}

const mapDispatchToProps = dispatch => {
	return {
		deleteGoal: payload => dispatch(deleteGoal(payload)),
		modalShow: payload => dispatch(modalShow(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal)
