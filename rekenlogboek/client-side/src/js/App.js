import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from '../js/common/components/Header'

import LogbookDesigner from './logbook-designer/LogbookDesigner'
import LogbookDesignerLanding from './logbook-designer/containers/LogbookDesignerLanding'
import NewLogbook from './logbook-designer/containers/NewLogbook'

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
							<LogbookDesigner>
								<NewLogbook></NewLogbook>
							</LogbookDesigner>
						</Route>
						<Route path="/logbook-designer/new-logbook/page-2">
							<LogbookDesigner>
								<NewLogbook></NewLogbook>
							</LogbookDesigner>
						</Route>
						<Route path="/logbook-designer/new-logbook/page-3">
							<LogbookDesigner>
								<NewLogbook></NewLogbook>
							</LogbookDesigner>
						</Route>
						<Route path="/logbook-designer/new-logbook/page-4">
							<LogbookDesigner>
								<NewLogbook></NewLogbook>
							</LogbookDesigner>
						</Route>
						<Route path="/logbook-designer/new-logbook/page-5">
							<LogbookDesigner>
								<NewLogbook></NewLogbook>
							</LogbookDesigner>
						</Route>
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
