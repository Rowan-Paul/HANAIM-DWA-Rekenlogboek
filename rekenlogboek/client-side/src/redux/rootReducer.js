import { combineReducers } from 'redux'

import demoReducer from './demo/reducer'
import logbookReducer from './logbook/reducer'
import mainReducer from './main/reducer'

const rootReducer = combineReducers({
	demo: demoReducer,
	logbook: logbookReducer,
	main: mainReducer
})

export default rootReducer
