import React from 'react'
import { connect } from 'react-redux'
import { deleteGoal, modalShow } from '../../redux/logbook/actions'

import '../../../scss/common/logbook/Goal.scss'
function Goal(props) {
	return (
		<div className="Goal Cell">
			<ul>
				<li>
					<h4>{props.goal.title}</h4>

					{props.type === 'edit' && (
						<div>
							<button
								onClick={() =>
									props.modalShow({
										position: props.goal.position,
										title: 'Leerdoel wijzigen'
									})
								}
							>
								<i className="fa fa-pencil"></i>
							</button>

							<button onClick={() => props.deleteGoal(props.goal.position)}>
								<i className="fa fa-trash"></i>
							</button>
						</div>
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
	return {}
}

const mapDispatchToProps = dispatch => {
	return {
		deleteGoal: payload => dispatch(deleteGoal(payload)),
		modalShow: payload => dispatch(modalShow(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal)
