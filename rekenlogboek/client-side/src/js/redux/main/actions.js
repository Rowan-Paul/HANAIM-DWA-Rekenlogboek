import { SAVE_USER } from './types'
import { SET_CONTEXT } from './types'

export const saveUserAction = payload => {
	return { type: SAVE_USER, payload }
}

export const setContext = payload => {
	return { type: SET_CONTEXT, payload }
}
