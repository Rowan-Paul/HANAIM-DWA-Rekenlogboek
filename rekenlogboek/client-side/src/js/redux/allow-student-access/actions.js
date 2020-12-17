import * as types from './types'

export const getYears = dispatch => {
	fetch('http://localhost:3000/logbook/years')
		.then(response => response.json())
		.then(payload => {
			return dispatch({
				type: types.GET_YEARS,
				payload
			})
		})
}

export const getActiveLogbook = payload => {
	fetch('http://localhost:3000/logbook/year/:year/group/:group/period/:period')
		.then(response => response.json())
		.then(payload => {
			return dispatch({
				type: types.GET_ACTIVE_LOGBOOK,
				payload
			})
		})
}
export const updateLogbook = () => {
	return {
		type: types.UPDATE_LOGBOOK
	}
}
export const updateLogbookSuccess = () => {
	return {
		type: types.UPDATE_LOGBOOK_SUCCESS
	}
}
