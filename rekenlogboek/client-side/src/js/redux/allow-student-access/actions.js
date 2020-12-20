import * as types from './types'

export const getYears = dispatch => {
	fetch(process.env.REACT_APP_SERVER_ADDRESS + '/logbook/years')
		.then(response => response.json())
		.then(payload => {
			return dispatch({
				type: types.GET_YEARS,
				payload
			})
		})
}

export const getActiveLogbook = payload => (dispatch, getState) => {
	try {
		const group = getState().main.user.groups[1]
		payload.groupNumber = group.substring(group.indexOf(' ') + 1)
		fetch(
			`${process.env.REACT_APP_SERVER_ADDRESS}/logbook/year/${payload.schoolYear}/group/${payload.groupNumber}/period/${payload.period}`
		)
			.then(response => response.json())
			.then(payload => {
				return dispatch({
					type: types.GET_ACTIVE_LOGBOOK,
					payload
				})
			})
	} catch {
		console.log(
			'Het ophalen van een logboek is mislukt. Probeer opnieuw in te loggen.'
		)
	}
}

export const updateCurrentPhase = payload => dispatch => {
	const body = {
		currentPhase: payload.currentPhase
	}

	fetch(
		`${process.env.REACT_APP_SERVER_ADDRESS}/logbook/${payload.logbookID}/currentPhase`,
		{
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		}
	).then(() => {
		return dispatch({
			type: types.UPDATE_CURRENT_PHASE,
			payload: body.currentPhase
		})
	})
}

export const updateActiveGoal = () => {
	return {
		type: types.UPDATE_ACTIVE_GOAL
	}
}
