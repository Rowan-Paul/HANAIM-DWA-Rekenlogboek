import '../../../scss/teacher/containers/TeacherLanding.scss'

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ButtonContainer from '../../common/ButtonContainer'

import createLogbookSVG from '../../../img/icons/create_log_green.svg'

function Index(props) {
	return (
		<div className="teacher-landing">
			<div className="flex-center">
				<h1>Welkom {props.user.name},</h1>
				<p>Wat wilt u doen vandaag?</p>
				<div className="buttons-container">
					<ButtonContainer
						icon={createLogbookSVG}
						color="green"
						description="Een nieuw logboek aanmaken."
						value="Nieuw logboek"
						handler={() =>
							props.history.push('/logbook-designer/new-logbook/general')
						}
					/>
				</div>
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		user: state.main.user
	}
}

export default connect(mapStateToProps)(withRouter(Index))
