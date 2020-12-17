import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function LogbookHeader(props) {
	const [colums, setColumns] = useState([])

	useEffect(() => {
		setColumns(props.columns)
	}, [props.columns])

	const columnPropHandler = () => {
		if (colums) {
			switch (props.type) {
				// NEW LOGBOOK HEADER
				case props.logbookTypes.newLogbook:
					return (
						<li className="Row Header">
							<div className="Cell">
								<h4>Doelen</h4>
							</div>
							{colums.map(column => (
								<div key={column.position} className="Cell">
									<h4>{column.added ? column.title : ''}</h4>
								</div>
							))}
							<div className="Cell">
								<h4>Evaluatie</h4>
							</div>
						</li>
					)
				// STUDENT LOGBOOK HEADER
				case props.logbookTypes.studentLogbook:
					return (
						<li className="Row Header">
							{colums.map(column => (
								<div key={column.position} className="Cell">
									<h4>{column.title}</h4>
								</div>
							))}
						</li>
					)
				default:
					return (
						<p className="ErrorMessage">
							LogbookHeader: props.type not set or empty! (see
							state.logbook.type)
						</p>
					)
			}
		}

		return (
			<p className="ErrorMessage">
				LogbookHeader: props.columns not set or empty!
			</p>
		)
	}
	return columnPropHandler()
}

const mapStateToProps = state => {
	return {
		logbookTypes: state.main.logbookTypes
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(LogbookHeader))
