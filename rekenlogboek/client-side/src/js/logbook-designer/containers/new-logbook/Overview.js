import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveLogbook, resetLogbook } from '../../../redux/logbook/actions'

import Button from '../../../common/Button'
import Jumbotron from '../../../common/Jumbotron'
import LogbookFrame from '../../../common/logbook/LogbookFrame'
import LogbookHeader from '../../../common/logbook/LogbookHeader'
import LogbookRows from '../../../common/logbook/LogbookRows'
import TopBar from '../../../common/logbook/TopBar'

import '../../../../scss/logbook-designer/NewLogbook.scss'
function Overview(props) {
	useEffect(() => {
		// Prevent skipping goals page
		props.columns.map(c => !c.added && props.history.push('./goals'))

		if (props.isSaved) {
			props.resetLogbook()
			props.history.push('./done')
		}
	})

	return (
		<div className="new-logbook">
			<Jumbotron>
				<TopBar title="Overzicht logbook" />

				<LogbookFrame>
					<LogbookHeader
						columns={props.columns}
						type={props.logbookTypes.newLogbook}
					/>
					<LogbookRows
						goals={props.goals}
						type={props.logbookTypes.newLogbook}
					/>
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

const mapStateToProps = state => ({
	columns: state.logbook.columns,
	logbookTypes: state.main.logbookTypes,
	group: state.logbook.group,
	goals: state.logbook.goals,
	isSaved: state.logbook.isSaved
})

const mapDispatchToProps = dispatch => ({
	saveLogbook: () => dispatch(saveLogbook()),
	resetLogbook: () => dispatch(resetLogbook())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Overview))
