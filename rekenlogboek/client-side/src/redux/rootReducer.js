import { combineReducers } from 'redux'

import kaasReducer from './kaas/reducer'

const rootReducer = combineReducers({
	kaas: kaasReducer
})

export default rootReducer
