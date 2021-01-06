import * as types from './types'

const fetchPeriods = (payload, getState) => {
	const group = getState().main.user.groups[1]
	const groupNumber = group.substring(group.indexOf(' ') + 1)

	console.log(
		'fetch to:',
		`${process.env.REACT_APP_SERVER_ADDRESS}/logbook/groups/${groupNumber}/years/${payload.schoolYear}/periods`
	)
	return fetch(
		`${process.env.REACT_APP_SERVER_ADDRESS}/logbook/groups/${groupNumber}/years/${payload.schoolYear}/periods`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	)
}

const fetchActiveLogbook = getState => {
	const group = getState().main.user.groups[1]
	const groupNumber = group.substring(group.indexOf(' ') + 1)

	return fetch(
		`${process.env.REACT_APP_SERVER_ADDRESS}/logbook/groups/${groupNumber}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	)
}

export const getFilterOptions = (dispatch, getState) => {
	const group = getState().main.user.groups[1]
	const groupNumber = group.substring(group.indexOf(' ') + 1)

	const reducerPayload = {}

	fetch(
		process.env.REACT_APP_SERVER_ADDRESS +
			`/logbook/groups/${groupNumber}/years`
	)
		.then(response => response.json())
		.then(schoolYears => {
			reducerPayload.schoolYears = schoolYears
			fetchActiveLogbook(getState)
				.then(response => response.json())
				.then(activeLogbook => {
					reducerPayload.activePeriod = activeLogbook.period
					reducerPayload.activeSchoolYear = activeLogbook.year
					console.log(activeLogbook)
					fetchPeriods({ schoolYear: activeLogbook.year }, getState)
						.then(response => response.json())
						.then(periods => {
							reducerPayload.periods = periods
							console.log(reducerPayload)
							return dispatch({
								type: types.GET_FILTER_OPTIONS,
								payload: { ...reducerPayload }
							})
						})
				})
		})
}

export const getActiveLogbook = payload => (dispatch, getState) => {
	console.log(payload)
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

export const updateActiveGoal = payload => dispatch => {
	const body = {
		activeGoal: payload.activeGoal
	}

	fetch(
		`${process.env.REACT_APP_SERVER_ADDRESS}/logbook/${payload.logbookID}/activeGoal`,
		{
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		}
	).then(() => {
		return dispatch({
			type: types.UPDATE_ACTIVE_GOAL,
			payload: body.activeGoal
		})
	})
}

export const getPeriods = payload => (dispatch, getState) => {
	fetchPeriods(payload, getState)
		.then(response => response.json())
		.then(periods => {
			return dispatch({
				type: types.GET_PERIODS,
				payload: { periods, selectedPeriod: periods[0] }
			})
		})
}

export const changeSelectedPeriod = payload => {
	return {
		type: types.CHANGE_SELECTED_PERIOD,
		payload
	}
}

export const changeSelectedSchoolYear = payload => {
	return {
		type: types.CHANGE_SELECTED_SCHOOL_YEAR,
		payload
	}
}
