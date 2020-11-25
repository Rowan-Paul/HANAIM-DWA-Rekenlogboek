import { ADD_LEARN_GOAL, REMOVE_LEARN_GOAL, SAVE_LOGBOOK } from './types'

const INITIAL_STATE = {
	goals: [],
	group: 4,
	columns: [
		{
			position: 1,
			title: 'Heb je volgende week instructie nodig?',
			inputType: 'Checkboxes'
		},
		{
			position: 2,
			title: 'Vind je kaas lekker?',
			inputType: 'Invoervelden'
		}
	]
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_LEARN_GOAL:
			action.payload.position = state.goals.length + 1

			console.log(action.payload)
			return {
				...state,
				goals: [...state.goals, action.payload]
			}

		case REMOVE_LEARN_GOAL:
			return {
				...state,
				goals: state.goals.filter(goal => goal.ID !== action.payload)
			}

		case SAVE_LOGBOOK:
			console.log(state)
			return state
		default:
			return state
	}
}

export default reducer
