import * as types from './types'

const INITIAL_STATE = {
	answers: undefined,
	logbookID: '5fbbcad37f53f84d0c6fbb75',
	logbook: undefined,
	overview: undefined
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
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
