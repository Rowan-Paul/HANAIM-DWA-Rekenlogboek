import {
	ADD_LEARN_GOAL,
	REMOVE_LEARN_GOAL,
	SAVE_LOGBOOK,
	ADD_LOGBOOK_PERIOD,
	RESET_LOGBOOK,
	ADD_LOGBOOK_COLUMNS
} from './types'

const date = new Date()
const year = date.getFullYear()
const INITIAL_STATE = {
	columns: [
		{
			position: 1,
			title: '',
			inputType: 'Checkboxes'
		},
		{
			position: 2,
			title: '',
			inputType: 'Checkboxes'
		}
	],
	goals: [],
	group: 4,
	isAvailable: true,
	isSaved: false,
	period: 1,
	teacher: 'Juf Henk', //TODO: auto add teachers & years in components
	year: `${year} - ${year + 1}`
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_LEARN_GOAL:
			action.payload.position = state.goals.length + 1

			return {
				...state,
				goals: [...state.goals, action.payload]
			}

		case REMOVE_LEARN_GOAL:
			const filterGoals = state.goals.filter(goal => goal.ID !== action.payload)

			const updatePosition = filterGoals.map((goal, i) => {
				goal.position = ++i
				return goal
			})

			return {
				...state,
				goals: updatePosition
			}

		case SAVE_LOGBOOK:
			console.log(state)
			if (action.response.ok) {
				return {
					...state,
					isSaved: true
				}
			}
			return state
		case ADD_LOGBOOK_PERIOD:
			return {
				...state,
				group: Number(action.payload.group),
				period: Number(action.payload.period)
			}
		case ADD_LOGBOOK_COLUMNS:
			return {
				...state,
				columns: action.payload.columns
			}

		case RESET_LOGBOOK:
			return (state = INITIAL_STATE)
		default:
			return state
	}
}

export default reducer
