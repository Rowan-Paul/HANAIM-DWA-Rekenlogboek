import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from '../js/common/components/Header'

import LogbookDesigner from './logbook-designer/LogbookDesigner'
import LogbookDesignerLanding from './logbook-designer/containers/LogbookDesignerLanding'

import SignIn from '../js/sign-in/SignIn'
import Succes from '../js/sign-in/Succes'

import ReduxDemo from '../js/demo/Demo'

import '../scss/App.scss'

function App() {
	return (
		<div className="app">
			<Header />
			<main>
				<Router>
					<Switch>
						<Route path="/logbook-designer/new-logbook"></Route>
						<Route path="/logbook-designer/overview"></Route>
						<Route path="/logbook-designer" exact>
							<LogbookDesigner>
								<LogbookDesignerLanding />
							</LogbookDesigner>
						</Route>

						<Route path="/redux-demo" exact>
							<ReduxDemo />
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
						{/* <Route component={NotFound} /> */}
					</Switch>
				</Router>
			</main>
		</div>
	)
}

export default App
