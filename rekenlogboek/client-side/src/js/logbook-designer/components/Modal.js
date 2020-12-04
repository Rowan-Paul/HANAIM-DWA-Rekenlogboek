import React from 'react'
import '../../../scss/logbook-designer/components/Modal.scss'
import Button from '../../common/Button'
import { connect } from 'react-redux'
import { modalHide } from '../../../redux/visual/actions'

function Modal(props) {
	return (
		<div className="Modal">
			<div className="Box">
				<div className="Header">
					<h2>{props.title}</h2>
					<button onClick={e => props.modalHide()}>
						<i className="fa fa-close"></i>
					</button>
				</div>

				<div className="Body">{props.children}</div>
				<div className="Footer">
					<Button color="blue" value="Toevoegen" handler={props.handler} />
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
