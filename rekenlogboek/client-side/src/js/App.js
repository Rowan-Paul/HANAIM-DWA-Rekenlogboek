import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from '../js/common/components/Header'
import LogbookDesigner from '../js/logbook-designer/LogbookDesigner'
// import SignIn from '../js/sign-in/SignIn'

import '../scss/App.scss'

function App() {
	return (
		<div className="app">
			<Header />
			<main>
				<Router>
					<Switch>
						<Route path="/logbook-designer" exact>
							<LogbookDesigner />
						</Route>
					</Switch>
				</Router>
			</main>
		</div>
	)
}

export default App
