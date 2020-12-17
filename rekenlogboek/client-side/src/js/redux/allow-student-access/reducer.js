import * as types from './types'

const INITIAL_STATE = {
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
