import { SAVE_USER } from './types'

const initialMainState = {
	user: {}
}

export default function mainReducer(state = initialMainState, action) {
	switch (action.type) {
		case SAVE_USER:
			return { ...state, user: action.payload }

		default:
			return state
	}
}
