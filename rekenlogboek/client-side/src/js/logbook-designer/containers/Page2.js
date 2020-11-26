import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import Jumbotron from '../../common/Jumbotron'
import InfoContainer from '../../common/InfoContainer'
import SelectColumnTypes from '../components/SelectColumnTypes'
import Button from '../../common/Button'
import Illustration from '../components/Illustration'

import Image from '../../../img/illustrations/log_select_question_type.svg'
import '../../../scss/logbook-designer/containers/NewLogbook.scss'

export default function Page2() {
	let history = useHistory()
	const changePage = page => {
		history.push('/logbook-designer/' + page)
	}

	return (
		<div className="new-logbook">
			<Jumbotron>
				<div className="vertical-center">
					<SelectColumnTypes />
				</div>
				<InfoContainer>
					<Illustration
						title="Kies de 2 kolomtypes van een logboek."
						image={Image}
					/>
				</InfoContainer>
			</Jumbotron>

			<div className="prev button">
				<Button
					color="gray"
					value="Vorige"
					handler={() => changePage('new-logbook/page-1')}
				/>
			</div>
			<div className="next button">
				<Button
					color="blue"
					value="Volgende"
					handler={() => changePage('new-logbook/page-3')}
				/>
			</div>
		</div>
	)
}

// const mapStateToProps = state => {
// 	return {}
// }

// const mapDispatchToProps = dispatch => {
// 	return {}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Page2)
