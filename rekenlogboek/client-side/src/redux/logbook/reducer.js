import {
	ADD_LEARN_GOAL,
	REMOVE_LEARN_GOAL,
	RESET_LOGBOOK,
	SAVE_LOGBOOK
} from './types'

const INITIAL_STATE = {
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
	],
	goals: [],
	group: 4,
	isAvailable: true,
	isSaved: false,
	period: 1,
	teacher: 'Juf Henk',
	year: '2019 - 2020'
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
			if (action.response.ok) {
				return {
					...state,
					isSaved: true
				}
			}
			return state

		case RESET_LOGBOOK:
			return (state = INITIAL_STATE)
		default:
			return state
	}
}

export default reducer
