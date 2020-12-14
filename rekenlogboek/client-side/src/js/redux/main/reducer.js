import { SAVE_USER } from './types'
import { SET_CONTEXT } from './types'

const initialMainState = {
	user: {},
	context: {}
}

export default function mainReducer(state = initialMainState, action) {
	switch (action.type) {
		case SAVE_USER:
			return { ...state, user: action.payload }

		case SET_CONTEXT:
			return { ...state, context: action.payload }

		default:
			return state
	}
}
