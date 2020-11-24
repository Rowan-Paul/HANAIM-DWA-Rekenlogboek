import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from '../js/common/Header'

import LogbookDesigner from './logbook-designer/LogbookDesigner'
import LogbookDesignerLanding from './logbook-designer/containers/LogbookDesignerLanding'
import Page1 from './logbook-designer/containers/Page1'
import Page2 from './logbook-designer/containers/Page1'

import SignIn from '../js/sign-in/SignIn'

import '../scss/App.scss'

function App() {
	return (
		<div className="app">
			<Header />
			<main>
				<Router>
					<Switch>
						<Route path="/logbook-designer/new-logbook/page-1">
							<Page1></Page1>
						</Route>
						<Route path="/logbook-designer/new-logbook/page-2">
							<Page2></Page2>
						</Route>
						<Route path="/logbook-designer/new-logbook/page-3"></Route>
						<Route path="/logbook-designer/new-logbook/page-4"></Route>
						<Route path="/logbook-designer/new-logbook/page-5"></Route>
						<Route path="/logbook-designer/overview"></Route>
						<Route path="/logbook-designer">
							<LogbookDesigner>
								<LogbookDesignerLanding />
							</LogbookDesigner>
						</Route>

						<Route path="/" exact>
							<SignIn />
						</Route>
					</Switch>
				</Router>
			</main>
		</div>
	)
}

export default App
