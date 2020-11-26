import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from '../js/common/Header'

import LogbookDesigner from './logbook-designer/LogbookDesigner'
import LogbookDesignerLanding from './logbook-designer/containers/LogbookDesignerLanding'

import NewLogbook1 from './logbook-designer/containers/NewLogbook1'
import NewLogbook2 from './logbook-designer/containers/NewLogbook2'
import NewLogbook3 from './logbook-designer/containers/NewLogbook3'
import NewLogbook4 from './logbook-designer/containers/NewLogbook4'
import NewLogbook5 from './logbook-designer/containers/NewLogbook5'

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
							<NewLogbook1 />
						</Route>
						<Route path="/logbook-designer/new-logbook/page-2">
							<NewLogbook2 />
						</Route>
						<Route path="/logbook-designer/new-logbook/page-3">
							<NewLogbook3 />
						</Route>
						<Route path="/logbook-designer/new-logbook/page-4">
							<NewLogbook4 />
						</Route>
						<Route path="/logbook-designer/new-logbook/page-5">
							<NewLogbook5 />
						</Route>
						<Route path="/logbook-designer/new-logbook"></Route>
						<Route path="/logbook-designer/overview"></Route>
						<Route path="/logbook-designer">
							<LogbookDesigner>
								<LogbookDesignerLanding />
							</LogbookDesigner>
						</Route>

						<Route exact path="/" component={SignIn} />
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
