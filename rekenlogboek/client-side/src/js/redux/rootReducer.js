import { combineReducers } from 'redux'

import groupOverviewReducer from './group-overview/reducer'
import logbookReducer from './logbook/reducer'
import logbookoverviewReducer from './logbookoverview/reducer'
import mainReducer from './main/reducer'

const rootReducer = combineReducers({
	groupOverview: groupOverviewReducer,
	logbook: logbookReducer,
	logbookoverview: logbookoverviewReducer,
	main: mainReducer
})

export default rootReducer
