import { combineReducers } from 'redux'

import demoReducer from './demo/reducer'
import logbookReducer from './logbook/reducer'
import mainReducer from './main/reducer'
import logbookoverviewReducer from './logbookoverview/reducer'

const rootReducer = combineReducers({
	demo: demoReducer,
	logbook: logbookReducer,
	main: mainReducer,
	logbookoverview: logbookoverviewReducer
})

export default rootReducer
