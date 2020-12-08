import {
	SAVE_CURRENT_LOGBOOK,
	SAVE_STUDENT_LOGBOOKS,
	SAVE_CURRENT_STUDENTLOGBOOK,
	SET_CURRENT_LOGBOOK_PERIOD,
	SET_GROUP
} from './types'

export const fetchCurrentLogbook = () => {
	return async (dispatch, getState) => {
		return await fetch(
			`http://localhost:3000/logbook/year/` +
				encodeURIComponent(getState().logbookoverview.year) +
				`/group/` +
				getState().logbookoverview.group +
				`/period/` +
				getState().logbookoverview.period,
			{
				method: 'GET'
			}
		)
			.then(response => {
				return response.json()
			})
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
}

export const saveCurrentLogbook = payload => {
	return {
		type: SAVE_CURRENT_LOGBOOK,
		payload
	}
}

export const fetchStudentLogbooks = id => {
	return async dispatch => {
		return await fetch(`http://localhost:3000/studentlogbook/logbook/` + id, {
			method: 'GET'
		})
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
