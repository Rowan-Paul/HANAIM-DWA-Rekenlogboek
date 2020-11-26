import '../../../scss/logbook-designer/containers/LogbookDesignerLanding.scss'

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ButtonContainer from '../../common/ButtonContainer'

import createLogbookSVG from '../../../img/icons/create_log_green.svg'
// import logbookSVG from '../../../img/icons/view_log_yellow.svg'

function LogbookDesignerLandingUI(props) {
	const changePage = page => {
		props.history.push('/logbook-designer/' + page)
	}

	return (
		<div className="logbook-designer-landing">
			<div className="flex-center">
				<h1>Welkom, {props.user.name}</h1>
				<p>Wat wilt u doen vandaag?</p>
				<div className="buttons-container">
					{/* <ButtonContainer
						icon={logbookSVG}
						color="yellow"
						description="Het overzicht van alle logoeken bekijken."
						value="Bekijk overzicht"
						handler={() => changePage('overview')}
					/> */}
					<ButtonContainer
						icon={createLogbookSVG}
						color="green"
						description="Een nieuw logboek aanmaken."
						value="Nieuw logboek"
						handler={() => changePage('new-logbook/general')}
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

export const LogbookDesignerLanding = connect(mapStateToProps)(
	withRouter(LogbookDesignerLandingUI)
)
