import { SAVE_USER } from './types'
import { SET_CONTEXT } from './types'
import { RESET_MAIN } from './types'

const initialMainState = {
	user: {},
	context: {}
}

export default function mainReducer(state = initialMainState, action) {
	switch (action.type) {
		case RESET_MAIN:
			return (state = initialMainState)

		case SAVE_USER:
			return { ...state, user: action.payload }

		case SET_CONTEXT:
			return { ...state, context: action.payload }

		default:
			return state
	}
}
