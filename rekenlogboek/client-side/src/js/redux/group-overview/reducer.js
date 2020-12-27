import * as types from './types'

const INITIAL_STATE = {
	logbookID: '5fbbcad37f53f84d0c6fbb75',
	logbook: undefined
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_LOGBOOK:
			console.log(action.response)
			return {
				...state,
				logbook: action.response
			}
		default:
			return state
	}
}

export default reducer
