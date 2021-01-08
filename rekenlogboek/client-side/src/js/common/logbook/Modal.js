import React from 'react'
import Button from '../Button'
import { connect } from 'react-redux'
import { modalHide } from '../../redux/logbook/actions'

import '../../../scss/common/logbook/Modal.scss'

function Modal(props) {
	return (
		<div className="Modal">
			<div className="Box">
				<div className="Header">
					<h2>{props.title}</h2>
					<button onClick={() => props.modalHide()}>
						<i className="fa fa-close"></i>
					</button>
				</div>

				<div className="Body">{props.children}</div>
				<div className="Footer">
					<Button color="blue" value={props.btnValue} handler={props.handler} />
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		title: state.logbook.modal.title
	}
}

const mapDispatchToProps = dispatch => {
	return {
		modalHide: () => dispatch(modalHide())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
