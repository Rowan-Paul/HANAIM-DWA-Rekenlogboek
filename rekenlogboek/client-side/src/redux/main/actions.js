import { SAVE_USER } from './types'

export const saveUserAction = objEnc => {
	// check if the encrypted object exists and is a string
	if (objEnc === undefined || objEnc === null || typeof objEnc !== 'string') {
		throw new Error('Cannot decrypt user')
	}
	// Create an encryptor:
	const encryptor = require('simple-encryptor')(
		process.env.REACT_APP_SECRET_KEY
	)

	// decrypt object
	const payload = encryptor.decrypt(objEnc)
	return { type: SAVE_USER, payload }
}
