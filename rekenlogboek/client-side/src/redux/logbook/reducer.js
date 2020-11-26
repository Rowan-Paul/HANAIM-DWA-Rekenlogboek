import {
	ADD_LEARN_GOAL,
	REMOVE_LEARN_GOAL,
	SAVE_LOGBOOK,
	ADD_LOGBOOK_PERIOD,
	ADD_LOGBOOK_COLUMNS
} from './types'

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
	group: 5,
	isAvailable: true,
	period: 1,
	teacher: 'Juf Henk',
	year: '2019 - 2020'
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
			return {
				...state,
				goals: state.goals.filter(goal => goal.ID !== action.payload)
			}

		case SAVE_LOGBOOK:
			postLogbook(state)

			return state
		case ADD_LOGBOOK_PERIOD:
			return {
				...state,
				group: Number(action.payload.group),
				period: Number(action.payload.period)
			}
		case ADD_LOGBOOK_COLUMNS:
			// console.log(action.payload)
			return {
				...state,
				columns: action.payload.columns
			}
		default:
			return state
	}
}

const postLogbook = logbook => {
	try {
		fetch(`http://localhost:3000/logbook/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				columns: logbook.columns,
				goals: logbook.goals,
				group: logbook.group,
				isAvailable: logbook.isAvailable,
				period: logbook.period,
				teacher: logbook.teacher,
				year: logbook.year
			})
		})
	} catch (e) {
		console.log(e)
	}
}

export default reducer
