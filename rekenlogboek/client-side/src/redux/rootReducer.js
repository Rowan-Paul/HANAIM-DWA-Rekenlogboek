import { combineReducers } from 'redux'

import demoReducer from './demo/reducer'

const rootReducer = combineReducers({
	demo: demoReducer
})

export default rootReducer
