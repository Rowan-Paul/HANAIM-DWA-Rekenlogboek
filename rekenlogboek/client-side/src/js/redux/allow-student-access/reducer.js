import * as types from './types'

const INITIAL_STATE = {
	schoolYears: [],
	activeSchoolYear: undefined, //which school year has a period with a currentPhase !== notVisible
	selectedSchoolYear: undefined, //currently selected year in the filter
	periods: [],
	activePeriod: undefined, //which period has a currentPhase !== notVisible
	selectedPeriod: undefined //currently selected period in the filter
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_FILTER_OPTIONS:
			return {
				...state,
				schoolYears: action.payload.schoolYears,
				activeSchoolYear: action.payload.activeSchoolYear,
				periods: action.payload.periods,
				activePeriod: action.payload.activePeriod,
				currentLogbook: action.payload.currentLogbook
			}
		case types.GET_SELECTED_LOGBOOK:
			return {
				...state,
				currentLogbook: action.payload
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
		case types.CLOSE_ALL_LOGBOOKS:
			return {
				...state
			}
		default:
			return state
	}
}
export default reducer
