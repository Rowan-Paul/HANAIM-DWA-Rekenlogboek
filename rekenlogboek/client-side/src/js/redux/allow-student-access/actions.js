import * as types from './types'

const fetchPeriods = (payload, getState) => {
	const group = getState().main.user.groups[1]
	const groupNumber = group.substring(group.indexOf(' ') + 1)

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

const fetchLogbook = (payload, getState) => {
	const group = getState().main.user.groups[1]
	payload.groupNumber = group.substring(group.indexOf(' ') + 1)
	return fetch(
		`${process.env.REACT_APP_SERVER_ADDRESS}/logbook/year/${payload.schoolYear}/group/${payload.groupNumber}/period/${payload.period}`
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
			if (schoolYears === undefined || schoolYears.length === 0) {
				//no logbooks available for the teacher's group
				return
			}
			reducerPayload.schoolYears = schoolYears
			fetchActiveLogbook(getState)
				.then(response => {
					//in the server-side a 204 status will be sent when the response is empty
					if (response && response.status !== 204) {
						return response.json()
					} else {
						//sending false to the next then will make sure that the code stops looking for an active logbook but instead looks for the first available logbook
						return false
					}
				})
				.then(activeLogbook => {
					//the current logbook will change whenever the filter button gets pressed. the active period and schoolYear will only update when an activePhase changes.
					//since this action is kicked off when loading the page this will be the only time where all 3 of them change simultaneously.
					if (activeLogbook) {
						reducerPayload.currentLogbook = activeLogbook
						reducerPayload.activePeriod = activeLogbook.period
						reducerPayload.activeSchoolYear = activeLogbook.year
						fetchPeriods({ schoolYear: activeLogbook.year }, getState)
							.then(response => response.json())
							.then(periods => {
								reducerPayload.periods = periods
								return dispatch({
									type: types.GET_FILTER_OPTIONS,
									payload: { ...reducerPayload }
								})
							})
					} else {
						//if there's no active logbook, show the first one available
						fetchPeriods({ schoolYear: schoolYears[0] }, getState)
							.then(response => response.json())
							.then(periods => {
								fetchLogbook(
									{ schoolYear: schoolYears[0], period: periods[0] },
									getState
								)
									.then(response => response.json())
									.then(logbook => {
										reducerPayload.currentLogbook = logbook
										reducerPayload.activePeriod = logbook.period
										reducerPayload.activeSchoolYear = logbook.year
										reducerPayload.periods = periods
										return dispatch({
											type: types.GET_FILTER_OPTIONS,
											payload: { ...reducerPayload }
										})
									})
							})
					}
				})
		})
}

export const getSelectedLogbook = payload => (dispatch, getState) => {
	fetchLogbook(payload, getState)
		.then(response => response.json())
		.then(payload => {
			return dispatch({
				type: types.GET_SELECTED_LOGBOOK,
				payload
			})
		})
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

export const closeAllLogbooks = payload => {}
