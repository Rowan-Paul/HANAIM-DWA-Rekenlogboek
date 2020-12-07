import {
	SAVE_CURRENT_LOGBOOK,
	SAVE_STUDENT_LOGBOOKS,
	SAVE_CURRENT_STUDENTLOGBOOK,
	SET_CURRENT_LOGBOOK_PERIOD
} from './types'

let date1 = new Date()
let month = date1.getMonth()
let date2 = date1
if (month < 8) {
	date1 = date1.getFullYear() - 1
	date2 = date2.getFullYear()
} else {
	date1 = date1.getFullYear()
	date2 = date2.getFullYear() + 1
}

const INITIAL_STATE = {
	year: `${date1} - ${date2}`,
	group: 5, // Moet automatisch de groep worden van de docent
	period: 1,
	currentLogbook: {},
	activeStudentlogbook: {},
	studentlogbooks: []
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SAVE_CURRENT_LOGBOOK:
			return {
				...state,
				currentLogbook: action.payload
			}

		case SAVE_STUDENT_LOGBOOKS:
			return {
				...state,
				studentlogbooks: action.payload
			}

		case SAVE_CURRENT_STUDENTLOGBOOK:
			return {
				...state,
				activeStudentlogbook: action.payload
			}
		case SET_CURRENT_LOGBOOK_PERIOD:
			return {
				...state,
				period: action.payload
			}

		default:
			return state
	}
}

export default reducer
