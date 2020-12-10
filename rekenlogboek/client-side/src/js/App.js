import React from 'react'
import * as microsoftTeams from '@microsoft/teams-js'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from '../js/common/Header'

import { TeacherLanding } from './teacher/containers/TeacherLanding'

// LOGBOOK PAGES
import newLBGeneral from './teacher/containers/General'
import newLBColumns from './teacher/containers/Columns'
import newLBGoals from './teacher/containers/Goals'
import newLBOverview from './teacher/containers/Overview'
import newLBCompleted from './teacher/containers/Completed'

import Logbooks from './teacher/containers/Logbooks'

// SIGN IN PAGES
import SignIn from '../js/sign-in/SignIn'
import { Succes } from '../js/sign-in/Succes'
import NoAccess from '../js/no-access/NoAccess'

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
import { AfterPreTestEnd } from './student/containers/AfterPreTestEnd'
import { InstructionsEnd } from './student/containers/InstructionsEnd'
import EvaluationsEnd from './student/containers/EvaluationsEnd'
import { Instructions } from './student/containers/Instructions'
import Evaluations from './student/containers/Evaluations'

import '../scss/App.scss'

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
								{/* LOGBOOK MAKER */}
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
								<Route
									exact
									path="/teacher/logbooks"
									component={Logbooks}
								></Route>
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
				<main>
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
							path="/student/pretest/done"
							component={AfterPreTestEnd}
						/>
						<Route exact path="/student/instruction" component={Instructions} />
						<Route
							exact
							path="/student/instruction/done"
							component={InstructionsEnd}
						/>
						<Route exact path="/student/evaluation" component={Evaluations} />
						<Route
							exact
							path="/student/evaluation/end"
							component={EvaluationsEnd}
						/>
						{/* ERROR PAGES */}
						<Route exact path="/no-access" component={NoAccess} />
						{/* <Route component={NotFound} /> */}
					</Switch>
				</main>
			</Router>
		)
	}

	// Error when the Microsoft Teams SDK is not found
	// in the project.
	return <h3>Microsoft Teams SDK not found.</h3>
}

export default App
