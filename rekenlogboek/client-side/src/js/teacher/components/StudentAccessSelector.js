import React, { useEffect } from 'react'
import ButtonContainer from '../../common/ButtonContainer'
import { connect } from 'react-redux'
import { modalShow } from '../../redux/logbook/actions'

import Check from '../../../img/icons/check_green.svg'
import Lock from '../../../img/icons/lock_blue.svg'

function StudentAccessSelector(props) {
	const phases = {
		NOT_VISIBLE: 'notVisible',
		PRE_TEST: 'pretest',
		INSTRUCTIONS: 'instructions',
		EVALUATION: 'evaluation'
	}

	useEffect(() => {
		if (props.currentLogbook.currentPhase === phases.EVALUATION) {
			props.selectGoal(props.currentLogbook.activeGoal)
		}
	}, [])

	const openLearnGoalModal = () => {
		props.modalShow({
			title: 'Bepaal toegang'
		})
	}

	const lockContainer = {
		icon: Lock,
		color: 'blue',
		value: 'Ontgrendel'
	}

	const checkContainer = {
		icon: Check,
		color: 'green',
		value: 'Vergrendel'
	}

	const openPage = phase => `Open ${phase} pagina.`
	const closePage = phase => `Sluit ${phase} pagina.`
	const equalsPhase = phase => props.currentLogbook.currentPhase === phase

	return (
		<div className="content-container">
			<div className="explanation-container">
				<h3>{`Leerjaar ${props.logbookData.year}, blok ${props.logbookData.period}`}</h3>
				<h1>Bepaal wat uw leerlingen zien.</h1>
				<p>
					Kies welk deel van het logboek u wilt ontgrendelen. Er kan maar een
					deel tegelijkertijd open staan. Bij het kiezen van de evaluaties
					pagina kunt u zelf bepalen welk leerdoel geëvalueerd mag worden.
				</p>
				<p>
					Wilt u een ander blok openen, dan kan dat rechtsbovenin. Zodra u een
					deel van een ander blok ontgrendeld zullen alle andere blokken van de
					klas vergrendeld worden. Op die manier is er altijd maar een blok in
					beeld voor de leerlingen.
				</p>
			</div>
			<ButtonContainer
				{...(equalsPhase(phases.PRE_TEST)
					? {
							description: openPage('pre-toets'),
							...checkContainer
					  }
					: {
							description: closePage('pre-toets'),
							...lockContainer
					  })}
				handler={() => props.updatePhase(phases.PRE_TEST)}
			/>

			<ButtonContainer
				{...(equalsPhase(phases.INSTRUCTIONS)
					? {
							description: openPage('instructies'),
							...checkContainer
					  }
					: {
							description: closePage('instructies'),
							...lockContainer
					  })}
				handler={() => props.updatePhase(phases.INSTRUCTIONS)}
			/>

			<ButtonContainer
				{...(equalsPhase(phases.EVALUATION)
					? {
							description: openPage('evaluatie'),
							...checkContainer
					  }
					: {
							description: closePage('evaluatie'),
							...lockContainer
					  })}
				handler={() => openLearnGoalModal()}
			/>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		modalVisible: state.logbook.modal.visible,
		currentLogbook: state.allowStudentAccess.currentLogbook
	}
}

const mapDispatchToProps = dispatch => {
	return {
		modalShow: payload => dispatch(modalShow(payload))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentAccessSelector)
