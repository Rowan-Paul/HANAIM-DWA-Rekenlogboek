export function saveUserAction(objEnc) {
	// Create an encryptor:
	const encryptor = require('simple-encryptor')(
		process.env.REACT_APP_SECRET_KEY
	)

	// decrypt object
	const payload = encryptor.decrypt(objEnc)
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
