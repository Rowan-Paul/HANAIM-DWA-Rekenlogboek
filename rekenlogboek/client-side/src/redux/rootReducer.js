import { combineReducers } from 'redux'

import demoReducer from './demo/reducer'
import mainReducer from './main/reducer'

const rootReducer = combineReducers({
	demo: demoReducer,
	main: mainReducer
})

export default rootReducer
