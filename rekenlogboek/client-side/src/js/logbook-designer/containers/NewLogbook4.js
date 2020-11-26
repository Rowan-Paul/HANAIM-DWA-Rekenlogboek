import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '../../common/Button'
import InfoContainer from '../../common/InfoContainer'
import Jumbotron from '../../common/Jumbotron'
import LogbookOverview from '../components/LogbookOverview'
import LogbookVisualizer from '../components/LogbookVisualizer'
import { saveLogbook, resetLogbook } from '../../../redux/logbook/actions'

import '../../../scss/logbook-designer/containers/NewLogbook.scss'

function Page4(props) {
	let history = useHistory()

	useEffect(() => {
		if (props.isSaved) {
			props.resetLogbook()
			history.push('./page-5')
		}
	})

	return (
		<div className="new-logbook">
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
					handler={() => history.push('./page-3')}
				/>
			</div>
			<div className="next button">
				<Button
					color="blue"
					value="Opslaan"
					handler={() => props.saveLogbook()}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		columns: state.logbook.columns,
		group: state.logbook.group,
		goals: state.logbook.goals,
		isSaved: state.logbook.isSaved
	}
}
const mapDispatchToProps = dispatch => {
	return {
		saveLogbook: () => dispatch(saveLogbook()),
		resetLogbook: () => dispatch(resetLogbook())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Page4)
