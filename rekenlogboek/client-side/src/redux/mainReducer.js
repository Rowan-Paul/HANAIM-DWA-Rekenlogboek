export function saveUserAction(objEnc) {
	var key = 'real secret keys should be long and random'

	// Create an encryptor:
	const encryptor = require('simple-encryptor')(key)

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
