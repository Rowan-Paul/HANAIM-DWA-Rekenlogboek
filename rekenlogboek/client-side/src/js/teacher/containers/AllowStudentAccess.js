import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../../../scss/teacher/containers/AllowStudentAccess.scss'

import Check from '../../../img/icons/check_green.svg'
import Lock from '../../../img/icons/lock_blue.svg'

import Jumbotron from '../../common/Jumbotron'
import ButtonContainer from '../../common/ButtonContainer'
import Button from '../../common/Button'

function AllowStudentAccess() {
	return (
		<div className="allow-student-access">
			<div className="period-filter">
				<div>Blok:</div>
				<input type="number" defaultValue="1" min="1" max="99" />
				<Button color="blue" handler={() => {}} value="Kies blok" />
			</div>
			<Jumbotron>
				<div className="content-container">
					<div className="explanation-container">
						<h1>Bepaal wat uw leerlingen zien.</h1>
						<p>
							Kies welk deel van het logboek u wilt ontgrendelen. Er kan maar
							een deel tegelijkertijd open staan. Bij het kiezen van de
							evaluaties pagina kunt u zelf bepalen welke leerdoelen geëvalueerd
							mogen worden.
						</p>
					</div>
					<ButtonContainer
						icon={Check}
						color="green"
						description="Open na pre-toets pagina."
						value="Ontgrendel"
						// handler={() => history.push('../teacher/logbooks')}
					/>

					<ButtonContainer
						icon={Lock}
						color="blue"
						description="Sluit instructie pagina."
						value="Vergrendel"
						// handler={() => history.push('../teacher/logbooks')}
					/>

					<ButtonContainer
						icon={Check}
						color="green"
						description="Open na pre-toets pagina."
						value="Ontgrendel"
						// handler={() => history.push('../teacher/logbooks')}
					/>
				</div>
			</Jumbotron>
		</div>
	)
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AllowStudentAccess))
