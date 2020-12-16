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
	// Set answers if the logbook has any.
	let answers = getState().studentLogbook.answers.length > 0 ? getState().studentLogbook.answers : [];

	//Change the explanation for one answer
	answers.forEach((answer, i) => {
		if (answer.columnPosition === getState().studentLogbook.column.position &&
			answer.goalPosition === getState().studentLogbook.currentGoal.position) 
		{
			answer[i].explanation = payload;
		}
	})

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

export const loadStudentLogbook = payload => async (dispatch, getState) => {
	//Groep 7 -> select everything after the space -> 7
	let groupNumber = payload.substring(payload.indexOf(' ') + 1)

	//First fetch get's the phase of the logbook & LogbookID
	//Second fetch get's the studentlogbookID and it's answers
	await fetch(
		process.env.REACT_APP_SERVER_ADDRESS +
			`/logbook/groups/${groupNumber}`,
		{
			method: 'GET'
		}
	)
	.then(res => res.json())
	.then(async response => {

		//Ugly but it works
		//----------------------
		await fetch( //Await this fetch so it's finished before dispatching the currentphase
			process.env.REACT_APP_SERVER_ADDRESS +
			`/studentlogbook/${encodeURI(getState().main.user.name)}/logbooks/${response._id}`,
			{
				method: 'GET'
			}
		)
		.then(res => res.json())
		.then(response => {
			dispatch({
				type: LOAD_STUDENTLOGBOOK,
				response // Called it response (from API) to distinguish it from payloads (from app)
			})}
		)
		.catch(error => console.log(error))
		//----------------------

		//Dispatch later so we don't have troubles later on.
		dispatch({
			type: SAVE_CURRENTPHASE,
			response // Called it response (from API) to distinguish it from payloads (from app)
		})

	})
	.catch(error => console.log(error))
}