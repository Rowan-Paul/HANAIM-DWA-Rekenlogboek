import { SAVE_CURRENTPHASE, SAVE_GOAL_AMOUNT } from './types'
import { SAVE_COLUMN } from './types'
import { SAVE_GOAL } from './types'

const INITIAL_STATE = {
	id: null,
	currentPhase: null,
	column: {},
	goalAmount: null,
	currentGoal: {
		position: 1 // set default to 1 so it can fetch the first goal
	}
}

const studentLogboekreducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SAVE_CURRENTPHASE:
			return {
				...state,
				currentPhase: action.response.currentPhase,
				id: action.response._id
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
				goalAmount: action.response.goalsAmount
			}

		default:
			return state
	}
}

export default studentLogboekreducer
