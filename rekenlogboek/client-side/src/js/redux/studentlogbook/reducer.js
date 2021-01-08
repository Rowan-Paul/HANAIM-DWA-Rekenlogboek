import {
	SAVE_ANSWERS,
	LOAD_STUDENTLOGBOOK,
	LOAD_LOGBOOK,
	SET_CURRENT_GOAL,
	INCREMENT_CURRENT_GOAL,
	DECREMENT_CURRENT_GOAL
} from './types'

const INITIAL_STATE = {
	currentGoal: 0,
	studentlogbook: {},
	logbook: {}
}

const studentLogbookreducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_STUDENTLOGBOOK:
			return {
				...state,
				studentlogbook: action.response
			}
		case LOAD_LOGBOOK:
			return {
				...state,
				logbook: action.response
			}
		case SET_CURRENT_GOAL:
			return {
				...state,
				currentGoal: action.payload
			}
		case INCREMENT_CURRENT_GOAL:
			return {
				...state,
				currentGoal: state.currentGoal + 1
			}
		case DECREMENT_CURRENT_GOAL:
			return {
				...state,
				currentGoal: state.currentGoal - 1
			}
		case SAVE_ANSWERS:
			return {
				...state,
				studentlogbook: action.response
			}
		default:
			return state
	}
}

export default studentLogbookreducer
