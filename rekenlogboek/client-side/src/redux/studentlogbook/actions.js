import { SAVE_CURRENTPHASE } from './types'
import { SAVE_COLUMN } from './types'
import { SAVE_GOAL } from './types'
import { SAVE_GOAL_AMOUNT } from './types'
import { SAVE_ANSWERS } from './types'
import { FETCH_ANSWERS } from './types'

export const newAnswer = payload => (dispatch, getState) => {
	if (typeof payload === 'object') {
		payload = payload.toString()
	}

	let body = []
	let answers = [
		{
			goalPosition: getState().studentLogbook.currentGoal.position,
			columnPosition: getState().studentLogbook.column.position,
			answer: {
				inputType: getState().studentLogbook.column.input.type,
				value: payload
			}
		}
	]

	// check if it's a new logbnook without answers
	if (getState().studentLogbook.answers.length > 0) {
		answers = getState().studentLogbook.answers
	}

	answers.forEach((answer, i) => {
		if (answer.columnPosition === getState().studentLogbook.column.position) {
			body = {
				student: getState().main.user.name,
				logbookID: getState().studentLogbook.logbookID,
				answers: [
					{
						goalPosition: answer.goalPosition,
						columnPosition: answer.columnPosition,
						answer: {
							inputType: getState().studentLogbook.column.input.type,
							value: payload
						}
					}
				]
			}
		}
	})

	fetch(process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	})
		.then(res => res.json())
		.then(response =>
			dispatch({
				type: SAVE_ANSWERS,
				response // Called it response (from API) to distinguish it from payloads (from app)
			})
		)
		.catch(error => console.log(error))
}

export const fetchAnswers = () => (dispatch, getState) => {
	// check if the studentlogbook exists
	fetch(
		process.env.REACT_APP_SERVER_ADDRESS +
			`/studentlogbook/${encodeURI(getState().main.user.name)}/${
				getState().studentLogbook.logbookID
			}`,
		{
			method: 'GET'
		}
	)
		.then(res => res.json())
		.then(response => {
			// fetch the already given answers
			fetch(
				process.env.REACT_APP_SERVER_ADDRESS +
					`/studentlogbook/${response.studentlogbookID}/answers/goal/${
						getState().studentLogbook.currentGoal.position
					}`,

				{
					method: 'GET'
				}
			)
				.then(res => res.json())
				.then(response =>
					dispatch({
						type: FETCH_ANSWERS,
						response // Called it response (from API) to distinguish it from payloads (from app)
					})
				)
		})
		.catch(error => {
			// create a new studentlogbook
			// kinda a bad solution but idk
			const body = {
				logbookID: getState().studentLogbook.logbookID,
				student: getState().main.user.name
			}
			fetch(process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})
				.then(res => res.json())
				.then(response => {
					dispatch({
						type: FETCH_ANSWERS,
						response // Called it response (from API) to distinguish it from payloads (from app)
					})
				})

			console.log(error)
		})
}

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
			`/logbook/groups/${payload.substring(payload.indexOf(' ') + 1)}`,
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
			`/logbook/${getState().studentLogbook.logbookID}/column`,
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
			`/logbook/${getState().studentLogbook.logbookID}/goal/${payload}`,
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

export const fetchGoalAmount = () => (dispatch, getState) => {
	fetch(
		process.env.REACT_APP_SERVER_ADDRESS +
			`/logbook/${getState().studentLogbook.logbookID}/goals`,
		{
			method: 'GET'
		}
	)
		.then(res => res.json())
		.then(response =>
			dispatch({
				type: SAVE_GOAL_AMOUNT,
				response // Called it response (from API) to distinguish it from payloads (from app)
			})
		)
		.catch(error => console.log(error))
}
