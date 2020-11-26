import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from '../js/common/Header'

import LogbookDesigner from './logbook-designer/LogbookDesigner'
import { LogbookDesignerLanding } from './logbook-designer/containers/LogbookDesignerLanding'

import newLBGeneral from './logbook-designer/containers/General'
import newLBColumns from './logbook-designer/containers/Columns'
import newLBGoals from './logbook-designer/containers/Goals'
import newLBOverview from './logbook-designer/containers/Overview'
import newLBCompleted from './logbook-designer/containers/Completed'

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
						{/* LOGBOOK DESIGNER */}
						<Route
							exact
							path="/logbook-designer/new-logbook/algemeen"
							component={newLBGeneral}
						/>
						<Route
							exact
							path="/logbook-designer/new-logbook/kolommen"
							component={newLBColumns}
						/>
						<Route
							exact
							path="/logbook-designer/new-logbook/leerdoelen"
							component={newLBGoals}
						/>
						<Route
							exact
							path="/logbook-designer/new-logbook/leerdoelen-overzicht"
							component={newLBOverview}
						/>
						<Route
							exact
							path="/logbook-designer/new-logbook/klaar"
							component={newLBCompleted}
						/>
						{/* A few route so it gets the correct styling? */}
						<Route path="/logbook-designer/new-logbook"></Route>
						<Route path="/logbook-designer/overview"></Route>
						<Route path="/logbook-designer">
							<LogbookDesigner>
								<LogbookDesignerLanding />
							</LogbookDesigner>
						</Route>

						{/* SIGN-IN */}
						<Route exact path="/" component={SignIn} />
						<Route exact path="/auth/succes" component={Succes} />

						{/* ERROR PAGES */}
						<Route exact path="/no-access" component={NoAccess} />
						{/* <Route component={NotFound} /> */}
					</Switch>
				</Router>
			</main>
		</div>
	)
}

export default App
