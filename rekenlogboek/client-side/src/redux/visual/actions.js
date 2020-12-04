import {
	ADD_INPUT_VALUE,
	DELETE_INPUT_VALUE,
	EXPLANATION_FIELD_TOGGLE,
	MODAL_HIDE,
	MODAL_SHOW,
	SET_COLUMN,
	SET_COLUMN_TITLE,
	SET_INPUT_TYPE
} from './types'

export const addInputValue = payload => {
	return {
		type: ADD_INPUT_VALUE,
		payload
	}
}
export const deleteInputValue = payload => {
	return {
		type: DELETE_INPUT_VALUE,
		payload
	}
}
export const explanationFieldToggle = payload => {
	return {
		type: EXPLANATION_FIELD_TOGGLE,
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

export const setInputType = payload => {
	return {
		type: SET_INPUT_TYPE,
		payload
	}
}
