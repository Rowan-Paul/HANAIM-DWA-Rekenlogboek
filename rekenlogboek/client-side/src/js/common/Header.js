import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../../scss/common/Header.scss'

import { resetLogbook } from '../redux/logbook/actions'
import { resetLogbookOverview } from '../redux/logbookoverview/actions'
import { resetMain } from '../redux/main/actions'

function Header(props) {
	const navHandler = () => {
		if (props.user) {
			switch (props.user.jobTitle) {
				case 'Leraar':
					return (
						<Link to="../teacher">
							<i className="fa fa-home"></i>
							<span>Overzicht</span>
						</Link>
					)
				case 'Leerling':
				default:
					return ''
			}
		}
	}

	const logOut = () => {
		window.localStorage.clear()
		props.doResetLogbook()
		props.doResetLogbookOverview()
		props.doResetMain()

		props.history.push('/')
	}

	return (
		<header>
			<div className="return">{navHandler()}</div>
			<div className="title">
				<span>{props.title}</span>
			</div>
			<div className="user">
				<span>
					{props.user && props.user.name}
					<p onClick={logOut}>{props.user.name && 'Uitloggen'}</p>
				</span>
			</div>
		</header>
	)
}

const mapStateToProps = state => {
	return {
		user: state.main.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		doResetLogbook: () => dispatch(resetLogbook()),
		doResetLogbookOverview: () => dispatch(resetLogbookOverview()),
		doResetMain: () => dispatch(resetMain())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
