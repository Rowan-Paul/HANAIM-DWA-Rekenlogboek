import { combineReducers } from 'redux'

import groupOverviewReducer from './group-overview/reducer'
import logbookReducer from './logbook/reducer'
import logbookoverviewReducer from './logbookoverview/reducer'
import allowStudentAccessReducer from './allow-student-access/reducer'
import studentLogbookreducer from './studentlogbook/reducer'
import mainReducer from './main/reducer'

const rootReducer = combineReducers({
	groupOverview: groupOverviewReducer,
	logbook: logbookReducer,
	allowStudentAccess: allowStudentAccessReducer,
  logbookoverview: logbookoverviewReducer,
  studentLogbook: studentLogbookreducer,
	main: mainReducer
})

export default rootReducer
