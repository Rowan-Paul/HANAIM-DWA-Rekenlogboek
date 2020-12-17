import * as types from './types'

export const getYears = () => {
	return {
		type: types.GET_YEARS
	}
}
export const getYearsSuccess = () => {
	return {
		type: types.GET_YEARS_SUCCESS
	}
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
