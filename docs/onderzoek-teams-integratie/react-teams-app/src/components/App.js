import "../App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as microsoftTeams from "@microsoft/teams-js";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./teams/Tab";
import TabConfig from "./teams/TabConfig";

function App() {
  // Check for the Microsoft Teams SDK object.
  if (microsoftTeams) {
    // if the application isn't in Teams,
    // use this, else initialise Teams
    if (window.parent === window.self) {
      return (
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/termsofuse" component={TermsOfUse} />
          <Route exact path="/tab" component={TeamsHostError} />
          <Route exact path="/config" component={TeamsHostError} />
        </Router>
      );
    }

    // Initialize the Microsoft Teams SDK
    microsoftTeams.initialize();

    // Display the app home page hosted in Teams
    return (
      <Router>
        <Route exact path="/tab" component={Tab} />
        <Route exact path="/config" component={TabConfig} />
      </Router>
    );
  }

  // Error when the Microsoft Teams SDK is not found
  // in the project.
  return <h3>Microsoft Teams SDK not found.</h3>;
}

/**
 * This component displays a welcome
 * message on the homepage
 */
class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome</h1>
      </div>
    );
  }
}

/**
 * This component displays an error message in the
 * case when a page is not being hosted within Teams.
 */
class TeamsHostError extends React.Component {
  render() {
    return (
      <div>
        <h1>Teams host error</h1>
        <p>It appears you are not inside Teams</p>
      </div>
    );
  }
}

export default App;
