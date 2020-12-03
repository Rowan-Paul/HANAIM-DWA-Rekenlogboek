import {
	ADD_INPUT_VALUE,
	MODAL_HIDE,
	MODAL_SHOW,
	SET_COLUMN,
	SET_COLUMN_TITLE,
	SET_INPUT_TYPE
} from './types'

const initialState = {
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
	modal: {
		title: '',
		visible: false
	},
	position: 0
}

export default function visualReducer(state = initialState, action) {
	switch (action.type) {
		/* Add value to correct type */
		case ADD_INPUT_VALUE:
			// If payload isset
			if (action.payload) {
				return {
					...state,
					columns: state.columns.filter(column => {
						// If column positon matches state position
						if (column.position === state.position) {
							// Determ inputType
							switch (column.inputType) {
								// Update value for textarea
								case 'textarea':
									column.values[column.inputType] = action.payload
									break

								// Push payload (new value) to inputType that is currently active
								default:
									column.values[column.inputType] = [
										...column.values[column.inputType],
										action.payload
									]
							}
						}
						return column
					})
				}
			}
			return state

		case MODAL_HIDE:
			return {
				...state,
				modal: { visible: false }
			}

		/* Show modal, receives position and title from function*/
		case MODAL_SHOW:
			return {
				...state,
				modal: {
					title: action.payload.title,
					visible: true
				},
				position: action.payload.position
			}
		case SET_COLUMN:
			return {
				...state,
				columns: state.columns.filter(column => {
					switch (column.position) {
						case state.position:
							column.added = true
						default:
							return column
					}
				}),
				modal: { visible: false }
			}

		/* Set title for column with current position */
		case SET_COLUMN_TITLE:
			return {
				...state,
				columns: state.columns.filter(column => {
					switch (column.position) {
						case state.position:
							column.title = action.payload
						default:
							return column
					}
				})
			}

		/* Updates input type of current column */
		case SET_INPUT_TYPE:
			return {
				...state,
				columns: state.columns.filter(column => {
					switch (column.position) {
						case state.position:
							column.inputType = action.payload
						default:
							return column
					}
				})
			}
		default:
			return state
	}
}
