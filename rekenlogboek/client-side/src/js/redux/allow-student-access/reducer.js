import * as types from './types'

const INITIAL_STATE = {
	schoolYears: [],
	activeSchoolYear: undefined,
	selectedSchoolYear: undefined,
	periods: [],
	selectedPeriod: undefined,
	activePeriod: undefined, //which period has a currentPhase !== notVisible
	currentLogbook: {}
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_ACTIVE_LOGBOOK:
			return {
				...state,
				currentLogbook: action.payload
			}
		case types.GET_FILTER_OPTIONS:
			console.log(action.payload)
			return {
				...state,
				schoolYears: action.payload.schoolYears,
				periods: action.payload.periods,
				activePeriod: action.payload.activePeriod,
				activeSchoolYear: action.payload.activeSchoolYear
			}
		case types.UPDATE_CURRENT_PHASE:
			return {
				...state,
				currentLogbook: {
					...state.currentLogbook,
					currentPhase: action.payload
				}
			}
		case types.UPDATE_ACTIVE_GOAL:
			return {
				...state,
				currentLogbook: {
					...state.currentLogbook,
					activeGoal: action.payload
				}
			}
		case types.GET_PERIODS:
			return {
				...state,
				periods: action.payload.periods,
				selectedPeriod: action.payload.selectedPeriod
			}
		case types.CHANGE_SELECTED_PERIOD:
			return {
				...state,
				selectedPeriod: action.payload
			}
		case types.CHANGE_SELECTED_SCHOOL_YEAR:
			return {
				...state,
				selectedSchoolYear: action.payload
			}
		default:
			return state
	}
}
export default reducer
