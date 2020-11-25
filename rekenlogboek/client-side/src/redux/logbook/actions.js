import {
	ADD_LEARN_GOAL,
	REMOVE_LEARN_GOAL,
	SAVE_LOGBOOK,
	ADD_LOGBOOK_PERIOD,
	ADD_LOGBOOK_COLUMNS
} from './types'

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

export const addLogbookPeriod = payload => {
	return {
		type: ADD_LOGBOOK_PERIOD,
		payload
	}
}

export const addLogbookColumns = payload => {
	return {
		type: ADD_LOGBOOK_COLUMNS,
		payload
	}
}
