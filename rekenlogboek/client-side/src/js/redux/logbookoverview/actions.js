import {
	SAVE_CURRENT_LOGBOOK,
	SAVE_STUDENT_LOGBOOKS,
	SAVE_ACTIVE_STUDENTLOGBOOK,
	SET_CURRENT_LOGBOOK_PERIOD,
	SET_GROUP,
	RESET_LOGBOOK_OVERVIEW
} from './types'

export const resetLogbookOverview = () => {
	return {
		type: RESET_LOGBOOK_OVERVIEW
	}
}

export const fetchCurrentLogbook = () => (dispatch, getState) => {
	const year = getState().logbookoverview.year
	const group = getState().logbookoverview.group
	const period = getState().logbookoverview.period

	const URI = `years/${year}/groups/${group}/periods/${period}`

	fetch(process.env.REACT_APP_SERVER_ADDRESS + `/logbook/${URI}`, {
		method: 'GET'
	})
		.then(response => response.json())
		.then(response => {
			dispatch(saveCurrentLogbook(response))
			if (response._id) {
				dispatch(fetchStudentLogbooks(response._id))
			} else {
				dispatch(saveStudentLogbooks([]))
			}
		})
		.catch(err => console.error('Error: ', err))
}

export const saveCurrentLogbook = payload => {
	return {
		type: SAVE_CURRENT_LOGBOOK,
		payload
	}
}

export const fetchStudentLogbooks = id => dispatch => {
	fetch(
		process.env.REACT_APP_SERVER_ADDRESS + '/studentlogbook/logbook/' + id,
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

export const saveStudentLogbooks = payload => {
	return {
		type: SAVE_STUDENT_LOGBOOKS,
		payload
	}
}

export const fetchActiveStudentlogbook = id => dispatch => {
	fetch(process.env.REACT_APP_SERVER_ADDRESS + `/studentlogbook/` + id, {
		method: 'GET'
	})
		.then(response => response.json())
		.then(response => {
			dispatch(saveActiveStudentlogbook(response))
		})
		.catch(err => console.error('Error: ', err))
}

export const saveActiveStudentlogbook = payload => {
	return {
		type: SAVE_ACTIVE_STUDENTLOGBOOK,
		payload
	}
}

export const setCurrentLogbookPeriod = payload => {
	return {
		type: SET_CURRENT_LOGBOOK_PERIOD,
		payload
	}
}

export const setGroup = payload => {
	return {
		type: SET_GROUP,
		payload
	}
}
