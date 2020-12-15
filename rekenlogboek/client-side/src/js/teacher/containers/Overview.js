import React, { useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '../../common/Button'
import Jumbotron from '../../common/Jumbotron'
import { saveLogbook, resetLogbook } from '../../redux/logbook/actions'

import '../../../scss/teacher/containers/NewLogbook.scss'
import TopBar from '../components/logbook/TopBar'
import LogbookFrame from '../components/logbook/LogbookFrame'
import LogbookHeader from '../components/logbook/LogbookHeader'
import LogbookRows from '../components/logbook/LogbookRows'

function Overview(props) {
	const history = useHistory()
	useEffect(() => {
		// Prevent skipping goals page
		props.columns.map(c => !c.added && history.push('./goals'))

		if (props.isSaved) {
			props.resetLogbook()
			history.push('./done')
		}
	})

	return (
		<div className="new-logbook">
			<Jumbotron>
				<TopBar title="Overzicht logbook" />

				<LogbookFrame>
					<LogbookHeader />
					<LogbookRows readonly />
				</LogbookFrame>
			</Jumbotron>

			<div className="prev button">
				<Button
					color="gray"
					value="Vorige"
					handler={() => props.history.push('./goals')}
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Overview))
