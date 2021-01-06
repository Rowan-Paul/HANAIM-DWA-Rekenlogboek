import {
	SAVE_ANSWERS,
	LOAD_STUDENTLOGBOOK,
	LOAD_LOGBOOK,
	INCREMENT_CURRENT_GOAL,
	DECREMENT_CURRENT_GOAL
} from './types'

// Loads a logbook
export const loadLogbook = payload => dispatch => {
	// Groep 7 -> select everything after the space -> 7
	let groupNumber = payload.substring(payload.indexOf(' ') + 1)

	// Fetches the logbook based on group number
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
				response
			})
		})
		.catch(error => console.log(error))
}

//Increments the current goal
export const incrementCurrentGoal = () => {
	return { type: INCREMENT_CURRENT_GOAL }
}

//Decrements the current goal
export const decrementCurrentGoal = () => {
	return {
		type: DECREMENT_CURRENT_GOAL
	}
}

//Loads a studentlogbook based on the loaded logbook and the logged in student
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

//Saves given answers from radiobuttons
export const saveAnswerRadio = (answerValue, goalPosition, columnPosition) => (
	dispatch,
	getState
) => {
	const currentAnswers = [...getState().studentLogbook.studentlogbook.answers]

	if (
		currentAnswers.filter(
			a =>
				a.columnPosition === columnPosition && a.goalPosition === goalPosition
		).length > 0
	) {
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

		newAnswers.map(a => {
			if (a.answer.value === 'default') {
				delete a.answer.value
			}
			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value || answer.answer.explanation
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
	} else if (
		currentAnswers.filter(
			a =>
				a.columnPosition !== columnPosition || a.goalPosition !== goalPosition
		).length > 0 &&
		currentAnswers.length > 0
	) {
		// antwoord voor betreffende goal position en columnposition is nog niet eerder gegeven
		const newAnswers = [...currentAnswers]
		newAnswers.push({
			goalPosition: goalPosition,
			columnPosition: columnPosition,
			answer: {
				value: answerValue
			}
		})

		newAnswers.map(a => {
			if (a.answer.value === 'default') {
				delete a.answer.value
			}
			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value || answer.answer.explanation
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
	} else if (currentAnswers.length < 1) {
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

		newAnswers.map(a => {
			if (a.answer.value === 'default') {
				delete a.answer.value
			}
			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value || answer.answer.explanation
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

//Saves given answers from checkboxes
export const saveAnswerCheck = (
	answerValue,
	goalPosition,
	columnPosition
) => async (dispatch, getState) => {
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

	if (
		currentAnswers.filter(
			a =>
				a.columnPosition === columnPosition && a.goalPosition === goalPosition
		).length > 0
	) {
		// vervang al eerder gegeven antwoord voor nieuwe

		const newAnswers = currentAnswers.map(a => {
			if (
				a.columnPosition === columnPosition &&
				a.goalPosition === goalPosition
			) {
				const currentAnswerValue = a.answer.value
				let splittedValues

				if (currentAnswerValue) {
					splittedValues = currentAnswerValue.split(',')

					if (splittedValues.includes(answerValue)) {
						//selected value zit al in de db

						const index = splittedValues.indexOf(answerValue)
						splittedValues.splice(index, 1)
					} else if (!splittedValues.includes(answerValue)) {
						// selected value zit nog niet in db

						splittedValues.push(answerValue)
					}
				} else {
					splittedValues = [answerValue]
				}

				a.answer = { ...a.answer, value: splittedValues.toString() }
				return a
			}

			return a
		})

		newAnswers.map(a => {
			if (a.answer.value === '') {
				delete a.answer.value
			}
			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value || answer.answer.explanation
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
		// antwoord voor betreffende goal position en columnposition is nog niet eerder gegeven
		const newAnswers = [...currentAnswers]
		newAnswers.push({
			goalPosition: goalPosition,
			columnPosition: columnPosition,
			answer: {
				value: answerValue
			}
		})

		newAnswers.map(a => {
			if (a.answer.value === '') {
				delete a.answer.value
			}
			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value || answer.answer.explanation
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
	} else if (currentAnswers.length < 1) {
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

		newAnswers.map(a => {
			if (a.answer.value === '') {
				delete a.answer.value
			}
			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value || answer.answer.explanation
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
	}
}

//Saves given answers from textareas
export const saveAnswerText = (
	answerValue,
	goalPosition,
	columnPosition
) => async (dispatch, getState) => {
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

	if (
		currentAnswers.filter(
			a =>
				a.columnPosition === columnPosition && a.goalPosition === goalPosition
		).length > 0
	) {
		// vervang al eerder gegeven antwoord voor nieuwe

		const newAnswers = currentAnswers.map(a => {
			if (
				a.columnPosition === columnPosition &&
				a.goalPosition === goalPosition
			) {
				a.answer = { ...a.answer, value: answerValue }
				return a
			}

			return a
		})

		newAnswers.map(a => {
			if (a.answer.value === '') {
				delete a.answer.value
			}
			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value || answer.answer.explanation
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
		// antwoord voor betreffende goal position en columnposition is nog niet eerder gegeven
		const newAnswers = [...currentAnswers]
		newAnswers.push({
			goalPosition: goalPosition,
			columnPosition: columnPosition,
			answer: {
				value: answerValue
			}
		})

		newAnswers.map(a => {
			if (a.answer.value === '') {
				delete a.answer.value
			}
			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value || answer.answer.explanation
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
	} else if (currentAnswers.length < 1) {
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

		newAnswers.map(a => {
			if (a.answer.value === '') {
				delete a.answer.value
			}
			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value || answer.answer.explanation
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
	}
}

//Saves given explanations
export const saveExplanation = (
	newExplanationValue,
	goalPosition,
	columnPosition
) => async (dispatch, getState) => {
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

	if (
		currentAnswers.filter(
			a =>
				a.columnPosition === columnPosition && a.goalPosition === goalPosition
		).length > 0
	) {
		// vervang al eerder gegeven antwoord voor nieuwe

		const newAnswers = currentAnswers.map(a => {
			if (
				a.columnPosition === columnPosition &&
				a.goalPosition === goalPosition
			) {
				a.answer = { ...a.answer, explanation: newExplanationValue }
				return a
			}

			return a
		})

		newAnswers.map(a => {
			if (a.answer.value === '') {
				delete a.answer.value
			}
			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value || answer.answer.explanation
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
		// antwoord voor betreffende goal position en columnposition is nog niet eerder gegeven
		const newAnswers = [...currentAnswers]
		newAnswers.push({
			goalPosition: goalPosition,
			columnPosition: columnPosition,
			answer: {
				explanation: newExplanationValue
			}
		})

		newAnswers.map(a => {
			if (a.answer.value === '') {
				delete a.answer.value
			}
			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value || answer.answer.explanation
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
	} else if (currentAnswers.length < 1) {
		// er is nog geen antwoord in de database
		const newAnswers = [
			{
				goalPosition: goalPosition,
				columnPosition: columnPosition,
				answer: {
					explanation: newExplanationValue
				}
			}
		]

		newAnswers.map(a => {
			if (a.answer.value === '') {
				delete a.answer.value
			}
			return a
		})

		const filterAnswers = newAnswers.filter(answer => {
			return answer.answer.value || answer.answer.explanation
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
	}
}
