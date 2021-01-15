import {
	ADD_INPUT_OPTION,
	ADD_LEARN_GOAL,
	ADD_LOGBOOK_PERIOD,
	DELETE_GOAL,
	MODAL_HIDE,
	MODAL_SHOW,
	SET_COLUMN,
	SET_COLUMN_TITLE,
	SET_INPUT_TYPE,
	RESET_LOGBOOK,
	SAVE_LOGBOOK,
	SET_GOAL_DESCRIPTION,
	SET_GOAL_IMAGE,
	SET_GOAL_TITLE,
	SET_GOAL_POSITION,
	POST_IMAGE,
	SET_GOAL,
	SET_EXPLANATION,
	DELETE_INPUT_OPTION
} from './types'

let date = new Date()
let month = date.getMonth()
let year1
let year2
if (month < 8) {
	year1 = date.getFullYear() - 1
	year2 = date.getFullYear()
} else {
	year1 = date.getFullYear()
	year2 = date.getFullYear() + 1
}
const INITIAL_STATE = {
	columns: [
		{
			added: true,
			position: 0,
			title: 'Doelen'
		},
		{
			added: false,
			explanation: false,
			position: 1,
			title: '',
			input: {
				type: 'radiobuttons',
				options: []
			}
		},
		{
			added: false,
			explanation: false,
			position: 2,
			title: '',
			input: {
				type: 'radiobuttons',
				options: []
			}
		},
		{
			added: true,
			position: 3,
			title: 'Evaluatie'
		}
	],
	goals: [],
	group: 5,
	inputTypes: {
		checkboxes: 'checkboxes',
		radiobuttons: 'radiobuttons',
		textarea: 'textarea'
	},
	isAvailable: true,
	isSaved: false,
	modal: {
		title: '',
		visible: false
	},
	period: 1,
	position: 0, // This property helps functions rembember which column or row is currently edited
	teacher: '',
	year: `${year1} - ${year2}`
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_INPUT_OPTION:
			if (action.payload) {
				return {
					...state,
					columns: state.columns.filter(column => {
						if (column.position === state.position) {
							column.input.options = [...column.input.options, action.payload]
						}
						return column
					})
				}
			}
			return state

		case ADD_LEARN_GOAL:
			action.payload.position = state.goals.length + 1

			return {
				...state,
				goals: [...state.goals, action.payload]
			}

		case ADD_LOGBOOK_PERIOD:
			return {
				...state,
				group: Number(action.payload.group),
				period: Number(action.payload.period),
				teacher: action.payload.username
			}
		case DELETE_INPUT_OPTION: {
			return {
				...state,
				columns: state.columns.filter(column => {
					if (column.position === state.position) {
						column.input.options = column.input.options.filter(
							(_, i) => i !== action.payload
						)
					}
					return column
				})
			}
		}

		case MODAL_HIDE:
			return {
				...state,
				modal: { visible: false }
			}

		case MODAL_SHOW:
			return {
				...state,
				modal: {
					title: action.payload.title,
					visible: true
				},
				position: action.payload.position
			}

		case POST_IMAGE:
			return {
				...state,
				goals: state.goals.filter(goal => {
					if (goal.position === state.position) {
						goal.imageLink = action.response.path
					}
					return goal
				})
			}
		case DELETE_GOAL:
			const filterGoals = state.goals.filter(
				goal => goal.position !== action.payload
			)

			const updatePosition = filterGoals.map((goal, i) => {
				goal.position = ++i
				return goal
			})

			return {
				...state,
				goals: updatePosition
			}

		case RESET_LOGBOOK:
			return state = INITIAL_STATE
		case SAVE_LOGBOOK:
			if (action.response.ok) {
				return {
					...state,
					isSaved: true
				}
			}
			return state

		case SET_COLUMN:
			return {
				...state,
				columns: state.columns.filter(column => {
					if (column.position === state.position) {
						column.added = true
					}
					return column
				}),
				modal: { visible: false }
			}

		case SET_COLUMN_TITLE:
			return {
				...state,
				columns: state.columns.filter(column => {
					if (column.position === state.position) {
						column.title = action.payload
					}
					return column
				})
			}

		case SET_EXPLANATION:
			return {
				...state,
				columns: state.columns.filter(column => {
					if (column.position === state.position) {
						switch (action.payload) {
							case 'true':
								column.explanation = true
								break
							default:
								column.explanation = false
						}
					}
					return column
				})
			}
		case SET_INPUT_TYPE:
			return {
				...state,
				columns: state.columns.filter(column => {
					if (column.position === state.position) {
						column.input.type = action.payload
					}
					return column
				})
			}

		case SET_GOAL:
			return {
				...state,
				goals: state.goals.filter(goal => {
					if (goal.position === state.position) {
						goal.added = true
					}
					return goal
				}),
				modal: { visible: false }
			}

		case SET_GOAL_DESCRIPTION:
			return {
				...state,
				goals: state.goals.filter(goal => {
					if (goal.position === state.position) {
						goal.description = action.payload
					}
					return goal
				})
			}

		case SET_GOAL_IMAGE:
			return {
				...state,
				goals: state.goals.filter(goal => {
					if (goal.position === state.position) {
						goal.imageBlobURL = action.payload.imageBlobURL
						goal.imageName = action.payload.imageName
					}
					return goal
				})
			}
		case SET_GOAL_POSITION:
			return {
				...state,
				goals: [
					...state.goals,
					{
						added: false,
						description: '',
						imageBlobURL: {},
						imageLink: '',
						imageName: '',
						position: action.payload,
						title: ''
					}
				]
			}
		case SET_GOAL_TITLE:
			return {
				...state,
				goals: state.goals.filter(goal => {
					if (goal.position === state.position) {
						goal.title = action.payload
					}
					return goal
				})
			}
		default:
			return state
	}
}

export default reducer
