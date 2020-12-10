import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

function StudentLogbookHeader(props) {
	const [colums, setColumns] = useState([])

	useEffect(() => {
		setColumns(props.columns)
	}, [props.columns])

	return (
		<li className="Row Header">
			{colums.map(column => (
				<div key={column.position} className="Cell">
					<h4>{column.title}</h4>
				</div>
			))}
		</li>
	)
}

const mapStateToProps = state => {
	return {
		columns: state.logbookoverview.currentLogbook.columns
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentLogbookHeader)
