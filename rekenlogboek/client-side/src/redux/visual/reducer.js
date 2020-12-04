import {
	ADD_INPUT_VALUE,
	DELETE_INPUT_VALUE,
	EXPLANATION_FIELD_TOGGLE,
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
	inputTypes: {
		checkboxes: 'checkboxes',
		radiobuttons: 'radiobuttons',
		textarea: 'textarea'
	},
	modal: {
		title: '',
		visible: false
	},
	// This property helps functions rembember which column or row is currently edited
	position: 0
}

export default function visualReducer(state = initialState, action) {
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
		default:
			return state
	}
}
