import {
	SAVE_CURRENTPHASE,
	SAVE_GOAL_AMOUNT,
	SAVE_COLUMN,
	SAVE_GOAL,
	SAVE_ANSWERS,
	NEXT_GOAL,
	PREVIOUS_GOAL,
	SAVE_ALL_GOALS,
	STORE_ANSWER,
	LOAD_STUDENTLOGBOOK,
	LOAD_LOGBOOK,
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
