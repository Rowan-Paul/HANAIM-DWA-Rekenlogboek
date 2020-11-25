import { SAVE_USER } from './types'

export const saveUserAction = objEnc => {
	// Create an encryptor:
	const encryptor = require('simple-encryptor')(
		process.env.REACT_APP_SECRET_KEY
	)

	// decrypt object
	const payload = encryptor.decrypt(objEnc)
	return { type: SAVE_USER, payload }
}
