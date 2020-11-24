import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import LogbookDesignerLanding from './containers/LogbookDesignerLanding'

import '../../scss/logbook-designer/LogbookDesigner.scss'

function LogbookDesigner() {
	return (
		<div className="logbook-developer">
			<Router>
				<Switch>
					<Route path="/logbook-designer/new-logbook"></Route>
					<Route path="/logbook-designer/overview"></Route>
					<Route path="/logbook-designer" exact>
						<LogbookDesignerLanding />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default LogbookDesigner
