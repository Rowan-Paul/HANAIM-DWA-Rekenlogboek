import {
	ADD_INPUT_OPTION,
	ADD_LEARN_GOAL,
	ADD_LOGBOOK_PERIOD,
	DELETE_INPUT_OPTION,
	MODAL_HIDE,
	MODAL_SHOW,
	SAVE_LOGBOOK,
	REMOVE_LEARN_GOAL,
	RESET_LOGBOOK,
	SET_COLUMN,
	SET_COLUMN_TITLE,
	SET_INPUT_TYPE,
	SET_EXPLANATION
} from './types'

export const addLearnGoal = payload => {
	return {
		type: ADD_LEARN_GOAL,
		payload
	}
}

export const addLogbookPeriod = payload => {
	return {
		type: ADD_LOGBOOK_PERIOD,
		payload
	}
}

export const addInputOption = payload => {
	return {
		type: ADD_INPUT_OPTION,
		payload
	}
}
export const deleteInputOption = payload => {
	return {
		type: DELETE_INPUT_OPTION,
		payload
	}
}
export const modalHide = () => {
	return {
		type: MODAL_HIDE
	}
}
export const modalShow = payload => {
	return {
		type: MODAL_SHOW,
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
	fetch(`http://localhost:3000/logbook/`, {
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

export const setInputType = payload => {
	return {
		type: SET_INPUT_TYPE,
		payload
	}
}
export const setColumn = () => {
	return {
		type: SET_COLUMN
	}
}
export const setColumnTitle = payload => {
	return {
		type: SET_COLUMN_TITLE,
		payload
	}
}

export const setExplanation = payload => {
	return {
		type: SET_EXPLANATION,
		payload
	}
}
export const resetLogbook = () => {
	return {
		type: RESET_LOGBOOK
	}
}
