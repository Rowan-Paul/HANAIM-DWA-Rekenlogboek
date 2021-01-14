import * as types from './types'

// GET_LOGBOOK_ID
export const getLogbookID = payload => dispatch => {
	fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/logbook/groups/${payload}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})
		.then(response => response.json())
		.then(response =>
			dispatch({
				type: types.GET_LOGBOOK_ID,
				response
			})
		)
		.catch(error => console.log(error))
}

// GET_LOGBOOK
export const getLogbook = () => (dispatch, getState) => {
	const logbookID = getState().groupOverview.logbookID // Temp for developing frontend
	fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/logbook/${logbookID}`, {
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

// GET_LOGBOOK_GROUP_ANSWERS
export const getLogbookGroupAnswers = payload => (dispatch, getState) => {
	const logbookID = getState().groupOverview.logbookID // Temp for developing frontend

	// Query parameters
	const goal = `goal=${payload.goal}`
	const column = `column=${payload.column}`
	const answer = `&answer=${payload.answer}`
	const URI = `studentlogbook/${logbookID}/group-answers/?${goal}&${column}&${answer}`

	fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/${URI}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})
		.then(response => response.json())
		.then(response =>
			dispatch({
				type: types.GET_LOGBOOK_GROUP_ANSWERS,
				response
			})
		)
		.catch(error => console.log(error))
}
// GET_LOGBOOK_GROUP_OVERVIEW
export const getLogbookGroupOverview = () => (dispatch, getState) => {
	const logbookID = getState().groupOverview.logbookID // Temp for developing frontend
	fetch(
		`${process.env.REACT_APP_SERVER_ADDRESS}/studentlogbook/${logbookID}/group/overview`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	)
		.then(response => response.json())
		.then(response =>
			dispatch({
				type: types.GET_LOGBOOK_GROUP_OVERVIEW,
				response
			})
		)
		.catch(error => console.log(error))
}
