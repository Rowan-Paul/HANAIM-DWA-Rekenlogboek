import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

function AuthMiddleware(props) {
	useEffect(() => {
		const jobTitle = props.user.jobTitle
		const pathName = props.history.location.pathname

		const redirect = () => {
			if (pathName !== '/') props.history.push('../')
		}
		switch (jobTitle) {
			case props.roles.Leerling:
				return pathName.includes('student') ? null : redirect()
			case props.roles.Leraar:
				return pathName.includes('teacher') ? null : redirect()
			case props.roles.Logboekontwerper:
				return pathName.includes('logbook-designer') ? null : redirect()
			default:
				redirect()
		}
	}, [props])
	return props.children
}

const mapStateToProps = state => ({
	user: state.main.user,
	roles: state.main.roles
})

export default connect(mapStateToProps)(withRouter(AuthMiddleware))
