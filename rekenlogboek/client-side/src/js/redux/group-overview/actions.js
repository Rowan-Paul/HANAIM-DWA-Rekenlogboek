import * as types from './types'

export const getLogbook = () => (dispatch, getState) => {
	const logbookID = getState().groupOverview.logbookID // Temp for developing frontend
	fetch(`http://localhost:3000/logbook/${logbookID}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})
		.then(response => response.json())
		.then(response =>
			dispatch({
				type: types.GET_LOGBOOK,
				response
			})
		)
		.catch(error => console.log(error))
}
