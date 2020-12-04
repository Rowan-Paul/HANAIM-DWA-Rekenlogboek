import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LogbookList from '../components/LogbookList'
import Jumbotron from '../../common/Jumbotron'

function StudentLogbooks(props) {
	const [logbook, setLogbook] = useState('')
	const [studentlogbooks, setStudentlogbooks] = useState([])

	useEffect(() => {
		fetch(`http://localhost:3000/logbook/year/19%2F20/group/5/period/1`, {
			method: 'GET'
		})
			.then(response => response.json())
			.then(response => {
				setLogbook(response)
				console.log(response._id)
				return response
			})
			.then(response => {
				fetch(`http://localhost:3000/studentlogbook/logbooks/` + response._id, {
					method: 'GET'
				})
					.then(response => response.json())
					.then(response => {
						setStudentlogbooks(response)
					})
			})
			.catch(error => console.log(error))
	}, [])

	return (
		<Jumbotron>
			<LogbookList
				logbook={logbook}
				studentlogbooks={studentlogbooks}
			></LogbookList>
		</Jumbotron>
	)
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(StudentLogbooks))
