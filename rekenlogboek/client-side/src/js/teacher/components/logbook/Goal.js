import React from 'react'
import { connect } from 'react-redux'
import { modalShow } from '../../../../redux/logbook/actions'

import '../../../../scss/teacher/components/logbook/Goal.scss'
function Goal(props) {
	return (
		<div className="Goal Cell">
			<ul>
				<li>
					<h4>{props.goal.title}</h4>
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
				</li>
				<li>
					<p>{props.goal.description}</p>
				</li>

				{props.goal.imageLink.length > 0 && (
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
		modalShow: payload => dispatch(modalShow(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal)
