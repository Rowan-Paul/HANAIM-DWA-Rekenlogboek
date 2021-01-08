import * as types from './types'

const INITIAL_STATE = {
	answers: undefined,
	logbookID: undefined,
	logbook: undefined,
	overview: undefined
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_LOGBOOK_ID:
			return {
				...state,
				logbookID: action.response._id
			}
		case types.GET_LOGBOOK:
			return {
				...state,
				logbook: action.response
			}
		case types.GET_LOGBOOK_GROUP_ANSWERS:
			return {
				...state,
				answers: action.response
			}
		case types.GET_LOGBOOK_GROUP_OVERVIEW:
			return {
				...state,
				overview: action.response
			}
		default:
			return state
	}
}

export default reducer
