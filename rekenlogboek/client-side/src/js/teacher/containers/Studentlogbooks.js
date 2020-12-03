import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LogbookList from '../components/LogbookList'
import Jumbotron from '../../common/Jumbotron'

function StudentLogbooks(props) {
	return (
		<Jumbotron>
			<LogbookList></LogbookList>
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
