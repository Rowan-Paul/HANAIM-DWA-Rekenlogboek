// import { SAVE_CURRENTPHASE } from './types'
// import { SAVE_COLUMN } from './types'
// import { SAVE_GOAL } from './types'
// import { SAVE_GOAL_AMOUNT } from './types'
// import { SAVE_ANSWERS } from './types'
// import { NEXT_GOAL } from './types'
// import { PREVIOUS_GOAL } from './types'
// import { SAVE_ALL_GOALS } from './types'

import { SAVE_CURRENTPHASE, SAVE_COLUMN, SAVE_GOAL, SAVE_GOAL_AMOUNT, SAVE_ANSWERS, NEXT_GOAL, PREVIOUS_GOAL, SAVE_ALL_GOALS, LOAD_STUDENTLOGBOOK} from './types'

export const fetchAllGoals = () => (dispatch, getState) => {
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
			type: SAVE_ALL_GOALS,
			response // Called it response (from API) to distinguish it from payloads (from app)
		})
	)
	.catch(error => console.log(error))
}

export const previousGoal = () => {
	return { type: PREVIOUS_GOAL }
}

export const nextGoal = () => {
	return { type: NEXT_GOAL }
}

export const newExplanation = payload => (dispatch, getState) => {
	// let answers = []

	// Set answers if the logbook has any.
	let answers = getState().studentLogbook.answers.length > 0 ? getState().studentLogbook.answers : [];

	// if (getState().studentLogbook.answers.length > 0) {
	// 	answers = getState().studentLogbook.answers
	// }

	answers.forEach((answer, i) => {
		if (answer.columnPosition === getState().studentLogbook.column.position &&
			answer.goalPosition === getState().studentLogbook.currentGoal.position) 
		{
			// answers[i] = {
			// 	goalPosition: answer.goalPosition,
			// 	columnPosition: answer.columnPosition,
			// 	answer: {
			// 		inputType: getState().studentLogbook.column.input.type,
			// 		value: getState().studentLogbook.answers[i].answer.value,
			// 		explanation: payload
			// 	}
			// }

			answer[i].explanation = payload;
		}
	})

	// let body = {
	// 	student: getState().main.user.name,
	// 	logbookID: getState().studentLogbook.logbookID,
	// 	goalPosition: getState().studentLogbook.currentGoal.position,
	// 	columnPostion: getState().studentLogbook.column.position,
	// 	explanation: payload
	// }

	let body = {
		student: getState().main.user.name,
		logbookID: getState().studentLogbook.logbookID,
		answers: answers
	}

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

export const newAnswer = payload => (dispatch, getState) => {
	if (typeof payload === 'object') {
		payload = payload.toString()
	} else if (payload === '' || payload === null) {
		payload = 'default'
	}

	let answers = getState().studentLogbook.answers.length > 0 ? getState().studentLogbook.answers : [];

	// let answers = []

	// // check if it's a new logbnook without answers
	// if (getState().studentLogbook.answers.length > 0) {
	// 	answers = getState().studentLogbook.answers
	// }

	let addedAnswer = false
	let inputType
	let columnPosition

	if (
		Object.keys(getState().studentLogbook.column).length === 0 &&
		getState().studentLogbook.column.constructor === Object
	) {
		//Last column for the evaluation (Smiley's don't get saved)
		columnPosition = 3
		inputType = 'smileys'
	} else {
		columnPosition = getState().studentLogbook.column.position
		inputType = getState().studentLogbook.column.input.type
	}

	//Edit existing answer
	answers.forEach((answer, i) => {
		if (answer.columnPosition === getState().studentLogbook.column.position &&
			answer.goalPosition === getState().studentLogbook.currentGoal.position) 
		{
			// answers[i] = {
			// 	goalPosition: answer.goalPosition,
			// 	columnPosition: answer.columnPosition,
			// 	answer: {
			// 		inputType: inputType,
			// 		value: payload
			// 	}
			// }

			answers[i].inputType = inputType
			answers[i].value = payload

			addedAnswer = true
		}
	})

	//Add new answer
	if (!addedAnswer) {
		answers.push({
			goalPosition: getState().studentLogbook.currentGoal.position,
			columnPosition: columnPosition,
			answer: {
				inputType: inputType,
				value: payload
			}
		})
	}

	let body = {
		student: getState().main.user.name,
		logbookID: getState().studentLogbook.logbookID,
		answers: answers
	}

	//Save answers
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
	// // check if the studentlogbook exists
	// fetch(
	// 	process.env.REACT_APP_SERVER_ADDRESS +
	// 		`/studentlogbook/${encodeURI(getState().main.user.name)}/logbooks/${
	// 			getState().studentLogbook.logbookID
	// 		}`,
	// 	{
	// 		method: 'GET'
	// 	}
	// )
	// .then(res => res.json())
	// .then(response => {
	// 	// fetch the already given answers
	// 	fetch(
	// 		process.env.REACT_APP_SERVER_ADDRESS +
	// 			`/studentlogbook/${response.studentlogbookID}/answers/`,
	// 			{
	// 			method: 'GET'
	// 		}
	// 	)
	// 	.then(res => res.json())
	// 	.then(response => {
	// 		dispatch({
	// 			type: FETCH_ANSWERS,
	// 			response // Called it response (from API) to distinguish it from payloads (from app)
	// 		})
	// 	})
	// })
	// .catch(error => {
	// 	// create a new studentlogbook
	// 	// kinda a bad solution but idk
	// 	const body = {
	// 	logbookID: getState().studentLogbook.logbookID,
	// 	student: getState().main.user.name
	// 	}
	// 	fetch(process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/`, {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify(body)
	// 	})
	// 	.then(res => res.json())
	// 	.then(response => {
	// 		dispatch({
	// 			type: FETCH_ANSWERS,
	// 			response // Called it response (from API) to distinguish it from payloads (from app)
	// 		})
	// 	})
	// 	console.log(error)
	// })



	//Studentlogboek exists, get all answers from it.
	fetch(
		process.env.REACT_APP_SERVER_ADDRESS +
			`/studentlogbook/${getState().studentLogbook.studentLogbookID}/answers/`,
			{
			method: 'GET'
		}
	)
	.then(res => res.json())
	.then(response => {
		dispatch({
			type: SAVE_ANSWERS,
			response // Called it response (from API) to distinguish it from payloads (from app)
		})
	})
}

export const fetchCurrentPhase = payload => dispatch => {
	//TODO: place this somewhere to access it globally
	// removes chararacter at place i in string
	// String.prototype.removeCharAt = function (i) {
	// 	var tmp = this.split('') // convert to an array
	// 	tmp.splice(i - 1, 1) // remove 1 element from the array (adjusting for non-zero-indexed counts)
	// 	return tmp.join('') // reconstruct the string
	// }

	//Groep 7 -> select everything after the space -> 7
	let groupNumber = payload.substring(payload.indexOf(' ') + 1)

	fetch(
		process.env.REACT_APP_SERVER_ADDRESS +
			`/logbook/groups/${groupNumber}`,
		{
			method: 'GET'
		}
	)
	.then(res => res.json())
	.then(response => {
		dispatch({
			type: SAVE_CURRENTPHASE,
			response // Called it response (from API) to distinguish it from payloads (from app)
		})}
	)
	.catch(error => console.log(error))
}

export const fetchColumn = payload => (dispatch, getState) => {
	fetch(
		process.env.REACT_APP_SERVER_ADDRESS +
			`/logbook/${getState().studentLogbook.logbookID}/column/${payload}`,
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

export const loadStudentLogbook = payload => (dispatch, getState) => {
	//Groep 7 -> select everything after the space -> 7
	let groupNumber = payload.substring(payload.indexOf(' ') + 1)

	//First fetch get's the phase of the logbook & LogbookID
	//Second fetch get's the studentlogbookID and it's answers
	fetch(
		process.env.REACT_APP_SERVER_ADDRESS +
			`/logbook/groups/${groupNumber}`,
		{
			method: 'GET'
		}
	)
	.then(res => res.json())
	.then(response => {
		
		fetch(
			process.env.REACT_APP_SERVER_ADDRESS +
			`/studentlogbook/${encodeURI(getState().main.user.name)}/logbooks/${response._id}`,
			{
				method: 'GET'
			}
		)
		.then(res => res.json())
		.then(response => {
			console.log("This isthe respoienadf: " + response._id)
			dispatch({
				type: LOAD_STUDENTLOGBOOK,
				response // Called it response (from API) to distinguish it from payloads (from app)
			})}
		)
		.catch(error => console.log(error))
		
		//Dispatch later so we don't have troubles later on.
		dispatch({
			type: SAVE_CURRENTPHASE,
			response // Called it response (from API) to distinguish it from payloads (from app)
		})
	})
	.catch(error => console.log(error))
}