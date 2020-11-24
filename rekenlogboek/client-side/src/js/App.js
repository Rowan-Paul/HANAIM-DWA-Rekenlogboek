import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from '../js/common/Header'

import LogbookDesigner from './logbook-designer/LogbookDesigner'
import LogbookDesignerLanding from './logbook-designer/containers/LogbookDesignerLanding'
import Page1 from './logbook-designer/containers/Page1'
import Page2 from './logbook-designer/containers/Page1'

import Page3 from '../js/logbook-designer/containers/Page3'

import SignIn from '../js/sign-in/SignIn'

import ReduxDemo from '../js/demo/Demo'

import '../scss/App.scss'

function App() {
	return (
		<div className="app">
			<Header />
			<main>
				<Router>
					<Switch>
						<Route path="/" exact>
							<SignIn />
						</Route>

						<Route path="/redux-demo" exact>
							<ReduxDemo />
						</Route>
						<Route path="/logbook-designer/new-logbook"></Route>
						<Route path="/logbook-designer/overview"></Route>
						<Route path="/logbook-designer">
							<LogbookDesigner>
								<LogbookDesignerLanding />
							</LogbookDesigner>
						</Route>

						<Route path="/logbook-designer/new-logbook/page-1">
							<Page1 />
						</Route>
						<Route path="/logbook-designer/new-logbook/page-2">
							<Page2 />
						</Route>
						<Route path="/logbook-designer/new-logbook/page-3">
							<Page3 />
						</Route>
						<Route path="/logbook-designer/new-logbook/page-4"></Route>
					</Switch>
				</Router>
			</main>
		</div>
	)
}

export default App
