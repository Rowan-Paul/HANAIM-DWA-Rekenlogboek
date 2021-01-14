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
				// LOGBOOK GROUP ANSWER
				case props.logbookTypes.groupAnswer:
					return (
						<li className="Row Header">
							{colums.map(column => {
								switch (column.position) {
									case 0:
										return (
											<div key={column.position} className="Cell">
												<h4>Naam leerling</h4>
											</div>
										)
									default:
										return (
											<div key={column.position} className="Cell">
												<h4>{column.title}</h4>
											</div>
										)
								}
							})}
						</li>
					)
				// NEW LOGBOOK HEADER
				case props.logbookTypes.newLogbook:
					return (
						<li className="Row Header">
							{colums.map(column => (
								<div key={column.position} className="Cell">
									<h4>{column.added ? column.title : ''}</h4>
								</div>
							))}
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

const mapStateToProps = state => ({
	logbookTypes: state.main.logbookTypes
})

export default connect(mapStateToProps)(withRouter(LogbookHeader))
