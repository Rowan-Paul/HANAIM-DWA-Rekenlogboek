import '../../../scss/teacher/containers/TeacherLanding.scss'

import React from 'react'
import { connect } from 'react-redux'
import { useHistory, withRouter } from 'react-router-dom'

import ButtonContainer from '../../common/ButtonContainer'

import archiveSVG from '../../../img/icons/archive.svg'
import createLogbookSVG from '../../../img/icons/create_log_green.svg'
import viewLogbookSVG from '../../../img/icons/view_log_yellow.svg'

function Index(props) {
	return (
		<div className="teacher-landing">
			<div className="flex-center">
				<h1>Welkom {props.user.name},</h1>
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
						icon={archiveSVG}
						color="blue"
						description="Bekijk ingevulde logboeken."
						value="Ingevulde logboeken"
						handler={() => props.history.push('/teacher/logbooks')}
					/>

					<ButtonContainer
						icon={createLogbookSVG}
						color="green"
						description="Bekijk hier het logboek groepsoverzicht"
						value="Groepsoverzicht logboek"
						handler={() => props.history.push('/teacher/group-overview/')}
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
