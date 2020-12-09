import { SAVE_CURRENTPHASE, SAVE_GOAL_AMOUNT } from './types'
import { SAVE_COLUMN } from './types'
import { SAVE_GOAL } from './types'
import { SAVE_ANSWERS } from './types'
import { FETCH_ANSWERS } from './types'
import { NEXT_GOAL } from './types'
import { PREVIOUS_GOAL } from './types'

const INITIAL_STATE = {
	logbookID: null,
	currentPhase: null,
	column: {},
	goalAmount: null,
	allGoals: [],
	currentGoal: {
		position: 1 // set default to 1 so it can fetch the first goal
	},
	answers: {}
}

const studentLogbookreducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
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

		case FETCH_ANSWERS:
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
			console.log(action.response)
			return {
				...state,
				allGoals: [...state.allGoals, action.response],
				currentGoal: action.response
			}

		case SAVE_GOAL_AMOUNT:
			return {
				...state,
				goalAmount: action.response.goalsAmount
			}

		default:
			return state
	}
}

export default studentLogbookreducer
