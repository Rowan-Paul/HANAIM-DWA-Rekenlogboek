// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react'
import * as microsoftTeams from '@microsoft/teams-js'

/**
 * The 'GroupTab' component renders the main tab content
 * of your app.
 */

//TODO: Reduxify this class (put context into Redux state)
class Tab extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			context: {}
		}
	}

	//React lifecycle method that gets called once a component has finished mounting
	//Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
	componentDidMount() {
		// Get the user context from Teams and set it in the state
		microsoftTeams.getContext((context, error) => {
			this.setState({
				context: context
			})
			if (error) {
				console.log(error)
			}
		})
		// Next steps: Error handling using the error object
	}

	componentDidUpdate() {
		if (this.state.context['userTeamRole'] === 1) {
			if (1) {
				this.props.history.push('tab/pretoetstest')
			} else if (Evaluatie) {
			} else if (Instructie) {
			}
		}
	}

	render() {
		if (this.state.context['userTeamRole'] === 0) {
			return (
				<div>
					<p>
						Klik{' '}
						<a href="https://localhost:3001/" rel="noreferrer" target="_blank">
							hier
						</a>{' '}
						om de browser te openen voor de leraaromgeving.
					</p>
				</div>
			)
		} else if (this.state.context['userTeamRole'] === 1) {
			return (
				<div>
					<div>Je leraar heeft niks voor je open gezet.</div>
				</div>
			)
		} else {
			return (
				<div>
					<p>Er is iets fout gegaan.</p>
				</div>
			)
		}
	}
}
export default Tab
