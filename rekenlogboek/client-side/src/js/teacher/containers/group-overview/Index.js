import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../../../scss/teacher/containers/group-overview/Index.scss'
export const Index = () => {
	return <div className="GroupOverview"></div>
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
