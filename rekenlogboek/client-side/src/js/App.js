import React from 'react'
import * as microsoftTeams from '@microsoft/teams-js'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from '../js/common/Header'

/* TEMP logout button */
import { LogOutButton } from './LogOutButton'

import { TeacherLanding } from './teacher/containers/TeacherLanding'

// LOGBOOK PAGES
import newLBGeneral from './teacher/containers/General'
import newLBColumns from './teacher/containers/Columns'
import newLBGoals from './teacher/containers/Goals'
import newLBOverview from './teacher/containers/Overview'
import newLBCompleted from './teacher/containers/Completed'

// SIGN IN
import SignIn from '../js/sign-in/SignIn'
import { Succes } from '../js/sign-in/Succes'
import NoAccess from '../js/no-access/NoAccess'

// TEAMS PAGES
// TODO: make privacy and terms of use pages
// those are required in order to add your app
// to teams, though the pages aren't checked
// if they actually exist

// import Privacy from './Privacy'
// import TermsOfUse from './TermsOfUse'
import TabConfig from './teams/TabConfig'

// STUDENT PAGES
import { Default } from './student/containers/Default'
import { AfterPreTest } from './student/containers/AfterPreTest'
import Instructions from './student/containers/Instructions'
import Evaluation from './student/containers/Evaluation'

import '../scss/App.scss'

// require env variables
require('dotenv').config()

function App() {
	// Check for the Microsoft Teams SDK object.
	if (microsoftTeams) {
		// if the application isn't in Teams,
		// use this, else initialise Teams
		if (window.parent === window.self) {
			return (
				<div>
					<Header />
					<main>
						<Router>
							{/* TEMP logout button */}
							<LogOutButton />
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
									component={AfterPreTestEnd}
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
						</Router>
					</main>
				</div>
			)
		}

		// Initialize the Microsoft Teams SDK
		microsoftTeams.initialize()

		// Display the app home page hosted in Teams
		return (
			<main>
				<Router>
					<Switch>
						<Route exact path="/config" component={TabConfig} />

						{/* SIGN-IN */}
						<Route exact path="/Tab" component={SignIn} />
						<Route exact path="/auth/succes" component={Succes} />

						{/* STUDENT LOGBOEK */}
						<Route exact path="/student" component={Default} />
						<Route exact path="/student/pretest" component={AfterPreTest} />
						<Route
							exact
							path="/student/instructions"
							component={Instructions}
						/>
						<Route exact path="/student/evaluation" component={Evaluation} />

						{/* ERROR PAGES */}
						<Route exact path="/no-access" component={NoAccess} />
						{/* <Route component={NotFound} /> */}
					</Switch>
				</Router>
			</main>
		)
	}

	// Error when the Microsoft Teams SDK is not found
	// in the project.
	return <h3>Microsoft Teams SDK not found.</h3>
}

export default App
