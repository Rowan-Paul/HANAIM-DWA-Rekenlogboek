import '../../scss/sigin-in/SignIn.scss'

import React from 'react'
import { NavLink } from 'react-router-dom'
import SignInContainer from './components/SignInContainer'

export default function SignIn() {
	return (
		<section>
			<NavLink to="/auth">Auth me</NavLink>
			<SignInContainer />
			<div className="illustration"></div>
		</section>
	)
}
