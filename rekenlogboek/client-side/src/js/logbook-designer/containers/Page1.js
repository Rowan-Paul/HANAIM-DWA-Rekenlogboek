import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import Jumbotron from '../../common/Jumbotron'
import InfoContainer from '../../common/InfoContainer'
import Select from '../../common/Select'
import Button from '../../common/Button'
import Illustration from '../components/Illustration'
import { addLogbookPeriod } from '../../../redux/logbook/actions'

import Image from '../../../img/illustrations/log_select_year.svg'
import '../../../scss/logbook-designer/containers/NewLogbook.scss'

function Page1(props) {
	const [group, setGroup] = useState(props.group.toString())
	const [period, setPeriod] = useState(props.period.toString())

	const changeGroupHandler = value => setGroup(value)
	const changePeriodHandler = value => setPeriod(value)

	let history = useHistory()
	const changePage = page => {
		history.push('/logbook-designer/' + page)
	}

	const nextButtonHandler = () => {
		props.addLogbookPeriod({ group, period })
		changePage('new-logbook/page-2')
	}

	return (
		<div className="new-logbook">
			<Jumbotron>
				<div className="vertical-center">
					<form>
						{/* TODO: remove dummy options & replace with dynamic data*/}
						<Select
							title="Kies een groep:"
							selected={group}
							options={['5', '6', '7', '8']}
							changeHandler={value => changeGroupHandler(value)}
						/>
						<Select
							title="Kies een blok:"
							selected={period}
							options={['1', '2', '3', '4', '5', '6']}
							changeHandler={value => changePeriodHandler(value)}
						/>
					</form>
				</div>
				<InfoContainer>
					<Illustration
						title="Vul de velden links in voor een invulbare preview voor een doel van het logboek."
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
		group: state.logbook.group,
		period: state.logbook.period
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addLogbookPeriod: payload => dispatch(addLogbookPeriod(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Page1)
