import { combineReducers } from 'redux'

import demoReducer from './demo/reducer'
import logbookReducer from './logbook/reducer'

const rootReducer = combineReducers({
	demo: demoReducer,
	logbook: logbookReducer
})

export default rootReducer
