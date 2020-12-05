import { SAVE_CURRENTPHASE } from './types'
import { SAVE_COLUMN } from './types'
import { SAVE_GOAL } from './types'

const INITIAL_STATE = {
	id: null,
	currentPhase: null,
	column: {},
	goal: {}
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
				goal: action.response
			}

		default:
			return state
	}
}

export default studentLogboekreducer
