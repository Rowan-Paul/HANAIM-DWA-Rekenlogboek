import { ADD_LEARN_GOAL, REMOVE_LEARN_GOAL, SAVE_LOGBOOK } from './types'

export const addLearnGoal = payload => {
	return {
		type: ADD_LEARN_GOAL,
		payload
	}
}

export const removeLearnGoal = payload => {
	return {
		type: REMOVE_LEARN_GOAL,
		payload
	}
}

export const saveLogbook = () => {
	return {
		type: SAVE_LOGBOOK
	}
}
