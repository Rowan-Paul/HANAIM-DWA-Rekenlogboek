import '../../../scss/teacher/containers/TeacherLanding.scss'

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ButtonContainer from '../../common/ButtonContainer'

import createLogbookSVG from '../../../img/icons/create_log_green.svg'
// import viewLogbookSVG from '../../../img/icons/view_log_yellow.svg'
// import archiveSVG from '../../../img/icons/archive.svg'

function TeacherLandingUI(props) {
	const changePage = page => {
		props.history.push('/teacher/' + page)
	}

	return (
		<div className="teacher-landing">
			<div className="flex-center">
				<h1>Welkom, {props.user.name}</h1>
				<p>Wat wilt u doen vandaag?</p>
				<div className="buttons-container">
					{/* <ButtonContainer
						icon={viewLogbookSVG}
						color="yellow"
						description="Bepaal wat de leerlingen in mogen vullen."
						value="Bepaal toegang"
						handler={() => changePage('overview')} //TODO: add page
					/> */}
					<ButtonContainer
						icon={createLogbookSVG}
						color="green"
						description="Een nieuw logboek aanmaken."
						value="Nieuw logboek"
						handler={() => changePage('new-logbook/general')}
					/>
					{/* <ButtonContainer
						icon={archiveSVG}
						color="blue"
						description="Bekijk ingevulde logboeken."
						value="Ingevulde logboeken"
						handler={() => changePage('')} //TODO: add page
					/> */}
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

export const TeacherLanding = connect(mapStateToProps)(
	withRouter(TeacherLandingUI)
)
