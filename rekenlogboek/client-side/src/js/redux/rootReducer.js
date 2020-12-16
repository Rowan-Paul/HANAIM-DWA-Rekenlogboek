import { combineReducers } from 'redux'

import logbookReducer from './logbook/reducer'
import mainReducer from './main/reducer'
import logbookoverviewReducer from './logbookoverview/reducer'
import studentLogbookreducer from '../../redux/studentlogbook/reducer'

const rootReducer = combineReducers({
	logbook: logbookReducer,
	main: mainReducer,
	logbookoverview: logbookoverviewReducer,
	studentLogbook: studentLogbookreducer
})

export default rootReducer
