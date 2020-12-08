import React from 'react'
import * as microsoftTeams from '@microsoft/teams-js'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from '../js/common/Header'

import { TeacherLanding } from './teacher/containers/TeacherLanding'

import Default from './student/containers/Default'
import AfterPreTest from './student/containers/AfterPreTest'
import AfterPreTestEnd from './student/containers/AfterPreTestEnd'
import InstructionsEnd from './student/containers/InstructionsEnd'
import EvaluationsEnd from './student/containers/EvaluationsEnd'
import defaultStudentPage from './student/containers/Default'
import Instructions from './student/containers/Instructions'
import Evaluations from './student/containers/Evaluations'

import newLBGeneral from './teacher/containers/General'
import newLBColumns from './teacher/containers/Columns'
import newLBGoals from './teacher/containers/Goals'
import newLBOverview from './teacher/containers/Overview'
import newLBCompleted from './teacher/containers/Completed'

import SignIn from '../js/sign-in/SignIn'
import { Succes } from '../js/sign-in/Succes'
import NoAccess from '../js/no-access/NoAccess'
import Pretoetstest from './teams/Pretoetstest'

// TODO: make privacy and terms of use pages
// those are required in order to add your app
// to teams, though the pages aren't checked
// if they actually exist

// import Privacy from './Privacy'
// import TermsOfUse from './TermsOfUse'
import Tab from './teams/Tab'
import TabConfig from './teams/TabConfig'

import '../scss/App.scss'

require('dotenv').config()

function App() {
	// Check for the Microsoft Teams SDK object.
	if (microsoftTeams) {
		// if the application isn't in Teams,
		// use this, else initialise Teams
		if (window.parent === window.self) {
			return (
				<div>
					<Router>
						<Header />
						<main>
							<Switch>
								{/* <Route
									exact
									path="/student/default"
									component={Default}
								/> */}

								{/*TODO: change back to AfterPreTest */}
								<Route
									exact
									path="/student/after-pre-test"
									component={InstructionsEnd}
								/>
								{/* <Route
									exact
									path="/student/instructions"
									component={Instructions} />
								<Route
									exact
									path="/student/evaluation"
									component={Evaluation}
								/> */}

								<Route
									exact
									path="/teacher/new-logbook/general"
									component={newLBGeneral}
								/>
								<Route
									exact
									path="/teacher/new-logbook/columns"
									component={newLBColumns}
								/>
								<Route
									exact
									path="/teacher/new-logbook/goals"
									component={newLBGoals}
								/>
								<Route
									exact
									path="/teacher/new-logbook/overview"
									component={newLBOverview}
								/>
								<Route
									exact
									path="/teacher/new-logbook/done"
									component={newLBCompleted}
								/>
								{/* A few route so it gets the correct styling? */}
								<Route path="/teacher/new-logbook"></Route>
								<Route path="/teacher/overview"></Route>
								<Route path="/teacher" component={TeacherLanding} />

								{/* SIGN-IN */}
								<Route exact path="/" component={SignIn} />
								<Route exact path="/auth/succes" component={Succes} />

								{/* ERROR PAGES */}
								<Route exact path="/no-access" component={NoAccess} />
								{/* <Route component={NotFound} /> */}
							</Switch>
						</main>
					</Router>
				</div>
			)
		}

		// Initialize the Microsoft Teams SDK
		microsoftTeams.initialize()

		// Display the app home page hosted in Teams
		return (
			<Router>
				<Switch>
					<Route exact path="/tab" component={Tab} />
					<Route exact path="/config" component={TabConfig} />
					<Route exact path="/tab/pretoetstest" component={Pretoetstest} />
				</Switch>
			</Router>
		)
	}

	// Error when the Microsoft Teams SDK is not found
	// in the project.
	return <h3>Microsoft Teams SDK not found.</h3>
}

export default App
