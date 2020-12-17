import * as types from './types'

const INITIAL_STATE = {}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_ACTIVE_LOGBOOK:
			return {
				...state
			}
		case types.GET_ACTIVE_LOGBOOK_SUCCESS:
			return {
				...state
			}
		case types.GET_YEARS:
			return {
				...state
			}
		case types.GET_YEARS_SUCCESS:
			return {
				...state
			}
		case types.UPDATE_LOGBOOK:
			return {
				...state
			}
		case types.UPDATE_LOGBOOK_SUCCESS:
			return {
				...state
			}
	}
}
export default reducer
