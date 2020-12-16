// import { SAVE_CURRENTPHASE, SAVE_GOAL_AMOUNT } from './types'
// import { SAVE_COLUMN } from './types'
// import { SAVE_GOAL } from './types'
// import { SAVE_ANSWERS } from './types'
// import { NEXT_GOAL } from './types'
// import { PREVIOUS_GOAL } from './types'
// import { SAVE_ALL_GOALS } from './types'

import {SAVE_CURRENTPHASE, SAVE_GOAL_AMOUNT, SAVE_COLUMN, SAVE_GOAL, SAVE_ANSWERS, NEXT_GOAL, PREVIOUS_GOAL, SAVE_ALL_GOALS, LOAD_STUDENTLOGBOOK} from './types'

const INITIAL_STATE = {
	logbookID: null,
	studentLogbookID: null,
	currentPhase: null,
	column: {},
	goalAmount: null,
	allGoals: [],
	currentGoal: {
		position: 1 // set default to 1 so it can fetch the first goal
	},
	answers: {},

	dataFetched: false
}

const studentLogbookreducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SAVE_ALL_GOALS:
			return {
				...state,
				allGoals: action.response.goals
			}

		case PREVIOUS_GOAL:
			return {
				...state,
				currentGoal: {
					position: state.currentGoal.position--
				}
			}

		case NEXT_GOAL:
			return {
				...state,
				currentGoal: {
					position: state.currentGoal.position++
				}
			}

		case SAVE_ANSWERS:
			return {
				...state,
				answers: action.response
			}

		case SAVE_CURRENTPHASE:
			return {
				...state,
				currentPhase: action.response.currentPhase,
				logbookID: action.response._id
			}

		case SAVE_COLUMN:
			return {
				...state,
				column: action.response
			}

		case SAVE_GOAL:
			return {
				...state,
				currentGoal: action.response
			}

		case SAVE_GOAL_AMOUNT:
			return {
				...state,
				goalAmount: action.response.goals.length
			}

		case LOAD_STUDENTLOGBOOK:
			return {
				...state,
				studentLogbookID: action.response._id,
				answers: action.response.answers
			}

		default:
			return state
	}
}

export default studentLogbookreducer
