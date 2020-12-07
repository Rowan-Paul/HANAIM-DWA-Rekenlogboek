import {
	ADD_INPUT_VALUE,
	ADD_LEARN_GOAL,
	ADD_LOGBOOK_PERIOD,
	DELETE_INPUT_VALUE,
	EXPLANATION_FIELD_TOGGLE,
	MODAL_HIDE,
	MODAL_SHOW,
	SET_COLUMN,
	SET_COLUMN_TITLE,
	SET_INPUT_TYPE,
	REMOVE_LEARN_GOAL,
	RESET_LOGBOOK,
	SAVE_LOGBOOK,
	SET_GOAL_DESCRIPTION,
	SET_GOAL_IMAGE,
	SET_GOAL_TITLE,
	SET_GOAL_POSITION,
	POST_IMAGE,
	SET_GOAL
} from './types'

const date = new Date()
const year = date.getFullYear()
const INITIAL_STATE = {
	columns: [
		{
			added: false,
			inputType: 'radiobuttons',
			position: 1,
			title: '',
			values: {
				checkboxes: [],
				radiobuttons: [],
				textarea: ''
			}
		},
		{
			added: false,
			inputType: 'radiobuttons',
			position: 2,
			title: '',
			values: {
				checkboxes: [],
				radiobuttons: [],
				textarea: ''
			}
		}
	],
	goals: [],
	group: 0,
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
	period: 0,
	position: 0, // This property helps functions rembember which column or row is currently edited
	teacher: '', //TODO: auto add years in components
	year: `${year} - ${year + 1}` // but what if you add a logboek in the second half of the year?
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_INPUT_VALUE:
			if (action.payload) {
				return {
					...state,
					/** Adds value to checkbox or radiobutton group
					 *
					 * 1. Finds column where position is equal to state position
					 * 2. case textarea : replace textarea value
					 * 3  default: Add new inputvalue to inputType array
					 *
					 * example: values.checkboxes.push({
					 * 	explanation: false,
					 *  text: 'Ik begrijp het goed'
					 * })
					 */
					columns: state.columns.filter(column => {
						if (column.position === state.position) {
							switch (column.inputType) {
								case state.inputTypes.textarea:
									column.values[column.inputType] = action.payload
									break

								default:
									column.values[column.inputType] = [
										...column.values[column.inputType],
										{
											explanation: false,
											text: action.payload
										}
									]
							}
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
		case DELETE_INPUT_VALUE: {
			return {
				...state,
				/** Deletes value from checkbox or radiobutton group
				 *
				 * 1. Finds column where position is equal to state position
				 * 2. Finds values where type is equal to state inputType
				 * 3. Finds value inside array en removes where equal to position from payload
				 *
				 * example: values.checkboxes[1] deleted
				 */
				columns: state.columns.filter(column => {
					if (column.position === state.position) {
						column.values[column.inputType] = column.values[
							column.inputType
						].filter((_, i) => i !== action.payload)
					}
					return column
				})
			}
		}

		case EXPLANATION_FIELD_TOGGLE: {
			/** Toggles explanation field from checkbox or radiobutton value
			 *
			 * 1. Finds column where position is equal to state position
			 * 2. Finds value inside array and toggles explanation boolean to opposite
			 */
			return {
				...state,
				columns: state.columns.filter(column => {
					if (column.position === state.position) {
						column.values[column.inputType][
							action.payload
						].explanation = !column.values[column.inputType][action.payload]
							.explanation
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

		case RESET_LOGBOOK:
			return (state = INITIAL_STATE)
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

		case SET_INPUT_TYPE:
			return {
				...state,
				columns: state.columns.filter(column => {
					if (column.position === state.position) {
						column.inputType = action.payload
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
						goal.imageBlob = action.payload.imageBlob
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
						imageBlob: {},
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
