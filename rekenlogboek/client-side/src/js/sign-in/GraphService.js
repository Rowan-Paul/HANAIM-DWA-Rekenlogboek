var graph = require('@microsoft/microsoft-graph-client')

function getAuthenticatedClient(accessToken) {
	const client = graph.Client.init({
		authProvider: done => {
			done(null, accessToken)
		}
	})

	return client
}

export async function getUserDetails(accessToken) {
	const client = getAuthenticatedClient(accessToken)

	const user = await client.api('/me').get()

	return user
}

export async function getUserGroups(accessToken) {
	let body = {
		securityEnabledOnly: false
	}

	body = JSON.stringify(body)

	// using a normal fetch, since it didn't like
	// getting groups using the build-in fetch
	let groups = await fetch(
		'https://graph.microsoft.com/v1.0/me/getMemberGroups',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken
			},
			body: body
		}
	)

	groups = await groups.json()

	return Promise.all(
		groups.value.map(id =>
			fetch('https://graph.microsoft.com/v1.0/groups/' + id, {
				method: 'GET',
				headers: { Authorization: 'Bearer ' + accessToken }
			})
				.then(res => res.json())
				.then(response => response.displayName)
		)
	)
}
