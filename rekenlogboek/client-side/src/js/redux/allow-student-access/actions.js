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
	const group = getState().main.user.groups
	// const groupNumber = group.substring(group.indexOf(' ') + 1)
	// console.log(groupNumber)
	console.log(payload)
	// fetch(process.env.REACT_APP_SERVER_ADDRESS + '/logbook/year/:year/group/:group/period/:period')
	// 	.then(response => response.json())
	// 	.then(payload => {
	// 		return dispatch({
	// 			type: types.GET_ACTIVE_LOGBOOK,
	// 			payload
	// 		})
	// })
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
