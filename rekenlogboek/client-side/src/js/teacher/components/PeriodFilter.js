import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import '../../../scss/teacher/components/PeriodFilter.scss'

import { getYears } from '../../redux/allow-student-access/actions'
import Button from '../../common/Button'

function PeriodFilter(props) {
	useEffect(() => {
		props.getSchoolYears()
	}, [])

	const getSchoolYearOptions = () =>
		props.schoolYears?.map(year => {
			return (
				<option value={year} key={year}>
					{year}
				</option>
			)
		})

	return (
		<div className="period-filter">
			<div>Leerjaar:</div>
			<select>{getSchoolYearOptions()}</select>
			<div>Blok:</div>
			<input type="number" defaultValue="1" min="1" max="99" />
			<Button color="blue" handler={() => {}} value="Kies blok" />
		</div>
	)
}

const mapStateToProps = state => {
	return {
		schoolYears: state.allowStudentAccess.schoolYears
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getSchoolYears: () => dispatch(getYears)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PeriodFilter)
