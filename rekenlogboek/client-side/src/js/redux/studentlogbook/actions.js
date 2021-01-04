import {
	SAVE_CURRENTPHASE,
	SAVE_COLUMN,
	SAVE_GOAL,
	SAVE_GOAL_AMOUNT,
	SAVE_ANSWERS,
	NEXT_GOAL,
	PREVIOUS_GOAL,
	SAVE_ALL_GOALS,
	STORE_ANSWER,
	LOAD_STUDENTLOGBOOK,
	LOAD_LOGBOOK,
	INCREMENT_CURRENT_GOAL,
	DECREMENT_CURRENT_GOAL
} from './types'

// export const fetchAllGoals = () => (dispatch, getState) => {
// 	fetch(
// 		process.env.REACT_APP_SERVER_ADDRESS +
// 			`/logbook/${getState().studentLogbook.logbookID}/goals`,
// 		{
// 			method: 'GET'
// 		}
// 	)
// 		.then(res => res.json())
// 		.then(response =>
// 			dispatch({
// 				type: SAVE_ALL_GOALS,
// 				response // Called it response (from API) to distinguish it from payloads (from app)
// 			})
// 		)
// 		.catch(error => console.log(error))
// }

// export const previousGoal = () => {
// 	return { type: PREVIOUS_GOAL }
// }

// export const nextGoal = () => {
// 	return { type: NEXT_GOAL }
// }

// export const newExplanation = payload => (dispatch, getState) => {
// 	// Set answers if the logbook has any.
// 	let answers =
// 		getState().studentLogbook.answers.length > 0
// 			? getState().studentLogbook.answers
// 			: []

// 	//Change the explanation for one answer
// 	answers.forEach((answer, i) => {
// 		if (
// 			answer.columnPosition === getState().studentLogbook.column.position &&
// 			answer.goalPosition === getState().studentLogbook.currentGoal.position
// 		) {
// 			answer[i].explanation = payload
// 		}
// 	})

// 	let body = {
// 		student: getState().main.user.name,
// 		logbookID: getState().studentLogbook.logbookID,
// 		answers: answers
// 	}

// 	fetch(process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/`, {
// 		method: 'PUT',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(body)
// 	})
// 		.then(res => res.json())
// 		.then(response =>
// 			dispatch({
// 				type: SAVE_ANSWERS,
// 				response // Called it response (from API) to distinguish it from payloads (from app)
// 			})
// 		)
// 		.catch(error => console.log(error))
// }

// export const newAnswer = payload => (dispatch, getState) => {
// 	if (typeof payload === 'object') {
// 		payload = payload.toString()
// 	} else if (payload === '' || payload === null) {
// 		payload = 'default'
// 	}

// 	let answers =
// 		getState().studentLogbook.answers.length > 0
// 			? getState().studentLogbook.answers
// 			: []

// 	let addedAnswer = false
// 	let inputType
// 	let columnPosition

// 	if (
// 		Object.keys(getState().studentLogbook.column).length === 0 &&
// 		getState().studentLogbook.column.constructor === Object
// 	) {
// 		//Last column for the evaluation (Smiley's don't get saved)
// 		columnPosition = 3
// 		inputType = 'smileys'
// 	} else {
// 		columnPosition = getState().studentLogbook.column.position
// 		inputType = getState().studentLogbook.column.input.type
// 	}

// 	//Edit existing answer
// 	answers.forEach((answer, i) => {
// 		if (
// 			answer.columnPosition === getState().studentLogbook.column.position &&
// 			answer.goalPosition === getState().studentLogbook.currentGoal.position
// 		) {
// 			answers[i].inputType = inputType
// 			answers[i].value = payload

// 			addedAnswer = true
// 		}
// 	})

// 	//Add new answer
// 	if (!addedAnswer) {
// 		answers.push({
// 			goalPosition: getState().studentLogbook.currentGoal.position,
// 			columnPosition: columnPosition,
// 			answer: {
// 				inputType: inputType,
// 				value: payload
// 			}
// 		})
// 	}

// 	let body = {
// 		student: getState().main.user.name,
// 		logbookID: getState().studentLogbook.logbookID,
// 		answers: answers
// 	}

// 	//Save answers
// 	fetch(process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/`, {
// 		method: 'PUT',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(body)
// 	})
// 		.then(res => res.json())
// 		.then(response =>
// 			dispatch({
// 				type: SAVE_ANSWERS,
// 				response // Called it response (from API) to distinguish it from payloads (from app)
// 			})
// 		)
// 		.catch(error => console.log(error))
// }

// export const fetchAnswers = () => (dispatch, getState) => {
// 	fetch(
// 		process.env.REACT_APP_SERVER_ADDRESS +
// 			`/studentlogbook/${getState().studentLogbook.studentLogbookID}/answers/`,
// 		{
// 			method: 'GET'
// 		}
// 	)
// 		.then(res => res.json())
// 		.then(response => {
// 			dispatch({
// 				type: SAVE_ANSWERS,
// 				response // Called it response (from API) to distinguish it from payloads (from app)
// 			})
// 		})
// }

// export const fetchColumn = payload => (dispatch, getState) => {
// 	fetch(
// 		process.env.REACT_APP_SERVER_ADDRESS +
// 			`/logbook/${getState().studentLogbook.logbookID}/column/${payload}`,
// 		{
// 			method: 'GET'
// 		}
// 	)
// 		.then(res => res.json())
// 		.then(response =>
// 			dispatch({
// 				type: SAVE_COLUMN,
// 				response // Called it response (from API) to distinguish it from payloads (from app)
// 			})
// 		)
// 		.catch(error => console.log(error))
// }

// export const fetchGoal = payload => (dispatch, getState) => {
// 	fetch(
// 		process.env.REACT_APP_SERVER_ADDRESS +
// 			`/logbook/${getState().studentLogbook.logbookID}/goal/${payload}`,
// 		{
// 			method: 'GET'
// 		}
// 	)
// 		.then(res => res.json())
// 		.then(response =>
// 			dispatch({
// 				type: SAVE_GOAL,
// 				response // Called it response (from API) to distinguish it from payloads (from app)
// 			})
// 		)
// 		.catch(error => console.log(error))
// }

// export const fetchGoalAmount = () => (dispatch, getState) => {
// 	fetch(
// 		process.env.REACT_APP_SERVER_ADDRESS +
// 			`/logbook/${getState().studentLogbook.logbookID}/goals`,
// 		{
// 			method: 'GET'
// 		}
// 	)
// 		.then(res => res.json())
// 		.then(response =>
// 			dispatch({
// 				type: SAVE_GOAL_AMOUNT,
// 				response // Called it response (from API) to distinguish it from payloads (from app)
// 			})
// 		)
// 		.catch(error => console.log(error))
// }

// export const loadStudentLogbook = payload => async (dispatch, getState) => {
// 	//Groep 7 -> select everything after the space -> 7
// 	let groupNumber = payload.substring(payload.indexOf(' ') + 1)

// 	//First fetch get's the phase of the logbook & LogbookID
// 	//Second fetch get's the studentlogbookID and it's answers
// 	await fetch(
// 		process.env.REACT_APP_SERVER_ADDRESS + `/logbook/groups/${groupNumber}`,
// 		{
// 			method: 'GET'
// 		}
// 	)
// 		.then(res => res.json())
// 		.then(async response => {
// 			//Ugly but it works
// 			//----------------------
// 			await fetch(
// 				//Await this fetch so it's finished before dispatching the currentphase
// 				process.env.REACT_APP_SERVER_ADDRESS +
// 					`/studentlogbook/${encodeURI(getState().main.user.name)}/logbooks/${
// 						response._id
// 					}`,
// 				{
// 					method: 'GET'
// 				}
// 			)
// 				.then(res => res.json())
// 				.then(response => {
// 					dispatch({
// 						type: LOAD_STUDENTLOGBOOK,
// 						response // Called it response (from API) to distinguish it from payloads (from app)
// 					})
// 				})
// 				.catch(error => console.log(error))
// 			//----------------------

// 			//Dispatch later so we don't have troubles later on.
// 			dispatch({
// 				type: SAVE_CURRENTPHASE,
// 				response // Called it response (from API) to distinguish it from payloads (from app)
// 			})
// 		})
// 		.catch(error => console.log(error))
// }

//REAL SHIT //TODO: TODO: TODO: // mooi fel

export const loadLogbook = payload => dispatch => {
	//Groep 7 -> select everything after the space -> 7
	let groupNumber = payload.substring(payload.indexOf(' ') + 1)

	//First fetch get's the phase of the logbook & LogbookID
	//Second fetch get's the studentlogbookID and it's answers
	fetch(
		process.env.REACT_APP_SERVER_ADDRESS + `/logbook/groups/${groupNumber}`,
		{
			method: 'GET'
		}
	)
		.then(res => res.json())
		.then(response => {
			dispatch({
				type: LOAD_LOGBOOK,
				response // Called it response (from API) to distinguish it from payloads (from app)
			})
		})
		.catch(error => console.log(error))
}

export const incrementCurrentGoal = () => {
	return { type: INCREMENT_CURRENT_GOAL }
}

export const decrementCurrentGoal = () => {
	return {
		type: DECREMENT_CURRENT_GOAL
	}
}

export const loadStudentLogbook = () => (dispatch, getState) => {
	const body = {
		logbookID: getState().studentLogbook.logbook._id,
		student: getState().main.user.name
	}

	fetch(process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	})
		.then(res => res.json())
		.then(response => {
			dispatch({
				type: LOAD_STUDENTLOGBOOK,
				response
			})
		})
		.catch(error => console.log(error))
}

export const saveAnswersRadio = (answerValue, goalPosition, columnPosition) => (
	dispatch,
	getState
) => {
	console.log(answerValue)
	console.log(goalPosition)
	console.log(columnPosition)

	const currentAnswers = [...getState().studentLogbook.studentlogbook.answers]

	console.log(currentAnswers)
	console.log(getState().studentLogbook.studentlogbook.answers)

	if (
		currentAnswers.filter(
			a =>
				a.columnPosition === columnPosition && a.goalPosition === goalPosition
		).length > 0
	) {
		console.log('eentje')
		// vervang al eerder gegeven antwoord voor nieuwe
		const newAnswers = currentAnswers.map(a => {
			if (
				a.columnPosition === columnPosition &&
				a.goalPosition === goalPosition &&
				answerValue === 'default'
			) {
				a.answer = { ...a.answer, value: answerValue }
				return a
			} else if (
				a.columnPosition === columnPosition &&
				a.goalPosition === goalPosition
			) {
				a.answer = { ...a.answer, value: answerValue }
				return a
			}

			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value !== 'default'
		})

		console.log(filterAnswers)
		console.log(getState().studentLogbook.studentlogbook.answers)

		const logbookid = getState().studentLogbook.studentlogbook._id

		const body = {
			answers: filterAnswers
		}

		fetch(
			process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/` + logbookid,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			}
		)
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: SAVE_ANSWERS,
					response
				})
			})
			.catch(error => console.log(error))
	} else if (
		currentAnswers.filter(
			a =>
				a.columnPosition !== columnPosition || a.goalPosition !== goalPosition
		).length > 0 &&
		currentAnswers.length > 0
	) {
		console.log('tweetje')
		// antwoord voor betreffende goal position en columnposition is nog niet eerder gegeven
		const newAnswers = [...currentAnswers]
		newAnswers.push({
			goalPosition: goalPosition,
			columnPosition: columnPosition,
			answer: {
				value: answerValue
			}
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value !== 'default'
		})

		console.log(newAnswers)

		const logbookid = getState().studentLogbook.studentlogbook._id

		const body = {
			answers: filterAnswers
		}

		fetch(
			process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/` + logbookid,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			}
		)
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: SAVE_ANSWERS,
					response
				})
			})
			.catch(error => console.log(error))
	} else if (currentAnswers.length < 1) {
		console.log('drietje')
		// er is nog geen antwoord in de database
		const newAnswers = [
			{
				goalPosition: goalPosition,
				columnPosition: columnPosition,
				answer: {
					value: answerValue
				}
			}
		]

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value !== 'default'
		})

		const logbookid = getState().studentLogbook.studentlogbook._id

		const body = {
			answers: filterAnswers
		}

		fetch(
			process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/` + logbookid,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			}
		)
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: SAVE_ANSWERS,
					response
				})
			})
			.catch(error => console.log(error))
	}
}

export const saveAnswersCheck = (
	answerValue,
	goalPosition,
	columnPosition
) => async (dispatch, getState) => {
	console.log(answerValue)
	console.log(goalPosition)
	console.log(columnPosition)

	const logbookid = getState().studentLogbook.studentlogbook._id

	const currentAnswers = await fetch(
		process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/` + logbookid,
		{
			method: 'GET'
		}
	)
		.then(res => res.json())
		.then(response => response.answers)
		.catch(error => console.log(error))

	console.log(currentAnswers)

	if (
		currentAnswers.filter(
			a =>
				a.columnPosition === columnPosition && a.goalPosition === goalPosition
		).length > 0
	) {
		console.log('eentje')
		// vervang al eerder gegeven antwoord voor nieuwe

		const newAnswers = currentAnswers.map(a => {
			if (
				a.columnPosition === columnPosition &&
				a.goalPosition === goalPosition
			) {
				const currentAnswerValue = a.answer.value
				const splittedValues = currentAnswerValue.split(',')
				console.log(splittedValues)

				if (splittedValues.includes(answerValue)) {
					//selected value zit al in de db
					console.log('include')

					const index = splittedValues.indexOf(answerValue)
					splittedValues.splice(index, 1)
				} else if (!splittedValues.includes(answerValue)) {
					// selected value zit nog niet in db
					console.log('not include')

					splittedValues.push(answerValue)
				}

				console.log(splittedValues)
				console.log(splittedValues.toString())

				a.answer = { ...a.answer, value: splittedValues.toString() }
				return a
			}

			return a
		})
		console.log(newAnswers)

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value !== ''
		})

		const body = {
			answers: filterAnswers
		}

		fetch(
			process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/` + logbookid,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			}
		)
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: SAVE_ANSWERS,
					response
				})
			})
			.catch(error => console.log(error))
	} else if (
		currentAnswers.filter(
			a =>
				a.columnPosition !== columnPosition || a.goalPosition !== goalPosition
		).length > 0 &&
		currentAnswers.length > 0
	) {
		console.log('tweetje')
		// antwoord voor betreffende goal position en columnposition is nog niet eerder gegeven
		const newAnswers = [...currentAnswers]
		newAnswers.push({
			goalPosition: goalPosition,
			columnPosition: columnPosition,
			answer: {
				value: answerValue
			}
		})

		console.log(newAnswers)

		const body = {
			answers: newAnswers
		}

		fetch(
			process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/` + logbookid,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			}
		)
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: SAVE_ANSWERS,
					response
				})
			})
			.catch(error => console.log(error))
	} else if (currentAnswers.length < 1) {
		console.log('drietje')
		// er is nog geen antwoord in de database
		const newAnswers = [
			{
				goalPosition: goalPosition,
				columnPosition: columnPosition,
				answer: {
					value: answerValue
				}
			}
		]

		const body = {
			answers: newAnswers
		}

		fetch(
			process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/` + logbookid,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			}
		)
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: SAVE_ANSWERS,
					response
				})
			})
			.catch(error => console.log(error))
	}
}
