import { combineReducers } from 'redux'

import logbookReducer from './logbook/reducer'
import mainReducer from './main/reducer'
import logbookoverviewReducer from './logbookoverview/reducer'

const rootReducer = combineReducers({
	logbook: logbookReducer,
	main: mainReducer,
	logbookoverview: logbookoverviewReducer
})

export default rootReducer
