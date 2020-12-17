import * as types from './types'

export const getYears = () => {
	fetch('localhost:3000/logbook/years')
		.then(response => response.json())
		.then(data => {
			dispatch({
				type: types.GET_YEARS,
				data
			})
		})
}

export const getActiveLogbook = () => {
	return {
		type: types.GET_ACTIVE_LOGBOOK
	}
}
export const getActiveLogbookSuccess = () => {
	return {
		type: types.GET_ACTIVE_LOGBOOK_SUCCESS
	}
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
