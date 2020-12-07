import {
	ADD_LEARN_GOAL,
	REMOVE_LEARN_GOAL,
	SAVE_LOGBOOK,
	ADD_LOGBOOK_PERIOD,
	ADD_LOGBOOK_COLUMNS,
	RESET_LOGBOOK
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

export const saveLogbook = () => (dispatch, getState) => {
	fetch(process.env.REACT_APP_SERVER_ADDRESS + '/logbook', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(getState().logbook)
	})
		.then(response =>
			dispatch({
				type: SAVE_LOGBOOK,
				response // Called it response (from API) to distinguish it from payloads (from app)
			})
		)
		.catch(error => console.log(error))
}

export const resetLogbook = () => {
	return {
		type: RESET_LOGBOOK
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
