import * as types from './types'

export const getYears = dispatch => {
	fetch('http://localhost:3000/logbook/years')
		.then(response => response.json())
		.then(data => {
			console.log(data)
			return dispatch({
				type: types.GET_YEARS,
				payload: data
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
