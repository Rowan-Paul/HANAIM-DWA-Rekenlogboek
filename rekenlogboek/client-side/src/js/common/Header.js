import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../../scss/common/Header.scss'

function Header(props) {
	const navHandler = () => {
		if (props.loggedIn) {
			switch (props.user.jobTitle) {
				case 'Leraar':
					return (
						<Link to="./overview">
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

	return (
		<header>
			<div className="return">{navHandler()}</div>
			<div className="title">
				<span>{props.title}</span>
			</div>
			<div className="user">
				<span>{props.loggedIn && props.user.name}</span>
			</div>
		</header>
	)
}

const mapStateToProps = state => {
	return {
		loggedIn: state.main.loggedIn,
		user: state.main.user
	}
}

export default connect(mapStateToProps)(Header)
