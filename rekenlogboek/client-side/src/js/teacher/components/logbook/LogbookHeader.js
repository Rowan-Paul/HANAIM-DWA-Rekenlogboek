import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

function VisualHeader(props) {
	const [colums, setColumns] = useState([])

	useEffect(() => {
		setColumns(props.columns)
	}, [props.columns])

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

			<div>
				<h4>Evaluatie</h4>
			</div>
		</li>
	)
}

const mapStateToProps = state => {
	return {
		columns: state.logbook.columns
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(VisualHeader)
