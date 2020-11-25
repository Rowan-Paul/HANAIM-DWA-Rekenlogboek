import { SAVE_USER } from './types'

const initialMainState = {
	user: {}
}

export default function roomReducer(state = initialMainState, action) {
	switch (action.type) {
		case SAVE_USER:
			return { ...state, user: action.payload }

		default:
			return state
	}
}
