import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../../../scss/teacher/components/PeriodFilter.scss'

import {
	getFilterOptions,
	getPeriods
} from '../../redux/allow-student-access/actions'
import Button from '../../common/Button'

function PeriodFilter(props) {
	const [selectedSchoolYear, setSelectedSchoolYear] = useState(
		props.currentSchoolYear
	)
	const [selectedPeriod, setSelectedPeriod] = useState(1)

	useEffect(() => {
		props.getFilterOptions()
	}, [])

	const getSchoolYearOptions = () => {
		if (Array.isArray(props.schoolYears)) {
			return props.schoolYears.map(year => {
				return (
					<option value={year} key={year}>
						{year}
					</option>
				)
			})
		} else if (props.schoolYears !== undefined) {
			const year = props.schoolYears
			return <option value={year}>{year}</option>
		} else {
			return null
		}
	}

	const getPeriods = () => {
		console.log(props.periods)
		// return props?.periods.map(period => {
		// 	return (
		// 		<option value={period} key={period}>
		// 			{period}
		// 		</option>
		// 	)
		// })
	}

	const updateSelectedSchoolYear = schoolYear => {
		setSelectedSchoolYear(schoolYear)
		props.getPeriodsBySchoolYear({ schoolYear })
	}

	const updatePeriodValue = period => {
		setSelectedPeriod(period)
	}

	return (
		<div className="period-filter">
			<div>Leerjaar:</div>
			<select
				id="select-school-year"
				value={selectedSchoolYear}
				onChange={e => {
					updateSelectedSchoolYear(e.target.value)
				}}
			>
				{getSchoolYearOptions()}
			</select>
			<div>Blok:</div>
			<select
				onChange={e => updatePeriodValue(e.target.value)}
				id="select-period"
			>
				{getPeriods()}
			</select>

			<Button
				color="blue"
				handler={() => props.filterClick(selectedSchoolYear, selectedPeriod)}
				value="Kies blok"
			/>
		</div>
	)
}

const mapStateToProps = state => {
	console.log(state)
	const studentAccess = state.allowStudentAccess
	return {
		schoolYears: studentAccess.schoolYears,
		currentSchoolYear: studentAccess.currentSchoolYear,
		periods: studentAccess.periods
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getFilterOptions: () => dispatch(getFilterOptions),
		getPeriodsBySchoolYear: payload => dispatch(getPeriods(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PeriodFilter)
