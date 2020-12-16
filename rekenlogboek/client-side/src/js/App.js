import React from 'react'
import * as microsoftTeams from '@microsoft/teams-js'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from '../js/common/Header'

// TEACHER PAGES
import TeacherIndex from './teacher/containers/Index'

// LOGBOOK DESIGNER PAGES
import LBDesignerIndex from './logbook-designer/containers/Index'

// NEW LOGBOOK PAGES (FLOW ORDER)
import newLBGeneral from './logbook-designer/containers/new-logbook/General'
import newLBColumns from './logbook-designer/containers/new-logbook/Columns'
import newLBGoals from './logbook-designer/containers/new-logbook/Goals'
import newLBOverview from './logbook-designer/containers/new-logbook/Overview'
import newLBCompleted from './logbook-designer/containers/new-logbook/Completed'

import Logbooks from './teacher/containers/Logbooks'
import StudentLogbook from './teacher/containers/Studentlogbook'

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
import Default from './student/containers/Default'
import defaultStudentPage from './student/containers/Default'
import AfterPreTest from './student/containers/AfterPreTest'
import AfterPreTestEnd from './student/containers/AfterPreTestEnd'
import InstructionsEnd from './student/containers/InstructionsEnd'
import EvaluationsEnd from './student/containers/EvaluationsEnd'
import Instructions from './student/containers/Instructions'
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
								{/* LOGBOOK DESIGNER -> NEW LOGBOOK */}
								<Route
									exact
									path="/logbook-designer/new-logbook/general"
									component={newLBGeneral}
								/>
								<Route
									exact
									path="/logbook-designer/new-logbook/columns"
									component={newLBColumns}
								/>
								<Route
									exact
									path="/logbook-designer/new-logbook/goals"
									component={newLBGoals}
								/>
								<Route
									exact
									path="/logbook-designer/new-logbook/overview"
									component={newLBOverview}
								/>
								<Route
									exact
									path="/logbook-designer/new-logbook/done"
									component={newLBCompleted}
								/>

								{/* LOGBOOK DESIGNER INDEX  */}
								<Route
									path="/logbook-designer"
									exact
									component={LBDesignerIndex}
								/>

								{/* LOGBOOK VIEWER */}
								<Route
									exact
									path="/teacher/logbooks"
									component={Logbooks}
								></Route>
								<Route
									exact
									path="/teacher/logbooks/studentlogbook"
									component={StudentLogbook}
								></Route>

								{/* LANDING PAGE */}
								<Route path="/teacher" component={TeacherIndex} />

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
						<Route
							exact
							path="/student/instructions"
							component={Instructions}
						/>
						<Route
							exact
							path="/student/instructions/done"
							component={InstructionsEnd}
						/>
						<Route exact path="/student/evaluation" component={Evaluations} />
						<Route
							exact
							path="/student/evaluation/end"
							component={EvaluationsEnd}
						/>

						{/* TEACHER */}
						<Route exact path="/teacher/logbooks" component={Logbooks}></Route>
						<Route
							exact
							path="/teacher/logbooks/studentlogbook"
							component={StudentLogbook}
						></Route>

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
