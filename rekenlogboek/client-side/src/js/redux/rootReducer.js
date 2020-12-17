import { combineReducers } from 'redux'

import logbookReducer from './logbook/reducer'
import mainReducer from './main/reducer'
import logbookoverviewReducer from './logbookoverview/reducer'
import allowStudentAccessReducer from './allow-student-access/reducer'

const rootReducer = combineReducers({
	logbook: logbookReducer,
	main: mainReducer,
	logbookoverview: logbookoverviewReducer,
	allowStudentAccess: allowStudentAccessReducer
})

export default rootReducer
