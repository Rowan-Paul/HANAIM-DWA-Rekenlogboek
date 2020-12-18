import * as types from './types'

let date = new Date()
let month = date.getMonth()
let year1
let year2
if (month < 8) {
	year1 = date.getFullYear() - 1
	year2 = date.getFullYear()
} else {
	year1 = date.getFullYear()
	year2 = date.getFullYear() + 1
}
const INITIAL_STATE = {
	logbook: {}
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_LOGBOOK:
			return state
		default:
			return state
	}
}

export default reducer
