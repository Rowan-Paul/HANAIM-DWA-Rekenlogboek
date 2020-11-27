// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react'
import * as microsoftTeams from '@microsoft/teams-js'

/**
 * The 'GroupTab' component renders the main tab content
 * of your app.
 */
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

	render() {
		return (
			<div>
				<h3>Rekenlogboek!</h3>
				<p>De leerling omgeving wordt op dit moment gebouwd...</p>
			</div>
		)
	}
}
export default Tab
