import '../scss/App.scss'

import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from '../js/common/components/Header'
import SignIn from '../js/sign-in/SignIn'
import Succes from '../js/sign-in/Succes'

function App() {
	return (
		<Router>
			<div className="app">
				<Header />
				<main>
					<Switch>
						<Route exact path="/" component={SignIn} />
						<Route
							exact
							path="/auth"
							component={() => {
								window.location.href = 'http://localhost:3000/auth'
								return null
							}}
						/>
						<Route exact path="/auth/succes" component={Succes} />
						{/* <Route component={NotFound} /> */}
					</Switch>
				</main>
			</div>
		</Router>
	)
}

export default App
