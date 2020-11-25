import '../../../scss/logbook-designer/containers/Page3.scss'

import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '../../common/Button'
import InfoContainer from '../../common/InfoContainer'
import Jumbotron from '../../common/Jumbotron'
import LogbookOverview from '../components/LogbookOverview'
import LogbookVisualizer from '../components/LogbookVisualizer'
import { saveLogbook } from '../../../redux/logbook/actions'

function Page4(props) {
	let history = useHistory()
	const changePage = page => {
		history.push('/logbook-designer/' + page)
	}
	const saveLogbook = () => props.saveLogbook()

	return (
		<div className="Page3">
			<Jumbotron>
				<LogbookOverview
					columns={props.columns}
					group={props.group}
					goals={props.goals}
				/>
				<InfoContainer>
					<LogbookVisualizer
						columns={props.columns}
						group={props.group}
						goals={props.goals}
					/>
				</InfoContainer>
			</Jumbotron>

			<div className="prev button">
				<Button
					color="gray"
					value="Vorige"
					handler={() => changePage('new-logbook/page-3')}
				/>
			</div>
			<div className="next button">
				<Button color="blue" value="Opslaan" handler={() => saveLogbook()} />
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		columns: state.logbook.columns,
		group: state.logbook.group,
		goals: state.logbook.goals
	}
}
const mapDispatchToProps = dispatch => {
	return {
		saveLogbook: () => dispatch(saveLogbook())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Page4)
