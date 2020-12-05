import { SAVE_CURRENTPHASE } from './types'
import { SAVE_COLUMN } from './types'
import { SAVE_GOAL } from './types'

export const fetchCurrentPhase = payload => dispatch => {
	//TODO: place this somewhere to access it globally
	// removes chararacter at place i in string
	String.prototype.removeCharAt = function (i) {
		var tmp = this.split('') // convert to an array
		tmp.splice(i - 1, 1) // remove 1 element from the array (adjusting for non-zero-indexed counts)
		return tmp.join('') // reconstruct the string
	}

	fetch(
		process.env.REACT_APP_SERVER_ADDRESS +
			`/logbook/group/${payload.substring(payload.indexOf(' ') + 1)}`,
		{
			method: 'GET'
		}
	)
		.then(res => res.json())
		.then(response =>
			dispatch({
				type: SAVE_CURRENTPHASE,
				response // Called it response (from API) to distinguish it from payloads (from app)
			})
		)
		.catch(error => console.log(error))
}

export const fetchColumn = payload => (dispatch, getState) => {
	fetch(
		process.env.REACT_APP_SERVER_ADDRESS +
			`/logbook/${getState().studentLogbook.id}/column/${payload}`,
		{
			method: 'GET'
		}
	)
		.then(res => res.json())
		.then(response =>
			dispatch({
				type: SAVE_COLUMN,
				response // Called it response (from API) to distinguish it from payloads (from app)
			})
		)
		.catch(error => console.log(error))
}

export const fetchGoal = payload => (dispatch, getState) => {
	fetch(
		process.env.REACT_APP_SERVER_ADDRESS +
			`/logbook/${getState().studentLogbook.id}/goal/${payload}`,
		{
			method: 'GET'
		}
	)
		.then(res => res.json())
		.then(response =>
			dispatch({
				type: SAVE_GOAL,
				response // Called it response (from API) to distinguish it from payloads (from app)
			})
		)
		.catch(error => console.log(error))
}
