import {
	SAVE_CURRENT_LOGBOOK,
	SAVE_STUDENT_LOGBOOKS,
	SAVE_ACTIVE_STUDENTLOGBOOK,
	SET_CURRENT_LOGBOOK_PERIOD,
	SET_GROUP,
	RESET_LOGBOOK_OVERVIEW
} from './types'

let date = new Date()
let month = date.getMonth()
let year1
let year2
if (month < 8) {
	year1 = date.getFullYear() - 1
	year2 = date.getFullYear()
} else {
	year1 = date.getFullYear()
	year2 = date.getFullYear() + 1
}

const INITIAL_STATE = {
	year: `${year1} - ${year2}`,
	group: 0, // Moet automatisch de groep worden van de docent
	period: 1,
	currentLogbook: {},
	activeStudentlogbook: {},
	studentlogbooks: []
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case RESET_LOGBOOK_OVERVIEW:
			return (state = INITIAL_STATE)

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

		case SAVE_ACTIVE_STUDENTLOGBOOK:
			return {
				...state,
				activeStudentlogbook: action.payload
			}
		case SET_CURRENT_LOGBOOK_PERIOD:
			return {
				...state,
				period: action.payload
			}

		case SET_GROUP:
			return {
				...state,
				group: action.payload
			}

		default:
			return state
	}
}

export default reducer
