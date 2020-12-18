import * as types from './types'

const getCurrentSchoolYear = () => {
	const date = new Date()
	const month = date.getMonth()
	let year1
	let year2
	if (month < 8) {
		year1 = date.getFullYear() - 1
		year2 = date.getFullYear()
	} else {
		year1 = date.getFullYear()
		year2 = date.getFullYear() + 1
	}

	return `${year1} - ${year2}`
}

const INITIAL_STATE = {
	currentSchoolYear: getCurrentSchoolYear(),
	schoolYears: [],
	currentLogbook: {}
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_ACTIVE_LOGBOOK:
			return {
				...state,
				currentLogbook: action.payload
			}
		case types.GET_YEARS:
			return {
				...state,
				schoolYears: action.payload
			}
		case types.UPDATE_LOGBOOK:
			return {
				...state
			}
		case types.UPDATE_LOGBOOK_SUCCESS:
			return {
				...state
			}
		default:
			return state
	}
}
export default reducer
