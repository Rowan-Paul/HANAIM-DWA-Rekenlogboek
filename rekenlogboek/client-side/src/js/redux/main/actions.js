import { SAVE_USER } from './types'
import { SET_CONTEXT } from './types'
import { RESET_MAIN } from './types'

export const resetMain = () => {
	return {
		type: RESET_MAIN
	}
}

export const saveUserAction = payload => {
	return { type: SAVE_USER, payload }
}

export const setContext = payload => {
	return { type: SET_CONTEXT, payload }
}
