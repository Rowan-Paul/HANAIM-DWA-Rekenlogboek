import { SAVE_USER } from './types'

const initialMainState = {
	loggedIn: false,
	user: {}
}

export default function mainReducer(state = initialMainState, action) {
	switch (action.type) {
		case SAVE_USER:
			return { ...state, loggedIn: true, user: action.payload }

		default:
			return state
	}
}
