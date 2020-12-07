import {
	FETCH_CURRENT_LOGBOOK,
	SAVE_CURRENT_LOGBOOK,
	FETCH_STUDENT_LOGBOOKS,
	SAVE_STUDENT_LOGBOOKS,
	FETCH_CURRENT_STUDENTLOGBOOK,
	SAVE_CURRENT_STUDENTLOGBOOK
} from './types'

export const fetchCurrentLogbook = () => {
	return async dispatch => {
		return await fetch(
			`http://localhost:3000/logbook/year/` +
				encodeURIComponent('2019 - 2020') +
				`/group/5/period/1`,
			{
				method: 'GET'
			}
		)
			.then(response => response.json())
			.then(response => {
				dispatch(saveCurrentLogbook(response))
				dispatch(fetchStudentLogbooks(response))
			})
			.catch(err => console.error('Error: ', err))
	}
}

export const saveCurrentLogbook = payload => {
	return {
		type: SAVE_CURRENT_LOGBOOK,
		payload
	}
}

export const fetchStudentLogbooks = response => {
	return async dispatch => {
		return await fetch(
			`http://localhost:3000/studentlogbook/logbooks/` + response._id,
			{
				method: 'GET'
			}
		)
			.then(response => response.json())
			.then(response => {
				dispatch(saveStudentLogbooks(response))
			})
			.catch(err => console.error('Error: ', err))
	}
}

export const saveStudentLogbooks = payload => {
	return {
		type: SAVE_STUDENT_LOGBOOKS,
		payload
	}
}

export const fetchCurrentStudentlogbook = () => {}

export const saveCurrentStudentlogbook = payload => {
	return {
		type: SAVE_CURRENT_STUDENTLOGBOOK,
		payload
	}
}
