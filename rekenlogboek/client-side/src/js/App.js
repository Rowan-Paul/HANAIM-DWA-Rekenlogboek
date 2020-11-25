import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from '../js/common/Header'

import LogbookDesigner from './logbook-designer/LogbookDesigner'
import LogbookDesignerLanding from './logbook-designer/containers/LogbookDesignerLanding'

import Page1 from './logbook-designer/containers/Page1'
import Page2 from './logbook-designer/containers/Page2'
import Page4 from './logbook-designer/containers/Page4'
import Page3 from './logbook-designer/containers/Page3'

import SignIn from '../js/sign-in/SignIn'
import { Succes } from '../js/sign-in/Succes'
import NoAccess from '../js/no-access/NoAccess'

import '../scss/App.scss'

require('dotenv').config()

function App() {
	return (
		<div>
			<Header />
			<main>
				<Router>
					<Switch>
						<Route path="/logbook-designer/new-logbook/page-1">
							<Page1 />
						</Route>
						<Route path="/logbook-designer/new-logbook/page-2">
							<Page2 />
						</Route>
						<Route path="/logbook-designer/new-logbook/page-3">
							<Page3 />
						</Route>
						<Route path="/logbook-designer/new-logbook/page-4">
							<Page4 />
						</Route>
						<Route path="/logbook-designer/new-logbook"></Route>
						<Route path="/logbook-designer/overview"></Route>
						<Route path="/logbook-designer">
							<LogbookDesigner>
								<LogbookDesignerLanding />
							</LogbookDesigner>
						</Route>

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
						<Route exact path="/no-access" component={NoAccess} />
						{/* <Route component={NotFound} /> */}
					</Switch>
				</Router>
			</main>
		</div>
	)
}

export default App
