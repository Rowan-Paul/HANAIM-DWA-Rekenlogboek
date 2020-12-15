import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addLogbookPeriod } from '../../../redux/logbook/actions'

import Button from '../../../common/Button'
import Illustration from '../../components/Illustration'
import Image from '../../../../img/illustrations/log_select_year.svg'
import InfoContainer from '../../../common/InfoContainer'
import Jumbotron from '../../../common/Jumbotron'
import Select from '../../../common/Select'

import '../../../../scss/logbook-designer/NewLogbook.scss'

function General(props) {
	const [group, setGroup] = useState(props.group)
	const [period, setPeriod] = useState(props.period)

	const changeGroupHandler = value => setGroup(value)
	const changePeriodHandler = value => setPeriod(value)

	const username = props.user.name
	const nextButtonHandler = () => {
		if (group === 0 || period === 0) {
			alert('Selecteer eerst een groep en periode')
		} else {
			props.addLogbookPeriod({ group, period, username })
			props.history.push('./columns')
		}
	}

	return (
		<div className="new-logbook">
			<Jumbotron columns={3}>
				<div className="vertical-center">
					<form>
						{/* TODO: remove dummy options & replace with dynamic data*/}
						<Select
							title="Kies een groep:"
							selected={group}
							options={['5', '6', '7', '8']}
							id={'group'}
							changeHandler={value => changeGroupHandler(value)}
						/>
						<Select
							title="Kies een blok:"
							selected={period}
							options={['1', '2', '3', '4', '5', '6']}
							id={'period'}
							changeHandler={value => changePeriodHandler(value)}
						/>
					</form>
				</div>
				<InfoContainer>
					<Illustration
						title="Kies de klas en het blok waarvoor u een logboek wilt maken."
						image={Image}
					/>
				</InfoContainer>
			</Jumbotron>
			<div className="next button">
				<Button
					color="blue"
					value="Volgende"
					handler={() => nextButtonHandler()}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		user: state.main.user,
		group: state.logbook.group,
		period: state.logbook.period
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addLogbookPeriod: payload => dispatch(addLogbookPeriod(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(General))
