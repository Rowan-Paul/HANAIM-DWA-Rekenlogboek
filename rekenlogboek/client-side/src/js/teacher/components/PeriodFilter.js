import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../../../scss/teacher/components/PeriodFilter.scss'

import {
	getFilterOptions,
	getPeriods,
	changeSelectedPeriod,
	changeSelectedSchoolYear
} from '../../redux/allow-student-access/actions'
import Button from '../../common/Button'

function PeriodFilter(props) {
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
		}
	}

	const getPeriodOptions = () => {
		if (Array.isArray(props.periods)) {
			return props?.periods.map(period => {
				return (
					<option value={period} key={period}>
						{period}
					</option>
				)
			})
		} else if (props.periods !== undefined) {
			const period = props.periods
			return <option value={period}>{period}</option>
		}
	}

	const updateSelectedSchoolYear = schoolYear => {
		props.changeSelectedYear(schoolYear)
		props.getPeriodsBySchoolYear({ schoolYear })
	}

	const updateSelectedPeriod = period => {
		console.log(period)
		props.changeSelectedPeriod(period)
	}

	return (
		<div className="period-filter">
			<div>Leerjaar:</div>
			<select
				id="select-school-year"
				value={props.selectedYear}
				onChange={e => {
					updateSelectedSchoolYear(e.target.value)
				}}
			>
				{getSchoolYearOptions()}
			</select>
			<div>Blok:</div>
			<select
				id="select-period"
				value={props.selectedPeriod}
				onChange={e => updateSelectedPeriod(e.target.value)}
			>
				{getPeriodOptions()}
			</select>

			<Button
				color="blue"
				handler={() =>
					props.filterClick(props.selectedYear, props.selectedPeriod)
				}
				value="Kies blok"
			/>
		</div>
	)
}

const mapStateToProps = state => {
	const studentAccess = state.allowStudentAccess
	return {
		schoolYears: studentAccess.schoolYears,
		activeSchoolYear: studentAccess.activeSchoolYear,
		selectedYear: studentAccess.selectedYear,
		periods: studentAccess.periods,
		activePeriod: studentAccess.activePeriod,
		selectedPeriod: studentAccess.selectedPeriod
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getFilterOptions: () => dispatch(getFilterOptions),
		getPeriodsBySchoolYear: payload => dispatch(getPeriods(payload)),
		changeSelectedPeriod: payload => dispatch(changeSelectedPeriod(payload)),
		changeSelectedYear: payload => dispatch(changeSelectedSchoolYear(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PeriodFilter)
