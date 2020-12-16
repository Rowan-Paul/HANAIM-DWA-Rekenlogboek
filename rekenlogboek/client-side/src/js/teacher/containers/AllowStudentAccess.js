import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

function AllowStudentAccess(props) {
	return <div></div>
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
)(withRouter(AllowStudentAccess))
