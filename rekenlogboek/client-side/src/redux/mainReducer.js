export function saveUserAction(payload) {
	return { type: 'saveUser', payload }
}

// reducer
const initialMainState = {
	user: {}
}

export default function roomReducer(state = initialMainState, action) {
	switch (action.type) {
		case 'saveUser':
			return { ...state, user: action.payload }

		default:
			return state
	}
}
